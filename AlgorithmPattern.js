// -------------- 浏览器中运行下列代码 --------------
// var i = 0;

// function recursiveFn () {
//   i++;
//   recursiveFn()
// }

// try {
//   recursiveFn()
// } catch(ex) {
//   // console.log('i = ' + i + ' error: ' + ex)
//   alert('i = ' + i + ' error: ' + ex)
// }



// -------- Node 环境运行以下函数 ---------------

/**
 * 斐波那契数列： 0、1、1、2、3、5、8、13、21、34...
 * 递归方式实现函数
 */
function fibonacci(num) {
  if (num === 1 || num === 2) { // {1}
    return 1;
  }
  return fibonacci(num - 1) + fibonacci(num - 2)
}

let res = fibonacci(6)
console.log(res) // 8


/**
 * 非递归方式实现斐波那契数列
 */
function fib(num) {
  var n1 = 1,
    n2 = 1,
    n = 1;
  for (var i = 3; i <= num; i++) {
    n = n1 + n2;
    n1 = n2;
    n2 = n;
  }
  return n;
}

let res2 = fib(6)
console.log(res2) // 8

console.log('---')


// 动态规划（Dynamic Programming, DP） 是一种将复杂问题拆分为更小的子问题来解决的优化技术。
// 分而治之方法是把问题分解成相互独立的子问题，然后组合它们的答案，而动态规划是将问题拆分成相互依赖的子问题。

/**
 * 动态规划算法 最少硬币找零问题 
 */
// function MinCoinChange(coins) {
//   var coins = coins; // {1}
//   var cache = {}; // {2}

//   this.makeChange = function (amount) {
//     var me = this;
//     if (!amount) { // {3}
//       return [];
//     }
//     if (cache[amount]) { // {4}
//       return cache[amount];
//     }
//     var min = [],
//       newMin, newAmount;
//     for (var i = 0; i < coins.length; i++) { // {5}
//       var coin = coins[i];
//       newAmount = amount - coin; // {6}
//       if (newAmount >= 0) {
//         newMin = me.makeChange(newAmount); // {7}
//       }
//       if (
//         newAmount >= 0 && // {8}
//         (newMin.length < min.length - 1 || !min.length) // {9}
//         &&
//         (newMin.length || !newAmount)) { // {10}
//         min = [coin].concat(newMin); // {11}
//         console.log('new Min ' + min + ' for ' + amount);
//       }
//     }
//     return (cache[amount] = min); // {12}
//   }
// }

/**
 * 贪心算法版本 最少硬币找零问题
 * @param {*} coins 
 */
function MinCoinChange(coins) {
  var coins = coins; // {1}

  this.makeChange = function(amount) {
    var change = [],
      total = 0;
    for (var i = coins.length; i >= 0; i--) { // {2}
      var coin = coins[i];
      while (total + coin <= amount) { // {3}
        change.push(coin); // {4}
        total += coin; // {5}
      }
    }
    return change;
  }
}

var minCoinChange = new MinCoinChange([1, 5, 10, 25])
console.log(minCoinChange.makeChange(36))

// var minCoinChange = new MinCoinChange([1, 3, 4])
// console.log(minCoinChange.makeChange(6))

/**
 * 背包问题是一个组合优化问题。描述：给定一个固定大小、能够携重W的背包，以及一组有价值和重量的物品，找出一个最佳解决方案，使得装入背包的物品总重量不超过W，且总价值最大。
 */
function knapSack(capacity, weights, values, n) {
  var i, w, a, b, kS = [];
  for (i = 0; i <= n; i++) { // {1}
    kS[i] = [];
  }
  for (i = 0; i <= n; i++) {
    for (w = 0; w <= capacity; w++) {
      if (i == 0 || w == 0) { // {2}
        kS[i][w] = 0;
      } else if (weights[i - 1] <= w) { // {3}
        a = values[i - 1] + kS[i - 1][w - weights[i - 1]]
        b = kS[i - 1][w]
        kS[i][w] = (a > b) ? a : b; // {4} max{a, b}
      } else {
        kS[i][w] = kS[i - 1][w]; // {5}
      }
    }
  }
  findValues(n, capacity, kS, weights, values)
  return kS[n][capacity]; // {6}
}

