function Dictionary() {
  var items = {};

  // 如果某个键值存在于这个字典中，则返回true，反之则返回false
  this.has = function(key) {
    return key in items;
  }

  this.set = function(key, value) {
    items[key] = value; // {1}
  }

  this.delete = function(key) {
    if (this.has(key)) {
      delete items[key];
      return true;  
    }
    return false;
  }

  this.get = function(key) {
    return this.has(key) ? items[key]: undefined;
  }

  this.values = function() {
    var values = [];
    for (var k in items) { // {1}
      if (this.has(k)) {
        values.push(items[k]); // {2}
      }
    }
    return values;
  }

  this.clear = function() {
    items = {};
  }

  this.size = function() {
    return Object.keys(items).length;
  }

  this.keys = function() {
    return Object.keys(items);
  }

  this.getItems = function() {
    return items;
  }
}

var dictionary = new Dictionary();
dictionary.set('Guo', 'guo@email.com');
dictionary.set('Zhang', 'zhang@email.com');
dictionary.set('Kyle', 'kyle@email.com');

console.log(dictionary.getItems());
console.log(dictionary.has('Guo'));
console.log(dictionary.has('G'));

console.log(dictionary.size());
console.log(dictionary.keys());
console.log(dictionary.values());
console.log(dictionary.get('Guo'));

console.log(dictionary.getItems());

dictionary.delete('Guo');
console.log(dictionary.getItems());

console.log(dictionary.keys());