import { useState, useEffect } from "react";
import introVideo from "../../assets/videos/graph-intro.mp4";
import Zepto from "../../assets/videos/ZEPTO.mp4";
import weight from "../../assets/videos/weightgraph.mp4";
import bfs from "../../assets/videos/bfs.mp4";
import bfsi from "../../assets/videos/bfs.png";
import "./graph.css";
import {
  initPyodide,
  getPyodide,
  executePythonCode,
  resetPythonNamespace,
} from "../../core/python engine.js";
import { sections as DEFAULT_CELLS } from "./graph.model.js";

import Notebook from "../../components/notebook/Notebook.jsx";
import useNotebook from "../../components/notebook/useNotebook.js";

export default function Graphs() {
  const [isPyodideLoading, setIsPyodideLoading] = useState(!getPyodide());
  
  const {
    sections,
    handleReset,
    handleEditCode,
    addNewCellAfter,
    deleteCell,
    moveCell,
    runCell,
  } = useNotebook(DEFAULT_CELLS, executePythonCode);

  useEffect(() => {
    let active = true;

    const initialize = async () => {
      if (getPyodide()) {
        if (active) setIsPyodideLoading(false);
        return;
      }

      try {
        await initPyodide();
        if (active) setIsPyodideLoading(false);
      } catch (err) {
        console.error("Pyodide loading error:", err);
        if (active) setIsPyodideLoading(false);
      }
    };

    initialize();

    return () => {
      active = false;
    };
  }, []);

  const onReset = () => {
    resetPythonNamespace();
    handleReset();
  };

  return (
    <div>
      <div className="module-header">
        <h1>Graphs</h1>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          {isPyodideLoading && (
            <span className="pyodide-loader">
              🐍 Loading Python Engine...
            </span>
          )}
          <button className="btn-reset" onClick={onReset}>
            Reset to Default
          </button>
        </div>
      </div>

      <h3>
        Graphs are non-linear data structures consisting of vertices and edges.
        They are used to represent networks, relationships, and paths.
      </h3>

      <div className="write4">
          <h2>Introduction to Graph Algorithms</h2>

          <p>
              Imagine you are building a delivery app like Zepto.
              A rider is ready to deliver an order, and there are many possible roads connecting the store and the customer.
          </p>

          <p>
              The first question is simple:
          </p>

          <p>
              <strong>
                  Which route should the rider take to reach the customer as quickly as possible?
              </strong>
          </p>

          <p>
              To answer this question, we need a way to represent locations and the connections between them.
              This is where <strong>Graphs</strong> come in.
          </p>

          <p>
              Graph Algorithms help us find shortest paths, discover connections, build efficient networks, and solve many real-world problems involving relationships between things.
          </p>
      </div>

      <h2>WHY GRAPH ALGORITHMS?</h2>
            
      <div className="video-container">
        <video controls src={introVideo} className="module-video" />
      </div>
      

      <div className="write4">
          <h2>What is a Graph?</h2>

          <p>
              A Graph is a way of representing things and the connections between them.
          </p>

          <p>
              In our Zepto example, the locations such as stores, customers, and delivery hubs can be represented as <strong>Vertices (Nodes)</strong>.
          </p>

          <p>
              The roads connecting these locations can be represented as <strong>Edges</strong>.
          </p>

          <p>
              For example, if a road connects a store and a customer, we can draw an edge between their nodes.
          </p>

          <p>
              By connecting many nodes with edges, we can model an entire city as a graph.
          </p>

          <p>
              Once a problem is represented as a graph, powerful Graph Algorithms can be used to find shortest routes, detect connections, build networks, and solve many other real-world challenges.
          </p>
      </div>
      
      <div className="video-container">
        < video controls src={Zepto} className="module-video" />
      </div>

      <div className="write4">
        <h2>Components of a Graph</h2>

        <p>
            Every graph is built using two basic components:
            <strong>Vertices (Nodes)</strong> and <strong>Edges</strong>.
        </p>

        <div className="write3">
          <h3>Vertices (Nodes)</h3>

          <p>
              A Vertex represents an object or a location in a graph.
          </p>

          <p>
              In our Zepto example, stores, customers, and delivery hubs can all be represented as vertices.
          </p>
        </div>

        <div className="write3">
          <h3>Edges</h3>

          <p>
              An Edge represents a connection between two vertices.
          </p>

          <p>
              In our example, a road connecting two locations can be represented as an edge.
          </p>
        </div>

        <div className="write3">
          <h3>Weighted Edges</h3>

          <p>
              Sometimes connections have a cost associated with them.
          </p>

          <p>
              For example, a road may take 5 minutes to travel while another road may take 10 minutes.
          </p>

          <p>
              This cost is called a <strong>weight</strong>, and the graph is called a <strong>Weighted Graph</strong>.
          </p>
        </div>
        
        <div className="video-container">
            <video controls src={weight} className="module-video" />
        </div>

        <p>
            By combining vertices and edges, we can represent complex networks such as road maps, social networks, computer networks, and airline routes.
        </p>
      </div>


      <div className="write4">
        <h2>Types of Graphs</h2>

        <div className="write3">
          <h3>Undirected Graph</h3>

          <p>
              In an Undirected Graph, connections work in both directions.
          </p>

          <p>
              If location A is connected to location B, then location B is also connected to location A.
          </p>
        </div>

        <div className="write3">
          <h3>Directed Graph</h3>

          <p>
              In a Directed Graph, connections have a specific direction.
          </p>

          <p>
              A connection from A to B does not necessarily mean there is a connection from B to A.
          </p>

          <p>
              These connections are usually represented using arrows.
          </p>
        </div>

        <div className="write3">
          <h3>Weighted Graph</h3>

          <p>
              In a Weighted Graph, every edge has a value associated with it.
          </p>

          <p>
              The value may represent distance, travel time, cost, or any other measurement.
          </p>
        </div>

        <div className="write3">
          <h3>Cyclic Graph</h3>

          <p>
              A graph is called Cyclic if we can start from a vertex and return to the same vertex by following a path.
          </p>
        </div>

        <div className="write3">
          <h3>Acyclic Graph</h3>

          <p>
              A graph is called Acyclic if it does not contain any cycles.
          </p>
        </div>

        <p>
            Different problems require different types of graphs. Understanding the graph type helps us choose the right algorithm to solve the problem.
        </p>
     </div>

      <div className="write4">
        <h2>Graph Representation</h2>

        <p>
            So far, we have learned what a graph is and the different types of graphs.
        </p>

        <p>
            However, computers cannot directly understand vertices and edges drawn on paper.
        </p>

        <p>
            We need a way to store graphs inside our programs so that algorithms can work with them.
        </p>

        <p>
            There are two common ways to represent a graph:
        </p>

        <ol>
            <li>Adjacency Matrix</li>
            <li>Adjacency List</li>
        </ol>

        <div className="write3">
          <h3>Adjacency Matrix</h3>

          <p>
              An Adjacency Matrix uses a two-dimensional array to represent connections between vertices.
          </p>

          <p>
              If there is an edge between two vertices, we store 1. Otherwise, we store 0.
          </p>

          <p>
              This method is simple to understand but can use a lot of memory when the graph contains many vertices.
          </p>
        </div>

        <div className="write3">
          <h3>Adjacency List</h3>

          <p>
              An Adjacency List stores, for each vertex, a list of all vertices directly connected to it.
          </p>

          <p>
              Instead of storing every possible connection, we store only the existing edges.
          </p>

          <p>
              This approach is usually more memory efficient and is widely used in real-world applications.
          </p>
        </div>

        <p>
            Before we can find shortest paths or explore a graph, we first need a way to store it. Adjacency Matrix and Adjacency List provide that foundation.
        </p>
        <p> and we store in adjacency matrix</p>
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h2>Adjacency Matrix Example</h2>
        <img
          src="https://graphicmaths.com/img/computer-science/graph-theory/adjacency-matrices/simple-matrix.png"
          alt="Adjacency Matrix"
          style={{ maxWidth: "100%", height: "auto", border: "1px solid #ccc" }}
        />
      </div>



      <div className="method"> 
        <h3>The Method</h3>
        <h5>We follow these 6 steps to solve any problem in our study modules:</h5>
        
        <ol>
          <li>1. Understand the Goal, define problem input and output clearly </li>
          <li>2. Explore examples, Test Cases and edge cases.</li>
          <li>3. Discover a Baseline Approach,define the approch in plain english.</li>
          <li>4. Build the Solution.</li>
          <li>5.  Measure Performance.</li>
          <li>6. Improve and Generalize.</li>
        </ol>

      </div>

      <div className="write4">
          <h2>Step 1: Understand the Problem</h2>

          <p>
              Imagine a Zepto rider starting from a delivery hub.
          </p>

          <p>
              From the hub, the rider can directly reach a few nearby locations. After visiting those locations, the rider can move to locations that are farther away.
          </p>

          <p>
              Instead of going deep into one route, the rider explores the city level by level.
          </p>

          <div className="code">
              <pre>
      {`Hub
      │
      ├── A
      ├── B
      └── C

      A ── D
      B ── E
      C ── F`}
              </pre>
          </div>

          <p>
              The rider first visits:
          </p>

          <div className="code">
              <pre>
      {`Hub`}
              </pre>
          </div>

          <p>
              Then:
          </p>

          <div className="code">
              <pre>
      {`A, B, C`}
              </pre>
          </div>

          <p>
              And finally:
          </p>

          <div className="code">
              <pre>
      {`D, E, F`}
              </pre>
          </div>

          <p>
              Notice that all nearby locations are visited before moving to locations that are farther away.
          </p>

          <p>
              This level-by-level exploration is called <strong>Breadth First Search (BFS)</strong>.
          </p>

          <h3>The Problem</h3>

          <p>
              Given a graph and a starting vertex, visit every reachable vertex in level order.
          </p>

          <h3>Example</h3>

          <div className="code">
              <pre>
      {`A → B, C

      B → D, E

      C → F`}
              </pre>
          </div>

          <p>
              Starting from A, the BFS traversal should be:
          </p>

          <div className="code">
              <pre>
      {`A, B, C, D, E, F`}
              </pre>
          </div>

          <h3>Input</h3>

          <div className="code">
              <pre>
      {`graph = {
          'A': ['B', 'C'],
          'B': ['D', 'E'],
          'C': ['F'],
          'D': [],
          'E': [],
          'F': []
      }`}
              </pre>
          </div>

          <p>
              Starting vertex:
          </p>

          <div className="code">
              <pre>
      {`'A'`}
              </pre>
          </div>

          <h3>Output</h3>

          <div className="code">
              <pre>
      {`['A', 'B', 'C', 'D', 'E', 'F']`}
              </pre>
          </div>
        <div className="video-container">
            <video controls src={bfs} className="module-video" />
        </div>
        
        <div className="video-container">
            <img controls src={bfsi} className="module-video" />
        </div>

          <p>
              Before writing code, let's explore some test cases and understand how BFS behaves in different situations.
          </p>
      </div>

      <div className="write4">
          <h2>Step 2: Explore Test Cases</h2>

          <p>
              Before designing an algorithm, we should carefully examine different scenarios that a graph may contain.
          </p>

          <p>
              Test cases help us understand the expected behavior of Breadth First Search and reveal special situations that our solution must handle correctly.
          </p>

          <p>
              While exploring these test cases, we should remember one important property of BFS:
          </p>

          <p>
              <strong>
                  BFS visits vertices level by level, starting from the source vertex.
              </strong>
          </p>

          <h3>Test Cases</h3>

          <ol>
              <li>
                  <strong>Source node connected to all vertices</strong><br />
                  Every vertex is directly reachable from the source.
              </li>

              <li>
                  <strong>Source node is the first vertex</strong><br />
                  A common case where traversal starts from the beginning of the graph.
              </li>

              <li>
                  <strong>Source node is the last vertex</strong><br />
                  The source may not always be the first vertex.
              </li>

              <li>
                  <strong>Graph contains only one vertex</strong><br />
                  The smallest possible graph.
              </li>

              <li>
                  <strong>Graph is disconnected</strong><br />
                  Some vertices cannot be reached from the source.
              </li>

              <li>
                  <strong>Empty graph</strong><br />
                  No vertices and no edges exist.
              </li>

              <li>
                  <strong>Graph contains cycles</strong><br />
                  A path may eventually return to a previously visited vertex.
              </li>

              <li>
                  <strong>Source node is isolated</strong><br />
                  The source exists but has no connections.
              </li>

              <li>
                  <strong>Multiple paths lead to the same vertex</strong><br />
                  A vertex may be reachable through different routes.
              </li>

              <li>
                  <strong>Fully connected graph</strong><br />
                  Every vertex is connected to every other vertex.
              </li>

              <li>
                  <strong>Linear graph (chain structure)</strong><br />
                  Vertices are connected one after another in a straight line.
              </li>

              <li>
                  <strong>Invalid source vertex</strong><br />
                  The specified source does not exist in the graph.
              </li>
          </ol>

          <h3>Observations</h3>

          <ul>
              <li>BFS starts from a given source vertex.</li>
              <li>Only reachable vertices should be visited.</li>
              <li>A vertex should not be visited more than once.</li>
              <li>Cycles must be handled carefully to avoid infinite traversal.</li>
              <li>The algorithm should work for small, large, connected, and disconnected graphs.</li>
              <li>Special cases such as empty graphs and invalid source vertices should also be considered.</li>
          </ul>

          <p>
              After understanding these test cases, we can now think about how to systematically visit vertices level by level and design a correct BFS solution.
          </p>
      </div>

        <div className="write1">
          <h3>Why This Matters</h3>

          <p>
            These cases help us catch edge cases early.
          </p>

          <p>
            A solution that works only for simple examples may fail when we give it
            unusual or extreme inputs.
          </p>

          <p>
            Good programmers always think about these situations before writing code.
          </p>

          <h3>Let’s Prepare Test Cases</h3>

          <p>
            We will now convert these scenarios into actual test cases.
          </p>

          <p>
            To make testing easier, we will represent each test case as a dictionary.
            This will allow us to automatically check whether our function works
            correctly for all inputs.
          </p>
        </div>
        <h2>Dictionary to store all our test case</h2>
      <Notebook
        section={sections.find((s) => s.id === "b1")}
        onAddCell={addNewCellAfter}
        onMoveCell={moveCell}
        onDeleteCell={deleteCell}
        onRunCell={(sectionId, cellId) =>
          runCell(sectionId, cellId, isPyodideLoading, !!getPyodide())
        }
        onEditCode={handleEditCode}
      />
      
      <h2>Source node connected to all vertices</h2>
      <Notebook
          section={sections.find((s) => s.id === "b2")}
          onAddCell={addNewCellAfter}
          onMoveCell={moveCell}
          onDeleteCell={deleteCell}
          onRunCell={(sectionId, cellId) =>
              runCell(sectionId, cellId, isPyodideLoading, !!getPyodide())
          }
          onEditCode={handleEditCode}
      />

      <h2>Source node is the first vertex</h2>
      <Notebook
          section={sections.find((s) => s.id === "b3")}
          onAddCell={addNewCellAfter}
          onMoveCell={moveCell}
          onDeleteCell={deleteCell}
          onRunCell={(sectionId, cellId) =>
              runCell(sectionId, cellId, isPyodideLoading, !!getPyodide())
          }
          onEditCode={handleEditCode}
      />

      <h2>Source node is the last vertex</h2>
      <Notebook
          section={sections.find((s) => s.id === "b4")}
          onAddCell={addNewCellAfter}
          onMoveCell={moveCell}
          onDeleteCell={deleteCell}
          onRunCell={(sectionId, cellId) =>
              runCell(sectionId, cellId, isPyodideLoading, !!getPyodide())
          }
          onEditCode={handleEditCode}
      />

      <h2>Graph contains only one vertex</h2>
      <Notebook
          section={sections.find((s) => s.id === "b5")}
          onAddCell={addNewCellAfter}
          onMoveCell={moveCell}
          onDeleteCell={deleteCell}
          onRunCell={(sectionId, cellId) =>
              runCell(sectionId, cellId, isPyodideLoading, !!getPyodide())
          }
          onEditCode={handleEditCode}
      />

      <h2>Graph is disconnected</h2>
      <Notebook
          section={sections.find((s) => s.id === "b6")}
          onAddCell={addNewCellAfter}
          onMoveCell={moveCell}
          onDeleteCell={deleteCell}
          onRunCell={(sectionId, cellId) =>
              runCell(sectionId, cellId, isPyodideLoading, !!getPyodide())
          }
          onEditCode={handleEditCode}
      />

      <h2>Empty graph</h2>
      <Notebook
          section={sections.find((s) => s.id === "b7")}
          onAddCell={addNewCellAfter}
          onMoveCell={moveCell}
          onDeleteCell={deleteCell}
          onRunCell={(sectionId, cellId) =>
              runCell(sectionId, cellId, isPyodideLoading, !!getPyodide())
          }
          onEditCode={handleEditCode}
      />

      <h2>Graph contains cycles</h2>
      <Notebook
          section={sections.find((s) => s.id === "b8")}
          onAddCell={addNewCellAfter}
          onMoveCell={moveCell}
          onDeleteCell={deleteCell}
          onRunCell={(sectionId, cellId) =>
              runCell(sectionId, cellId, isPyodideLoading, !!getPyodide())
          }
          onEditCode={handleEditCode}
      />

      <h2>Source node is isolated</h2>
      <Notebook
          section={sections.find((s) => s.id === "b9")}
          onAddCell={addNewCellAfter}
          onMoveCell={moveCell}
          onDeleteCell={deleteCell}
          onRunCell={(sectionId, cellId) =>
              runCell(sectionId, cellId, isPyodideLoading, !!getPyodide())
          }
          onEditCode={handleEditCode}
      />

      <h2>Multiple paths lead to the same vertex</h2>
      <Notebook
          section={sections.find((s) => s.id === "b10")}
          onAddCell={addNewCellAfter}
          onMoveCell={moveCell}
          onDeleteCell={deleteCell}
          onRunCell={(sectionId, cellId) =>
              runCell(sectionId, cellId, isPyodideLoading, !!getPyodide())
          }
          onEditCode={handleEditCode}
      />

      <h2>Fully connected graph</h2>
      <Notebook
          section={sections.find((s) => s.id === "b11")}
          onAddCell={addNewCellAfter}
          onMoveCell={moveCell}
          onDeleteCell={deleteCell}
          onRunCell={(sectionId, cellId) =>
              runCell(sectionId, cellId, isPyodideLoading, !!getPyodide())
          }
          onEditCode={handleEditCode}
      />

      <h2>Linear graph (chain structure)</h2>
      <Notebook
          section={sections.find((s) => s.id === "b12")}
          onAddCell={addNewCellAfter}
          onMoveCell={moveCell}
          onDeleteCell={deleteCell}
          onRunCell={(sectionId, cellId) =>
              runCell(sectionId, cellId, isPyodideLoading, !!getPyodide())
          }
          onEditCode={handleEditCode}
      />

      <h2>Invalid source vertex</h2>
      <Notebook
          section={sections.find((s) => s.id === "b13")}
          onAddCell={addNewCellAfter}
          onMoveCell={moveCell}
          onDeleteCell={deleteCell}
          onRunCell={(sectionId, cellId) =>
              runCell(sectionId, cellId, isPyodideLoading, !!getPyodide())
          }
          onEditCode={handleEditCode}
      />
     



      <div className="write4">
          <h2> Discover a Baseline Approach,define the approch in plain english</h2>

          <p>
              From our test cases, we learned that BFS must visit vertices level by level.
          </p>

          <p>
              If a vertex is discovered first, it should also be processed first.
          </p>

          <p>
              Therefore, we need a way to remember the order in which vertices are discovered.
          </p>

          <h3>The Main Challenge</h3>

          <p>
              Suppose we start from vertex 1.
          </p>

          <p>
              While exploring vertex 1, we may discover vertices 2, 3, and 4.
          </p>

          <p>
              Which vertex should be processed next?
          </p>

          <p>
              Since vertex 2 was discovered before 3 and 4, it should be processed first.
          </p>

          <p>
              Likewise, vertex 3 should be processed before 4.
          </p>

          <p>
              In other words, vertices must be processed in exactly the same order in which they are discovered.
          </p>

          <h3>Why a Queue?</h3>

          <p>
              A Queue follows the rule:
          </p>

          <p>
              <strong>First In, First Out (FIFO)</strong>
          </p>

          <p>
              The first vertex inserted into the queue is the first one removed.
          </p>

          <p>
              This behavior perfectly matches the requirement of BFS.
          </p>

          <p>
              Whenever a new vertex is discovered, it is placed at the end of the queue.
          </p>

          <p>
              The next vertex to be processed is always taken from the front of the queue.
          </p>

          <p>
              As a result, vertices are explored level by level.
          </p>

          <h3>Another Important Problem</h3>

          <p>
              Consider a graph containing cycles.
          </p>

          <p>
              It is possible to return to a vertex that has already been visited.
          </p>

          <p>
              If we keep processing the same vertices repeatedly, the traversal may continue forever.
          </p>

          <p>
              Therefore, we need a way to remember which vertices have already been visited.
          </p>

          <p>
              Whenever a vertex is discovered for the first time, we mark it as visited.
          </p>

          <p>
              If we encounter that vertex again later, we simply ignore it.
          </p>

          <h3>Building the Idea</h3>

          <ol>
              <li>Start from the source vertex.</li>
              <li>Mark the source as visited.</li>
              <li>Place the source into a queue.</li>
              <li>Remove a vertex from the front of the queue.</li>
              <li>Explore all vertices directly connected to it.</li>
              <li>If a neighboring vertex has not been visited, mark it as visited and place it into the queue.</li>
              <li>Continue this process until the queue becomes empty.</li>
          </ol>
          <div className="write3">
              <h3>Building the BFS Strategy</h3>

              <p>
                  Now that we understand how BFS works, let us convert each step into code.
              </p>

              <ol>
                  <li>
                      <strong>Start from the source vertex.</strong>

                      <p>
                          We need a variable that stores the starting vertex provided by the user.
                      </p>
                  </li>

                  <li>
                      <strong>Mark the source as visited.</strong>

                      <p>
                          We need a visited array and mark the source vertex as visited.
                      </p>

                      <pre>
                          <code>
          {`s[source] = 1`}
                          </code>
                      </pre>
                  </li>

                  <li>
                      <strong>Place the source into a queue.</strong>

                      <p>
                          The queue helps us process vertices in the order they are discovered.
                      </p>

                      <pre>
                          <code>
          {`q.append(source)`}
                          </code>
                      </pre>
                  </li>

                  <li>
                      <strong>Remove a vertex from the front of the queue.</strong>

                      <p>
                          BFS always processes the oldest discovered vertex first.
                      </p>

                      <pre>
                          <code>
          {`u = q.pop(0)`}
                          </code>
                      </pre>
                  </li>

                  <li>
                      <strong>Explore all vertices directly connected to it.</strong>

                      <p>
                          We scan all possible neighboring vertices.
                      </p>

                      <pre>
                          <code>
          {`for v in range(1, n + 1):`}
                          </code>
                      </pre>
                  </li>

                  <li>
                      <strong>
                          If a neighboring vertex has not been visited, mark it as visited and place it into the queue.
                      </strong>

                      <p>
                          This ensures every vertex is visited only once.
                      </p>

                      <pre>
                          <code>
          {`if a[u][v] == 1 and s[v] == 0:
              s[v] = 1
              q.append(v)`}
                          </code>
                      </pre>
                  </li>

                  <li>
                      <strong>Continue this process until the queue becomes empty.</strong>

                      <p>
                          As long as vertices remain in the queue, BFS keeps exploring.
                      </p>

                      <pre>
                          <code>
          {`while len(q) > 0:`}
                          </code>
                      </pre>
                  </li>
              </ol>

              <p>
                  We now understand every component required for BFS. The next step is to combine these pieces and build the complete algorithm.
              </p>
          </div>

          <h4>What Are We Storing?</h4>

          <p>
              BFS requires a few data structures to keep track of the traversal:
          </p>

          <ul>
              <li>A queue for vertices waiting to be processed.</li>
              <li>A visited array to avoid revisiting vertices.</li>
              <li>The traversal order of visited vertices.</li>
          </ul>

          <p>
              Once the queue becomes empty, there are no more reachable vertices left to explore.
          </p>

          <p>
              This guarantees that every reachable vertex is visited exactly once and in level order.
          </p>

          <p>
              Now that we understand the complete idea, we can begin building the BFS algorithm step by step.
          </p>
      </div>
                <h2>4. Build the solution</h2>
                <Notebook
                    section={sections.find((s) => s.id === "b14")}
                    onAddCell={addNewCellAfter}
                    onMoveCell={moveCell}
                    onDeleteCell={deleteCell}
                    onRunCell={(sectionId, cellId) =>
                    runCell(sectionId, cellId, isPyodideLoading, !!getPyodide())
                    }
                    onEditCode={handleEditCode}
                />
                <Notebook
                    section={sections.find((s) => s.id === "b15")}
                    onAddCell={addNewCellAfter}
                    onMoveCell={moveCell}
                    onDeleteCell={deleteCell}
                    onRunCell={(sectionId, cellId) =>
                    runCell(sectionId, cellId, isPyodideLoading, !!getPyodide())
                    }
                    onEditCode={handleEditCode}
                />

            <div className="write4">

                <h2>5: Measure Performance</h2>

                <p>
                Now that we have built the BFS algorithm, let us measure how efficient our actual implementation is.
                </p>

                <p>
                This step is important because writing a correct algorithm is only half the job.
                We also want to understand:
                </p>

                <ul>
                <li>How fast the algorithm runs</li>
                <li>How much memory it uses</li>
                </ul>

                </div>

                <div className="write4">

                <h2>Time Complexity</h2>

                <div className="write3">

                <h3>Where does the work happen?</h3>

                <p>
                Our BFS implementation performs two major tasks:
                </p>

                <ul>
                <li>Visit vertices using the queue</li>
                <li>Search neighbors using the adjacency matrix</li>
                </ul>

                <p>
                Let us calculate each part separately.
                </p>

                </div>

                <div className="write3">

                <h3>Step 1: Visiting Vertices</h3>

                <p>
                Each vertex is marked visited only once.
                </p>

                <p>
                Once a vertex enters the queue and gets processed, it never enters again.
                </p>

                <p>
                So visiting vertices contributes:
                </p>

                <p>
                O(V)
                </p>

                <p>
                where V = number of vertices.
                </p>

                </div>

                <div className="write3">

                <h3>Step 2: Exploring Neighbors</h3>

                <p>
                This implementation stores the graph using an <b>Adjacency Matrix</b>.
                </p>

                <p>
                To find neighbors of a vertex <code>u</code>, we execute:
                </p>

                <pre>
                    <code>
                {`for v in range(n):`}
                    </code>
                </pre>

                <p>
                Notice something important.
                </p>

                <p>
                Even if vertex <code>u</code> has only one actual connection,
                we still check all columns of that row.
                </p>

                <p>
                That means:
                </p>

                <ul>
                <li>For vertex 0 → scan all n columns</li>
                <li>For vertex 1 → scan all n columns</li>
                <li>For vertex 2 → scan all n columns</li>
                <li>… continue for all vertices</li>
                </ul>

                <p>
                Total work:
                </p>

                <p>
                n × n = O(V²)
                </p>

                </div>

                <div className="write3">

                <h3>Final Time Complexity</h3>

                <p>
                The total work becomes:
                </p>

                <p>
                O(V) + O(V²)
                </p>

                <p>
                The larger term dominates.
                </p>

                <p>
                Therefore:
                </p>

                <p>
                <b>Time Complexity = O(V²)</b>
                </p>

                <p>
                This result comes specifically because we used an adjacency matrix.
                </p>

                </div>

                </div>

                <div className="write4">

                <h2>Space Complexity</h2>

                <div className="write3">

                <h3>What extra memory are we using?</h3>

                <p>
                BFS creates additional structures while running:
                </p>

                <ul>
                <li>Queue → stores discovered vertices</li>
                <li>Visited array (s[]) → tracks visited vertices</li>
                <li>Traversal array → stores BFS order</li>
                <li>Traversal edges (t[]) → stores discovered connections</li>
                </ul>

                <p>
                In the worst case, each structure may store up to V vertices.
                </p>

                <p>
                Total extra memory:
                </p>

                <p>
                O(V)
                </p>

                </div>

                <div className="write3">

                <h3>What about the adjacency matrix?</h3>

                <p>
                The graph itself is stored as:
                </p>

                <p>
                n × n
                </p>

                <p>
                which requires:
                </p>

                <p>
                O(V²)
                </p>

                <p>
                However, this storage belongs to the input representation and is not created by BFS.
                </p>

                <p>
                When measuring algorithm space separately, we count:
                </p>

                <p>
                <b>Auxiliary Space = O(V)</b>
                </p>

             </div>

            </div>

            

        <div className="write4">
            <h2>Step 6: Improve and Generalize</h2>

            <p>
                BFS is much more than a graph traversal algorithm. The same idea can be
                applied to solve many real-world problems.
            </p>

            <div className="write3">
                <h3>What Makes BFS Special?</h3>

                <p>
                    BFS explores vertices level by level.
                </p>

                <p>
                    This means it always reaches the nearest vertices before moving to
                    farther ones.
                </p>

                <p>
                    Because of this property, BFS is useful whenever we need to find the
                    shortest path in an unweighted graph.
                </p>
            </div>

            <div className="write3">
                <h3>Applications of BFS</h3>

                <ul>
                    <li>Finding the shortest path in an unweighted graph.</li>
                    <li>Route planning and navigation systems.</li>
                    <li>Social network analysis.</li>
                    <li>Web crawling and search engines.</li>
                    <li>Network broadcasting.</li>
                    <li>Finding connected components in a graph.</li>
                </ul>
            </div>

            <div className="write3">
                <h3>Limitation of BFS</h3>

                <p>
                    BFS treats every edge as having the same cost.
                </p>

                <p>
                    In many real-world situations, different roads may have different
                    distances, travel times, or costs.
                </p>

                <p>
                    BFS cannot handle such weighted graphs efficiently.
                </p>
            </div>

            <div className="write2">
                <h3>What Comes Next?</h3>

                <p>
                    Suppose a Zepto rider can travel through multiple roads, but each
                    road takes a different amount of time.
                </p>

                <p>
                    BFS can no longer guarantee the fastest route because it only counts
                    the number of edges, not their weights.
                </p>

                <p>
                    To solve this problem, we need an algorithm that considers edge
                    weights while finding the shortest path.
                </p>

                <p>
                    This leads us to <strong>Dijkstra's Algorithm</strong>.
                </p>
                <p>next part is coming soon</p>
            </div>
        </div>
       

    </div>
  );
}
