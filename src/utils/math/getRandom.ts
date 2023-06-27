export function getRandom(start: number = 0, end: number = 1) {
  return parseInt(String(Math.random() * (end - start + 1) + start), 10);
}
