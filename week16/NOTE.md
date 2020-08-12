### 组件实现的基石， 手势

### 存在问题

  1. 点击跳转问题 
     1. 轻触跳转，左移动右移动不会点击跳转，但是轻触的时候回发生跳转。但是如果没有轻触的优化，手会抖动导致左右滑动。
  2. 拖拽行为的研究
     1. 按着拖动过快也应该翻页， 这个功能不实现也会感到不适
  3. 触发纵向滚动，就让courosel左右滚动失效
  4. 移动端兼容问题 touchEvent

tap： 手往上一点
Pan： 手势慢慢拖拽
Flick（swiper）： 快速拖拽

press： 长时间按压在收起

同学疑问： 手势会被系统识别系统手势退出

多指操作： 

### mouse 事件
  怎么去监听鼠标事件， 思路

   在mouse down监听mouseover

  怎么讲touch和mouse事件抽象到一起去，应该将move和end行为进行抽象

  鼠标的时候区分左右键

### pointevent（微软主推），如果使用这个mouse和touch就可以不用了，但是point兼容性不够好

### 手势
  winter老师经验距离 10px 经验时间 0.5s

start 开始接触屏幕 end 离开屏幕的节点
// tap
  - start和end时间间隔很短为tap
// pan - panstart panend
  - 如果start和end时间间隔很久，且还有拖拽移动距离，为pan
// flick
  - start和end时间间隔很短，但是有拖拽的距离，flick
// press - pressup pressdown
 start 和 end时间较长 则为press

这个contexts还是比较难，要确定一个过程相隔时间和距离需要这个全局整理
触摸板不确定

### 最后一部分 派发
粉发出去给别人用，模仿一个dom事件给分发出去

### MDN 最新 event

一小时43分有很多优化
