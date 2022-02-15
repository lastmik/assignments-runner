export function mapTo(array, property) {
  if (!property)
    return array.map(function (elem) {
      return array.indexOf(elem);
    });
  else {
    let result = array.filter((elem) => elem.hasOwnProperty(property));

    return result.map(function (elem) {
      return elem[property];
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
        return !this.fullname;
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

// TODO: Fix typo
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
  // TODO: Check usage and put in appropriate place
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
    } else if (typeof filter === "string") {
      return a[filter] - b[filter];
    } else if (typeof filter[0] !== "object" && typeof filter[1] !== "object") {
      return a[filter[0]] > b[filter[0]]
        ? 1
        : a[filter[0]] < b[filter[0]]
        ? -1
        : a[filter[1]] - b[filter[1]];
    } else {
      return a[filter[0]] > b[filter[0]]
        ? 1
        : a[filter[0]] < b[filter[0]]
        ? -1
        : b[filter[1].field] - a[filter[1].field];
    }
  }
}

export function complex(array, operations) {
  let arrayResult;
  let result;

  operations.forEach((element) => {
    switch (element.operation) {
      case "filter":
        arrayResult = filtering(array, element);
        break;
      case "map":
        arrayResult = mapping(arrayResult, element);
        break;
      case "reduce":
        result = reducing(arrayResult, element);
      case "sort":
        arrayResult = sorting(arrayResult);
    }
  });
  if (!result) return arrayResult;
  else return result;
}

function filtering(array, properties) {
  return array.filter((elem) => properties.callback(elem[properties.property]));
}

function mapping(array, properties) {
  return array.map(function (elem) {
    return elem[properties.property];
  });
}
function reducing(array, properties) {
  return array.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue[properties.property],
    0
  );
}

function sorting(arrayResult) {
  return arrayResult.sort((a, b) => b - a);
}
