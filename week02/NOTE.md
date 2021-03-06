### 前戏

与重学前端有重合，老师这段时间还是有个辩证的思考， 希望把一些追寻知识的过程在课堂里体现出来，这样才会更好的巩固大家知识不容易忘记

重学前端，是知识的总结的成品

### 编程语言的通识

都是老师零零碎碎的积攒

语言按照语法分类
- 非形式语言 （这种语言的解析需要很长的路要走）
  - 中文，英文（不是很严谨，自然产生）
- 形式语言（乔姆斯基谱系）二几年出生的人，人还健在，最活跃的时候在五十年代。奠定了很多语言的基础，但是和计算机没有多大关系， 客观： 语言特别透彻
  - 0型 无限制文法
    - 有定义的文法，无限制相对与其他语言
  - 1型 上下文相关文法
    - 放到不同语境有不同意思
  - 2型 上下文无关文法
    - 放到哪里都是一个意思。我们学的语言主体上都是上下文无关，js就不是上下无关文法，百分之99是上下文无关 ，this 语义多变 语法同一个东西 a.this 和 this.a这就是上下文相关
  - 3型 正则文法
    - 能用正则表达式解析的语法 会限制我们的表达能力 3型基本不考虑 采取折衷

现代语言会将文法： 拆成词法和语法 单个词结合做语法分析 

Lisp 一遍出
BrainFuck一遍出 



50年代，很多计算机语言在学术上的研究

### （BNF）产生式

有一种语法结构都用尖括号扩起来
- 用尖括号括起来的名称来表示 **语法结构**名
- 语法结构分成**基础结构**和需要用其他语法结构定义的 **复合结构**
  - 基础结构 --> **终结符** * 不是由其他语法构成
    - 引号和中间的字符表示终结符
  - 复合结构(需要定义的)  --> **非终结符** a * b 有语法结构的就是非终结符
    - 可以有括号
    - *表示重复多次
    - | 表示或
    - + 表示至少一次

小练习：
做一门语言： 
只有 “a” 和 “b” 组成终结符 a b 

Program 我们程序最高的结构

```BNF
<Program>:= "a"
// 可以等于若干个a
<Program>:= "b"
// 也可以等于 b
<Program>:= "b" + | "a"+
// aaaaa... 或者 bbbbb...
// 也可以等于a 或者 等于 b ，这样就是可以有若干个a或者b，但是弄不出来 ababababab...

// 但是BNF有个特点，就是可以递归的
<Program>:= <Program> "b"+ | <Program> "a"+

// 上面就是program语法可以递归 <Program> "b"这个就是若干个b加上program 或者 <Program> "b"program加上若干个a

// 由于program是 a | b所以我们这个语言可以弄出 abababab | aaabbb | bbbbaaa等等组合
```
整数加法
定义一个整数 
```BNF
  <Number> = "0" | "1"|"2" ...| "9"
  <DecimalNumber> = "0" | (("1"|"2"| .... | "9") <Number>*)
  // 定义一个整数相加的加法，   
  <Expression> = <DecimalNumber> "+" <DecimalNumber>
  // 利用可递归特性 作出整数可以连续相加的语法
  <Expression> = <Expression> "+" <DecimalNumber>
  // 当加法可以直接表达一个 1 
  <Expression> = <DecimalNumber>
  // 简化语法定义表达式
  <Expression> = <DecimalNumber> | <Expression> "+" <DecimalNumber>
```
产生式大同小异

四则运算：
- 1 + 2 *3
- 终结符：
  - Number
  - + - * /
- 非终结符
  - MultiplicativeExpression
  - AddtiveExpress

带引号的就是终结符号
思考： 1 + 2*3  1为左项 2 * 3是右项 
这是后就先将右边先语法表达出来
<MultiplicativeExpression> = 
    <DecimalNumber> | <MultiplicativeExpression> "*" <DecimalNumber> |
    <MultiplicativeExpression> "/" <DecimalNumber> 
同理: 除法

这是乘法  这个属于加法的右边项所以, 加法是由两个乘法表示出来的 而且乘法 1 也为乘法 所以

<AddExpression> = 
    <MultiplicativeExpression> | <AddExpression> "+" <MultiplicativeExpression> | 
    <AddExpression> "-" <MultiplicativeExpression>

同理： 减法

这里面思考注意点 1也是一个乘法表达式

同理 加法语法也可以不带家好 我们怎么作出逻辑或 或者 逻辑与 参照乘法

<LogicaExpression> = 
    <AddExpression> | <LogicaExpression> "||" <AddExpression> |
    <LogicaExpression> "&&" <AddExpression> 

思考一下括号运算怎么搞，括号应该是优先级高于乘除法 使加减法优先执行

<PrimaryExpression> = <DecimalNumber> | "(" <LogicaExpression> ")"
这个就是括号运算符，里买呢放这个逻辑语句 这里面可以又逻辑语句 也可以有加减运算

