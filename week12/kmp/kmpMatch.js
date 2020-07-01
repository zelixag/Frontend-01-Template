function next(pattern) {
  let nxt = [0];
  let j = 0;
  let i = 1;
  while (i < pattern.length) {
    if (pattern[j] === pattern[i]) {
      j++;
      nxt.push(j);
      i++;
    } else if (j) {
      j = nxt[j - 1];
    } else {
      nxt.push(0);
      i++;
    }
  }
  return nxt;
}
function createStateMachine(pattern) {
  let foundMap = {};
  let nxt = next(pattern);
  console.log("next(pattern);", next(pattern));
  for (let i = 0; i < pattern.length; i++) {
    foundMap[`found_${pattern[i]}${i}`] = function (c, index) {
      if (pattern[i] === c) {
        document.querySelector(`.string-${c}-${index}`) &&
          document
            .querySelector(`.string-${c}-${index}`)
            .classList.add("active");
        document.querySelector(`.pattern-${c}-${i}`) &&
          document.querySelector(`.pattern-${c}-${i}`).classList.add("active");
        if (i === pattern.length - 1) {
          return foundMap["end"];
        } else {
          return foundMap[`found_${pattern[i + 1]}${i + 1}`];
        }
        
      } else if (i !== 0) {
        // for (let key = pattern.length; key > nxt[i - 1]; key--) {
        //   if (document.querySelector(`.pattern-item-${key}`)) {
        //     setTimeout(() => {
        //       document
        //         .querySelector(`.pattern-item-${key}`)
        //         .classList.remove("active");
        //     }, 3000);
        //   }
        // }
        // for (let key = index; key > 0; key--) {
        //   if (document.querySelector(`.string-item-${key}`)) {
        //     setTimeout(() => {
        //       document
        //         .querySelector(`.string-item-${key}`)
        //         .classList.remove("active");
        //     }, 3000*key);
        //   }
        // }
        // 这里必须要拿到当前字符来计算
        return foundMap[`found_${pattern[nxt[i - 1]]}${nxt[i - 1]}`](c, index)
      } else {
        for (let key = index; key > 0; key--) {
          if (document.querySelector(`.string-item-${key}`)) {
            setTimeout(() => {
              document
                .querySelector(`.string-item-${key}`)
                .classList.remove("active");
            }, 3000*key);
          }
        }
        return foundMap[`found_${pattern[0]}0`];
      }
    };
  }
  foundMap.end = function () {
    return foundMap["end"];
  };
  return foundMap;
}
function search(p, s) {
  let nxt = next(p);
  let tar = 0; // 主串
  let pos = 0; // 匹配串
  while (tar < s.length) {
    if (s[tar] === p[pos]) {
      tar++;
      pos++;
    } else if (pos != 0) {
      pos = nxt[pos - 1];
    } else {
      tar++;
    }
    if (pos === p.length) return true;
  }
  return false;
}
function match(pattern, string) {
  // 字符串进入第一个状态机
  let foundMap = createStateMachine(pattern);
  console.log(foundMap)
  let currentStatus = foundMap[`found_${pattern[0]}0`];
  let strArr = string.split('')
  strArr.forEach((item, index) => {
    // 通过循环进入一个个状态机，通过后会但会下一个状态机
    setTimeout(() => {
      document.querySelector(`.string-${item}-${index}`) && document.querySelector(`.string-${item}-${index}`).classList.add("active-string");
    }, 300 * index);
    currentStatus = currentStatus(item, index);
  })
  console.log(currentStatus)

  return currentStatus === foundMap.end;
}
function view(string, parent) {
  let strArr = string.split('')
  strArr.forEach((item, index) => {
    let ele = document.createElement('div');
    ele.classList.add('item')
    ele.classList.add(`${parent}-item-${index}`);
    ele.classList.add(`${parent}-${item}-${index}`);
    ele.innerText = `${item}-${index}`;
    document.body.querySelector(`#KMP .${parent}`).appendChild(ele)
  })
  return string;
}
