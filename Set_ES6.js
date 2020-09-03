let set = new Set();
set.add(1);
console.log(set.values());
console.log(set.has(1));
console.log(set.size);

set.delete(1);
console.log(set.values());

let setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);

let setB = new Set();
setB.add(2);
setB.add(3);
setB.add(4);

let unionAB = new Set();
for (let x of setA) unionAB.add(x);
for (let x of setB) unionAB.add(x);

let intersection = function(setA, setB) {
  let intersectionSet = new Set();
  for (let x of setA) {
    if (setB.has(x)) {
      intersectionSet.add(x);
    }
  }
  return intersectionSet;
}
let intersectionAB = intersection(setA, setB);

// intersectionAB = new Set([x for(x of setA) if (setB.has(x)]); // only Firefox support

let difference = function(setA, setB) {
  let differenceSet = new Set();
  for (let x of setA) {
    if (!setB.has(x)) {
      differenceSet.add(x);
    }
  }
  return differenceSet;
}
let differenceAB = difference(setA, setB);

// differenceAB = new Set([x for (x of setA) if (!setB.has(x))]); // only Firefox support



