class MinHeap {
  constructor() { this.a = []; }
  push(item) { this.a.push(item); this._up(this.a.length - 1); }
  _up(i) {
    const a = this.a;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (a[p].key <= a[i].key) break;
      [a[p], a[i]] = [a[i], a[p]];
      i = p;
    }
  }
  pop() {
    const a = this.a;
    if (a.length === 0) return null;
    const top = a[0];
    const last = a.pop();
    if (a.length) {
      a[0] = last;
      this._down(0);
    }
    return top;
  }
  _down(i) {
    const a = this.a;
    const n = a.length;
    while (true) {
      let l = i * 2 + 1, r = l + 1, s = i;
      if (l < n && a[l].key < a[s].key) s = l;
      if (r < n && a[r].key < a[s].key) s = r;
      if (s === i) break;
      [a[s], a[i]] = [a[i], a[s]];
      i = s;
    }
  }
  get size() { return this.a.length; }
}

function buildAdjList(nodes, edges) {
  const adj = new Map();
  nodes.forEach(n => adj.set(n.id, []));
  for (const e of edges) {
    adj.get(e.u).push({ to: e.v, w: e.w });
    if (!e.directed) adj.get(e.v).push({ to: e.u, w: e.w });
  }
  return adj;
}

function hasNegativeEdge(edges) {
  return edges.some(e => e.w < 0);
}

function dijkstra(sourceId, nodes, edges) {
  if (hasNegativeEdge(edges)) return { error: 'Dijkstra cannot handle negative edge weights.' };
  const adj = buildAdjList(nodes, edges);
  const dist = new Map(), prev = new Map();
  nodes.forEach(n => dist.set(n.id, Infinity));
  dist.set(sourceId, 0);
  
  const heap = new MinHeap();
  heap.push({ key: 0, id: sourceId });
  
  while (heap.size) {
    const { key: d, id: u } = heap.pop();
    if (d !== dist.get(u)) continue; // stale
    
    for (const { to: v, w } of adj.get(u)) {
      const nd = d + w;
      if (nd < dist.get(v)) {
        dist.set(v, nd);
        prev.set(v, u);
        heap.push({ key: nd, id: v });
      }
    }
  }
  return { dist, prev, negativeCycle: false };
}

function bellmanFord(sourceId, nodes, edgesArr) {
  const V = nodes.map(n => n.id);
  const dist = new Map(V.map(id => [id, Infinity]));
  const prev = new Map();
  dist.set(sourceId, 0);

  const edges = [];
  for (const e of edgesArr) {
    edges.push([e.u, e.v, e.w]);
    if (!e.directed) edges.push([e.v, e.u, e.w]);
  }

  for (let i = 0; i < V.length - 1; i++) {
    let updated = false;
    for (const [u, v, w] of edges) {
      if (dist.get(u) + w < dist.get(v)) {
        dist.set(v, dist.get(u) + w);
        prev.set(v, u);
        updated = true;
      }
    }
    if (!updated) break;
  }

  // Negative cycle detection
  for (const [u, v, w] of edges) {
    if (dist.get(u) + w < dist.get(v)) {
      return { error: 'Negative cycle reachable from source.', negativeCycle: true };
    }
  }
  return { dist, prev, negativeCycle: false };
}

function floydWarshall(nodes, edgesArr) {
  const ids = nodes.map(n => n.id);
  const idx = new Map(ids.map((id, i) => [id, i]));
  const n = ids.length;
  const dist = Array.from({ length: n }, () => Array(n).fill(Infinity));
  const next = Array.from({ length: n }, () => Array(n).fill(null));
  
  for (let i = 0; i < n; i++) dist[i][i] = 0;

  for (const e of edgesArr) {
    const i = idx.get(e.u), j = idx.get(e.v);
    dist[i][j] = Math.min(dist[i][j], e.w);
    next[i][j] = j;
    if (!e.directed) {
      dist[j][i] = Math.min(dist[j][i], e.w);
      next[j][i] = i;
    }
  }

  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      const dik = dist[i][k];
      if (dik === Infinity) continue;
      for (let j = 0; j < n; j++) {
        const alt = dik + dist[k][j];
        if (alt < dist[i][j]) {
          dist[i][j] = alt;
          next[i][j] = next[i][k];
        }
      }
    }
  }

  let negCycle = false;
  for (let i = 0; i < n; i++) {
    if (dist[i][i] < 0) { negCycle = true; break; }
  }

  function path(uId, vId) {
    if (next.length === 0) return [];
    const i = idx.get(uId), j = idx.get(vId);
    if (i == null || j == null) return [];
    if (next[i][j] == null) return [];
    const p = [i];
    let cur = i;
    while (cur !== j) {
      cur = next[cur][j];
      if (cur == null) return [];
      p.push(cur);
      if (p.length > n + 5) break; // guard against cycle
    }
    return p.map(k => ids[k]);
  }

  return { dist, path, ids, negCycle };
}

function heuristic(uId, vId, nodes) {
  const u = nodes.find(n => n.id === uId);
  const v = nodes.find(n => n.id === vId);
  if (!u || !v) return 0;
  return Math.hypot(u.x - v.x, u.y - v.y);
}

function aStar(sourceId, targetId, nodes, edges) {
  if (hasNegativeEdge(edges)) return { error: 'A* cannot handle negative edge weights.' };
  
  const adj = buildAdjList(nodes, edges);
  const dist = new Map(), prev = new Map(), fScore = new Map();
  nodes.forEach(n => {
    dist.set(n.id, Infinity);
    fScore.set(n.id, Infinity);
  });
  
  dist.set(sourceId, 0);
  fScore.set(sourceId, heuristic(sourceId, targetId, nodes));
  
  const heap = new MinHeap();
  heap.push({ key: fScore.get(sourceId), id: sourceId });
  
  while (heap.size) {
    const { id: u } = heap.pop();
    
    if (u === targetId) {
       return { dist, prev, negativeCycle: false };
    }
    
    for (const { to: v, w } of adj.get(u)) {
      const tentativeDist = dist.get(u) + w;
      if (tentativeDist < dist.get(v)) {
        dist.set(v, tentativeDist);
        prev.set(v, u);
        const f = tentativeDist + heuristic(v, targetId, nodes);
        fScore.set(v, f);
        heap.push({ key: f, id: v });
      }
    }
  }
  
  return { dist, prev, negativeCycle: false };
}

function reconstructPath(prev, s, t) {
  const path = [];
  let cur = t;
  if (!prev && s === t) return [s];
  const visited = new Set();
  while (cur != null && cur !== s) {
    if (visited.has(cur)) break;
    visited.add(cur);
    path.push(cur);
    cur = prev.get(cur);
  }
  if (cur === s) {
    path.push(s);
    path.reverse();
    return path;
  }
  return [];
}
