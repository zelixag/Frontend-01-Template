// 怎么去监听鼠标事件， 思路

function enableGesture(element) {
  let contexts = Object.create(null)

  let MOUSE_SYMBOL= Symbol("mouse")

  // 在mousedown里面监听mousemove和mouseup事
  if (document.ontouchstart !== null) {
    element.addEventListener("mousedown", (event) => {
      contexts[MOUSE_SYMBOL] = Object.create(null);
      // 老师没有做左右键的区分
      start(event, contexts[MOUSE_SYMBOL]);
      let mousemove = (event) => {
        move(event, contexts[MOUSE_SYMBOL]);
        console.log(event.clientX, event.clientY);
      };
      let mouseend = (event) => {
        end(event, contexts[MOUSE_SYMBOL]);
        document.removeEventListener("mousemove", mousemove);
        document.removeEventListener("mouseup", mouseend);
      };

      document.addEventListener("mousemove", mousemove);
      document.addEventListener("mouseup", mouseend);
    });
  }


  //  加要加在前面删要删在后面 context
  element.addEventListener("touchstart", event => {
    for(let touch of event.changedTouches) {
      contexts[touch.identifier] = Object.create(null)
      start(touch, contexts[touch.identifier]);
    }
  })
  element.addEventListener("touchmove", event => {
    for (let touch of event.changedTouches) {
      move(touch, contexts[touch.identifier]);
    }
  })
  element.addEventListener("touchend", event => {
    for (let touch of event.changedTouches) {
      end(touch, contexts[touch.identifier]);
      delete contexts[touch.identifier];
    }
  })
  // 屏幕弹个窗就出发touchcancel 触发都比较奇特
  element.addEventListener("touchcancel", event => {
    for (let touch of event.changedTouches) {
      cancel(touch, contexts[touch.identifier]);
      delete contexts[touch.identifier];
    }
  })

  let ele = document.querySelector(
      "#box"
    )

  // tap 
  // pan - panstart panend
  // flick
  // press - pressup pressdown
  let start= (point, context) => {
    element.dispatchEvent(new CustomEvent("start", {
      startX: point.clientX,
      startY: point.clientY,
      clientX: point.clientX,
      clientY: point.clientY
    }));
    context.clientX = point.clientX, context.clientY = point.clientX
    context.moves = []
    context.isTap = true;
    context.isPan = false;
    context.isPress = false;
    // 时间超过了就是 press手势
    context.timeoutHandler = setTimeout(() => {
      if(context.isPan)
        return
      context.isTap = false;
      context.isPan = false;
      context.isPress = true;
      console.log('pressStart');
    }, 500)
  }
  let move = (point, context) => {
    let dx = point.clientX - context.clientX, dy = point.clientY - context.clientY

    // 拖拽距离达到10px 且 手势还不是pan的时候定义为pan
    if(dx ** 2 + dy ** 2 > 100 && !context.isPan) {
      context.isTap = false;
      context.isPan = true;
      context.isPress = false;
      console.log('panstart');
    }
    if (context.isPan) {
      context.moves.push({
        dx,
        dy,
        t: Date.now(),
      });
      context.moves.filter((record) => Date.now() - record.t < 300);
      console.log('pan')
    };

    ele.innerHTML = `MOVE, X:${dx},  Y:${dy}`;
    ele.style = `color: #${point.clientX}${point.clientY}`;
  };
  let end = (point, context) => {
    if (context.isPan) {
      let dx = point.clientX - context.clientX,
        dy = point.clientY - context.clientY;
        // 取第一个值到最后一个点的距离
      let record = context.moves[0]

      let speed = Math.sqrt(((record.dx - dx) ** 2 + (record.dy - dy) ** 2) / (Date.now() - record.t));
      if(speed > 15) {
        console.log('flick')
        element.dispatchEvent(new CustomEvent("flick", {}));
      } else {
        element.dispatchEvent(new CustomEvent("panend", {}));
      }
    };
    if (context.isTap) {
      element.dispatchEvent(new CustomEvent("tap", {}));
      console.log("tap")
    };
    if (context.isPress) {
      element.dispatchEvent(new CustomEvent("pressend", {}));
    }

    clearTimeout(context.timeoutHandler)
  };
  let cancel = (point, context) => {
    clearTimeout(context.timeoutHandler);
    console.log("CANCEL");
  };
}