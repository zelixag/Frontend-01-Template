export class Carousel {
  constructor(config) {
    this.children = [];
    this.attributes = new Map();
    this.properties = new Map();
  }
  setAttribute(name, value) {
    this.attributes.set(name, value);
  }
  appendChild(child) {
    this.children.push(child);
  }
  autoPlay(children) {
    // 需要一个定位坐标
    let position = 0;

    // 写循环轮播也需要settimeout递归
    let nextPic = () => {
      const length = this.attributes.get("data").length;

      const nextPosition = (position + 1) % length;
      const current = children[position];
      const next = children[nextPosition];
      // 只能改变视觉，不能改变DOM结构，所以最好不要有dom操作。改变dom语义就发生变化，这不是我们可以预期的地方.
      // 只能改变他的css
      current.style.transition = "ease 0s";
      next.style.transition = "ease 0s";

      current.style.transform = `translateX(${-100 * position}%)`;
      next.style.transform = `translateX(${100 - 100 * nextPosition}%)`;
      // 为什么是16毫秒 因为16毫秒就是一帧 。动画时间大于轮播时间会出错。transtion渲染是有间隔的 transtion 16毫秒最好 两段动画需要16毫秒隔间开
      setTimeout(function () {
        // means use css rule 使用css的功能
        current.style.transition = "";
        next.style.transition = "";
        current.style.transform = `translateX(${-100 - 100 * position}%)`;
        next.style.transform = `translateX(${-100 * nextPosition}%)`;

        // 这样position不会超过length 取余运算
        position = nextPosition;
      }, 16);

      setTimeout(nextPic, 3000);
    };
    setTimeout(nextPic, 3000);
  }
  drag(root, children) {
    let position = 0;
    root.addEventListener("mousedown", (event) => {
      let startX = event.clientX;
      const length = this.attributes.get("data").length;
      const nextPosition = (position + 1) % length;
      const lastPosition = (position - 1 + length) % length;

      const current = children[position];
      const last = children[lastPosition];
      const next = children[nextPosition];

      current.style.transition = "ease 0s";
      last.style.transition = "ease 0s";
      next.style.transition = "ease 0s";

      current.style.transform = `translateX(${500 - 500 * position}px)`;
      last.style.transform = `translateX(${-500 - 500 * lastPosition}px)`;
      next.style.transform = `translateX(${500 - 500 * nextPosition}px)`;

      let move = (event) => {
        let current = children[position];

        current.style.transform = `translateX(${
          event.clientX - startX - 500 * position
        }px)`;
        last.style.transform = `translateX(${
          event.clientX - startX - 500 - 500 * lastPosition
        }px)`;
        next.style.transform = `translateX(${
          event.clientX - startX + 500 - 500 * nextPosition
        }px)`;
      };
      let up = (event) => {
        let offset = 0;
        // 拖过一半就应该换下一张图
        if (event.clientX - startX > 250) {
          offset = 1;
        } else if (event.clientX - startX < -250) {
          offset = -1;
        }

        // open use css rule
        current.style.transition = "";
        last.style.transition = "";
        next.style.transition = "";

        current.style.transform = `translateX(${
          offset * 500 - 500 * position
        }px)`;
        last.style.transform = `translateX(${
          offset * 500 - 500 - 500 * lastPosition
        }px)`;
        next.style.transform = `translateX(${
          offset * 500 + 500 - 500 * nextPosition
        }px)`;

        position += (position - offset + length) % length;

        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    });
  }
  render() {
    let children = this.attributes.get("data").map((url) => {
      let element = <img src={url} />;
      element.addEventListener("dragstart", (event) => event.preventDefault());
      return element;
    });
    let root = <div class="carousel">{children}</div>;

    this.autoPlay(children);
    this.drag(root, children);

    return root;
  }
  mountTo(parent) {
    this.render().mountTo(parent);
  }
}
