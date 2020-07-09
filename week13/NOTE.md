### Proxy
- 这个api不太用来写业务，一般都用于框架的开发和库的开发
- 严禁开发业务是使用，如果使用不好，会让整个代码变成完全不可控。设置属性不是设置属性，获取原型不是获取原型
- 设置一个属性和取出来的不是一个东西

### 基本使用
  允许两个参数第一个是source源数据，第二个是可以配置config的 参数
  ```js
  // 1.html
  let object = {
    a: 1,
    b: 2
  }

  let proxy = new Proxy(object, {
    get(obj, prop) {
      console.log(obj, prop)
    },
    getPrototypeOf() {
      console.log(arguments)
      return {}
    },
    defineProperty() {
      console.log(arguments)
      return {}
    }

  })
  Object.defineProperty(proxy, "a", {value: 10})
  ```
  在第二个参数里面有很多可以监听的事件 上面的方法可以先监听获取事件举例子

  get可以实现类似java的AOP， Proxy的想象的空间特别大。在get里面就可以代理做任何事。
  相对于object而言，添加了很多钩子属性


### vue 3.0 Reactivity

神奇点: 
```js
let dummy
const counter = reactive({num: 0})
effect(() => dummy = counter.num))

counter.num = 7
```

使用effect之后只要counter值发生变化，reactive都会知道是counter这个对象发生了变化
这个就实现了vue的双向绑定的基础

小右做了很多思考，才定了这个API，按到了一个对象做代理，应该要做的很多事件钩子。

有可能不是一层对象，嵌套基层

### 实现简单的Reactivity

实现了一个观察者模式，比观察者模式更先进
观察者模式只是在类里面的面向对象的基础设施

怎么可以利用Proxy做到某个对象变化的时候，执行指定的effect

vue3.0 将很多vue里面的能力抽成可以直接使用的编程切面

怎么能监听到对象的变化 使用handler执行 抓到属性和对象，在get里面收集起来，收集之后在按照指定的key value存起来，每次set的时候就会找到指定的handler变化