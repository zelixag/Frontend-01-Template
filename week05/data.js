let globalObjects = [
  "Array",
  "ArrayBuffer",
  "Atomics",
  "BigInt",
  "BigInt64Array",
  "BigUint64Array",
  "Boolean",
  "DataView",
  "Date",
  "Error",
  "EvalError",
  "Float32Array",
  "Float64Array",
  "Function",
  "Infinity",
  "Int16Array",
  "Int32Array",
  "Int8Array",
  "Intl",
  "JSON",
  "Map",
  "Math",
  "NaN",
  "Number",
  "Object",
  "Promise",
  "Proxy",
  "RangeError",
  "ReferenceError",
  "Reflect",
  "RegExp",
  "Set",
  "SharedArrayBuffer",
  "String",
  "Symbol",
  "SyntaxError",
  "TypeError",
  "URIError",
  "Uint16Array",
  "Uint32Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "WeakMap",
  "WeakSet",
  "WebAssembly",
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  "escape",
  "eval",
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
  "unescape",
];
let queue = [];
let data = { id: "globalObjects", children: [] };
for (let p of globalObjects) {
  queue.push({
    path: [p],
    parentId: p,
    object: window[p],
  });
  data.children.push({
    id: p,
  });
}
// Object.getOwnPropertyNames(current.object)   获取类有多少属性
// Object.getOwnPropertyDescriptor(current.object, p); 获取该对象下属性对象
// property.hasOwnProperty; 获取属性对象的值 value get
function getPropertys(queue) {
  let set = new Set();
  let arr = [];
  let a = [];
  while (queue.length) {
    let current = queue.shift();
    a.push(queue);
    if (set.has(current.object)) continue;
    set.add(current.object);
    arr.push(current);
    for (let p of Object.getOwnPropertyNames(current.object)) {
      let property = Object.getOwnPropertyDescriptor(current.object, p);
      let parentId = current.path.join(".");
      if (
        property.hasOwnProperty("value") &&
        property.value !== null &&
        ["function", "object"].includes(typeof property.value)
      ) {
        queue.push({
          path: current.path.concat([p]),
          parentId,
          object: property.value,
        });
      }

      if (
        property.hasOwnProperty("get") &&
        ["function"].includes(typeof property.get)
      ) {
        queue.push({
          path: current.path.concat([p]),
          parentId,
          object: property.get,
        });
      }

      if (
        property.hasOwnProperty("set") &&
        ["function"].includes(typeof property.set)
      ) {
        queue.push({
          path: current.path.concat([p]),
          parentId,
          object: property.set,
        });
      }
    }
  }
  console.log(arr);
  arr = arr.map((item) => {
    let id =
      item.path.length === 1
        ? item.path[item.path.length - 1]
        : item.parentId + "." + item.path[item.path.length - 1];
    return {
      id,
      ...item,
    };
  });
  //.filter((item) => item.id !== item.parentId);
  console.log(arr);
  return arr;
}
let tree = data.children;
function arrToTree(arr, tree) {
  if (!arr.length) return tree;
  tree.forEach((el) => {
    arr.forEach((item, index) => {
      el.children = el.children || [];
      if (item.parentId === el.id) {
        el.children.push(...arr.splice(index, 1));
        arrToTree(arr, el.children);
      }
    });
  });
}
arrToTree(getPropertys(queue), tree);
export default data;
