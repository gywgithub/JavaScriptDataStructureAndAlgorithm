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
    // Method 1.
    // var aux = array[index1];
    // array[index1] = array[index2];
    // array[index2] = aux;

    // Method 2. ES6(ECMAScript 2015) 增强的对象属性
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

  /**
   * 选择排序算法是一种原址比较排序算法。思路是找到数据结构中的最小值并将其放置在第一位，接着找到第二小的值并将其放到第二位，以此类推。
   */
  this.selectionSort = function() {
    var length = array.length, // {1}
      indexMin;
    for (var i = 0; i < length - 1; i++) { // {2}
      indexMin = i; // {3}
      for (var j = i; j < length; j++) { // {4}
        if (array[indexMin] > array[j]) { // {5}
          indexMin = j; // {6}
        }
      }
      if (i !== indexMin) { // {7}
        swap(array, i, indexMin);
      }
    }
  }

  /**
   * 插入排序每次排一个数组项，以此方式构建最后的排序数组。排序小型数组时，此算法比选择排序和冒泡排序性能要好。
   */
  this.insertionSort = function() {
    var length = array.length, // {1}
      j, temp;
    for (var i = 1; i < length; i++) { // {2}
      j = i; // {3}
      temp = array[i]; // {4}
      while (j > 0 && array[j - 1] > temp) { // {5}
        array[j] = array[j - 1]; // {6}
        j--;
      }
      array[j] = temp; // {7}
    }
  }

  /**
   * 归并排序是一个可以被实际使用的排序算法。比冒泡排序，选择排序，插入排序算法性能要好。
   * 归并排序是一种分治算法。其思想是将原始数组切分成较小的数组，直到每个小数组只有一个位置，接着将小数组归并成较大的数组，直到最后只有一个排序完毕的大数组。
   */
  this.mergeSort = function() {
    array = mergeSortRec(array);
  }

  var mergeSortRec = function(array) {
    var length = array.length;
    if (length === 1) { // {1}
      return array; //分zhi
    }
    var mid = Math.floor(length / 2), // {3}  Math.floor() 返回一个小于或等与一个给定数字的最大整数。(向下取整)
      left = array.slice(0, mid), // {4}
      right = array.slice(mid, length); // {5}

    return merge(mergeSortRec(left), mergeSortRec(right)); // {6}
  }

  var merge = function(left, right) {
    var result = [], // {7}
      il = 0,
      ir = 0;

    while(il < left.length && ir < right.length) { // {8}
      if (left[il] < right[ir]) {
        result.push(left[il++]); // {9}
      } else {
        result.push(right[ir++]); // {10}
      }
    }

    while(il < left.length) { // {11}
      result.push(left[il++]);
    }

    while(ir < right.length) { // {12}
      result.push(right[ir++]);
    }

    return result; // {13}
  }

  /**
   * 快速排序也是最常用的一种算法。
   * 快速排序和归并排序一样，也使用分治的方法，将原是数组分为较小的数组（但它没有想归并排序那样把它们分割开）。
   */
  this.quickSrot = function() {
    quick(array, 0, array.length - 1);
  }

  var quick = function(array, left, right) {
    var index; // {1}
    if (array.length > 1) { // {2}
      index = partition(array, left, right); // {3}
      if (left < index - 1) { // {4}
        quick(array, left, index - 1); // {5}
      }
      if (index < right) { // {6}
        quick(array, index, right); // {7}
      }
    }
  }

  var partition = function(array, left, right) {
    var pivot = array[Math.floor((right + left) / 2)], // {8}
      i = left, // {9}
      j = right; // {10}
    
    while(i <= j) { // {11}
      while (array[i] < pivot) { // {12}
        i++;
      }
      while (array[j] > pivot) { // {13}
        j--;
      }
      if (i <= j) { // {14}
        swap(array, i, j); // {15}
        i++;
        j--;
      }
    }
    return i; // {16}
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
array.bubbleSort(); // {9}
console.log(array.toString()); // {10}

console.log('---')
var array2 = new ArrayList();

array2.insert(8);
array2.insert(9);
array2.insert(1);
array2.insert(3);
array2.insert(7);

array2.insert(4);
array2.insert(5);
array2.insert(2);
array2.insert(6);
array2.insert(10);

console.log(array2.toString())

array2.modifiedBubbleSort();
console.log(array2.toString());

console.log('---')

// var arr3 = [8,9,1,3,7,4,5,2,6,10]
// console.log(arr3.toString())
// var len = arr3.length
// for (var i = 0; i < len; i++) {
//   for (var j = 0; j < len - 1 - i; j++) {
//     if (arr3[j] > arr3[j + 1]) {
//       [arr3[j], arr3[j + 1]] = [arr3[j + 1], arr3[j]]
//     }
//   }
// }
// console.log(arr3.toString())


console.log('=== array4 ===')

var array4 = createNonSortedArray(5);
console.log(array4.toString());
array4.selectionSort();
console.log(array4.toString());

console.log('=== array5 ===')

var array5 = createNonSortedArray(8)
console.log(array5.toString());
array5.mergeSort();
console.log(array5.toString());

console.log('=== array6 ===')

var array6 = new ArrayList();
array6.insert(3)
array6.insert(5)
array6.insert(1)
array6.insert(6)
array6.insert(4)
array6.insert(7)
array6.insert(2)
array6.insert(8)
console.log(array6.toString())
array6.quickSrot();
console.log(array6.toString())