/**
 * 分数背包问题
 * @param {*} capacity 
 * @param {*} values 
 * @param {*} weights 
 */
// function knapSack(capacity,  values, weights) {
//   var n = values.length,
//   load = 0, i = 0, val = 0;

//   for (i = 0; i < n && load < capacity; i++) { // {1}
//     if (weights[i] <= (capacity - load)) { // {2}
//       val += values[i];
//       load += weights[i];
//     } else {
//       var r = (capacity - load) / weights[i]; // {3}
//       val += r * values[i];
//       load += weights[i];
//     }
//   }
//   return w;
// }


var values = [3, 4, 5],
  weights = [2, 3, 4],
  capacity = 5,
  n = values.length;
console.log(knapSack(capacity, weights, values, n)); // {7}

/**
 * 附件函数用来找出解决方案的物品
 */
function findValues(n, capacity, kS, weights, values) {
  var i = n,
    k = capacity;
  console.log('解决方案包含以下物品： ')

  while (i > 0 && k > 0) {
    if (kS[i][k] !== kS[i - 1][k]) {
      console.log('物品 ' + i + ' , 重量： ' + weights[i - 1] + ' ,价值： ' + values[i - 1]);
      i--;
      k = k - kS[i][k];
    } else {
      i--;
    }
  }
}

console.log('---')

/**
 * 最长公共子序列（LCS）：找出两个字符串序列的最长子序列的长度。最长子序列是指，在两个字符串序列中以相同顺序出现，但不要求连续（非字符串子串）的字符串序列。
 */
function lcs(wordX, wordY) {
  var m = wordX.length,
    n = wordY.length,
    l = [],
    i, j, a, b;
  // var solution = [];

  for (i = 0; i <= m; ++i) {
    l[i] = [];
    // solution[i] = [];
    for (j = 0; j <= n; ++j) {
      l[i][j] = 0;
      // solution[i][j] = 0;
    }
  }

  for (i = 0; i <= m; i++) {
    for (j = 0; j <= n; j++) {
      if (i == 0 || j == 0) {
        l[i][j] = 0;
      } else if (wordX[i - 1] == wordY[j - 1]) {
        l[i][j] = l[i - 1][j - 1] + 1;
        // solution[i][j] = 'diagonal';
      } else {
        a = l[i - 1][j];
        b = l[i][j - 1];
        l[i][j] = (a > b) ? a : b; // max(a, b)
        // solution[i][j] = (l[i][j] == l[i - 1][j]) ? 'top' : 'left';
      }
    }
  }
  // printSolution(solution, l, wordX, wordY, m, n);
  return l[m][n];
}

function printSolution(solution, l, wordX, wordY, m, n) {
  var a = m,
    b = n,
    i, j,
    x = solution[a][b],
    answer = '';

  while (x !== '0') {
    if (solution[a][b] === 'diagonal') {
      answer = wordX[a - 1] + answer;
      a--;
      b--;
    } else if (solution[a][b] === 'left') {
      b--;
    } else if (solution[a][b] === 'top') {
      a--;
    }
    x = solution[a][b];
  }
  console.log('lcs: ' + answer);
}

let resLcs = lcs('acbaed', 'abcadf')
console.log('res: ', resLcs)

/**
 * 矩阵链相乘是另一个可以用动态规划解决的著名问题。这个问题是要找出一组矩阵相乘的最佳方式（顺序）。
 * n行m列的矩阵A和m行p列的矩阵B相乘，结果是n行p列的矩阵C。
 */
function matrixChainOrder(p, n) {
  var i, j, k, l, q, m = [];

  var s = [];
  for (i = 0; i <= n; i++) {
    s[i] = [];
    for (j = 0; j <= n; j++) {
      s[i][j] = 0;
    }
  }

  for (i = 1; i <= n; i++) {
    m[i] = [];
    m[i][i] = 0;
  }

  for (l = 2; l < n; l++) {
    for (i = 1; i <= n - l + 1; i++) {
      j = i + l - 1;
      m[i][j] = Number.MAX_SAFE_INTEGER;
      for (k = i; k <= j - 1; k++) {
        q = m[i][k] + m[k + 1][j] + p[i - 1] * p[k] * p[j]; // {1}
        if (q < m[i][j]) {
          m[i][j] = q;
          // {2}
          s[i][j] = k;
        }
      }
    }
  }
  // {3}
  printOptimalParenthesis(s, 1, n - 1);
  return m[1][n - 1];
}

