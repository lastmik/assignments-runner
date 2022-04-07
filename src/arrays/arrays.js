export function mapTo(array, property) {
  if (!property)
    return array.map(function (elem) {
      return array.indexOf(elem);
    });
  else {
    const result = array.filter((elem) => elem.hasOwnProperty(property));

    return result.map(function (elem) {
      return elem[property];
    });
  }
}

export function mapToProfile(array) {
  
  function checkHelper(elemA, elemB)
    {
      return elemA||elemB
    };

  return array.map(function (elem) {
    const name = checkHelper(elem.name, null);
    const surName = checkHelper(elem.surname ,null);
    let fullName = null;
    if (name || surName) {
      fullName = checkHelper(name, "_") + " " + checkHelper(surName, "_");
    }
    let age = elem.age || null;

    let proto = {
      get isOld() {
        return this.age >= 60;
      },
      get isAnonymous() {
        return !this.fullname;
      },
    };

    let obj = Object.create(proto);
    obj.name = name;
    obj.surname = surName;
    obj.fullname = fullName;
    obj.age = age;

    return obj;
    
  });
  
}

export function filterBy(array, properties) {
  if (typeof properties === "number")
    return array.filter((elem) => elem >= properties);
  else if (typeof properties === "string")
    return array.filter((elem) => elem.hasOwnProperty(properties));
  else {
    return array.filter((elem) =>
      properties.filterCb(elem[properties.property])
    );
  }
}

export function reduceTo(array, properties) {
  if (!properties)
    return array.reduce(
      (previousValue, currentValue) => previousValue + currentValue
    );
  else if (!Array.isArray(properties)) {
    return array.reduce(
      (accumulator, currentValue) => accumulator + currentValue[properties],
      0
    );
  } else {
    
    return properties.map((property)=>{
     return array.reduce((accumulator, currentValue) => accumulator + currentValue[property], 0)
    }) 
  }
}

export function sort(array, filter) {
  let elementA;
  let elementB;

  function sortArray(a, b) {
    if (!filter) {
      return a - b;
    } else if (typeof filter === "string") {
      return a[filter] - b[filter];
    } else if (typeof filter[0] !== "object" && typeof filter[1] !== "object") {
      elementA = a[filter[0]];
      elementB = b[filter[0]];
      return elementA > elementB
        ? 1
        : elementA < elementB
        ? -1
        : a[filter[1]] - b[filter[1]];
    } else {
      elementA = a[filter[0]];
      elementB = b[filter[0]];
      return elementA > elementB
        ? 1
        : elementA < elementB
        ? -1
        : b[filter[1].field] - a[filter[1].field];
    }
  }

  return array.sort(sortArray);
}

export function complex(array, operations) {
  let arrayResult;
  let result;

  operations.forEach((element) => {
    switch (element.operation) {
      case "filter":
        arrayResult = filterArray(array, element);
        break;
      case "map":
        arrayResult = mapArray(arrayResult, element);
        break;
      case "reduce":
        result = reduceArray(arrayResult, element);
      case "sort":
        arrayResult = sortArray(arrayResult);
    }
  });

  return !result? arrayResult:result;

}

function filterArray(array, properties) {
  return array.filter((elem) => properties.callback(elem[properties.property]));
}

function mapArray(array, properties) {
  return array.map(function (elem) {
    return elem[properties.property];
  });
}
function reduceArray(array, properties) {
  return array.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue[properties.property],
    0
  );
}

function sortArray(arrayResult) {
  return arrayResult.sort((a, b) => b - a);
}
