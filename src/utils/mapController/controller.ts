export class Controller {
  static time: NodeJS.Timer;
  static strs: String[] = [""];
  static _genStr() {
    const str = Math.random().toString(36).slice(-4);
    this.strs.push(str);
    return str;
  }
  static init() {
    this.strs = [];
    this.time = setInterval(this._genStr.bind(this), 5000);
  }
  static getStrs() {
    return this.strs;
  }
  static parse() {
    clearInterval(this.time);
  }
  static begin() {
    this.init();
  }
}
