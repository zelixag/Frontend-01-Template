### 选择器语法

简单选择器

复合选择器

关系选择器（复杂选择器）

选择器列表

### 选择器优先级
优先级分四种  又四元组结构计算   N是一个较大数
[行内， id， class， 标签]
S = 0*N^3 + 2*N^2 + 1*N+ 1
N 取 1000000
S = 20000001000001

伪元素不参与优先级计算
复杂选择器不加优先级

### 伪类
- 链接/行为
  - :any-link // a标签不加href就不是超链接
  - link visited
  - :hover 只会被鼠标触发
  - active
  - focus
  - target a标签当锚点

- 树结构
  - empty
  - nth-child
  - nth-last-child
  - first-child last-child only-child

nth-last-child last-child  only-child 难以实现 需要回溯去计算出来 不推荐使用
- 逻辑性
  - not伪类
  - ：where ：has

### 伪元素
- :before
- :after
- :first-line 选中排版的第一行
- fist-letter