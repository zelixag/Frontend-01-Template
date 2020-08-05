export class Panel {
  constructor(config) {
    this.children = [];
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
  render() {
    this.childViews = this.children.map(child => <div style="width: 300px;min-height:300px">{child}</div>)
    this.titleViews = this.children.map((child,i) => <span onClick={() => this.select(i)} 
    style="background-color: lightgreen;margin:5px 5px 0px 5px;font-size:24px;width:300px;min-height: 300px;">)

    setTimeout(() => {
      this.select(0)
    }, 16);
    return (
      <div class="panel" style="border: 1px solid lightgreen;width:300px">
        <h1 style="background-color:lightgreen;width:300px;margin:0;">
          {this.titleViews}
        </h1>
        <div style="width:300px;min-height:300px">{this.childViews}</div>
      </div>
    );
  }
  mountTo(parent) {
    this.slot = <div></div>;
    for (const child of this.children) {
      this.slot.appendChild(child);
    }
    // parent.appendChild(this.root);
    this.render().mountTo(parent);
  }
}
