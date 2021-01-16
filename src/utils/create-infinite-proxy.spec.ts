import { createInfiniteProxy, InfiniteProxy } from './create-infinite-proxy'

let proxy: InfiniteProxy
let result: unknown

describe('when no middlebacks and no callbacks are passed', () => {
  beforeEach(() => {
    proxy = createInfiniteProxy()
    result = proxy
      .find('user')
      .where({ name: 'John', age: 15 })
      .something()
      .getOne()
  })

  it('calls everything in chain properly', () => {
    expect(proxy.mock.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          "find",
          "user",
        ],
        Array [
          "where",
          Object {
            "age": 15,
            "name": "John",
          },
        ],
        Array [
          "something",
        ],
        Array [
          "getOne",
        ],
      ]
    `)
  })
})

describe('when middlebacks are passed', () => {
  let firstMiddleback: jest.Mock
  let secondMiddleback: jest.Mock

  beforeEach(() => {
    firstMiddleback = jest.fn()
    secondMiddleback = jest.fn()
    proxy = createInfiniteProxy(
      {
        callback: () => 'CallbackOutput',
      },
      {
        firstMiddleback,
        secondMiddleback,
      },
    )
    result = proxy
      .something()
      .firstMiddleback(1, 'firstMiddleBackArgue')
      .secondMiddleback(1, 'secondMiddleBackArgue')
      .something()
      .callback()
  })

  it('returns callback valid output', () => {
    expect(result).toMatchInlineSnapshot(`"CallbackOutput"`)
  })

  it('calls every middleback', () => {
    expect(proxy.mock.mock.calls).toMatchInlineSnapshot(`
        Array [
          Array [
            "something",
          ],
          Array [
            "firstMiddleback",
            1,
            "firstMiddleBackArgue",
          ],
          Array [
            "secondMiddleback",
            1,
            "secondMiddleBackArgue",
          ],
          Array [
            "something",
          ],
          Array [
            "callback",
          ],
        ]
      `)
  })
})

describe('when callbacks are passed', () => {
  beforeEach(() => {
    proxy = createInfiniteProxy({
      firstCallback: () => 'FirstCallbackOutput',
      secondCallback: () => 'SecondCallbackOutput',
    })
  })

  it('returns valid output and calls everything in chain properly', () => {
    expect(
      proxy
        .something1()
        .something2()
        .firstCallback(),
    ).toBe('FirstCallbackOutput')
    expect(proxy.mock.mock.calls).toMatchInlineSnapshot(`
        Array [
          Array [
            "something1",
          ],
          Array [
            "something2",
          ],
          Array [
            "firstCallback",
          ],
        ]
      `)
  })

  it('returns valid output and calls everything in chain properly', () => {
    expect(
      proxy
        .something1()
        .something2()
        .something3()
        .secondCallback(),
    ).toBe('SecondCallbackOutput')
    expect(proxy.mock.mock.calls).toMatchInlineSnapshot(`
        Array [
          Array [
            "something1",
          ],
          Array [
            "something2",
          ],
          Array [
            "something3",
          ],
          Array [
            "secondCallback",
          ],
        ]
      `)
  })
})
