// --------------- O(1) ---------------------
function increment(num) {
  return ++num;
}

console.log(increment(1));

// ------------------ O(n) --------------------
// function sequentialSearch(array, item) {
//   for (var i = 0; i < array.length; i++) {
//     if (item === array[i]) { // {1}
//       return i;
//     }
//   }
//   return -1;
// }

function sequentialSearch(array, item) {
  var cost = 0;
  for (var i = 0; i < array.length; i++) {
    cost++;
    if (item === array[i]) {
      return i;
      // break;
    }
  }
  console.log('cost for sequentialSearch with input size ' + array.length + ' is ' + cost);
  return -1;
}

console.log(sequentialSearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5))

// ------------------- O(n2) -----------------------
function swap(array, index1, index2) {
  var aux = array[index1];
  array[index1] = array[index2];
  array[index2] = aux;
}

function bubbleSort(array) {
  var length = array.length;
  var cost = 0;
  for (var i = 0; i < length; i++) { // {1}
    cost++;
    for (var j = 0; j < length - 1; j++) { // {2}
      cost++;
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1);
      }
    }
  }
  console.log('cost for bubbleSort with input size ' + length + ' is ' + cost);
}

var arr1 = [1, 3, 4, 2, 10, 8, 5, 6, 7, 9]
console.log(arr1)
bubbleSort(arr1)
console.log(arr1)
