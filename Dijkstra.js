/**
 * Dijkstra算法是一种计算从单个源到所有源的最短路径的贪心算法。可以用它来计算从图的一个顶点到其余各顶点的最短路径。
 */

var graph = [[0, 2, 4, 0, 0, 0],
             [0, 0, 1, 4, 2, 0],
             [0, 0, 0, 0, 0, 2],
             [0, 0, 0, 0, 0, 2],
             [0, 0, 0, 3, 0, 2],
             [0, 0, 0, 0, 0, 0]];

this.dijkstra = function(src) {
  var dist = [], visited = [],
    length = this.graph.length;

  for (var i = 0; i < length; i++) { // {1}
    dist[i] = INF;
    visited[i] = false;
  }
  dist[src] = 0; // {2}

  for (var i = 0; i < length - 1; i++) { // {3}
    var u = minDistance(dist, visited); // {4}

    visited[u] = true; // {5}

    for (var v = 0; v < length; v++) {
      if (!visited[v] && this.graph[u][v] != 0 && dist[u] != INF && dist[u] + this.graph[u][v] < dist[v]) { // {6}
        dist[v] = dist[u] + this.graph[u][v]; // {7}
      }
    }
  }
  return dist; // {8}
}

var minDistance = function(dist, visited) {
  var min = INF, minIndex = -1;
  for (var v = 0; v < dist.length; v++) {
    if (visited[v] == false && dist[v] <= min) {
      min = dist[v];
      minIndex = v;
    }
  }
  return minIndex;
}