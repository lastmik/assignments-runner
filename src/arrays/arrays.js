export function mapTo(array, property) {
  // TODO:
  if (typeof property === "undefined")
    return array.map(function (elem) {
      return array.indexOf(elem);
    });
  else if (typeof property === "string") {
    let result = array.filter((elem) => elem.hasOwnProperty(property));

    return result.map(function (elem) {
      if (elem.hasOwnProperty(property)) return elem[property];
    });
  }
}

export function mapToProfile(array) {
  // TODO:
  return array.map(function (elem) {
    let name = elem.name || null;
    let surname = elem.surname || null;
    let fullname = null;
    if (name || surname) {
      fullname = (name || "_") + " " + (surname || "_");
    }
    let age = elem.age || null;

    let proto = {
      get isOld() {
        return this.age >= 60;
      },
      get isAnonymous() {
        return this.fullname ? false : true;
      },
    };

    let obj = Object.create(proto);
    obj.name = name;
    obj.surname = surname;
    obj.fullname = fullname;
    obj.age = age;

    return obj;
  });
}

export function filterBy(array, propertys) {
  // TODO:
  if (typeof propertys === "number")
    return array.filter((elem) => elem >= propertys);
  else if (typeof propertys === "string")
    return array.filter((elem) => elem.hasOwnProperty(propertys));
  else {
    return array.filter((elem) => propertys.filterCb(elem[propertys.property]));
  }
}

export function reduceTo(array, propertys) {
  // TODO:
  let resultArray = [];
  if (!propertys)
    return array.reduce(
      (previousValue, currentValue) => previousValue + currentValue
    );
  else if (!Array.isArray(propertys)) {
    return array.reduce(
      (accumulator, currentValue) => accumulator + currentValue[propertys],
      0
    );
  } else {
    propertys.forEach((property) => {
      resultArray.push(
        array.reduce(
          (accumulator, currentValue) => accumulator + currentValue[property],
          0
        )
      );
    });
    return resultArray;
  }
}

export function sort(array, filter) {
  // TODO:
  return array.sort(sortArray);

  function sortArray(a, b) {
    if (!filter) {
      return a - b;
    } else if (filter === "age") {
      return a.age - b.age;
    } else if (typeof filter[0] !== "object" && typeof filter[1] !== "object") {
      return (
        2 *
          (a[filter[0]] > b[filter[0]]
            ? 1
            : a[filter[0]] < b[filter[0]]
            ? -1
            : 0) +
        1 *
          (a[filter[1]] > b[filter[1]]
            ? 1
            : a[filter[1]] < b[filter[1]]
            ? -1
            : 0)
      );
    } else {
      if (filter[1].order === "desc") {
        return (
          2 *
            (a[filter[0]] > b[filter[0]]
              ? 1
              : a[filter[0]] < b[filter[0]]
              ? -1
              : 0) +
          1 *
            (b[filter[1].field] > a[filter[1].field]
              ? 1
              : b[filter[1].field] < a[filter[1].field]
              ? -1
              : 0)
        );
      } else {
        return (
          2 *
            (a[filter[0]] > b[filter[0]]
              ? 1
              : a[filter[0]] < b[filter[0]]
              ? -1
              : 0) +
          1 *
            (a[filter[1].field] > b[filter[1].field]
              ? 1
              : a[filter[1].field] < b[filter[1].field]
              ? -1
              : 0)
        );
      }
    }
  }
}

export function complex(array, operations) {
  // TODO:
  let arrayResult;
  let result;

  operations.forEach((element) => {
    switch (element.operation) {
      case "filter":
        filtering(element);
        break;
      case "map":
        mapping(element);
        break;
      case "reduce":
        reducing(element);
      case "sort":
        sorting(element);
    }
  });
  if (!result) return arrayResult;
  else return result;

  function filtering(properties) {
    array = array.filter((elem) =>
      properties.callback(elem[properties.property])
    );
  }

  function mapping(properties) {
    arrayResult = array.map(function (elem) {
      return elem[properties.property];
    });
  }
  function reducing(properties) {
    result = array.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue[properties.property],
      0
    );
  }

  function sorting(properties) {
    if (properties.order === "desc") {
      arrayResult = arrayResult.sort((a, b) => b - a);
    }
    // else{
    // arrayResult = arrayResult.sort((a,b)=> a - b);
    // }
  }
}
