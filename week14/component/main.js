// 框架代码 -------start-----
import { createElement, Text, Wrapper } from "./createElement";
// import { CarouselSFC } from "./carouselSFC.vue";
import { Carousel } from "./Carousel";
import {Panel} from "./Panel"
import {TabPanel} from "./TabPanel"
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


// 将这个进行改造
// class MyComponent {
//   constructor(config) {
//     this.children = [];
//   }
//   set class(v) {
//     // property
//     console.log("Parent::class", v);
//   }
//   setAttribute(name, value) {
//     // Attribute
//     this.root.setAttribute(name, value);
//   }
//   appendChild(child) {
//     // this.children.push(child)
//     this.children.push(child);
//     // this.slot.appendChild(child)
//   }
//   render() {
//     return (
//       <article>
//         <header>I'm a header</header>
//         {this.slot}
//         <footer>I'm a header</footer>
//       </article>
//     );
//   }
//   mountTo(parent) {
//     this.slot = <div></div>;
//     for (const child of this.children) {
//       this.slot.appendChild(child)
//     }
//     // parent.appendChild(this.root);
//     this.render().mountTo(parent);
//   }
// };


// 小写认为是字符串，大写是类
// let component = <Div id="cls" class="b" style="width: 100px;height:100px;background: #e2f">
//   <div></div>
//   <Div></Div>
//   <p></p>
//   <Div></Div>
// </Div>
// let component = <div>dsajkdask</div>*/
// let component =  <MyComponent>
//   <div>text text text</div>
// </MyComponent>
// component.mountTo(document.body);
console.log(createElement);
window.createElement = createElement;
let panel = (
  <TabPanel>
    <span title="title1">This is content1</span>
    <span title="title2">This is content2</span>
    <span title="title3">This is content3</span>
    <span title="title4">This is content4</span>
    <span title="title5">This is content5</span>
  </TabPanel>
);
let data = [
  {
    title: "蓝猫",
    url:
      "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
  },
  {
    title: "橘猫加白",
    url:
      "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jp",
  },
  {
    title: "梨花加白",
    url:
      "https:/https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jp",
  },
  {
    title: "橘猫",
    url:
      "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
  },
];
let list = <ListView data={data}>
  <figure>
    <img src="" alt=""/>
    <figcaption></figcaption>
  </figure>
</ListView>
list.mountTo(document.body);
panel.mountTo(document.body);
// let carousel = (
//   <Carousel
//     data={[
//       "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
//       "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
//       "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
//       "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
//     ]}
//   />
// );

// carousel.mountTo(document.body);
