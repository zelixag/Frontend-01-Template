function ConvertString(string) {
  this.value = string
  this.valueOf = function() {
    return this.value
  }
  this.toNumber = function() {
    if (/^-0b/.test(this.value)) return NaN
    let charArr = this.value.split("");
    if (/^0b/.test(this.value)) {
      return this._integerStringToNumber(charArr.splice(2), 2);
    } else if (/^0o/.test(this.value)) {
      // 八进制
      return this._integerStringToNumber(charArr.splice(2), 8);
    } else if (/^0x/.test(this.value)) {
      // 16进制
      return this._integerStringToNumber(charArr.splice(2), 16);
    } else if (this.value.includes("-")) {
      // 十进制
    }
  }
  return String(string)
}
ConvertString.prototype._integerStringToNumber = function (integerStringArr, x) {
  let integer = 0;
  let i = 0;
  while (i < integerStringArr.length) {
    if (integerStringArr[i] > x && x < 10) return NaN
    integer = integer * x;
    if(x > 10) {
      integer += to16Number(integerStringArr[i]);
    } else {
      integer += integerStringArr[i].codePointAt(0) - "0".codePointAt(0);
    }
    i++;
  }
  return integer
};
ConvertString.prototype.to16Number = function(str){
  if(integerStringArr[i].codePointAt(0) >= 'a'.codePointAt(0))
}
let str = new ConvertString("0o779").toNumber(8);
console.log(str)

