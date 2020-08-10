### 组件化 | One more thing Vue 风格的 SFC

组件化，在计算机工程领域发展很多年思想，在任何一个组件化系统下面都有组件化的问题，都有各种各样的组件化方案。有的采用字符串生成方案，有的是命令式代码，有的是声明式代码，有的像React一样加入了XML扩展（JSX）一个格式的代码。

### 学习Vue设计一个 SFC
1. 正常写一个vue组件， 应该是new Vue(OPTIONS)写一个组件，但是这样很不符合前端工程师的开发习惯。所以vue就出了一种编译模式.Vue后缀的模式的模板编写组件，template写模板。script编写组件options style写组件样式这样规定的vue文件的语法。

- template可以存放html标签
- script存放js代码
- style 存放css

### 自己写一个webpack loader

1. loader输入一个source输出是一个字符串，怎么去parse一个模板

大家loader思路： 使用状态机，使用AST

### whatWg tokenization
[tokenization](https://html.spec.whatwg.org/multipage/parsing.html#tokenization)

循环里面的小于号咋处理,

首先要处理script标签，处理完标签，在查找script里的代码 找到小于号 找到代码里所有的小于号，知道标签结束

vue的SFC也是使用状态机解决的

状态机可以再了解一下，科学使用 灵活使用

### 组件化|动画
怎么用css让动画停下

如果在css变化的时候，冲突变化我想终止怎么解决
同学方法： 找到当前位置， 同时设置 getComputedStyle(el).transform
css解决存在太多不可确定性
### 动画要求
1. 可以分段去操作，让动画有不同操作
2. 可以动画暂停
3. 可以继续回复动画
4. 、

动画对于组件是很重要的一点，会增加很多用户趣味性


为什么一个动画库会有Timeline。值得思考

timeLine： 
做游戏的时候控制多个时间线，刷兵的时间线不同，有的游戏都暂停了动画还在动就是有多个时间线
// 有时候故意为了触发GPU会使用translate3D， transform不会触发重排 如果做动画每一帧触发一次重排浏览器肯定会卡

一个好的timiingFunction是time入 program出

### timeline 处理

### 结束的animation做一个管理

想什么时候停就什么时候停 css几乎做不到
