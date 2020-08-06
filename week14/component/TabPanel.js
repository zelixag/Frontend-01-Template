export class TabPanel {
  constructor(config) {
    this.children = [];
    this.state = Object.create(null)
    this.childViews = []
    this.titleViews = []
  }
  set class(v) {
    // property
    console.log("Parent::class", v);
  }
  setAttribute(name, value) {
    // Attribute
    this[name] = value;
  }
  appendChild(child) {
    // this.children.push(child)
    this.children.push(child);
    // this.slot.appendChild(child)
  }
  select(i) {
    for (const child of this.childViews) {
      child.style.display = "none";
    }
    this.childViews[i].style.display = "";

    for (const child of this.titleViews) {
      child.classList.remove('selected');
    }
    this.titleViews[i].classList.add("selected");
    // this.titleViews.innerText = this.children[i].title;
  }
  render() {
    this.childViews = this.children.map(child => <div style="width: 300px;min-height:300px">{child}</div>)
    this.titleViews = this.children.map((child, i) => (
      <span onClick={() => this.select(i)} style="width: 300px;">{child.getAttribute('title')}</span>
    ));
    setTimeout(() => {
      this.select(0)
    }, 16);
    return (
      <div class="tab-panel" style="border: 1px solid lightgreen;width:300px">
        <h1 style="background-color:lightgreen;width:300px;margin:0;">
          {this.titleViews}
        </h1>

        <div>{this.childViews}</div>
      </div>
    );
  }
  mountTo(parent) {
    // this.slot = <div></div>;
    // for (const child of this.children) {
    //   this.slot.appendChild(child);
    // }
    // parent.appendChild(this.root);
    this.render().mountTo(parent);
  }
}
