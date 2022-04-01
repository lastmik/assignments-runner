export function mapTo(array, property) {
  if (!property)
    return array.map(function (elem) {
      return array.indexOf(elem);
    });
  else {
    // TODO: check const instead
    let result = array.filter((elem) => elem.hasOwnProperty(property));

    return result.map(function (elem) {
      return elem[property];
    });
  }
}

export function mapToProfile(array) {
  return array.map(function (elem) {
    // TODO: check const instead
    // TODO: check helper function for || null 
    let name = elem.name || null;
    let surname = elem.surname || null;
    // TODO: check lowerCamelCase
    let fullname = null;
    if (name || surname) {
      // TODO: check helper function for || "_"
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
    // TODO: Refactor resultArray + forEach approach and move into reduce 
    let resultArray = [];
    properties.forEach((property) => {
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
  return array.sort(sortArray);

  // TODO: Move to top
  function sortArray(a, b) {
    if (!filter) {
      return a - b;
    } else if (typeof filter === "string") {
      return a[filter] - b[filter];
    } else if (typeof filter[0] !== "object" && typeof filter[1] !== "object") {
      // Move a[filter[0]] and b[filter[0]] into variables
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
  // TODO: Always use curly braces for such blocks
  // TODO: Check ternary operator for it
  if (!result) return arrayResult;
  else return result;
}

// TODO: use verbs for functions
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
