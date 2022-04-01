
// TODO: dont use shortcuts
export function add(a, b) {
  let result = a + b;
  // TODO: Check if we can move != "number" into helper function
  // TODO: Check if we need to use strict equality here instead 
  if (!isFinite(result) || typeof a != "number" || typeof b != "number") {
    return null;
  } else {
    return result;
  }
}

export function subtract(a, b) {
  let result = a - b;
  if (typeof a != "number" || typeof b != "number") {
    return null;
  } else {
    return result;
  }
}

export function complex(a, b) {
  let isNumber = true;
  let arr = a.concat(b);
  let result = 0;
  arr.forEach((element) => {
    if (typeof element != "number") {
      isNumber = false;
    }
  });
  if (isNumber) {
    result = (a[0] * a[1]) ** (b[0] / b[1]);
  } else {
    return null;
  }

  // TODO: Check reverse check instead
  if (!isFinite(result)) {
    return null;
  } else {
    return result;
  }
}
