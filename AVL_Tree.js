/**
 * BST存在一个问题：取决于你添加的节点数，树的一条边可能会非常深；也就是说，树的一条分支会有很多层，而其他的分支却只有几层.这会在需要在某条边上添加、移除和搜索某个节点时引起一些性能问题.
 * 为了解决这个问题，有一种树叫作Adelson-Velskii-Landi树（AVL树）。AVL树是一种自平衡二叉搜索树，意思是任何一个节点左右两侧子树的高度之差最多为1。也就是说这种树会在添加或移除节点时尽量试着成为一棵完全树。
 */
function AVLBinarySearchTree() {
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

  // /**
  //  * 将节点加在非根节点的其他位置 
  //  * @param {*} node 
  //  * @param {*} newNode 
  //  */
  // var insertNode = function(node, newNode) {
  //   if (newNode.key < node.key) { // {4}
  //     if (node.left === null) { // {5}
  //       node.left = newNode; // {6}
  //     } else {
  //       insertNode(node.left, newNode); // {7}
  //     }
  //   } else {
  //     if (node.right === null) { // {8}
  //       node.right = newNode; // {9}
  //     } else {
  //       insertNode(node.right, newNode); // {10}
  //     }
  //   }
  // }

  var insertNode = function(node, element) {
    if (node === null) {
      node = new Node(element);
    } else if (element < node.key) {
      node.left = insertNode(node.left, element);

      if (node.left !== null) {
        // 确认是否需要平衡 {1}
        if ((heightNode(node.left) - heightNode(node.right)) > 1) {
          // 旋转 {3}
          if (element < node.left.key) {
            node = rotationLL(node);
          } else {
            node = rotationLR(node);
          }
        }
      } else if (element > node.key) {
        node.right = insertNode(node.right, element);

        if (node.right !== null) {
          // 确认是否需要平衡 {2}
          if ((heightNode(node.right) - heightNode(node.left)) > 1) {
            // 旋转 {4}
            if (element > node.right.key) {
              node = rotationRR(node);
            } else {
              node = rotationRL(node);
            }
          }
        }
      }
      return node;
    }
  }

  /**
   * 右-右（RR）：向左的单旋转
   * @param {*} node 
   */
  var rotationRR = function(node) {
    var tmp = node.right; // {1}
    node.right = tmp.left; // {2}
    tmp.left = node; // {3}
    return tmp;
  }

  /**
   * 左-左（LL）：向右的单旋转
   * @param {*} node 
   */
  var rotationLL = function(node) {
    var tmp = node.left; // {1}
    node.left = tmp.right; // {2}
    tmp.right = node;
    return tmp;
  }

  /**
   * 左-右（LR）：向右的双旋转
   * @param {*} node 
   */
  var rotationLR = function(node) {
    node.left = rotationRR(node.left);
    return rotationLL(node);
  }

  /**
   * 右-左（RL）：向左的双旋转
   * @param {*} node 
   */
  var rotationRL = function(node) {
    node.right = rotationLL(node.right);
    return rotationRR(node);
  }

  var heightNode = function(node) {
    if (node === null) {
      return -1;
    } else {
      return Math.max(heightNode(node.left), heightNode(node.right)) + 1;
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

var tree = new AVLBinarySearchTree();
tree.insert(50);
tree.insert(30);


function printNode(value) { // {6}
  console.log(value);
}

tree.inOrderTraverse(printNode); // 50 ???
console.log('-------------------------');

// ----------------------------
// 尽管AVL树是自平衡的，其插入或移除节点的性能并不总是最好的。更好的选择是红黑树。红黑树可以高效有序地遍历其节点
// 堆积树
// ----------------------------
