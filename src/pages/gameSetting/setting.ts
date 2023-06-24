export interface Setting {
  column: number;
  zimuNum: number;
  time: number;
}

export const mapData: Record<string, Setting> = {
  easy: {
    column: 3,
    zimuNum: 1,
    time: 5000,
  },
  middle: {
    column: 3,
    zimuNum: 2,
    time: 3000,
  },
  hard: {
    column: 4,
    zimuNum: 3,
    time: 2000,
  },
};
