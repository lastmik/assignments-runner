export function counter(initial, counterName) {
  // TODO:
  var counter = new Counter();
  return counter.GetCounter(initial, counterName).count(initial);
}

class Counter {
  result;
  counter;
  constructor() {
    this.result = 0;
  }
  count(initial) {
    if (typeof initial === "number") this.result = initial;
    return this.result++;
  }
  GetCounter(initial, name) {
    if (typeof initial === "string") {
      Counters.get("default").result = 0;
      this.counter = Counters.get(initial);
    } else if (typeof name === "string") {
      Counters.get("default").result = 0;
      this.counter = Counters.get(name);
    } else {
      this.counter = Counters.get("default");
    }
    if (!this.counter) {
      this.counter = this.CreateCounter(initial);
      return this.counter;
    }
    return this.counter;
  }
  CreateCounter(initial) {
    if (!initial) {
      Counters.set("default", new Counter());
      return Counters.get("default");
    } else {
      Counters.set(initial, new Counter());
      return Counters.get(initial);
    }
  }
}
let Counters = new Map();

export function callableMultiplier(...args) {
  let count = null;
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
  logs = [];
  count = 0;
  constructor(count) {
    if (typeof count === "number") this.count = count;

    this.logging("init", this.count);
  }
  get log() {
    return this.logs;
  }

  logging(operation, value) {
    this.logs.push({ operation, value });
  }

  add(value) {
    this.count += value;
    this.logging("add", value);
  }
  subtract(value) {
    this.count -= value;
    this.logging("subtract", value);
  }
  multiply(value) {
    this.count *= value;
    this.logging("multiply", value);
  }
  divide(value) {
    this.count /= value;
    this.logging("divide", value);
  }
  get value() {
    return this.count;
  }
  set value(init) {}
}
