// 动画架构设计
// 业界都会有两个类

export class Timeline {
  constructor() {
    this.animations = [];
  }
  tick() {
    let t = Date.now() - this.startTime;
    for (let animation of this.animations) {
      if (t > animation.duration + animation.delay) continue;
      let {
        object,
        property,
        template,
        start,
        end,
        delay,
        duration,
        timingFunction,
      } = animation;
      
      // 入参 t-delay
      let progression = timingFunction((t - delay) / duration)
      let value = start + progression* (end - start)

      object[property] = template(value);
    }

    requestAnimationFrame(() => this.tick());
  }

  start() {
    this.startTime = Date.now();
    this.tick();
  }
  add(animation) {
    this.animations.push(animation);
  }
}

export class Animation {
  constructor(
    object,
    property,
    template,
    start,
    end,
    duration,
    delay,
    timingFunction
  ) {
    this.object = object;
    this.property = property;
    this.template = template;
    this.start = start;
    this.end = end;
    this.duration = duration;
    this.delay = delay;
    this.timingFunction = timingFunction
    // ease liner
  }
}

/*
js 动画都是一些属性的变化 起点到终点
let animation = new Animation(object, property, start, end, duration, timingFunction, delay)
let animation2 = new Animation(object, property, start, end, duration, timingFunction, delay)
let timeline = new Timeline;

  timeLine.add(animation)
  timeLine.add(animation2)

timeLine.start()
timeLine.pause()
timeLine.resume()
timeLine.stop()

 // 实现动画不可避免
settimeout
setInterval
requestAnimationFrame

多次调用会产生多次函数调用，损耗性能

 如果会有两个动画实例怎么办。
 我们可能会将animation进行编排，单纯用一个animation是太好实现管理

时间线就是控制多个动画
  */
