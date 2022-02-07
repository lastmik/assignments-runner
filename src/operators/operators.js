export function add(a, b) {
  let result = a+b;
  if(!isFinite(result)||typeof(a) !='number'||typeof(b) !='number')
    return null;
  else
    return result;
}

export function subtract(a, b) {
  // TODO
  let result = a-b;
  if(typeof(a) !='number'||typeof(b) !='number')
    return null;
  else
    return result;

}

export function complex(a,b) {
  // TODO:
  let isNumber = true;
  let arr = a.concat(b);
  arr.forEach(element => {
    if(typeof(element)!='number')
    isNumber=false;
  });

  let result = (a[0]*a[1]) ** (b[0]/b[1]);

  if(!isFinite(result)|| !isNumber)
    return null;
  else
    return result;
 
}
