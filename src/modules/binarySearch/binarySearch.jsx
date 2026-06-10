import { useState, useEffect } from "react";
import introVideo from "../../assets/videos/binaryintro.mp4";
import "./binarySearchc.css";
import { CONTENT } from "./binarySearchContent";
import Theory from "../../components/Theory";
import Cell from "../../components/notebook/Cell";
import Visual from "./LinearSearchDemo.jsx";
import {
  DEFAULT_CELLS,
  initPyodide,
  getPyodide,
  executePythonCode,
  resetPythonNamespace,
} from "./binarySearch.js";

import Notebook from "../../components/notebook/Notebook.jsx";
import useNotebook from "../../components/notebook/useNotebook.js";


export default function BinarySearch() {
  const [isPyodideLoading, setIsPyodideLoading] = useState(!getPyodide());
  
  const {
    cells,
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
        <h1>Binary Search</h1>
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
        Binary search is an efficient algorithm for finding an element in a sorted array 
        by repeatedly dividing the search interval in half.
      </h3>

     
      <div className="method">         
        <br />
        <h3>lets build our story:</h3>
        <h4 className="write1">
        This course takes a coding-focused approach towards learning. In each notebook, 
        we'll focus on solving one problem, and learn the techniques, algorithms, and 
        data structures to devise an *efficient* solution. We will then generalize the 
        technique and apply it to other problems.
        </h4>

        <br />
        <h4 className="write3">
          Akash has some cards with numbers written on them. 
          he arranges the cards in decreasing order, and lays them out face down in a sequence on a table.
          he challenges Akshay to pick out the card containing a given number by turning over as few cards as 
          possible. Write a function to help Bob locate the card.
        </h4>
          
        <div className="write4">
          <h3>lets decode our problem :</h3>
            we have serially arranged cards in decreasing order, we have to find the position of a given number 
            by turning over as few cards as possible.
            <h4>as few cards as possible</h4>
            what does that mean? 
            it means we have to find the number in minimum steps possible, which means we have to 
            find an efficient solution for this problem. like selecting target 40 in first attempt itself.
        </div>
        <video className="module-video" controls>
          <source src={introVideo} type="video/mp4" />
        </video>
        <h2 >
          how do we solve this problem?
        </h2>
      </div>

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
        <h2>Analsing the problem with our method</h2>
        <div className="write4">
          <h2 >1. State the problem clearly. Identify the input & output formats.</h2>
          <p>
            In our case, we have serially arranged cards in decreasing order, we have to find the position
            of a given number by turning over as few cards as possible.
            <br />
            suppose we have cards with numbers
            <br />
            cards= [90, 80, 70, 60, 50, 40, 30, 20, 10] 
            <br />
            query`: A number, whose position in the array is to be determined. example we have to find 
            the position of number 40.
            <br />
            if we take card one by one from the start, we will have to turn over 6 cards to find the 
            number 40.and the output will be 6, because we have to turn over 6 cards to find the number 40.
            try it out-
          </p>
          <Visual /> 
          <p>
            Now we found that ouput (position of 40) is 6, but now we have
            to clearly define problem, input output.

          </p>  
          <div className="write4">
            <h4>Problem</h4>
            <blockquote>
              We need to write a program to find the position of a given number in a list of numbers arranged in decreasing order. We also need to minimize the number of times we access elements from the list.
            </blockquote>
            <h4>Input</h4>
            <ol>
              <li><code>cards</code>: A list of numbers sorted in decreasing order. E.g. <code>[90, 80, 70, 60, 50, 40, 30, 20, 10] </code></li>
              <li><code>query</code>: A number whose position in the array is to be determined. E.g. <code>40</code></li>
            </ol>
            <h4>Output</h4>
            <ol>
              <li><code>position</code>: The position of <code>query</code> in the list <code>cards</code>. E.g. <code>6</code> in the above case (counting from <code>0</code>).</li>
            </ol>
          </div>
          
  
        </div>

      </div>

      <div className="method">
        <h3>Binary Search Algorithm</h3>
        <Notebook
          cells={cells}
          onAddCell={addNewCellAfter}
          onMoveCell={moveCell}
          onDeleteCell={deleteCell}
          onRunCell={(id) => runCell(id, isPyodideLoading, !!getPyodide())}
          onEditCode={handleEditCode}
        />
        <Theory>
        <h3>Problem Statement</h3>

        <p>
          Given a sorted list of cards arranged in decreasing order,
          find the position of a specific card.
        </p>
</Theory>
      </div>
    </div>
  );
}

