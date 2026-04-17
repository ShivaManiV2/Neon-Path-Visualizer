# Shortest Path Visualizer

A dynamic web application built to visualize various pathfinding algorithms in real-time. This tool helps users understand how algorithms like Dijkstra's and BFS navigate through grids, obstacles, and weighted paths.

[Insert Live Demo Link Here]

## 🚀 Features
- **Real-time Visualization:** Watch the algorithm explore nodes and find the final path step-by-step.
- **Interactive Grid:** - Drag and drop Start and End nodes.
  - Draw walls/obstacles by clicking and dragging.
- **Algorithms Supported:**
  - **Dijkstra’s Algorithm:** The father of pathfinding; guarantees the shortest path.
  - **A* Search:** Uses heuristics to find the path much faster than Dijkstra.
  - **Breadth-First Search (BFS):** Guarantees the shortest path on unweighted graphs.
  - **Depth-First Search (DFS):** Explores as far as possible before backtracking (not ideal for shortest path).
- **Customizable Speed:** Adjust the visualization speed to see the logic in detail or get results instantly.

## 🛠️ Tech Stack
- **Frontend:** React.js / JavaScript (ES6+)
- **Styling:** CSS3 (Flexbox/Grid and Animations)
- **State Management:** React Hooks (useState, useEffect)

## 📖 How it Works
The grid is represented as a 2D array where each "node" is an object containing coordinates, distance from start, and its status (isWall, isVisited, etc.). 
1. The algorithm is triggered with the start node.
2. It explores neighbors based on its specific logic (e.g., priority queue for Dijkstra).
3. Once the end node is reached, the "parent" pointers are used to backtrack and highlight the shortest path.

## 🏁 Getting Started

### Prerequisites
- Node.js installed on your machine.

### Installation
1. Clone the repository:
   ```bash
   git clone [https://github.com/ShivaManiV2/Shortest-Path-Visualizer.git](https://github.com/ShivaManiV2/Shortest-Path-Visualizer.git)
Navigate to the project directory:

Bash
cd Shortest-Path-Visualizer
Install dependencies:

Bash
npm install
Start the development server:

Bash
npm start
🤝 Contributing
Feel free to fork this project and submit a Pull Request. Improvements to the UI or adding new algorithms (like Bellman-Ford or Swarm) are always welcome!
