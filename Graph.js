/**
 * 非线性数据结构-图。图是网络结构的抽象模型。图是一组由边连接的节点（或顶点）。任何二元关系都可以用图来表示。
 * 由一条边连接在一起的顶点称为相邻顶点。
 * 一个顶点的度是其相邻顶点的数量。
 * 路径是顶点v1,v2,...,vk的一个连续序列，其中vi和vi+1是相邻的。
 * 简单路径要求不包含重复的顶点。
 */
function Graph() {
  var vertices = []; // {1}
  var adjList = new Dictionary(); // {2}

  this.addVertex = function(v) {
    vertices.push(v); // {3}
    adjList.set(v, []);
  }

  this.addEdge = function(v, w) {
    adjList.get(v).push(w); // {5}
    adjList.get(w).push(v); // {6}
  }

  this.toString = function() {
    var s = '';
    for (var i = 0; i < vertices.length; i++) { // {10}
      s += vertices[i].toString() + ' -> ';
      var neighbors = adjList.get(vertices[i]); // {11}
      for (var j = 0; j < neighbors.length; j++) { // {12}
        s += neighbors[j] + ' ';
      }
      s += '\n'; // {13}
    }
    return s;
  }

  //------------ 广度优先搜索(Breadth-First Search, BFS) ----------
  var initializeColor = function() {
    var color = [];
    for (var i = 0; i < vertices.length; i++) {
      color[vertices[i]] = 'white'; // {1}
    }
    return color;
  }

  function Queue() {
    let items = []
    this.enqueue = function (element) {
      items.push(element)
    }
    this.dequeue = function () {
      return items.shift()
    }
    this.front = function () {
      return items[0]
    }
    this.isEmpty = function () {
      return items.length == 0
    }
    this.size = function () {
      return items.length
    }
    this.print = function () {
      console.log(items.toString())
    }
  }

  // this.bfs = function(v, callback) {
  //   var color = initializeColor(), // {2}
  //   queue = new Queue(); // {3}
  //   queue.enqueue(v); // {4}

  //   while (!queue.isEmpty()) { // {5}
  //     var u = queue.dequeue(), // {6}
  //     neighbors = adjList.get(u); // {7}
  //     color[u] = 'grey'; // {8}
  //     for (var i = 0; i < neighbors.length; i++) { // {9}
  //       var w = neighbors[i]; // {10}
  //       if (color[w] === 'white') { // {11}
  //         color[w] = 'grey'; // {12}
  //         queue.enqueue(w); // {13}
  //       }
  //     }
  //     color[u] = 'black'; // {14}
  //     if (callback) { // {15}
  //       callback(u);
  //     }
  //   }
  // }

  /**
   * 使用BFS寻找最短路径
   * @param {*} v 
   */
  this.BFS = function(v) {
    var color = initializeColor(),
    queue = new Queue(),
    d = [], // {1}
    pred = []; // {2}
    queue.enqueue(v);

    for (var i = 0; i < vertices.length; i++) { // {3}
      d[vertices[i]] = 0; // {4}
      pred[vertices[i]] = null; // {5}
    }

    while(!queue.isEmpty()) {
      var u = queue.dequeue(),
      neighbors = adjList.get(u);
      color[u] = 'grey';
      for (i = 0; i < neighbors.length; i++) {
        var w = neighbors[i];
        if (color[w] === 'white') {
          color[w] = 'grey';
          d[w] = d[u] + 1; // {6}
          pred[w] = u; // {7}
          queue.enqueue(w);
        }
      }
      color[u] = 'black';
    }
    return { // {8}
      distances: d,
      predecessors: pred
    }
  }
  //------------ BFS End ----------

  /**
   * 深度优先算法
   * @param {*} callback 
   */
  this.dfs = function(callback) {
    var color = initializeColor(); // {1}
    for (var i = 0; i < vertices.length; i++) { // {2}
      if (color[vertices[i]] === 'white') { // {3}
        dfsVisit(vertices[i], color, callback); // {4}
      }
    }
  }

  var dfsVisit = function(u, color, callback) {
    color[u] = 'grey'; // {5}
    if (callback) { // {6}
      callback(u)
    }
    var neighbors = adjList.get(u); // {7}
    for (var i = 0; i < neighbors.length; i++) { // {8}
      var w = neighbors[i]; // {9}
      if (color[w] === 'white') { // {10}
        dfsVisit(w, color, callback); // {11}
      }
    }
    color[u] = 'black'; // {12}
  }

  // 改进 DFS 方法
  var time = 0; // {1}
  this.DFS = function() {
    var color = initializeColor(), // {2}
    d = [],
    f = [],
    p = [];
    time = 0;

    for (var i = 0; i < vertices.length; i++) { // {3}
      f[vertices[i]] = 0;
      d[vertices[i]] = 0;
      p[vertices[i]] = null;
    }
    for (var i = 0; i < vertices.length; i++) {
      if (color[vertices[i]] === 'white') {
        DFSVisit(vertices[i], color, d, f, p)
      }
    }
    return {
      discovery: d,
      finished: f,
      predecessors: p
    }
  }

  var DFSVisit = function(u, color, d, f, p) {
    console.log('discovered ' + u)
    color[u] = 'grey';
    d[u] = ++time; // {5}
    var neighbors = adjList.get(u);
    for (var i = 0; i < neighbors.length; i++) {
      var w = neighbors[i];
      if (color[w] === 'white') {
        p[w] = u; // {6}
        DFSVisit(w, color, d, f, p);
      }
    }
    color[u] = 'black';
    f[u] = ++time; // {7}
    console.log('explored ' + u);
  }

  // 最小生成树（MST）问题是网络设计中常见的问题

  /**
   * Prim 算法是一种求解加权无向连通图的MST问题的贪心算法。
   */
  this.prim = function() {
    var parent = [],
      key = [],
      visited = [],
      length = this.graph.length,
      i;
    
    for (i = 0; i < length; i++) { // {1}
      key[i] = INF;
      visited[i] = false;
    }

    key[0] = 0; // {2}
    parent[0] = -1;

    for (i = 0; i < length - 1; i++) { // {3}
      var u = minKey(key, visited); // {4}
      visited[u] = true; // {5}

      for (var v = 0; v < length; v++) {
        if (this.graph[u][v] && visited[v] == false
        && this.graph[u][v] < key[v]) { // {6}
          parent[v] = u; // {7}
          key[v] = this.graph[u][v]; // {8}
        }
      }
    }
    return parent; // {9}
  }

  // 选出 key 值最小的顶点
  var minKey = function(dist, visited) {
    var min = INF, minIndex = -1;
    for (var v = 0; v < dist.length; v++) {
      if (visited[v] == false && dist[v] <= min) {
        min = dist[v];
        minIndex = v;
      }
    }
    return minIndex;
  }

  /**
   * Kruskal 算法也是一种加权无向连通图的MST的贪心算法
   */
  this.kruskal = function () {
    var length = this.graph.length,
    parent = [], cost,
    ne = 0, a, b, u, v, i, j, min;
    cost = initializeCost(); // {1}

    while (ne < length - 1) { // {2}
      for (i = 0, min = INF; i < length; i++) { // {3}
        for (j = 0; j < length; j++) {
          if (cost[i][j] < min) {
            min = cost[i][j];
            u = i;
            v = j;
          }
        }
      }

      u = find(u, parent); // {4}
      v = find(v, parent); // {5}

      if (union(u, v, parent)) { // {6}
        ne++;
      }

      cost[u][v] = cost[v][u] = INF; // {7}
    }
    return parent;
  }

  /**
   * find函数， 方式 MST 出现环路
   * @param {*} i 
   * @param {*} parent 
   */
  var find = function(i, parent) {
    while (parent[i]) {
      i = parent[i];
    }
    return i;
  }

  var union = function(i, j, parent) {
    if (i != j) {
      parent[j] = i;
      return true;
    }
    return false;
  }
}

