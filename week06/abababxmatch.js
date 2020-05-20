function matchA(string) {
  for (let char of string) {
    if (char === "a") {
      return true;
    }
  }
  return false;
}

function matchAB(string) {
  let foundA = false;
  for (let char of string) {
    if (char === "a") {
      foundA = true;
    } else if (foundA && char === "b") {
      return true;
    } else {
      foundA = false;
    }
  }
  return false;
}
let m = matchAB("fdasfdasafbjksabdhafb");
let m1 = matchAB("uiyerwii");
console.log(m);
console.log(m1);

function matchABCDE(string) {
  let foundA = false;
  let foundB = false;
  let foundC = false;
  let foundD = false;
  let foundE = false;
  for (let char of string) {
    if (char === "a") {
      foundA = true;
    } else if (foundA && char === "b") {
      return (foundB = true);
    } else if (foundB && char === "c") {
      foundC = true;
    } else if (foundC && char === "d") {
      foundD = true;
    } else if (foundD && char === "e") {
      foundE = true;
    } else if (foundE && char === "f") {
      return true;
    } else {
      foundA = false;
      foundB = false;
      foundC = false;
      foundD = false;
      foundE = false;
    }
  }
  return false;
}
console.log(matchABCDE("aifgrauh"));

// mealy状态机
function matchMealy(string) {
  // 字符串进入第一个状态机
  let state = start;
  for (let c of string) {
    // 通过循环进入一个个状态机，通过后会但会下一个状态机
    state = state(c);
  }
  return state === end;
}
function start(c) {
  if (c === "a") {
    return foundA;
  } else {
    return start(c);
  }
}

function end(c) {
  return end;
}

function foundA(c) {
  if (c === "b") return foundB;
  else return start(c);
}

function foundB(c) {
  if (c === "c") return foundC;
  else return start(c);
}

function foundC(c) {
  if (c === "d") return foundD;
  else return start(c);
}

function foundD(c) {
  if (c === "e") return foundE;
  else return start(c);
}

function foundE(c) {
  if (c === "f") return end;
  else return start;
}

console.log(matchMealy("i  aabbcdef log"));
// mealy状态机 end

// 这是一个错误的结果的代码 测不了 abcabcabx
function matchMeadlyMiddle(string) {
  let state = start;
  for (let c of string) {
    state = state(c);
  }
  return state === end;
}

function end() {
  return end;
}

function start(c) {
  if (c == "a") {
    return foundA;
  } else {
    return start(b);
  }
}

function foundA(c) {
  if (c == "b") {
    return foundB;
  } else {
    return start;
  }
}
function foundB(c) {
  if (c == "c") {
    return foundC;
  } else {
    return start;
  }
}
function foundC(c) {
  if (c == "a") {
    return foundA1;
  } else {
    return start;
  }
}
function foundA1(c) {
  if (c == "b") {
    return foundB1;
  } else {
    return start;
  }
}
function foundB1(c) {
  if (c == "x") {
    return end;
  } else {
    return foundB(c);
  }
}
console.log(matchMeadlyMiddle("i am abchabcabcabx"));

// 这是一个错误的结果的代码 测不了 abcabcabx
function matchMeadlyWorking(string) {
  let state = start;
  for (let c of string) {
    state = state(c);
  }
  return state === end;
}

function end() {
  return end;
}

function start(c) {
  if (c == "a") {
    return foundA;
  } else {
    return start;
  }
}

function foundA(c) {
  if (c == "b") {
    return foundB;
  } else {
    return start;
  }
}
function foundB(c) {
  if (c == "a") {
    return foundA1;
  } else {
    return start;
  }
}
function foundA1(c) {
  if (c == "b") {
    return foundB1;
  } else {
    return start;
  }
}
function foundB1(c) {
  if (c == "a") {
    return foundA2;
  } else {
    return start;
  }
}
function foundA2(c) {
  if (c == "b") {
    return foundB2;
  } else {
    return start;
  }
}
function foundB2(c) {
  if (c == "x") {
    return end;
  } else {
    return foundB1(c);
  }
}

console.log(matchMeadlyWorking("fdashababababxygfj"));
