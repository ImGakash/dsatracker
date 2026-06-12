import { useState, useEffect } from "react";
import introVideo from "../../assets/videos/binaryintro.mp4";
import "./binarySearchc.css";
import Visual from "./LinearSearchDemo.jsx";
import {
  initPyodide,
  getPyodide,
  executePythonCode,
  resetPythonNamespace,
} from "../../core/python engine.js";
import { sections as DEFAULT_CELLS } from "./binarySearch.model.js";

import Notebook from "../../components/notebook/Notebook.jsx";
import useNotebook from "../../components/notebook/useNotebook.js";
import Visual1 from "./bivisual.jsx";


export default function BinarySearch() {
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
            query: A number, whose position in the array is to be determined. example we have to find 
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
          <div className="write1">
            <h4>Problem</h4>
            <blockquote>
              We need to write a program to find the position of a given number in a list of numbers arranged in decreasing order.
               We also need to minimize the number of times we access elements from the list.
            </blockquote>
            <h4>Input</h4>
            <ol>
              <li><code>cards</code>: A list of numbers sorted in decreasing order. E.g. <code>
                [90, 80, 70, 60, 50, 40, 30, 20, 10] </code></li>
              <li><code>query</code>: A number whose position in the array is to be determined.
               E.g. <code>40</code></li>
            </ol>
            <h4>Output</h4>
            <ol>
              <li><code>position</code>: The position of <code>query</code> in the list <code>cards</code>.
               E.g. <code>6</code> in the above case (counting from <code>0</code>).</li>
            </ol>
          </div>
        </div>

      </div>

      <div className="write4">
        <h2>2. Come up with some example inputs & outputs. Try to cover all edge cases.¶</h2>
        <p>
          Before we start implementing our function, it would be useful to come up with some example inputs and outputs which we can use later to test out the problem. We'll refer to them as <em>test cases</em>.
        </p>
        <p>
          Here's the test case described in the example above.
        </p>

        <pre className="code-block">
{`{
  cards: [90, 80, 70, 60, 50, 40, 30, 20, 10],
  query: 40,
  expected: 6
}`}
        </pre>
        <p> locate is a function we defined that solves our problem. 
          We can test our function by passing the inputs into function 
          and comparing the result with the expected output.
        </p>
      </div> 

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
      <h3>
        Obviously, the two result does not match the output as we have not yet implemented the function.
        We'll represent our test cases as dictionaries to make it easier to test them once we write implement our function. 
        For example, the above test case can be represented as follows:
      </h3>

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

      <h3>The function can now be tested as follows.</h3>
      
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
      <div className="write4">
        <h3>What we have done so far</h3>
        <p>
          Up to this point, we have not changed the actual algorithm or the solution code.
          We have only learned and set up a way to test all our test cases using Python dictionaries.
          That means we are just organizing the inputs and expected results, and preparing a clean way
          to run those checks. We are not yet implementing the binary search logic itself.
        </p>

      </div>
            <div className="write4">
        <h3>Possible variations</h3>
        <p>Our function should be able to handle any set of valid inputs we pass into it. Here are some possible variations we might encounter:</p>
        <ol>
          <li>The number <code>query</code> occurs somewhere in the middle of the list <code>cards</code>.</li>
          <li><code>query</code> is the first element in <code>cards</code>.</li>
          <li><code>query</code> is the last element in <code>cards</code>.</li>
          <li>The list <code>cards</code> contains just one element, which is <code>query</code>.</li>
          <li>The list <code>cards</code> does not contain number <code>query</code>.</li>
          <li>The list <code>cards</code> is empty.</li>
          <li>The list <code>cards</code> contains repeating numbers.</li>
          <li>The number <code>query</code> occurs at more than one position in <code>cards</code>.</li>
          <li>The list <code>cards</code> contains negative numbers or mixed numeric values, while still sorted in decreasing order.</li>
        </ol>
        <p><strong>Edge Cases</strong>: It's likely that you didn't think of all of the above cases when you read the problem for the first time. Some of these (like the empty array or <code>query</code> not occurring in <code>cards</code>) are called <em>edge cases</em>. While edge cases may not occur frequently, your programs should be able to handle all edge cases, otherwise they may fail in unexpected ways. Let's create some more test cases for the variations listed above. We'll store all our test cases in a list for easier testing.</p>
      </div>
      <h2>Query occurs in the middle</h2>
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
      <h2>Query occurs is the first element</h2>

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
      <h2>Query occurs is the last element</h2>
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
      <h2> cards contains just one element, query</h2>
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
      <div className="write4">
        <p>
          <h2>The problem statement does not specify what to do if the list cards does not contain the number query</h2>
          <ol>
            <li>Read the problem statement again, carefully.</li>
            <li>Look through the examples provided with the problem.</li>
            <li>Ask the interviewer/platform for a clarification.</li>
            <li>Make a reasonable assumption, state it and move forward.</li>
            <li>We will assume that our function will return -1 in case cards does not contain query</li>
          </ol>
        </p>
      </div>
      <h2>Cards does not contain query</h2>
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
      <h2>Cards is empty</h2>
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
      <h2>Cards contains repeating numbers</h2>
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
      <h2>Query number card is repeated multiple times</h2>
      <p>
        In the case where query occurs multiple times in cards, we'll expect our function to return the first occurrence of query.
        While it may also be acceptable for the function to return any position where query occurs within the list, 
        it would be slightly more difficult to test the function, as the output is non-deterministic.
      </p>

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
      <h3>its your time to think and list some more test casses, click + on any of above cell to add new cell 
      and write your test cases</h3>
      
      <h2>Let's look at the full set of test cases we have created so far. run the below cell and see output"</h2>
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
      <p>Great, now we have a fairly exhaustive set of test cases to evaluate our function.</p>
      <p>Creating test cases beforehand allows you to identify different variations and edge cases in advance so that can make sure to handle them while writing code. Sometimes, you may start out confused, but the solution will reveal itself as you try to come up with interesting test cases.</p>
      <p><strong>Tip:</strong> Don&apos;t stress it if you can&apos;t come up with an exhaustive list of test cases though. You can come back to this section and add more test cases as you discover them. Coming up with good test cases is a skill that takes practice.</p>

      <div className="write4">
        <h2>3. Come up with a correct solution for the problem. State it in plain English.</h2>
        <p>Our first goal should always be to come up with a <em>correct</em> solution to the problem, which may necessarily be the most <em>efficient</em> solution. The simplest or most obvious solution to a problem, which generally involves checking all possible answers is called the <em>brute force</em> solution.</p>
        
        <p>In this problem, coming up with a correct solution is quite easy: Akshay can simply turn over cards in order one by one, till he find a card with the given number on it. Here's how we might implement it:</p>
        
          <ol>
            <li>Create a variable <code>position</code> with the value 0.</li>
            <li>Check whether the number at index <code>position</code> in <code>card</code> equals <code>query</code>.</li>
            <li>If it does, <code>position</code> is the answer and can be returned from the function</li>
            <li>If not, increment the value of <code>position</code> by 1, and repeat steps 2 to 5 till we reach the last position.</li>
            <li>If the number was not found, return <code>-1</code>.</li>
          </ol>
          
        <blockquote>
          <p><strong>Linear Search Algorithm</strong>: Congratulations, we've just written our first <em>algorithm</em>! An algorithm is simply a list of statements which can be converted into code and executed by a computer on different sets of inputs. This particular algorithm is called linear search, since it involves searching through a list in a linear fashion i.e. element after element.</p>
          <p><strong>Tip:</strong> Always try to express (speak or write) the algorithm in your own words before you start coding. It can be as brief or detailed as you require it to be. Writing is a great tool for thinking clearly. It's likely that you will find some parts of the solution difficult to express, which suggests that you are probably unable to think about it clearly. The more clearly you are able to express your thoughts, the easier it will be for you to turn into code.</p>
        </blockquote>
      </div>

      <div className="write4">
        <h2>4. Implement the solution and test it using example inputs. Fix bugs, if any.</h2>
        <p>Phew! We are finally ready to implement our solution. All the work we've done so far will definitely come in handy, as we now exactly what we want our function to do, and we have an easy way of testing it on a variety of inputs.</p>
        <p>Here's a first attempt at implementing the function.</p>
      </div>

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
      <h2>Let's test out the function with the first test case</h2>
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
      <Notebook
        section={sections.find((s) => s.id === "b16")}
        onAddCell={addNewCellAfter}
        onMoveCell={moveCell}
        onDeleteCell={deleteCell}
        onRunCell={(sectionId, cellId) =>
          runCell(sectionId, cellId, isPyodideLoading, !!getPyodide())
        }
        onEditCode={handleEditCode}
      />
      <p>
        Yay! The result matches the output.<br />
        lets test all our test cases
      </p>
      <Notebook
        section={sections.find((s) => s.id === "b17")}
        onAddCell={addNewCellAfter}
        onMoveCell={moveCell}
        onDeleteCell={deleteCell}
        onRunCell={(sectionId, cellId) =>
          runCell(sectionId, cellId, isPyodideLoading, !!getPyodide())
        }
        onEditCode={handleEditCode}
      />
            <div className="write4">
        <h2>Oops — the 6th test case failed, and it is an empty array case.</h2>
        <p>Python reports an "index out of range" error. What could cause that?</p>
        <blockquote>
          But how can we find the reason for this error?
        </blockquote>
        <p>Possible causes include:</p>
        <ol>
          <li>Accessing an element when the list is empty.</li>
          <li>Using an index that is outside the valid range.</li>
          <li>Looping without checking the list bounds first.</li>
        </ol>
        <p>Now let's focus only on the failing case:</p>
        <p><code>cards = []</code><br />
           <code>query = 40</code></p>
        <h2>How do we trace this error? Is it really an out-of-range issue?</h2>
        <p>Let's inspect our <code>locate_card</code> code again.</p>
      </div>

      <Notebook
        section={sections.find((s) => s.id === "b18")}
        onAddCell={addNewCellAfter}
        onMoveCell={moveCell}
        onDeleteCell={deleteCell}
        onRunCell={(sectionId, cellId) =>
          runCell(sectionId, cellId, isPyodideLoading, !!getPyodide())
        }
        onEditCode={handleEditCode}
      />
      <h2>Now we will add print statements to trace our error</h2>

      <Notebook
        section={sections.find((s) => s.id === "b19")}
        onAddCell={addNewCellAfter}
        onMoveCell={moveCell}
        onDeleteCell={deleteCell}
        onRunCell={(sectionId, cellId) =>
          runCell(sectionId, cellId, isPyodideLoading, !!getPyodide())
        }
        onEditCode={handleEditCode}
      />
      <Notebook
        section={sections.find((s) => s.id === "b20")}
        onAddCell={addNewCellAfter}
        onMoveCell={moveCell}
        onDeleteCell={deleteCell}
        onRunCell={(sectionId, cellId) =>
          runCell(sectionId, cellId, isPyodideLoading, !!getPyodide())
        }
        onEditCode={handleEditCode}
      />
      <h2>Look there,<code> position=0 </code>and we are trying to access <code>cards[0]</code>, but no element is there in cards.</h2>
      <h2>wow, now we sucessfully figured out the reason</h2>
      <p><br />now we will fix that error, by removing while true and looping only when position is less than length of cards: </p>
      <Notebook
        section={sections.find((s) => s.id === "b21")}
        onAddCell={addNewCellAfter}
        onMoveCell={moveCell}
        onDeleteCell={deleteCell}
        onRunCell={(sectionId, cellId) =>
          runCell(sectionId, cellId, isPyodideLoading, !!getPyodide())
        }
        onEditCode={handleEditCode}
      />
      <h2>Now let's run all our test cases again</h2>
      <Notebook
        section={sections.find((s) => s.id === "b22")}
        onAddCell={addNewCellAfter}
        onMoveCell={moveCell}
        onDeleteCell={deleteCell}
        onRunCell={(sectionId, cellId) =>
          runCell(sectionId, cellId, isPyodideLoading, !!getPyodide())
        }
        onEditCode={handleEditCode}
      />
      <h2>Great! All our test cases are passing now.</h2>
      <br />
      <p>There might be some other edge cases we haven't thought of which may cause the 
        function to fail. Can you think of any?
        Tip: In a real interview or coding assessment, you can skip 
        the step of implementing and testing the brute force solution in the interest of time. 
        It's generally quite easy to figure out the complexity of the brute for
        solution from the plain English description.
      </p>
      <Notebook
        section={sections.find((s) => s.id === "b23")}
        onAddCell={addNewCellAfter}
        onMoveCell={moveCell}
        onDeleteCell={deleteCell}
        onRunCell={(sectionId, cellId) =>
          runCell(sectionId, cellId, isPyodideLoading, !!getPyodide())
        }
        onEditCode={handleEditCode}
      />
      <div className="write4">
        <h2>5. Analyze the algorithm's complexity and identify inefficiencies, if any.</h2>
        <p>Recall this statement from original question: <em>"Akash challenges Akshay to pick out the card containing a given number by <strong>turning over as few cards as possible</strong>."</em> We restated this requirement as: <em>"Minimize the number of times we access elements from the list <code>cards</code>."</em></p>
        <br />
        <p>Before we can minimize the number, we need a way to measure it. Since we access a list element once in every iteration, for a list of size <code>N</code> we access the elements from the list up to <code>N</code> times. Thus, Akshay may need to overturn up to <code>N</code> cards in the worst case, to find the required card.</p>
        <p>Suppose he is only allowed to overturn 1 card per minute, it may take him 30 minutes to find the required card if 30 cards are laid out on the table. Is this the best he can do? Is there a way for Akshay to arrive at the answer by turning over just 5 cards, instead of 30?</p>
        <p>The field of study concerned with finding the amount of time, space or other resources required to complete the execution of computer programs is called <em>the analysis of algorithms</em>. And the process of figuring out the best algorithm to solve a given problem is called <em>algorithm design and optimization</em>.</p>
        <h3>Complexity and Big O Notation</h3>
        <blockquote>
          <p><strong>Complexity</strong> of an algorithm is a measure of the amount of time and/or space required by an algorithm for an input of a given size e.g. <code>N</code>. Unless otherwise stated, the term <em>complexity</em> always refers to the worst-case complexity (i.e. the highest possible time/space taken by the program/algorithm to process an input).</p>
        </blockquote>
        <p>In the case of linear search:</p>
        <ol>
          <li>The <strong>time complexity</strong> of the algorithm is <code>cN</code> for some fixed constant <code>c</code> that depends on the number of operations we perform in each iteration and the time taken to execute a statement. Time complexity is sometimes also called the <em>running time</em> of the algorithm.</li>
          <li>The <strong>space complexity</strong> is some constant <code>c&apos;</code> (independent of <code>N</code>), since we just need a single variable <code>position</code> to iterate through the array, and it occupies a constant space in the computer&apos;s memory (RAM).</li>
        </ol>
        <blockquote>
          <p><strong>Big O Notation</strong>: Worst-case complexity is often expressed using the Big O notation. In the Big O, we drop fixed constants and lower powers of variables to capture the trend of relationship between the size of the input and the complexity of the algorithm i.e. if the complexity of the algorithm is <code>cN^3 + dN^2 + eN + f</code>, in the Big O notation it is expressed as <strong>O(N^3)</strong>.</p>
        </blockquote>
        <p>Thus, the time complexity of linear search is <strong>O(N)</strong> and its space complexity is <strong>O(1)</strong>.</p>
      </div>

      <div className="write4">
        <h2>6. Apply the right technique to overcome the inefficiency. Repeat steps 3 to 6.</h2>
        <p>At the moment, we're simply going over cards one by one, and not even utilizing the fact that they're sorted. This is called a <em>brute force</em> approach.</p>
        <p>It would be great if Akshay could somehow guess the card at the first attempt, but with all the cards turned over it's simply impossible to guess the right card.</p>
        <Visual />
        <p>The next best idea would be to pick a random card, and use the fact that the list is sorted, to determine whether the target card lies to the left or right of it. In fact, if we pick the middle card, we can reduce the number of additional cards to be tested to half the size of the list. Then, we can simply repeat the process with each half. This technique is called binary search. Here's a visual explanation of the technique:</p>
        <Visual1 />
      </div>

      <div className="write3">
        <h1>8. Implement the solution and test it using example inputs. Fix bugs, if any.</h1>
        <p>Here's an implementation of binary search for solving our problem. We also print the relevant variables in each iteration of the <code>while</code> loop.</p>
      </div>

      <Notebook
        section={sections.find((s) => s.id === "b23")}
        onAddCell={addNewCellAfter}
        onMoveCell={moveCell}
        onDeleteCell={deleteCell}
        onRunCell={(sectionId, cellId) =>
          runCell(sectionId, cellId, isPyodideLoading, !!getPyodide())
        }
        onEditCode={handleEditCode}
      />
      <h2>test all our test cases</h2>
        <Notebook
        section={sections.find((s) => s.id === "b24")}
        onAddCell={addNewCellAfter}
        onMoveCell={moveCell}
        onDeleteCell={deleteCell}
        onRunCell={(sectionId, cellId) =>
          runCell(sectionId, cellId, isPyodideLoading, !!getPyodide())
        }
        onEditCode={handleEditCode}
      />

      <h2>Looks like it passed 8 out of 9 tests! Let's look at the failed test.</h2>
      <Notebook
        section={sections.find((s) => s.id === "b25")}
        onAddCell={addNewCellAfter}
        onMoveCell={moveCell}
        onDeleteCell={deleteCell}
        onRunCell={(sectionId, cellId) =>
          runCell(sectionId, cellId, isPyodideLoading, !!getPyodide())
        }
        onEditCode={handleEditCode}
      />
            <div className="write4">
        <p>
          Seems like we did locate a <strong>40</strong> in the array,<br />
          it's just that it wasn't the first <strong>40</strong>.<br />
          As you can guess, this is because binary search does not examine indices
          in a linear order.<br />
          So how do we fix it?
        </p>
        <p>
          When we find that <code>cards[mid]</code> is equal to <code>query</code>,
          we must verify whether this is the first occurrence of the query in the list —
          in other words, check the element before it.
        </p>
        <p>
          Example:
          <code>[90, 90, 70, 70, 70, 40, 30, 10, 10]</code>
        </p>
        <p>
          To make this easier, we define a helper function called
          <code>test_location</code>, which takes <code>cards</code>, <code>query</code>,
          and <code>mid</code> as inputs.
        </p>
      </div>
      <Notebook
        section={sections.find((s) => s.id === "b26")}
        onAddCell={addNewCellAfter}
        onMoveCell={moveCell}
        onDeleteCell={deleteCell}
        onRunCell={(sectionId, cellId) =>
          runCell(sectionId, cellId, isPyodideLoading, !!getPyodide())
        }
        onEditCode={handleEditCode}
      />
      <h2>now verify all test cases</h2>
      <Notebook
        section={sections.find((s) => s.id === "b27")}
        onAddCell={addNewCellAfter}
        onMoveCell={moveCell}
        onDeleteCell={deleteCell}
        onRunCell={(sectionId, cellId) =>
          runCell(sectionId, cellId, isPyodideLoading, !!getPyodide())
        }
        onEditCode={handleEditCode}
      />
      <div className="write 4">
       <p> <h2>CONGRAGULATIONS</h2> 
            <br /> 
            <h3>Now we have passed all our test cases even in binary search</h3>
              <br /> 
              but remember,In fact, once we have written out the algorithm, we may want to add a 
              few more test cases.
               <br />  .
              
          <ol>
              <li> The number lies in first half of the array. </li>
              <li>The number lies in the second half of the array.</li>
          </ol> 
       </p>
      </div>

      <div className="write4">
        <h2>9. Analyze the algorithm's complexity and identify inefficiencies, if any.</h2>
        <p>
          Once again, let's try to count the number of iterations in the algorithm. If we start out with an array of N elements, then each time the size of the array reduces to half for the next iteration, until we are left with just 1 element.
        </p>
        <p>
          <strong>Initial length</strong> - N<br />
          <strong>Iteration 1</strong> - N/2<br />
          <strong>Iteration 2</strong> - N/4 i.e. N/2<sup>2</sup><br />
          <strong>Iteration 3</strong> - N/8 i.e. N/2<sup>3</sup><br />
          ...<br />
          <strong>Iteration k</strong> - N/2<sup>k</sup>
        </p>
        <p>
          Since the final length of the array is 1, we can find the following:
        </p>
        <p>
          <code>N/2<sup>k</sup> = 1</code>
        </p>
        <p>
          Rearranging the terms, we get:
        </p>
        <p>
          <code>N = 2<sup>k</sup></code>
        </p>
        <p>
          Taking the logarithm:
        </p>
        <p>
          <code>k = log N</code>
        </p>
        <p>
          Where <code>log</code> refers to log to the base 2. Therefore, our algorithm has the time complexity <strong>O(log N)</strong>. This fact is often stated as: binary search <em>runs</em> in logarithmic time. You can verify that the space complexity of binary search is <strong>O(1)</strong>.
        </p>
      </div>

      <div className="write3">
        <h2>Try it out</h2>
        <p>Just a minor modification will result correct solution for this problem:</p>
        <blockquote>
          Q. Given an array of integers <code>nums</code> sorted in ascending order, find the starting and ending position of a given number.
        </blockquote>
        <p>This is a variation of binary search where you need to locate the first and last occurrence of the target value.</p>
      </div>
      <div className="write2">
        <h2>Variations of Binary Search like:</h2>
        <p>Binary search variations and solutions , a problem based -assignment module is  <h2>coming soon</h2></p>
      
      </div>



    </div>
  );
}
