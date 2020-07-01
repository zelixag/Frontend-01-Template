## 编程训练
### 使用LL算法构建AST
状态机和正则表达式只能做词法分析
但是语法分析需要使用LL算法去构建语法树

编写带括号的四则运算语法树

### 四则运算
包含元素
  - TokenNumber
    数字 1，2，3，4，5，6，7，8，9，0的组合 正则 [0-9\.]
  - Operator: + - * / 之一 
  - whitespace <SP> [ ]
  - LineTerminator: <LF> <CR> [\r\n]

匹配number的正则

正则小括号相当于一个子表达式 

> console.log(re.exec("hi"));
> console.log(re.lastIndex);
> 返回 ["hi", "hi"] ，lastIndex 等于 2。

只有正则表达式使用了表示全局检索的 "g" 标志时，该属性才会起作用。此时应用下面的规则：

- 如果 lastIndex 大于字符串的长度，则 regexp.test 和 regexp.exec 将会匹配失败，然后 lastIndex 被设置为 0。
- 如果 lastIndex 等于字符串的长度，且该正则表达式匹配空字符串，则该正则表达式匹配从 lastIndex 开始的字符串。（then the regular expression matches input starting at lastIndex.）
- 如果 lastIndex 等于字符串的长度，且该正则表达式不匹配空字符串 ，则该正则表达式不匹配字符串，lastIndex 被设置为 0.。
- 否则，lastIndex 被设置为紧随最近一次成功匹配的下一个位置。

lastIndex 是正则表达式的一个可读可写的整型属性，用来指定下一次匹配的起始索引

1. 学习知识老师会帮助我们该知识完备的就注重完备性，不追求完备性的知识，老师会将该知识重点突出。
   掌握方括号圆括号 竖线差不多了，其他的都是便利性语法