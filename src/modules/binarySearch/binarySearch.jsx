import { useState } from "react";
import "./binarySearchc.css";


const DEFAULT_CELLS = [
  {
    id: 1,
    code: `# Test Cases

      tests = [
          ([1,3,5,7,9], 7, 3),
      ]
      `,
    output: "",
    isError: false,
    isEditing: false,
  },

  {
    id: 2,
    code: `# Binary Search

      def binary_search(arr, target):
          pass
      `,
    output: "",
    isError: false,
    isEditing: false,
  },

  {
    id: 3,
    code: `# Run Tests

      for arr, target, expected in tests:
          pass
      `,
    output: "",
    isError: false,
    isEditing: false,
  },
];

export default function BinarySearch() {

  const [cells, setCells] = useState(JSON.parse(JSON.stringify(DEFAULT_CELLS)));

  const handleReset = () => {
    setCells(JSON.parse(JSON.stringify(DEFAULT_CELLS)));
  };

 

  const handleEditCode = (id, newCode) => {
    setCells((prevCells) =>
      prevCells.map((cell) =>
        cell.id === id ? { ...cell, code: newCode } : cell
      )
    );
  };

  const addNewCellAfter = (id) => {
    setCells((prev) => {
      const idx = prev.findIndex((c) => c.id === id);
      const newId = prev.reduce((max, c) => Math.max(max, c.id), 0) + 1;
      const newCell = {
        id: newId,
        code: "",
        output: "",
        isError: false,
        isEditing: false,
      };
      if (idx === -1) return [...prev, newCell];
      const copy = [...prev];
      copy.splice(idx + 1, 0, newCell);
      return copy;
    });
  };

  const deleteCell = (id) => {
    setCells((prev) => prev.filter((cell) => cell.id !== id));
  };

  const moveCell = (id, direction) => {
    setCells((prev) => {
      const index = prev.findIndex((cell) => cell.id === id);
      if (index === -1) return prev;
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= prev.length) return prev;
      const updated = [...prev];
      const [movedCell] = updated.splice(index, 1);
      updated.splice(targetIndex, 0, movedCell);
      return updated;
    });
  };

  const runCell = (id) => {
    setCells((prev) =>
      prev.map((cell) =>
        cell.id === id ? {
        ...cell,
        output: `Cell ${id} executed successfully`,
        isError: false,
        }: cell
      )
    );
  };

  return (
    <div>
      <div className="module-header">
        <h1>Binary Search</h1>
        <button className="btn-reset" onClick={handleReset}>
          Reset to Default
        </button>
      </div>

      <h3 >
       
        Binary search is an efficient algorithm for finding an element in a sorted array 
        by repeatedly dividing the search interval in half.
      </h3>

      <div className="method"> 
                  
        <h3>THE METHOD </h3>
        <h5>WE FOLLOW THESE 6 STEPS TO SOLVE ANY PROBLEM IN OUR ENTIRE STUDY MODULES</h5>
        

        <ol start="1">
          <li>1. State the problem clearly. Identify the input & output formats.</li>
          <li>2. Come up with some example inputs & outputs. Try to cover all edge cases.</li>
          <li>3. Come up with a correct solution for the problem. State it in plain English.</li>
          <li>4. Implement the solution and test it using example inputs. Fix bugs, if any.</li>
          <li>5. Analyze the algorithm's complexity and identify inefficiencies, if any.</li>
          <li>6. Apply the right technique to overcome the inefficiency. Repeat steps 3 to 6.</li>
        </ol>
      </div>
      
      <div className="method">

        <h3>Test and edge cases</h3>
        <ol start="1">
          <li>1. Empty list.</li>
          <li>2. Query not present in the list.</li>
          <li>3. Query repeated with no other elements.</li>
          <li>4. Non-query number repeated.</li>
          <li>5. Query located in the middle, first, or last position.</li>
          <li>6. Very large numbers (e.g. [10^9, 10^8, 10^5]).</li>
        </ol>
        
      </div>

      <div className="method">
        <h3>Binary Search Algorithm</h3>

        {cells.map((cell) => (
          <div key={cell.id} className="code-cell">
            <button
              className="next"
              onClick={() => addNewCellAfter(cell.id)}
            >
              Add New Cell
            </button>
            <button 
               className="movecellup"
               onClick={() => moveCell(cell.id, "up")}>
              Move Up
            </button>
            <button 
               className="movecelldown"
               onClick={() => moveCell(cell.id, "down")}>
              Move Down
            </button>
            <button 
               className="deletecell"
               onClick={() => deleteCell(cell.id)}>
              Delete Cell
            </button>
            <button
              className="runcell"
              onClick={() => runCell(cell.id)}
            >
              Run Cell
            </button>
            <textarea
              value={cell.code}
              rows={10}
              cols={80}
              onChange={(e) => handleEditCode(cell.id, e.target.value)}
            />
            <div className={`output-box ${cell.isError ? "error" : ""}`}>
              <h4>Output</h4>

              <div className="output-content">
                {cell.output || "No output yet"}
              </div>

            </div>
          </div>
        ))}
      </div>



    </div>
  );
}