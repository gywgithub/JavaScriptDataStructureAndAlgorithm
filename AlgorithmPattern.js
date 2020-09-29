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
 * 最少硬币找零问题
 */
function MinCoinChange(coins) {
  var coins = coins; // {1}
  var cache = {}; // {2}

  this.makeChange = function(amount) {
    var me = this;
    if (!amount) { // {3}
      return [];
    }
    if (cache[amount]) { // {4}
      return cache[amount];
    }
    var min = [], newMin, newAmount;
    for (var i = 0; i < coins.length; i++) { // {5}
      var coin = coins[i];
      newAmount = amount - coin; // {6}
      if (newAmount >= 0) {
        newMin = me.makeChange(newAmount); // {7}
      }
      if (
        newAmount >= 0 && // {8}
        (newMin.length < min.length - 1 || !min.length) // {9}
        && (newMin.length || !newAmount)) { // {10}
          min = [coin].concat(newMin); // {11}
          console.log('new Min ' + min + ' for ' + amount);
        }
    }
    return (cache[amount] = min); // {12}
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

var values = [3, 4, 5],
  weights = [2, 3, 4],
  capacity = 5,
  n = values.length;
console.log(knapSack(capacity, weights, values, n)); // {7}

/**
 * 附件函数用来找出解决方案的物品
 */
function findValues(n, capacity, kS, weights, values) {
  var i = n, k = capacity;
  console.log('解决方案包含以下物品： ')

  while(i > 0 && k > 0) {
    if (kS[i][k] !== kS[i - 1][k]) {
      console.log('物品 ' + i + ' , 重量： ' + weights[i - 1] + ' ,价值： ' + values[i - 1]);
      i--;
      k = k - kS[i][k];
    } else {
      i--;
    }
  }
}