/**
 * 字典类
 */
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

var graph = new Graph();
var myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']; // {7}
for (var i = 0; i < myVertices.length; i++) { // {8}
  graph.addVertex(myVertices[i]);
}
graph.addEdge('A', 'B'); //{9}
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');

console.log(graph.toString());

function printNode(value) { // {16}
  console.log('Visited vertex: ' + value); // {17}
}

// graph.bfs(myVertices[0], printNode); // {18}

var shortestPathA = graph.BFS(myVertices[0]);
console.log(shortestPathA);


function Stack() {
  let items = [];
  
  this.push = function(element) {
    items.push(element);
  }

  this.pop = function () {
    return items.pop();
  }

  this.peek = function () {
    return items[items.length - 1];
  }

  this.isEmpty = function () {
    return items.length == 0;
  }

  this.size = function () {
    return items.length;
  }

  this.clear = function () {
    items = [];
  }

  this.print = function () {
    console.log(items);
    // console.log(items.toString());
  }
}

// 通过前溯点数组，构建顶点A到其他顶点的路径
var fromVertex = myVertices[0]; // {9}
for (var i = 1; i < myVertices.length; i++) { // {10}
  var toVertex = myVertices[i], // {11}
  path = new Stack(); // {12}
  for (var v = toVertex; v !== fromVertex; v = shortestPathA.predecessors[v]) { // {13}
    path.push(v); // {14}
  }
  path.push(fromVertex); // {15}
  var s = path.pop(); // {16}
  while(!path.isEmpty()) { // {17}
    s += ' - ' + path.pop(); // {18}
  }
  console.log(s); // {19}
}

// 测试 dfs 方法
graph.dfs(printNode)

// 测试改进的 DFS 方法
graph.DFS();

console.log('----------------------------------')

let graph2 = new Graph();
myVertices2 = ['A', 'B', 'C', 'D', 'E', 'F'];
for (var i = 0; i < myVertices2.length; i++) {
  graph2.addVertex(myVertices2[i]);
}
graph2.addEdge('A', 'C');
graph2.addEdge('A', 'D');
graph2.addEdge('B', 'D');
graph2.addEdge('B', 'E');
graph2.addEdge('C', 'F');
graph2.addEdge('F', 'E');
var result2 = graph2.DFS();
console.log('result2 ', result2);

