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