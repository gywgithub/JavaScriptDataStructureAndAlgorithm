function Set() {
  let items = {};
  this.items = items

  // 如果值在集合中，返回true,否则返回false
  this.has = function(value) {
    // return value in items;
    return items.hasOwnProperty(value);
  }

  this.add = function(value) {
    if (!this.has(value)) {
      items[value] = value; // {1}
      return true;
    }
    return false;
  }

  this.remove = function(value) {
    if (this.has(value)) {
      delete items[value]; // {2}
      return true;
    } else {
      return false;
    }
  }

  this.clear = function() {
    items = {}
  }

  this.size = function() {
    return Object.keys(items).length; // {4}
  }

  this.sizeLegacy = function() {
    let count = 0;
    for(let key in items) { // {5}
      if(items.hasOwnProperty(key)) // {6}
      ++count;
    }
    return count;
  }

  this.values = function() {
    let values = [];
    for (let i = 0, keys = Object.keys(items); i < keys.length; i++) {
      values.push(items[keys[i]])
    }
    return values;
  }

  this.union = function(otherSet) {
    let unionSet = new Set(); // {1}

    let values = this.values(); // {2}
    for (let i = 0; i < values.length; i++) {
      unionSet.add(values[i]);
    }

    values = otherSet.values(); // {3}
    for (let i = 0; i < values.length; i++) {
      unionSet.add(values[i]);
    }
    return unionSet;
  }

  this.intersection = function(otherSet) {
    let intersectionSet = new Set();

    let values = this.values();
    for (let i = 0; i < values.length; i++) {
      if (otherSet.has(values[i])) {
        intersectionSet.add(values[i]);
      }
    }

    return intersectionSet;
  }

  this.difference = function(otherSet) {
    let differenceSet = new Set();

    let values = this.values();
    for (let i = 0; i < values.length; i++) {
      if (!otherSet.has(values[i])) {
        differenceSet.add(values[i]);
      }
    }
    return differenceSet;
  }

  this.subset = function(otherSet) {
    if (this.size() > otherSet.size()) {
      return false;
    } else {
      let values = this.values();
      for (let i = 0; i < values.length; i++) {
        if (!otherSet.has(values[i])) {
          return false;
        }
      }
      return true;
    }
  }
}

let set = new Set();
console.log(set.items)
set.add(1);
console.log(set.has(1))
console.log(set.items)
set.add(2);
console.log(set.items)
set.remove(1)
console.log(set.items)
console.log(set.size())
console.log(set.sizeLegacy())
console.log(set.values())
set.clear();
console.log(set.size())


// test union
let setA = new Set();
setA.add(1)
setA.add(2)
setA.add(3)

let setB = new Set();
setB.add(3);
setB.add(4);
setB.add(5);
setB.add(6);

let unionAB = setA.union(setB);
console.log(unionAB.values())

// test intersection
let setC = new Set();
setC.add(1);
setC.add(2);
setC.add(3);

let setD = new Set();
setD.add(2);
setD.add(3);
setD.add(4);

let intersectionCD = setC.intersection(setD)
console.log(intersectionCD.values())

// test difference
let setE = new Set();
setE.add(1);
setE.add(2);
setE.add(3);

let setF = new Set();
setF.add(2);
setF.add(3);
setF.add(4);

let differenceEF = setE.difference(setF);
console.log(differenceEF.values());

// test subset
let setA1 = new Set();
setA1.add(1);
setA1.add(2);

let setB1 = new Set();
setB1.add(1);
setB1.add(2);
setB1.add(3);

let setC1 = new Set();
setC1.add(2);
setC1.add(3);
setC1.add(4);

console.log(setA1.subset(setB1));
console.log(setA1.subset(setC1));