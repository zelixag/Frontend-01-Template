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
console.log(next("abcabdddabcabc"));
function createStateMachine(pattern) {
  let foundMap = {};
  let nxt = next(pattern);
  for (let i = 0; i < pattern.length; i++) {
    foundMap[`found_${pattern[i]}${i}`] = function (c) {
      if (pattern[i] === c) {
        if (i === pattern.length - 1) {
          return foundMap["end"];
        } else {
          return foundMap[`found_${pattern[i + 1]}${i + 1}`];
        }
      } else if (i !== 0) {
        return foundMap[`found_${pattern[nxt[i - 1]]}${nxt[i - 1]}`];
      } else {
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
  let currentStatus = foundMap[`found_${pattern[0]}0`];
  for (let c of string) {
    // 通过循环进入一个个状态机，通过后会但会下一个状态机
    currentStatus = currentStatus(c);
  }
  return currentStatus === foundMap.end;
}
let a = match("absc*", "absc*hhhh");
console.log('match("ab", "ababc")', match("ab", "ababc"));
console.log(
  'match("abcabc", "i am abcabc dksdjks")',
  match("abcabc", "i am abcabc dksdjks")
);
console.log(
  'match("abababx", "i amabababxdksdjks")',
  match("abababx", "i amabababxdksdjks")
);
console.log(
  'match("ababdabx", "i amabababxdksdjks")',
  match("ababdabx", "i amabababxdksdjks")
);
console.log('match("absc*", "absc*hhhh")', match("absc*", "absc*hhhh"));
console.log('match("absc*", "absc*hhhh")', match("absc*", "absc*hhhh"));
