/**
 * 树是一种分层数据的抽象模型。一个树结构包含一系列存在父子关系的节点。
 * 二叉树中的节点最多只能有两个子节点：一个是左侧子节点，一个是右侧子节点。
 * 二叉搜索树（BST) 是二叉树的一种，但是它只允许再左侧节点存储(比父节点)小的值，在右侧节点存储(比父节点)大(或等于)的值。
 */
function BinarySearchTree() {
  var Node = function(key) { // {1}
    this.key = key;
    this.left = null;
    this.right = null;
  };
  var root = null; // {2}

  /**
   * 向树插入一个新键  
   * @param {*} key 
   */
  this.insert = function(key) {
    var newNode = new Node(key); // {1}
    if (root === null) { // {2}
      root = newNode;
    } else {
      insertNode(root, newNode); // {3}
    }
  }

  /**
   * 将节点加在非根节点的其他位置 
   * @param {*} node 
   * @param {*} newNode 
   */
  var insertNode = function(node, newNode) {
    if (newNode.key < node.key) { // {4}
      if (node.left === null) { // {5}
        node.left = newNode; // {6}
      } else {
        insertNode(node.left, newNode); // {7}
      }
    } else {
      if (node.right === null) { // {8}
        node.right = newNode; // {9}
      } else {
        insertNode(node.right, newNode); // {10}
      }
    }
  }

  /**
   * 中序遍历是一种以上行顺序访问BST所有节点的遍历方式，也就是以从最小到最大的顺序访问所有节点。中序遍历的一种应用就是对树进行排序操作。
   * @param {*} callback 
   */
  this.inOrderTraverse = function(callback) {
    inOrderTraverseNode(root, callback); // {1}
  }

  /**
   * 中序遍历私有辅助函数，接收一个节点和对应的回调函数作为参数
   * @param {*} node 
   * @param {*} callback 
   */
  var inOrderTraverseNode = function(node, callback) {
    if (node !== null) { // {2}
      inOrderTraverseNode(node.left, callback); // {3}
      callback(node.key); // {4}
      inOrderTraverseNode(node.right, callback); // {5}
    }
  }

  /**
   * 先序遍历是以优先于后代节点的顺序访问每个节点。先序遍历的一种应用就是打印一个结构化的文档。
   * @param {*} callback 
   */
  this.preOrderTraverse = function(callback) {
    preOrderTraverseNode(root, callback);
  }

  /**
   * 先序遍历私有辅助函数，接收一个节点和对应的回调函数作为参数 
   * @param {*} node 
   * @param {*} callback 
   */
  var preOrderTraverseNode = function(node, callback) {
    if (node !== null) {
      callback(node.key); // {1}
      preOrderTraverseNode(node.left, callback); // {2}
      preOrderTraverseNode(node.right, callback); // {3}
    }
  }

  /**
   * 后序遍历则是先访问节点的后代节点，再访问节点本身。后序遍历的一种应用是计算一个目录和它的子目录中所有文件所占空间的大小。
   * @param {*} callback 
   */
  this.postOrderTraverse = function(callback) {
    postOrderTraverseNode(root, callback);
  }

  /**
   * 后序遍历私有辅助函数，接受一个节点和对应的回调函数作为参数
   * @param {*} node 
   * @param {*} callback 
   */
  var postOrderTraverseNode = function(node, callback) {
    if (node !== null) {
      postOrderTraverseNode(node.left, callback); // {1}
      postOrderTraverseNode(node.right, callback); // {2}
      callback(node.key); // {3}
    }
  }

  /**
   * 查找最小值
   */
  this.min = function() {
    return minNode(root); // {1}
  }

  /**
   * 寻找树的最小键
   * @param {*} node 
   */
  var minNode = function(node) {
    if (node) {
      while (node && node.left !== null) { // {2}
        node = node.left; // {3}
      }
      return node.key;
    }
    return null; // {4}
  }

  /**
   * 查找最大值
   */
  this.max = function() {
    return maxNode(root);
  }

  /**
   * 寻找树的最大键
   * @param {*} node 
   */
  var maxNode = function(node) {
    if (node) {
      while(node && node.right !== null) {
        node = node.right;
      }
      return node.key;
    }
    return null;
  }

  /**
   * 搜索一个特定的值
   * @param {*} key 
   */
  this.search = function(key) {
    return searchNode(root, key); // {1}
  }

  /**
   * 搜索 node key 是否存在
   * @param {*} node 
   * @param {*} key
   */
  var searchNode = function(node, key) {
    if (node === null) { // {2}
      return false;
    }
    if (key < node.key) { // {3}
      return searchNode(node.left, key); // {4}
    } else if (key > node.key) { // {5}
      return searchNode(node.right, key); // {6}
    } else {
      return true; // {7}
    }
  }

  /**
   * 移除一个节点
   * @param {*} key 
   */
  this.remove = function(key) {
    root = removeNode(root, key); // {1}
  }

  /**
   * 移除节点
   * @param {*} node 
   * @param {*} key 
   */
  var removeNode = function(node, key) {
    if (node === null) { // {2}
      return null;
    }
    if (key < node.key) { // {3}
      node.left = removeNode(node.left, key); // {4}
      return node; // {5}
    } else if (key > node.key) { // {6}
      node.right = removeNode(node.right, key); // {7}
      return node; // {8}
    } else { // key === node.key

      // 一，一个叶节点
      if (node.left === null && node.right === null) { // {9}
        node = null; // {10}
        return node; // {11}
      }

      // 二，一个只有一个子节点的节点
      if (node.left === null) { // {12}
        node = node.right; // {13}
        return node; // {14}
      } else if (node.right === null) { // {15}
        node = node.left; // {16}
        return node; // {17}
      }

      // 三，一个有两个子节点的节点
      var aux = findMinNode(node.right); // {18}
      node.key = aux.key; // {19}
      node.right = removeNode(node.right, aux.key); // {20}
      return node; // {21}
    }
  }

  var findMinNode = function(node) {
    while(node && node.left !== null) {
      node = node.left;
    }
    return node;
  }
}

var tree = new BinarySearchTree();
tree.insert(11);
tree.insert(7); 
tree.insert(15); 
tree.insert(5); 
tree.insert(3); 
tree.insert(9); 
tree.insert(8); 
tree.insert(10); 
tree.insert(13); 
tree.insert(12); 
tree.insert(14); 
tree.insert(20); 
tree.insert(18); 
tree.insert(25);
tree.insert(6);


function printNode(value) { // {6}
  console.log(value);
}

tree.inOrderTraverse(printNode); // 3 5 6 7 8 9 10 11 12 13 14 15 18 20 25
console.log('-------------------------');

tree.preOrderTraverse(printNode); // 11 7 5 3 6 9 8 10 15 13 12 14 20 18 25
console.log('-------------------------');

tree.postOrderTraverse(printNode); // 3 6 5 8 10 9 7 12 14 13 18 25 20 15 11
console.log('-------------------------');

console.log(tree.search(1) ? 'Key 1 found.' : 'Key 1 not found.');
console.log(tree.search(8) ? 'Key 8 found.' : 'Key 8 not found.');


console.log('remove node.key=3 node');
tree.remove(3);
tree.inOrderTraverse(printNode); // 5 6 7 8 9 10 11 12 13 14 15 18 20 25
