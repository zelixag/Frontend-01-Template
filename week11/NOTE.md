### 异步编程，红绿灯问题

### 寻路问题

不断的从上下左右的问题，不断的搜索，碰到墙壁退回

1. 做编辑器
2. 可以用鼠标画
3. 画的可以保留下来

问题：用什么样的数据结构保存地图
一维数组

怎么给数组10000的都填上0
// 上古时代
var map = new Array(10000).join(0).split('').map(s => Number(s));
// 现代
var map = new Array(10000).fill(0)

解决一个问题 大部分都不是使用一个 单个的技术方案 应该是几个相结合解决