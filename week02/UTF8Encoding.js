// codePointAt()
// 16进制表达
// utf-8分布范围 1. 0 ~ 7F  2. 800 ~ 7FF 3. 008 ~ ffff 4 10000 ~ 1FFFFF
// 切割部位 
const rangeUTF8Map = {
  2: ['10', '110', ],
  3: ['10', '10', '1110'],
  4: ['10', '10', '10', '11110'],
}
function fillBinaryCode(binaryCode, count) {
  let fillStr = rangeUTF8Map[count]

  let utf8str = ''
  let i = binaryCode.length - 1;
  
  fillStr.forEach(item => {
    let end = i
    let tep = item
    for (;i >= 0 ;--i) {
      item = item + binaryCode[i]
      if(item.length === 8) {
        let binaryLiteral = +('0b' + tep + binaryCode.substring(i, end+1))
        i--
        utf8str = binaryLiteral.toString(16) + utf8str
        return
      }
    }
  })
  return '0x'+utf8str
}
function UTF8Encoding(str) {
  let UTF8binary = ''
  for(let item of str) {
    let binaryCode = item.codePointAt().toString(2)
    let hexCode = '0x' + item.codePointAt().toString(16)
    if(hexCode < 0x7f) {
      UTF8binary += hexCode
    } else if (0x80<=hexCode && 0x7ff>hexCode) {
      UTF8binary += fillBinaryCode(binaryCode, 2)
    } else if (0x800 <= hexCode && 0xffff > hexCode) {
      if (binaryCode.length < 16) {
        for (let i = 0; i < 16 - binaryCode.length;i++) {
          binaryCode = '0' + binaryCode
        }
      }
      UTF8binary += fillBinaryCode(binaryCode, 3)
    } else if (0x10000 <= hexCode && 0x1fffff > hexCode) {
      if (binaryCode.length < 32) {
        for (let i = 0; i < 32 - binaryCode.length; i++) {
          binaryCode = '0' + binaryCode
        }
      }
      UTF8binary += fillBinaryCode(binaryCode, 4)
    }
    UTF8binary = UTF8binary + ';'
  }
  return UTF8binary.replace(/0x/g, '&#x')
}
console.log(UTF8Encoding('edr4一黄𠮷'))