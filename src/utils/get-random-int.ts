export const getRandomInt = (min: number, max: number) => {
  const flatMin = Math.ceil(min)
  const flatMax = Math.floor(max)
  return Math.floor(Math.random() * (flatMax - flatMin + 1)) + flatMin
}
