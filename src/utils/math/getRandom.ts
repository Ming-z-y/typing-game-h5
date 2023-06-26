export function getRandom(start: number = 0, end: number = 1) {
  return Math.floor(Math.random() * (end - start) + start);
}
