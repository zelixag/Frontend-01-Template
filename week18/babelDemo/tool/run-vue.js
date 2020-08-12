const compiler = require("@vue/compiler-sfc");

let output = compiler.compileTemplate({filename: 'example.vue', source: "<div> HelloWorld</div>"})

console.log(output)