# Neon PathVisualizer 

A highly futuristic, interactive shortest-path visualizer built with modern, declarative vanilla JavaScript, HTML, and CSS. The application allows users to build and run multiple shortest-path algorithms on customizable node-edge networks, featuring sleek glassmorphism aesthetics and real-time computation KPI metrics.

## Features 

### Graph Customization
- **Interactive Canvas**: Drag and drop nodes, interconnect nodes by dynamically adding edge weights.
- **Dynamic Control**: Supports both Directed and Undirected graphs.
- **Built-in Samples**: Load pre-constructed mazes natively (Negative Edges, Cartesian Grids, Dense Networks).
- **Graceful Error Handling**: Complete Toast notification system handles negative edge weights, negative cycles, and unreachable graph connections without halting.

### Algorithms Included 
All pathfinding logic is formally decoupled into an independent `algorithms.js` module.
1. **A* (A-Star) Search**: Utilizes geometric spatial coordinates to estimate heuristic movement cost for lightning-fast performance in mapping scenarios.
2. **Dijkstra's Algorithm**: The foundational greedy uniform cost search. Ideal for standard networks without negative weights.
3. **Bellman-Ford**: Effectively handles networks containing negative-weight routes, and rigorously traps and reports negative-weight cycles.
4. **Floyd-Warshall**: A robust dynamic programming method that computes all node-to-node pairs simultaneously.

## Run Locally 
This is a standard client-side zero-dependency framework application.
1. Clone or download the source files.
2. Open `index.html` in any modern web browser.
3. (Optional) Run a lightweight local HTTP server if you ever transition the internal scripts to ES Modules.

## Architecture & Code Structure 
- `index.html`: Handles the full CSS grid responsive UI layout, the Canvas API rendering logic, and the UI-interaction layer.
- `algorithms.js`: A structurally decoupled pure-logic graph module processing arrays of nodes and edges without DOM reliance.

## Device Optimization 📱
The engine evaluates the window space and re-orients the CSS grid vertically to stack components cleanly on mobile screens. It natively includes responsive overlay alerts suggesting landscape-device rotation whenever it's optimal.
