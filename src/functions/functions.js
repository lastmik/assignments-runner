export function counter(initial, counterName) {
  // TODO:

  var counter = GetCounter(initial, counterName);
  return counter.count(initial);
}

// TODO: Move to class
function GetCounter(initial, name) {
  var counter;
  if (typeof initial === "string") {
    Counters.get("default").result = 0;
    counter = Counters.get(initial);
  } else if (typeof name === "string") {
    Counters.get("default").result = 0;
    counter = Counters.get(name);
  } else {
    counter = Counters.get("default");
  }

  if (typeof counter === "undefined") {
    counter = CreateCounter(initial, name);
    return counter;
  }
  return counter;
}

// TODO: Move to class
function CreateCounter(initial, name) {
  // TODO: Please, check existence instead
  if (typeof initial === "undefined") {
    Counters.set("default", new Counter());
    return Counters.get("default");
  } else if (typeof initial === "string") {
    Counters.set(initial, new Counter());
    return Counters.get(initial);
  } else if (typeof initial === "number" && typeof name === "undefined") {
    Counters.set("default", new Counter());
    return Counters.get("default");
  } else if (typeof initial === "number" && typeof name === "string") {
    Counters.set(name, new Counter());
    return Counters.get(name);
  }
}

class Counter {
  result;
  constructor() {
    this.result = 0;
  }
  set result(initial) {
    this.result = initial;
  }
  count(initial) {
    if (typeof initial === "number") this.result = initial;
    return this.result++;
  }
}
let Counters = new Map();

export function callableMultiplier(...args) {
  // TODO: Remove unused code
  let count = null;
  // if(!args)
  // return result;

  callableMultiplier = function (...args) {
    if (!args.length) {
      let result = count;
      count = null;
      return result;
    }
    args.forEach((elem) => {
      if (!count) count = elem;
      else count *= elem;
    });

    return callableMultiplier;
  };

  return callableMultiplier(...args);
}

export function createCalculator(initial) {
  // TODO:

  return new Calculator(initial);
}
class Calculator {
  logs;
  count;
  constructor(count) {
    // TODO: Move count and logs initializers to property declaration
    typeof count === "number" ? (this.count = count) : (this.count = 0);

    this.logs = [];
    this.logF("init", this.count);
  }
  get log() {
    return this.logs;
  }
  // TODO: Rename according to functionality
  logF(operation, value) {
    this.logs.push({ operation, value });
  }

  add(value) {
    this.count += value;
    this.logF("add", value);
  }
  subtract(value) {
    this.count -= value;
    this.logF("subtract", value);
  }
  multiply(value) {
    this.count *= value;
    this.logF("multiply", value);
  }
  divide(value) {
    this.count /= value;
    this.logF("divide", value);
  }
  get value() {
    return this.count;
  }
  set value(init) {}
}
