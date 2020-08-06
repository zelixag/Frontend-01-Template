var parser = require("./parser")
module.exports = function(source, map) {
  let tree = parser.parseHTML(source);
  console.log(
    "tree.children[1].children[0].content",
    tree.children[1].children[0].content
  );
  console.log('my loader is running!!!!!\n', this.resourcePath)
  return ""
}