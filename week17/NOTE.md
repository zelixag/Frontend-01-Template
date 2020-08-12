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

如果Carousel写成和tabpanel结构的组件，怎么去设计？

做个什么的组件抽象才是好的，作为组件的用户最想什么效果

组件写完了也就写完了，最重要的是不断思考。
为什么通过配置去会比数据写入好

page其实是种枚举行为

组件和组件化不能够一句话概括。

组件到底是什么东西。通常回去描述UI的一个要素

Attribute 给组件带来了声明式编程的能力 
config带来了全局能力
state带来了组件的内部状态的变化能力
event让我们能够在组件结构信息
lifeCycle使我们定义组件的方式
children让我们可以按照一个树形的结构描述一个复杂的界面
组件比较对象带来了。提供了这些部分的抽象能力
组件化近现代处理UI最好的方式，组件化使用什么去承载都可以  用一个函数或者一个类

React attr 和 props一样 没有Config。
embo flutter react vue这些都实现了组件化能力

了解组件化了，就知道安卓的组件化 windows的组件化

react数据更新都会重新render

重新render的好处，不太需要处理patch逻辑，一致性特别好。childView做错位了不好还原


# TOOLS工具链

### 开发工具

### 开发 / 调试

### 发布、 