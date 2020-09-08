var  map = new WeakMap();

var ob1 = {name: 'Gandalf'}, // {1}
    ob2 = {name: 'John'},
    ob3 = {name: 'Tyrion'};

map.set(ob1, 'gandalf@email.com'); // {2}
map.set(ob2, 'johnsnow@email.com');
map.set(ob3, 'tyrion@email.com');


console.log(map.has(ob1));
console.log(map.get(ob3));
map.delete(ob2);