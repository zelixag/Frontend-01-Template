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
    this[name]=value;
  }
  appendChild(child) {
    // this.children.push(child)
    this.children.push(child);
    // this.slot.appendChild(child)
  }
  render() {
    return (
      <div class="panel" style="border: 1px solid lightgreen;width:300px">
        <h1 style="background-color:lightgreen;width:300px;margin:0;">
          {this.title}
        </h1>
        <div style="width:300px;min-height:300px">{this.children}</div>
      </div>
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
}
