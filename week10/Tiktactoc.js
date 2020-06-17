class TikTacToc {
  constructor() {
    this.ROWS = 3;
    this.COLUMNS = 3;
    this.color = 1;
    this.pattern = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    this.initPattern = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
  }
  init() {
    this.pattern = this.initPattern;
    this.show();
  }
  setInnerText(x, y) {
    document.querySelector(`.cell-${x}-${y}`).innerText =
      this.color === 2 ? "❌" : "⭕️";
  }
  move(y, x) {
    console.log("move");
    if (this.pattern[x][y] !== 0) return;
    this.pattern[x][y] = this.color;
    this.setInnerText(x, y);
    if (this.check(this.pattern, this.color)) {
      let winner = this.color === 2 ? "❌" : "⭕️";
      this.init();
      window.alert(`${winner} is win`);
    }
    this.color = 3 - this.color;
    if (this.willWin(this.pattern, this.color)) {
      let winner = this.color === 2 ? "❌" : "⭕️";
      console.log(`${winner} is will win`);
    }else {
      console.log('没做好')
    }
  }
  check(pattern, color) {
    // 横向检查
    for (let y = 0; y < this.COLUMNS; y++) {
      let win = true;
      for (let x = 0; x < this.ROWS; x++) {
        if (pattern[x][y] !== color) {
          win = false;
          break;
        }
      }
      if (win) return true;
    }
    // 竖向检查
    for (let y = 0; y < this.COLUMNS; y++) {
      let win = true;
      for (let x = 0; x < this.ROWS; x++) {
        if (pattern[y][x] !== color) {
          win = false;
          break;
        }
      }
      if (win) return true;
    }
    // 斜向检查
    {
      let win = true;
      for (let x = 0; x < this.ROWS; x++) {
        if (pattern[x][x] !== color) {
          win = false;
          break;
        }
      }
      if (win) return true;
    }
    // 斜向检查
    {
      let win = true;
      for (let x = 0; x < this.ROWS; x++) {
        if (pattern[x][2 - x] !== color) {
          win = false;
          break;
        }
      }
      if (win) return true;
    }
  }
  cloneDeep() {
    return JSON.parse(JSON.stringify(this.pattern));
  }
  willWin(pattern, color) {
    for (let y = 0; y < this.COLUMNS; y++) {
      for (let x = 0; x < this.ROWS; x++) {
        // 如果不是0就不用填就不需要不用判断, 跳出本次循环
        if (pattern[x][y] !== 0) continue;
        let temp = this.cloneDeep(pattern);
        temp[x][y] = color;
        if (this.check(temp, color)) {
          return true;
        }
      }
    }
    return false;
  }
  show() {
    let board = document.getElementById("board");
    board.innerHTML = "";
    for (let y = 0; y < this.COLUMNS; y++) {
      for (let x = 0; x < this.ROWS; x++) {
        let cell = document.createElement("div");
        cell.classList.add(`cell`);
        cell.classList.add(`cell-${x}-${y}`);
        cell.innerText =
          this.pattern[x][y] === 2
            ? "❌"
            : this.pattern[x][y] === 1
            ? "⭕️"
            : "";

        cell.addEventListener("click", () => this.move(y, x));
        board.appendChild(cell);
      }
    }
  }
}
let tikTacToc = new TikTacToc();
tikTacToc.show();
