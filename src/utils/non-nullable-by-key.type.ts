export type NonNullableByKey<
  TypeToBeMapped extends object,
  KeyToBeNonNullabled extends keyof TypeToBeMapped
> = Omit<TypeToBeMapped, KeyToBeNonNullabled> &
  Required<
    {
      [index in keyof Pick<TypeToBeMapped, KeyToBeNonNullabled>]: NonNullable<
        TypeToBeMapped[index]
      >
    }
  >
