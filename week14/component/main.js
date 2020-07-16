

// 框架代码 -------start-----
let Vue = {}
Vue.createElement = function createElement(Cls, attribute, ...children) {
    let o = typeof Cls === 'string' ? new Wrapper(Cls) : new Cls({ timer: 90 });
    
    for (let name in attribute) {
      o.setAttribute(name, attribute[name])
    }

    for (const child of children) {
      if(typeof child === 'string')
        child = new Text(child); 
      o.appendChild(child);
    }
    return o
  }
// 框架代码 -------end----- 


//  没有属性的时候传的不是一个{} 而是 null
// class Child {
//   constructor(config) {
//     this.children = [];
//     this.root = document.createElement("div");
//   }
//   setAttribute(name, value) {
//     // Attribute
//     this.root.setAttribute(name, value);
//   }

//   appendChild(child) {
//     child.mountTo(this.root);
//   }
//   mountTo(parent) {
//     parent.appendChild(this.root);
//   }
// }
class Text {
  constructor(text) {
    this.children = [];
    this.root = document.createTextNode(text);
  }
  mountTo(parent) {
    parent.appendChild(this.root);
  }
}
class Wrapper {
  constructor(type) {
    this.children = [];
    this.root = document.createElement(type);
  }
  set class(v) {
    // property
    console.log("Parent::class", v);
  }
  setAttribute(name, value) {
    // Attribute
    this.root.setAttribute(name, value);
  }
  appendChild(child) {
    this.children.push(child);
  }
  mountTo(parent) {
    parent.appendChild(this.root);

    for (const child of this.children) {
      child.mountTo(this.root);
    }
  }
}
class MyComponent {
  constructor(config) {
    this.children = [];
  }
  set class(v) {
    // property
    console.log("Parent::class", v);
  }
  setAttribute(name, value) {
    // Attribute
    this.root.setAttribute(name, value);
  }
  appendChild(child) {
    // this.children.push(child)
    this.children.push(child);
    // this.slot.appendChild(child)
  }
  render() {
    return (
      <article>
        <header>I'm a header</header>
        {this.slot}
        <footer>I'm a header</footer>
      </article>
    );
  }
  mountTo(parent) {
    this.slot = <div></div>;
    for (const child of this.children) {
      this.slot.appendChild(child)
    }
    // parent.appendChild(this.root);
    this.render().mountTo(parent);
  }
};
// 小写认为是字符串，大写是类
// let component = <Div id="cls" class="b" style="width: 100px;height:100px;background: #e2f">
//   <div></div>
//   <Div></Div>
//   <p></p>
//   <Div></Div>
// </Div>
// let component = <div>dsajkdask</div>
let component =  <MyComponent>
  <div>text text text</div>
</MyComponent>
component.mountTo(document.body);