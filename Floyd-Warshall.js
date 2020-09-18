/**
 * Floyd-Warshall算法是一种计算图中所有最短路径的动态规划算法。
 */
this.folydWarshall = function() {
  var dist = [],
    length = this.graph.length,
    i, j, k;
  
  for (i = 0; i < length; i++) { // {1}
    dist[i] = [];
    for (j = 0; j < length; j++) {
      dist[i][j] = this.graph[i][j];
    }
  }

  for (k = 0; k < length; k++) { // {2}
    for (i = 0; i < length; i++) {
      for (j = 0; j < length; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) { // {3}
          dist[i][j] = dist[i][k] + dist[k][j]; // {4}
        }
      }
    }
  }
  return dist;
}

