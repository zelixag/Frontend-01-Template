
// import Carousel from './carousel.vue'
export function createElement(Cls, attribute, ...children) {
  let o = typeof Cls === "string" ? new Wrapper(Cls) : new Cls({ timer: 90 });

  for (let name in attribute) {
    o.setAttribute(name, attribute[name]);
  }
  let visit = (children) => {
    for (const child of children) {
      if (typeof child === "object" && child instanceof Array) {
        visit(child);
        continue;
      }
      if (typeof child === "string") 
        child = new Text(child);

      o.appendChild(child);
    }
  };
  visit(children);
  return o;
};


export class Text {
  constructor(text) {
    this.children = [];
    this.root = document.createTextNode(text);
  }
  mountTo(parent) {
    parent.appendChild(this.root);
  }
}
export class Wrapper {
  constructor(type) {
    this.children = [];
    this.root = document.createElement(type);
  }
  set class(v) {
    // property
    console.log("Parent::class", v);
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }
  appendChild(child) {
    this.children.push(child);
  }
  get style() {
    return this.root.style;
  }
  addEventListener() {
    this.root.addEventListener(...arguments);
  }
  mountTo(parent) {
    parent.appendChild(this.root);

    for (const child of this.children) {
      child.mountTo(this.root);
    }
  }
}