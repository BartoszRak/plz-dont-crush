
type Callback<T> = (...args: unknown[]) => T

export type InfiniteProxy = Record<string, Function> & { mock: jest.Mock }

export const createInfiniteProxy = (
  callbacksOnKeys: Record<string, Callback<unknown>> = {},
  middlebacksOnKeys: Record<string, Callback<void>> = {},
): InfiniteProxy => {
  const proxy: InfiniteProxy = new Proxy(
    {
      mock: jest.fn((key, ...args) => {
        if (key in middlebacksOnKeys) {
          middlebacksOnKeys[key](...args)
        }
        return key in callbacksOnKeys ? callbacksOnKeys[key](...args) : proxy
      }),
    },
    {
      get: (target, key: string) => {
        if (key === 'mock') {
          return target.mock
        }

        return (...args: unknown[]) => target.mock(key, ...args)
      },
    },
  )
  return proxy
}
