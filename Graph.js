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
