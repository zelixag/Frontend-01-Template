// 动画架构设计
// 业界都会有两个类

export class Timeline {
  constructor() {
    this.animations = [];
    this.requestId = null;
    this.state = "inited";
    this.tick = () => {
      let t = Date.now() - this.startTime;
      let animations = this.animations.filter(
        (animation) => !animation.finished
      );
      for (let animation of animations) {
        let {
          object,
          property,
          template,
          start,
          end,
          delay,
          duration,
          addTime,
          timingFunction,
        } = animation;

        // 入参 t-delay
        let progression = timingFunction((t - delay - addTime) / duration);
        if (t > duration + delay + addTime) {
          progression = 1;
          animation.finished = true;
        }
        let value = animation.valueFromProgression(progression);

        object[property] = template(value);
      }
      if (animations.length) {
        this.requestId = requestAnimationFrame(this.tick);
      }
    };
  }

  start() {
    if (this.state !== "inited") return;
    this.state = "playing";
    this.startTime = Date.now();
    this.tick();
  }
  pause() {
    if (this.state !== "playing") return;
    this.state = "paused";
    this.pauseTime = Date.now();
    if (this.requestId !== null) cancelAnimationFrame(this.requestId);
  }
  resume() {
    if (this.state !== "paused") return;
    this.state = "playing";
    this.startTime += Date.now() - this.pauseTime;
    this.tick();
  }
  add(animation, addTime) {
    this.animations.push(animation);
    animation.finished = false;
    if (this.state === "playing")
      animation.addTime =
        addTime !== void 0 ? addTime : Date.now() - this.startTime;
    else animation.addTime = addTime !== void 0 ? addTime : 0;
  }
  restart() {
    if (this.state === "playing") this.pause();
    this.animations = [];
    this.requestId = null;
    this.state = "playing";
    this.startTime = Date.now();
    this.pauseTime = null;
    this.tick();
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
    this.timingFunction = timingFunction;
    // ease liner
  }
  valueFromProgression(progression) {
    return this.start + progression * (this.end - this.start);
  }
}
export class ColorAnimation {
  constructor(
    object,
    property,
    start,
    end,
    duration,
    delay,
    timingFunction,
    template
  ) {
    this.object = object;
    this.property = property;
    this.template = template || ((v) => `rgba(${v.r},${v.g},${v.b},${v.a}`);
    this.start = start;
    this.end = end;
    this.duration = duration;
    this.delay = delay;
    this.timingFunction = timingFunction;
    // ease liner
  }
  valueFromProgression(progression) {
    return {
      r: this.start.r + progression * (this.end.r - this.start.r),
      g: this.start.g + progression * (this.end.g - this.start.g),
      b: this.start.b + progression * (this.end.b - this.start.b),
      a: this.start.a + progression * (this.end.a - this.start.a),
    };
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
