function convertNumberToString(num, x = 10) {
  let str = "";
  let integer = Math.floor(num);
  let fraction = num - Math.floor(num);
  while (integer > 0) {
    let strTemp = integer % x;
    strTemp =
      x > 10 && strTemp > 10 ? String.fromCodePoint(87 + strTemp) : strTemp;
    str = strTemp + str;
    integer = Math.floor(integer / x);
  }
  console.log(str);
  str = str + ".";
  while (fraction > 0.00000001) {
    let start = Math.floor(fraction * 10);
    fraction = fraction * 10 - start;
    let strTemp =(start * x);
    console.log(start * x);
    if (x > 10) {
      strTemp = strTemp > 10 ? String.fromCodePoint(87 + strTemp) : strTemp;
      strTemp = strTemp > 16 ? strTemp/10 : strTemp;
    }
    str += strTemp;
  }
  console.log(str)
  return str
}
convertNumberToString(189.11, 2);
function convertStringToNumber() {
  let charArr = string.split('')
  let number =
}