计算机看到这个怎么解析，这是一个非常复杂的过程 语法解析过程 lL 和 LR 

这个语言解析是 乔姆斯基的工作 但是他不会编程

后来有编译原理将语言解析实现


总结  有双引号表示的是终结符 用尖括号的是非终结符 都是自己定义的东西

// TODO: 好问题 
怎么验证自己对不对有点麻烦老师没讲，科学及研究语言的一个点，很难知道自己有没有搞对


### 通过产生式理解乔姆斯基谱系

无限制语法 等号左边等号右边可以有多个非终结符 可以写出一些黑科技的东西

上下文相关文法

  等号左边虽然有多个，但是只能变中间那个

  "a" <b> "c" ::= "a" "x" "c"

x以a和c为上下文可以产生b

上下文无关文法： 
  - 等号左边只能有一个非终结符

正则文法： 
    - 只允许左递归，自生出现在左边

** 出来之前都是左结合的
<A> ::= <A>?

十进制整数表达式 /0|[1-9][0-9]*/ 

{
  get a {return 1},
  get: 1 属于1型
}
js除了** 其他表达式都是可以使用正则解析的

js正则不是线型复杂度 最好不要让你产生回溯（写出来很难）

科学家抽象水平高，理解有门槛，但是课程内容不是很高，到一定级别就会有简单处理困难处理 

现在js 绝大多数语言 都属于2-型语言  会有小惊喜  .class 通信 上下文相关文法 让语法分析器回传给词法编辑器
工程上面会遇到这些关系


怎么去理解这个BNF不是很难，学习编译原理难度很高。学起来难，应该有认知上的缺失。

- 更本质的去理解js语言，不能感性
- 能让大家有读标准的能力，如果不能读标准，读懂语法定义。没有办法精确的理解语法。缺少工具或者语言去描述js这个东西
- 怎么定义语言，怎么理解语言，这样就与语言作者有共同语言
- 提供一个理论 产生式和正则文法一种表示

js的终结符都是加粗 
js使用的是自创产生式 和 BNF原理一样

### 现代语言特例
- c++中 *可能表示乘号或者指针，具体是哪个，取决于星号前面的标识符是否被声明为类型 是非型语言
- vb中， < 可能是小于号， 也可能是xml直接量的开始，取决于当前位置是否可以结束xml直接量
- python 行首的tab符合空格会插上一行的行首空白以一定规则被处理成虚拟终结符indent或者dedent
- javaScript / 可能是除号可能是正则表达式开头，方式类似vb 字符串模板也需要特殊处理 」 还有自动插入分号规则

### 图灵完备性

凡是可计算的东西都能计算出来

那么世界上是否都是可以计算的呢？不是，图灵停机问题，图灵机无法计算另一台图灵机停机。

图灵从数学上证明： 可计算的边界（这是一门大学理论课）世界上的一切不都是能够被计算机解决的

图灵完全性通常指“具有无限存储能力的通用物理机器或编程语言”。

在可计算的范围内，就发展出了计算机学科和计算机学科相关的数学

- 命令式 --- 图灵机
  - goto（去任意一个地方）
  - if和while （现代语言都不允许使用goto） 有分支和循环就是具有图灵完备性

声明式 ---- lambda（比图灵更早）
  - 递归（发现另一种分支 --> 递归）
  
  可以递归就可能具备图灵完备性

  模板机制可以生成c++
  c++模板元编程（最好理解为自相关编程）

  编个程序替你写代码，子

C语言使用goto和if if是必备


### 动态 与 静态
- 动态：
  - 在用户的设备/在线服务器上
  - 产品实际运行时
  - Runtime （产品实际运行里面的设施）
- 静态：
  - 在程序员的设备上
  - 产品开发时
  - Compiletime 编译时

静态特性越多，更适合大型开发

### 类型系统

- 动态类型系统 与 静态类型系统
- 强类型与弱类型
  - String + Number （强转 Num会转化字符串）
  - String == Boolean （先把Boolean转化为Number， 在和string比） C++是弱类型 有隐式转换就是弱类型 反之强类型
- 复合类型（静态类型特有） 有结构体（对象， 名字和类型） 函数签名很复杂的复合结构
- 子类型
  - 逆变/协变（类型系统有了继承就复杂了）同向为协变 类型复合和类型继承之间产生的协同关系

c++

### 一般命令式编程语言

五个部分
- Atom （最小单位 变量名 直接量）
  - Identifiler 变量名
  - Literal 直接量
- Expression （表达式）
  - Atom
  - Operator 操作符
  - Punctuator 符号
- Statement（语句 一般是递归）
  - Expression
  - Keyword 关键字
  - Punctuator
- Structure（结构体）
  - Function 
  - class （这些形成作用域的概念 函数作用域 class作用域）
  - Process
  - Namespace（命名空间）
  - ....
- Program（程序集 module）
  - Program
  - Module
  - Package
  - Library
