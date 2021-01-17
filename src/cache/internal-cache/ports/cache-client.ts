export abstract class CacheClient {
  abstract set(
    key: string,
    payload: string,
    expirationInMs?: number,
  ): Promise<boolean>
  abstract get(key: string): Promise<string | undefined>
  abstract del(key: string): Promise<boolean>
  abstract end(): boolean
}
