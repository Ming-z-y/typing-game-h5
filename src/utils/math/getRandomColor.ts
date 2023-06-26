import { getRandom } from "./getRandom";

export function generateRandomColor() {
  const red = getRandom(0, 256);
  const green = getRandom(0, 256);
  const blue = getRandom(0, 256);
  const color = `rgb(${red}, ${green}, ${blue})`;
  return color;
}
