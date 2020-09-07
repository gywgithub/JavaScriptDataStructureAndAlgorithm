// 散列表
// 散列算法的作用是尽可能地在数据结构中找到一个值。

function HashTable() {
  var table = [];

  var loseloseHashCode = function(key) {
    var hash = 0; // {1}
    for (var i = 0; i < key.length; i++) { // {2}
      hash += key.charCodeAt(i); // {3}
    }
    return hash % 37; // {4}
  }

  this.put = function(key, value) {
    var position = loseloseHashCode(key);
    // console.log(position + ' - ' + key);
    // table[position]  = value;

    if (table[position] == undefined) {
      table[position] = new LinkedList();
    }
    table[position].append(new ValuePair(key, value));
  }

  this.get = function (key) {
    // return table[loseloseHashCode(key)];

    var position = loseloseHashCode(key)

    if (table[position] !== undefined) { // {3}
      // 遍历链表来寻找键/值
      var current = table[position].getHead(); // {4}

      while(current.next) { // {5}
        if (current.element.key === key) { // {6}
          return current.element.value; // {7}
        }
        current = current.next; // {8}
      }

      // 检查元素在链表第一个或最后一个节点的情况
      if (current.element.key === key) { // {9}
        return current.element.value;
      }
    }
    return undefined; // {10}
  }

  this.remove = function(key){
    // table[loseloseHashCode(key)] = undefined;

    var position = loseloseHashCode(key);

    if (table[position] !== undefined) {
      var current = table[position].getHead();
      while(current.next) {
        if (current.element.key === key) { // {11}
          table[position].remove(current.element); // {12}
          if (table[position].isEmpty()) { // {13}
            table[position] = undefined; // {14}
          }
          return true; // {15}
        }
        current = current.next;
      }

      // 检查是否为第一个或最后一个元素
      if (current.element.key === key) { // {16}
        table[position].remove(current.element);
        if (table[position].isEmpty()) {
          table[position] = undefined;
        }
        return true;
      }
    }
    return false; // {17}
  }

  this.print = function() {
    for (var i = 0; i < table.length; i++) {
      if (table[i] !== undefined) {
        console.log(i + ': ' + table[i])
      }
    }
  }

  var ValuePair = function(key, value) {
    this.key = key;
    this.value = value;

    this.toString = function() {
      return '[' + this.key + ' - ' + this.value + ']';
    }
  }
}

var hash = new HashTable();
hash.put('Guo', 'guo@email.com');
hash.put('Kyle', 'kyle@email.com');
hash.put('Joy', 'joy@email.com');


console.log(hash.get('Guo'))

// hash.remove('Guo')
// console.log(hash.get('Guo'))


// 散列集合由一个集合构成，但是插入、移除或获取元素时，使用的是散列函数。

hash.put('John', 'johnsnow@email.com'); 
hash.put('Tyrion', 'tyrion@email.com'); 
hash.put('Aaron', 'aaron@email.com'); 
hash.put('Donnie', 'donnie@email.com'); 
hash.put('Ana', 'ana@email.com'); 
hash.put('Jonathan', 'jonathan@email.com'); 
hash.put('Jamie', 'jamie@email.com'); 
hash.put('Sue', 'sue@email.com'); 
hash.put('Mindy', 'mindy@email.com'); 
hash.put('Paul', 'paul@email.com'); 
hash.put('Nathan', 'nathan@email.com');

console.log('-------------')
console.log(hash.print())


// 分离链接法包括为每一个位置创建一个链表并将元素存储在里面。他是解决冲突的最简单的方法，但是它在HashTable实例之外还需要额外的存储空间。

// 线性探查