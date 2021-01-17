export type NullableByKey<
  TypeToBeMapped extends object,
  KeyToBeNullabled extends keyof TypeToBeMapped
> = Omit<TypeToBeMapped, KeyToBeNullabled> &
  Partial<
    {
      [index in keyof Pick<
        TypeToBeMapped,
        KeyToBeNullabled
      >]: TypeToBeMapped[index]
    }
  >
