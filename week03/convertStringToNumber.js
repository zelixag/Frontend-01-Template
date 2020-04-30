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
      return this._integerStringToNumber(charArr.splice(2), 2);
    } else if (/^0x/.test(this.value)) {
      // 16进制
    } else if (this.value.includes("-")) {
      // 十进制
    }

    // let charArr = this.value.split("");
    // let isAbs = false 
    // if(charArr[0] === '-') {
    //   charArr.shift()
    //   isAbs = true
    // }
    // let integerString = ''
    // let fractionString = ''
    // if(charArr.includes('.')) {
    //   integerString = charArr.slice(
    //     0,
    //     charArr.findIndex((item) => item === ".")
    //   );
    //   fractionString.slice(charArr.findIndex(item => item === '.')+1)
    // } else {
    //   integerString = charArr
    // }
    // let integer = this._integerStringToNumber(integerString, x);
    
    // return isAbs ? -integer : integer;
  }
  return String(string)
}
ConvertString.prototype._integerStringToNumber = function (integerStringArr, x) {
  let integer = 0;
  let i = 0;
  while (i < integerStringArr.length) {
    integer = integer * x;
    integer += integerStringArr[i].codePointAt(0) - "0".codePointAt(0);
    i++;
  }
  return integer
};
let str = new ConvertString("0b1010").toNumber(2);
console.log(str)

