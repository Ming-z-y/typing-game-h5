export interface Setting {
  column: number;
  zimuNum: number;
  time: number;
}

export const mapData: Record<string, Setting> = {
  easy: {
    column: 3,
    zimuNum: 1,
    time: 2000,
  },
  middle: {
    column: 3,
    zimuNum: 2,
    time: 2000,
  },
  hard: {
    column: 4,
    zimuNum: 3,
    time: 2000,
  },
  c6: {
    column: 4,
    zimuNum: 3,
    time: 2000,
  },
};
