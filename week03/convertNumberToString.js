function ConvertNumber(integer) {
  if (!new.target) throw "Foo() must be called with new";
  this.value = integer
  this.valueOf = function() {
    return value
  }
  this.toString = function(x = 10) {
    let num = this.value 
    // 判断正负数
    let sign = num > 0 ? "" : "-";
    let integerStr = "";
    let fractionStr = "";

    num = Math.abs(num);
    let integer = Math.floor(num);
    let fraction = num - Math.floor(num);
    // 整数字符串
    integerStr = this._integertoString(integer, x);

    // 如果小数部分为0 直接返回整数字符串
    if (fraction === 0) return `${sign}${integerStr}`;

    // 求小数部分字符串
    fractionStr = this._fractiontoString(fraction, x);
    return `${sign}${integerStr}.${fractionStr}`;
  }
  return Number(integer)
}

ConvertNumber.prototype._integertoString = function(integer, x) {
  let str = "";
  while (integer > 0) {
    str = this._integerTo16(integer % x) + str;
    integer = Math.floor(integer / x);
  }
  return str;
}
ConvertNumber.prototype._fractiontoString = function(fraction, x) {
  let str = "";
  let i = 0;
  let fra = fraction;
  while (i < 52 && fra * x !== 0) {
    let float = fra * x;
    str += float >= 1 ? this._integerTo16(Math.floor(float)) : 0;
    fra = float - Math.floor(float);
    i++;
  }
  return str;
}
ConvertNumber.prototype._integerTo16 = function(integer) {
  if (integer >= 10) {
    return String.fromCodePoint(87 + integer);
  } else {
    return integer;
  }
}
let str2 = new ConvertNumber(0.1).toString(2)
console.log(str);
