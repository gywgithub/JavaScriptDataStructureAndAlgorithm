function ArrayList() {

  var array = []; // {1}

  this.insert = function(item) { // {2}
    array.push(item);
  }

  this.toString = function(){ // {3}
    return array.join();
  }

  /**
   * 冒泡排序
   */
  this.bubbleSort = function(){
    var length = array.length; // {1}
    for (var i = 0; i < length; i++) { // {2}
      for (var j = 0; j < length - 1; j++){ // {3}
        if (array[j] > array[j+1]) { // {4}
          swap(array, j, j+1); // {5}
        }
      }
    }
  }

  var swap = function(array, index1, index2) {
    // 1
    // var aux = array[index1];
    // array[index1] = array[index2];
    // array[index2] = aux;

    // 2 ES6(ECMAScript 2015) 增强的对象属性
    [array[index1], array[index2]] = [array[index2], array[index1]];
  }

  /**
   * 改进后的冒泡排序
   */
  this.modifiedBubbleSort = function(){
    var length = array.length;
    for (var i = 0; i < length; i++) {
      for (var j = 0; j < length - 1 - i; j++) {
        if (array[j] > array[j + 1]) {
          swap(array, j, j+1);
        }
      }
    }
  }
}


// test bubble sort
function createNonSortedArray(size) { // {6}
  var array = new ArrayList();
  for (var i = size; i > 0; i--) {
    array.insert(i);
  }
  return array;
}

var array = createNonSortedArray(5); // {7}
console.log(array.toString()); // {8}
// array.bubbleSort(); // {9}
// console.log(array.toString()); // {10}

array.modifiedBubbleSort();
console.log(array.toString());