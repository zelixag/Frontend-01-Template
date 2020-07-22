var parser = require("./parser")
debugger
module.exports = function(source, map) {
  debugger
  console.log(source)
  debugger
  console.log(parser.parseHTML(source))
  console.log('my loader is running!!!!!\n', this.resourcePath)
  return ""
}