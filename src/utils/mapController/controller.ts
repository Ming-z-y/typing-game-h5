export class Controller {
  static time: NodeJS.Timer;
  static strs: String[] = [""];
  static el: HTMLElement | null;
  static _genStr() {
    const str = Math.random().toString(36).slice(-4);
    const posi = Math.floor(Math.random() * 10) % 3;
    const posis = ["left", "middle", "right"];
    this.strs.push(str);
    const ele = document.createElement("div");
    ele.className = "clipItem";
    ele.classList.add(posis[posi]);
    ele.innerHTML = str;
    setTimeout(() => {
      ele.classList.add("bottom");
    }, 100);

    this.el?.append(ele);
    return str;
  }
  static init(className: string) {
    this.el = document.querySelector(className);
    this.strs = [];
    this.begin();
  }
  static getStrs() {
    return this.strs;
  }
  static parse() {
    clearInterval(this.time);
  }
  static begin() {
    if (!this.time) {
      this.time = setInterval(this._genStr.bind(this), 1500);
    }
  }
}
