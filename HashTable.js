// 散列表
// 散列算法的作用是尽可能地在数据结构中找到一个值。

function HashTable() {
  var table = [];

  // "lose lose" 散列函数并不是一个表现良好的散列函数，因为它会产生太多的冲突。
  var loseloseHashCode = function(key) {
    var hash = 0; // {1}
    for (var i = 0; i < key.length; i++) { // {2}
      hash += key.charCodeAt(i); // {3}
    }
    return hash % 37; // {4}
  }

  // 社区推崇的散列函数之一 djb2
  var djb2HashCode = function (key) {
    var hash = 5381; // {1}
    for (var i = 0; i < key.length; i++) { // {2}
      hash = hash * 33 + key.charCodeAt(i); // {3}
    }
    return hash % 1013; // {4}
  }

  // // 分离链接法 put
  // this.put = function(key, value) {
  //   var position = loseloseHashCode(key);
  //   // console.log(position + ' - ' + key);
  //   // table[position]  = value;

  //   if (table[position] == undefined) {
  //     table[position] = new LinkedList();
  //   }
  //   table[position].append(new ValuePair(key, value));
  // }

  // 线性探查 put
  this.put = function(key, value) {
    var position = djb2HashCode(key); // {1}
    if (table[position] == undefined) { // {2} 
      table[position] = new ValuePair(key, value); // {3}
    } else {
      var index = ++position; // {4}
      while(table[index] != undefined) { // {5}
        index++; // {6}
      }
      table[index] = new ValuePair(key, value); // {7}
    }
  }

  // // 分离链接法 get
  // this.get = function (key) {
  //   // return table[loseloseHashCode(key)];

  //   var position = loseloseHashCode(key)

  //   if (table[position] !== undefined) { // {3}
  //     // 遍历链表来寻找键/值
  //     var current = table[position].getHead(); // {4}

  //     while(current.next) { // {5}
  //       if (current.element.key === key) { // {6}
  //         return current.element.value; // {7}
  //       }
  //       current = current.next; // {8}
  //     }

  //     // 检查元素在链表第一个或最后一个节点的情况
  //     if (current.element.key === key) { // {9}
  //       return current.element.value;
  //     }
  //   }
  //   return undefined; // {10}
  // }

  // 线性探查 get
  this.get = function(key) {
    var position = djb2HashCode(key);
    if (table[position] !== undefined) { // {8}
      if (table[position].key === key) { // {9}
        return table[position].value; // {10}
      } else {
        var index = ++position;
        while (table[index] === undefined || table[index].key !== key) { // {11}
          index++;
        }
        if (table[index].key === key) { // {12}
          return table[index].value; // {13}
        }
      }
    }
    return undefined; // {14}
  };


  // // 分离链接法 remove
  // this.remove = function(key){
  //   // table[loseloseHashCode(key)] = undefined;

  //   var position = loseloseHashCode(key);

  //   if (table[position] !== undefined) {
  //     var current = table[position].getHead();
  //     while(current.next) {
  //       if (current.element.key === key) { // {11}
  //         table[position].remove(current.element); // {12}
  //         if (table[position].isEmpty()) { // {13}
  //           table[position] = undefined; // {14}
  //         }
  //         return true; // {15}
  //       }
  //       current = current.next;
  //     }

  //     // 检查是否为第一个或最后一个元素
  //     if (current.element.key === key) { // {16}
  //       table[position].remove(current.element);
  //       if (table[position].isEmpty()) {
  //         table[position] = undefined;
  //       }
  //       return true;
  //     }
  //   }
  //   return false; // {17}
  // }


  // 线性探查 remove
  this.remove = function(key){
    var position = djb2HashCode(key);
    if (table[position] !== undefined) { // {8}
      if (table[position].key === key) { // {9}
        // return table[position].value; // {10}
        table[position] = undefined;
      } else {
        var index = ++position;
        while (table[index] === undefined || table[index].key !== key) { // {11}
          index++;
        }
        if (table[index].key === key) { // {12}
          // return table[index].value; // {13}
          table[index] = undefined;
        }
      }
    }
    // return undefined; // {14}
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

// 线性探查，当想向表中某个位置加入一个新元素的时候，如果索引为index的位置已经被占据了，就尝试index+1的位置。如果index+1的位置也被占据了，就尝试index+2
