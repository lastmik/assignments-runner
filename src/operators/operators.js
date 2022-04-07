

export function add(operandA, operandB) {
  let result = operandA + operandB;
  if (!isFinite(result) || numberCheckHelper(operandA) || numberCheckHelper(operandB)) {
    return null;
  } else {
    return result;
  }
}

export function subtract(operandA, operandB) {
  let result = operandA - operandB;
  if (numberCheckHelper(operandA) || numberCheckHelper(operandB)) {
    return null;
  } else {
    return result;
  }
}

export function complex(operandA, operandB) {
  let isNumber = true;
  let arr = operandA.concat(operandB);
  let result = 0;
  arr.forEach((element) => {
    if (numberCheckHelper(element)) {
      isNumber = false;
    }
  });
  if (isNumber) {
    result = (operandA[0] * operandA[1]) ** (operandB[0] / operandB[1]);
  } else {
    return null;
  }

  return isFinite(result)? result: null;
}

function numberCheckHelper(elem){
  return typeof elem !=="number"? true:false;
}