function printOptimalParenthesis(s, i, j) {
  if (i == j) {
    console.log("A[" + i + "]");
  } else {
    console.log("(");
    printOptimalParenthesis(s, i, s[i][j]);
    printOptimalParenthesis(s, s[i][j] + 1, j);
    console.log(")");
  }
}

var p = [10, 100, 5, 50, 1]
n = p.length;
console.log(matrixChainOrder(p, n))

console.log('---')

// 命令式编程，迭代数组
var printArray = function(array) {
  for (var i = 0; i < array.length; i++) {
    console.log(array[i])
  }
}
printArray([1, 2, 3, 4, 5])


// 函数式编程，迭代数组
var forEach = function(array, action) {
  for (var i = 0; i < array.length; i++) {
    action(array[i])
  }
}

var logItem = function(item) {
  console.log(item);
}

forEach([1, 2, 3, 4, 5], logItem)
console.log('---')

// 找出数组中的最小值。命令式编程
var findMinArray = function(array) {
  var minValue = array[0]
  for (var i = 1; i < array.length; i++) {
    if (minValue > array[i]) {
      minValue = array[i]
    }
  }
  return minValue
}

console.log(findMinArray([8, 6, 4, 5, 9]))
console.log('---')

// 找出数组中最小值。函数式编程 ES2015
const min_ = function(array) {
  return Math.min(...array)
}
console.log(min_([8, 6, 4, 5, 9]))
console.log('---')

// 找出数组中最小值。函数式编程，箭头函数实现
const min = arr => Math.min(...arr)
console.log(min([8, 6, 4, 5, 9]))

console.log('---')

var daysOfWeek = [
  {name: 'Monday', value: 1},
  {name: 'Tuesday', value: 2},
  {name: 'Wednesday', value: 7}
]

var daysOfWeekValues_ = []
for (var i = 0; i < daysOfWeek.length; i++) {
  daysOfWeekValues_.push(daysOfWeek[i].value)
}
console.log(daysOfWeekValues_)
console.log('---')

var daysOfWeekValues = daysOfWeek.map(function(day) {
  return day.value;
})
console.log(daysOfWeekValues)
console.log('---')

var positiveNumbers_ = function (array) {
  var positive = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i] >= 0) {
      positive.push(array[i])
    }
  }
  return positive
}
console.log(positiveNumbers_([-1, 1, 2, -2]))
console.log('---')

var positiveNumbers = function(array) {
  return array.filter(function(num) {
    return num > 0
  })
}
console.log(positiveNumbers([-1, 1, 2, -2]))
console.log('---')

var sumValues = function(array) {
  var total = array[0]
  for (var i = 1; i < array.length; i++) {
    total += array[i]
  }
  return total
}

console.log(sumValues([1, 2, 3, 4, 5]))
console.log('---')

var sum_ = function(array) {
  return array.reduce(function(a, b, i, arr) {
    console.log('a: ' + a + ' b: ' + b + ' i: ' + i + ' arr: ' + arr)
    return a + b
  })
}
console.log(sum_([1, 2, 3, 4, 5]))
console.log('---')

const sum = arr => arr.reduce((a, b) => a + b)
console.log(sum([1, 2, 3, 4, 5]))
console.log('---')

var mergeArrays_ = function (arrays) {
  var count = arrays.length,
  newArray = [],
  k = 0;
  for (var i = 0; i < count; i++) {
    for (var j = 0; j < arrays[i].length; j++) {
      newArray[k++] = arrays[i][j]
    }
  }
  return newArray;
}
console.log(mergeArrays_([[1, 2, 3], [4, 5], [6]]))
console.log('---')

var mergeArraysConcat = function (arrays) {
  return arrays.reduce(function(p, n) {
    return p.concat(n)
  })
}
console.log(mergeArraysConcat([[1, 2, 3], [4, 5], [6]]))
console.log('---')

const mergeArrays = (...arrays) => [].concat(...arrays)
console.log(mergeArrays([1, 2, 3], [4, 5], [6]))