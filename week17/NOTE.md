### Panel组件
- 设计一个JSX组件的空壳
- 再在Panel render里面设计出panel的骨架 有title和content（children）
- 设计出panel思考怎么做出一个tabPanel，每个标题都对应一个content
- 将children map出来 centent都由一个div包起来

思考问题： 每个children都套一个容器， 数组里面每个child都需要有一个div？
比如想把panel做出一个tabpanel

在代码里面mapchildren的时候出现bug mountTo方法不存在，

```js
 render() {
   this.titleViews = this.children.map((child) => (
            <div>{child.getAttribute('title')}</div>
          ))
    return (
      <div class="tab-panel" style="border: 1px solid lightgreen;width:300px">
        <h1 style="background-color:lightgreen;width:300px;margin:0;">
          {this.titleViews}
        </h1>
        <div>
          {this.children.map((child) => <div style="width:300px;min-height:300px">{child}</div>)}
        </div>
      </div>
    );
  }
```

我们只想先展示一个content 而且思考怎么展示h1的title

老师刚开始认为使用一个内部 state

后来思考需要一个 
select(i) {}
这个是确定选择哪个content显示
把display置空就是采用display默认样式

# TOOLS工具链

### 开发工具

### 开发 / 调试

### 发布、 