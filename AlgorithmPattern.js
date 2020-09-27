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