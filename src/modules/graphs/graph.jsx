import { useState, useEffect } from "react";
import "./graph.css";
import {
  initPyodide,
  getPyodide,
  executePythonCode,
  resetPythonNamespace,
} from "../../core/python engine.js";
import { sections as DEFAULT_CELLS } from "./dc.model.js";

import Notebook from "../../components/notebook/Notebook.jsx";
import useNotebook from "../../components/notebook/useNotebook.js";
import Visual2 from "./bsvis.jsx";
import Visual3 from "./InsertionSort.jsx";
import Visual4 from "./mergesort.jsx";

export default function DivideAndConquer() {
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
        <h1>Divide & Conquer</h1>
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
        Divide and Conquer is an algorithm design paradigm based on multi-branched recursion. 
        A divide-and-conquer algorithm works by recursively breaking down a problem into two 
        or more sub-problems of the same or related type, until these become simple enough 
        to be solved directly.
      </h3>

      <div className="write1">
        <h2>Welcome to Divide and Conquer</h2>

        <p>
          Today we are starting one of the most important ideas in computer science:
          <strong>Divide and Conquer</strong>.
        </p>

        <p>
          Many powerful algorithms are built using this approach, including sorting,
          searching, and even some machine learning techniques.
        </p>

        <p>
          The main idea is simple:
          break a big problem into smaller problems, solve them, and combine the results.
        </p>
      </div>

      <div className="write4">
        <h2>Problem 1: Real-World Sorting Challenge</h2>

        <p>
          You're working on a new feature for our platform called
          <strong>"Top Notebooks of the Week"</strong>.
        </p>

        <p>
          Your task is to write a function that sorts a list of notebooks
          based on the number of likes they received, in <strong>decreasing order</strong>.
        </p>

        <p>
          This is not a small dataset. We are talking about <strong>millions of notebooks</strong>
          created every week.
        </p>

        <p>
          So the solution must not only be correct, but also <strong>highly efficient</strong>.
        </p>
      </div>

      <div className="write1">
        <h2>Why This Problem Matters</h2>

        <p>
          Sorting is one of the most common operations in programming.
        </p>

        <p>
          It appears everywhere:
        </p>

        <ul>
          <li>Ranking posts by likes</li>
          <li>Ordering search results</li>
          <li>Displaying leaderboards in games</li>
          <li>Organizing data in databases</li>
        </ul>

        <p>
          Because it is so important, we need to understand not just how to sort,
          but how to sort efficiently.
        </p>
      </div>

      <div className="write1">
        <h2>Before We Start: A Simpler Problem</h2>

        <p>
          Before solving the real-world version, we will first start with a simpler problem.
        </p>

        <p>
          This helps us understand the core idea without unnecessary complexity.
        </p>

        <p>
          <strong>Problem 2:</strong> Write a program to sort a list of numbers.
        </p>

        <p>
          By default, "sorting" means arranging numbers in <strong>ascending order</strong>
          (smallest to largest), unless specified otherwise.
        </p>

        <p>
          Once we understand this simpler version, we will extend it to solve the real problem.
        </p>
      </div>

      <div className="write1">
        <h2>What Comes Next?</h2>

        <p>
          Now that we understand the problem, the next step is to explore
          how we might approach sorting from scratch.
        </p>

        <p>
          Before jumping into advanced algorithms, we will first try to build
          simple intuition — just like we did with searching.
        </p>
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

            <h2>Analyzing the Problem with Our Method</h2>
            
            <div className="write4">
                <h2>1. Understand the Problem Clearly</h2>

                <p>
                  Before thinking about how to solve the problem, we first need to clearly
                  understand what we are being asked to do.
                </p>

                <p>
                  Our task is simple:
                  we need to take a list of numbers and arrange them in increasing order.
                </p>
                           
                <h3>Problem Statement</h3>

                <p>
                  We need to write a function that sorts a list of numbers in increasing order.
                </p>
              
                <h3>Input</h3>

                <ul>
                  <li>
                    <code>nums</code>: A list of numbers
                    <br />
                    Example: <code>[4, 2, 6, 3, 4, 6, 2, 1]</code>
                  </li>
                </ul>
                <h3>Output</h3>

                <ul>
                  <li>
                    <code>sorted_nums</code>: The same list, but sorted in increasing order
                    <br />
                    Example: <code>[1, 2, 2, 3, 4, 4, 6, 6]</code>
                  </li>
                </ul>
              </div>

              <div className="write4">
                <h3>What We Are Really Doing</h3>

                <p>
                  We are not changing the numbers or removing anything.
                </p>

                <p>
                  We are simply rearranging the same elements so that they are in order from
                  smallest to largest.
                </p>

                <p>
                  Think of it like arranging books on a shelf by height or size.
                </p>
                <h3>Function Signature</h3>

                <p>
                  Our function will take a list of numbers and return a new sorted list.
                </p>

                <pre>
              def sort(nums):
                  pass
                </pre>
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
       </div>

        <div className="write4">
          <h2>2. Explore Test Cases</h2>

          <p>
            Before we write any code, let’s think about different kinds of inputs our
            function might receive.
          </p>

          <p>
            This helps us make sure our solution works not just for one example, but for
            all possible situations.
          </p>
          <h3>Possible Scenarios</h3>

          <p>Our sorting function should work correctly in all of these cases:</p>

          <ul>
            <li>Lists with numbers in random order</li>
            <li>A list that is already sorted</li>
            <li>A list sorted in reverse (descending) order</li>
            <li>A list with repeating elements</li>
            <li>An empty list</li>
            <li>A list with just one element</li>
            <li>A list where all elements are the same</li>
            <li>A very large list</li>
          </ul>
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
    <h2>List of numbers in random order</h2>
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
    <h2>A list that's already sorted</h2>
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
   

    <h2>A list that's sorted in descending order</h2>
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
    <h2>A list containing repeating elements</h2>
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
    <h2> An empty list </h2>
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
    <h2>A list containing just one element</h2>
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
    <h2>A list containing one element repeated many times</h2>
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
    <h2>all test cases in tests</h2>
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

   <div className="write4">
      <h2>3. Come up with a correct solution. State it in plain English.</h2>

      <p>
        Now that we understand the problem and have thought about different test cases,
        let’s try to build a working solution.
      </p>

      <p>
        We don’t need to worry about making it fast yet. First, our goal is simple:
        <strong>get a correct answer</strong>.
      </p>

      <h3>A Simple Idea to Start With</h3>

      <p>Here is one straightforward way to sort the list:</p>

      <ol>
        <li>Start from the beginning of the list.</li>
        <li>Compare each number with the next number.</li>
        <li>
          If the current number is bigger than the next one, swap them.
        </li>
        <li>
          Move forward and repeat this process for the entire list.
        </li>
        <li>
          Do this whole process again and again until the list becomes sorted.
        </li>
      </ol>
      <br />

      <h3>Why Do We Repeat It Multiple Times?</h3>

      <p>
        One pass through the list is not enough to fully sort it.
      </p>

      <p>
        After the first pass, the largest number slowly moves toward the end of the list.
      </p>

      <p>
        After the second pass, the next largest number moves into its correct position,
        and so on.
      </p>

      <p>
        That’s why we repeat this process at most <code>n - 1</code> times,
        where <code>n</code> is the number of elements in the list.
      </p>
    </div>

    <div className="write1">
      <h3>What’s Happening Intuitively?</h3>

      <p>
        With every pass, the biggest unsorted element “bubbles up” to its correct position
        at the end of the list.
      </p>

      <p>
        Smaller elements gradually move toward the front.
      </p>

      <p>
        That’s why this method is called <strong>Bubble Sort</strong>.
      </p>

      <p>
        It behaves like bubbles in water:
        lighter (smaller) elements rise up, while heavier (larger) elements sink down.
      </p>
 
      <h3>Why This Works</h3>

      <p>
        After each full pass, at least one element is placed in its correct position.
      </p>

      <p>
        So after <code>n - 1</code> passes, every element will be in the correct order.
      </p>
    </div>

    <div className="write4">
      <h3>Visual Understanding</h3>

      <p>
        Let’s now visualize how elements move step by step in Bubble Sort.
      </p>

      <p>
        This will help us clearly see how the swapping process sorts the list.
      </p>
      <Visual2 />
    </div>

    <div className="write4">
      <h2>4. Build the Solution (Turn the idea into code)</h2>

      <p>
        Now that we understand the Bubble Sort idea, let’s convert it into code.
      </p>

      <p>
        We will use simple variable names so that the logic is easy to follow.
      </p>


      <p>Let’s translate our idea into small steps:</p>

      <ol>
        <li>Make a copy of the list so we don’t change the original one.</li>
        <li>Repeat the sorting process multiple times.</li>
        <li>In each pass, compare adjacent elements.</li>
        <li>If they are in the wrong order, swap them.</li>
        <li>After all passes, return the sorted list.</li>
      </ol>
    </div>


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
      <h2> Great, all our test cases are passed</h2>

 

    <div className="write4">
      <h2>5. Analyze the algorithm's complexity and identify inefficiencies, if any.</h2>

      <p>
        Now that our Bubble Sort solution is working correctly, let’s understand how efficient it is.
      </p>

      <p>
        We want to know how the number of operations grows when the size of the input increases.
      </p>
    </div>

    <div className="write4">
      <h3>How many comparisons are happening?</h3>

      <p>
        In Bubble Sort, we compare each element with the next one.
      </p>

      <p>
        So in one full pass through the list, we do approximately <code>n</code> comparisons.
      </p>

      <p>
        And we repeat this process again and again.
      </p>

      <p>
        If the list has <code>n</code> elements, we repeat the process about <code>n - 1</code> times.
      </p>
    </div>

    <div className="write4">
      <h3>Total Work Done</h3>

      <p>
        In each pass → about <code>n</code> operations  
        <br />
        Number of passes → about <code>n</code>
      </p>

      <p>
        So total work becomes:
      </p>

      <blockquote>
        n × n = n²
      </blockquote>

      <p>
        This means the number of operations grows very fast as the input size increases.
      </p>
    </div>

    <div className="write4">
      <h3>Time Complexity</h3>

      <p>
        Therefore, Bubble Sort has a time complexity of:
      </p>

      <blockquote>
        <strong>O(n²)</strong>
      </blockquote>

      <p>
        This is because for every element, we may end up scanning the list again.
      </p>
    </div>

    <div className="write4">
      <h3>Space Complexity</h3>

      <p>
        We are not using any extra data structures.
      </p>

      <p>
        We only swap elements inside the same list.
      </p>

      <p>
        So the space used does not grow with input size.
      </p>

      <blockquote>
        <strong>Space Complexity: O(1)</strong>
      </blockquote>
    </div>

    <div className="write4">
      <h3>Key Insight</h3>

      <p>
        Bubble Sort is simple and easy to understand, but it is not very efficient
        for large datasets.
      </p>

      <p>
        This is why we often look for better approaches like
        <strong>Divide and Conquer algorithms</strong>, which we will study next.
      </p>
    </div>

    <div className="write4">
      <h2> Identify Inefficiencies</h2>

      <p>
        Our Bubble Sort solution works correctly, but let’s think about how it behaves.
      </p>

      <p>
        Even if the list is already almost sorted, Bubble Sort still compares
        every pair again and again.
      </p>

      <p>
        It does not “learn” from previous steps.
        It repeats the same comparisons no matter what.
      </p>
    </div>

    <div className="write4">
      <h3>What feels wasteful here?</h3>

      <p>
        Imagine we already have a partially sorted list like this:
      </p>

      <pre>
    [1, 2, 3, 5, 4, 6, 7]
      </pre>

      <p>
        Only one element (5 and 4) is out of order.
      </p>

      <p>
        But Bubble Sort will still scan through the entire list multiple times,
        even though most of it is already correct.
      </p>

      <p>
        This means we are doing unnecessary work.
      </p>
    </div>

    <div className="write4">
      <h3>Can we do better?</h3>

      <p>
        Instead of repeatedly checking the whole list,
        what if we built the sorted list step by step?
      </p>

      <p>
        What if each new number was placed directly into its correct position,
        instead of swapping again and again?
      </p>
    </div>

    <div className="write4">
      <h2>Introducing a New Idea: Insertion Sort</h2>

      <p>
        Let’s think differently now.
      </p>

      <p>
        Instead of sorting the whole list at once,
        we will imagine building a sorted list one element at a time.
      </p>

      <p>
        We start with the first element (which is already sorted by itself),
        and then we slowly take one element at a time and insert it
        into its correct position in the sorted part.
      </p>
    </div>

    <div className="write4">
      <h3>Simple Story of Insertion Sort</h3>

      <p>
        Think of arranging playing cards in your hand.
      </p>

      <p>
        You pick one card at a time and place it in the correct position
        among the cards you already hold.
      </p>

      <p>
        You don’t reshuffle everything from scratch every time.
        You just insert the new card where it belongs.
      </p>
    </div>

    <div className="write4">
      <h3>Key Idea</h3>

      <blockquote>
        Instead of repeatedly swapping elements like Bubble Sort,
        we grow a sorted section step by step by inserting elements
        into their correct position.
      </blockquote>

      <p>
        This is called <strong>Insertion Sort</strong>.
      </p>

      <p>
        Now let’s build this idea into an algorithm.
      </p>
    </div>
    <Visual3/>


    <div className="write4">
      <h2>Insertion Sort: Turning Idea into Code</h2>

      <p>
        Now that we understand the idea of insertion sort, let’s convert it into simple code.
      </p>

      <p>
        Remember the main idea:
        we build a sorted list one element at a time, just like arranging cards in our hand.
      </p>
    </div>

    <div className="write4">
      <h3>Core Idea Before Code</h3>

      <p>
        We start from the second element.
      </p>

      <p>
        The first element is already "sorted" by itself.
      </p>

      <p>
        Then we take each new element and place it into its correct position
        in the already sorted part of the list.
      </p>
    </div>

        <div className="write4">
      <h3>Insertion Sort </h3>

      <p>
        Think of this like arranging playing cards in your hand.
      </p>

      <p>
        At any moment, the left side of the list is already sorted.
        We take one new element (called <code>key</code>) and try to place it
        in the correct position inside this sorted part.
      </p>

      <p>
        So for each position <code>i</code>, we pick:
        <code>key = nums[i]</code> and compare it with elements on the left side.
      </p>

      <p>
        If elements on the left are bigger than <code>key</code>, we shift them
        one step to the right to make space.
      </p>

      <p>
        Once we find the correct position, we place the <code>key</code> there.
      </p>

      <p>
        In simple words:
        we don’t swap again and again like Bubble Sort — we shift elements and insert
        the value directly into its correct place.
      </p>


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



    <div className="write4">
      <h3>Key Takeaway</h3>

      <blockquote>
        Bubble Sort = repeatedly swap neighbors  
        <br />
        Insertion Sort = pick one element and insert it in correct position
      </blockquote>
    </div>

    <div className="write4">
      <h2>6. Improve and Generalize</h2>

      <p>
        So far, we have seen sorting methods like Bubble Sort and Insertion Sort.
        They work, but they still compare and move elements one by one.
      </p>

      <p>
        Now we will try to make sorting even more efficient using a new idea:
        <strong>Divide and Conquer</strong>.
      </p>
  
      <h3>The Big Idea: Divide and Conquer</h3>

      <p>
        Instead of solving the whole problem at once, we break it into smaller parts,
        solve each part separately, and then combine the results.
      </p>

      <p>
        This approach follows 4 simple steps:
      </p>

      <ol>
        <li><strong>Divide</strong> the input into two roughly equal halves.</li>
        <li><strong>Conquer</strong> each half by solving it recursively.</li>
        <li><strong>Combine</strong> the results to form the final solution.</li>
        <li><strong>Stop</strong> when the problem becomes too small to divide further.</li>
      </ol>
    </div>

    <div className="write4">
      <h3>How this helps in sorting</h3>

      <p>
        Instead of sorting a large list directly, we split it into two smaller lists.
      </p>

      <p>
        Each smaller list is easier to sort.
      </p>

      <p>
        Once both halves are sorted, we merge them back together in the correct order.
      </p>
    </div>

    <div className="write4">
      <h3>Visual Idea</h3>
               
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Merge-sort-example-300px.gif"
        alt="Merge sort visualization"
        style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto', width: '600px' }}
      />
         
      
      <p>
        Imagine breaking a big list into smaller and smaller pieces until each piece has only one element.
      </p>

      <p>
        A single element is already sorted.
      </p>

      <p>
        Then we slowly combine these pieces back together in sorted order.
      </p>

      <p>
        This process continues until we rebuild the full sorted list.
      </p>

      <p>
        This is the core idea behind <strong>Merge Sort</strong>.
      </p>
    </div>

    <div className="write4">
      <h3>Merge Sort</h3>

      <p>
        Merge Sort is a sorting algorithm based on the Divide and Conquer strategy.
      </p>

      <p>
        It repeatedly divides the list into halves, sorts each half, and merges them back together.
      </p>

      <p>
        This method is much more efficient for large datasets compared to Bubble Sort or Insertion Sort.
      </p>
    </div>

    <div className="write4">
        <h2>Step 6 — Improve and Generalize</h2>

        <p>
            Bubble Sort and Insertion Sort helped us sort numbers correctly,
            but they still spend a lot of time moving elements around.
            As the list becomes larger, sorting starts taking more and more time.
        </p>

        <p>
            So instead of trying to sort one huge list at once, what if we
            break the problem into smaller and smaller pieces?
        </p>

        <p>
            This idea is called <strong>Divide and Conquer</strong>.
        </p>
    </div>

    <div className="write3">
        <h3>The Story</h3>

        <p>
            Imagine your teacher gives you a huge pile of answer sheets and asks
            you to arrange them in order of marks.
        </p>

        <p>
            Sorting the entire pile by yourself may take a long time.
        </p>

        <p>
            Instead, you split the pile into two smaller piles and give one pile
            to your friend.
        </p>

        <p>
            Then both of you split your piles again and again until every pile
            contains just one sheet.
        </p>

        <p>
            A pile containing only one sheet is already sorted.
            There is nothing left to arrange.
        </p>
    </div>

    <div className="write3">
        <h3>Divide</h3>

        <p>
            Keep splitting the list into two halves until each part contains only
            one element.
        </p>

        <pre>
    [8, 3, 5, 1] <br />

          ↓<br />

    [8, 3]    [5, 1]<br />

          ↓<br />

    [8] [3]   [5] [1]<br />
        </pre>

        <p>
            Now every piece contains just one element, so every piece is already sorted.
        </p>
    </div>

    <div className="write3">
        <h3>Conquer</h3>

        <p>
            Once the smaller problems are ready, we start solving them.
        </p>

        <p>
            Since single-element lists are already sorted, there is no extra work
            needed at this stage.
        </p>
    </div>

    <div className="write3">
        <h3>Combine</h3>

        <p>
            Now we begin joining the sorted pieces together.
        </p>

        <pre>
    [8] [3]<br />
        ↓<br />
    [3, 8]<br /><br />

    [5] [1]<br />
      ↓<br />
    [1, 5]<br />
        </pre>

        <p>
            Finally, merge the two sorted lists again.
        </p>

        <pre>
    [3, 8]   [1, 5] <br />

          ↓<br />

    [1, 3, 5, 8]<br />
        </pre>

        <Visual4/>

        <p>
            By carefully combining sorted lists, we get one completely sorted list.
        </p>
    </div>

    <div className="write2">
        <h3>Key Idea</h3>

        <p>
            Merge Sort follows three simple steps:
        </p>

        <ol>
            <li>Divide the list into smaller halves.</li>
            <li>Conquer by solving the smaller problems.</li>
            <li>Combine the sorted halves into one sorted list.</li>
        </ol>

        <p>
            This strategy allows Merge Sort to handle very large lists much more
            efficiently than Bubble Sort and Insertion Sort.
        </p>
    </div>
    
    <div className="write4">
        <h2>Step 4 — Build the Solution</h2>

    
      <p>
          We now understand the idea of Merge Sort.
      </p>

      <p>
          First, divide the list into smaller halves.
          Keep dividing until each part contains only one element.
      </p>

      <p>
          Then merge the smaller sorted lists back together.
      </p>

      <p>
          Let's slowly build the algorithm and understand why every line exists.
      </p>
     

    </div>
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
    <h2>lets understand everything</h2>


    <div className="write3">
        <h3>Question 1: When Should We Stop Dividing?</h3>

   
        <p>
            Imagine we have:
        </p>

        <pre>[8] </pre>
      
        <p>
            Can we divide this further?
        </p>

        <p>
            No.
        </p>

        <p>
            A list containing zero or one element is already sorted.
        </p>

        <p>
            So this becomes our stopping condition.
        </p>

        <pre>
          if len(nums) less than or equal to 1:
            return nums
        </pre>

        <p>
            Whenever we reach a very small list, we simply return it.
        </p>
      

      </div>

      <div className="write3">
        <h3>Question 2: How Do We Divide the List?</h3>

      
        <p>
            To split a list into two halves, we first need to find the middle.
        </p>

        <pre>
          mid = len(nums) // 2 
        </pre>
        <p>
            Example:
        </p>

        <pre>
          [8, 3, 5, 1]

          mid = 2 
        </pre>
      
        <p>
            Now we can create two smaller lists.
        </p>

        <pre>
          left = nums[:mid]
          right = nums[mid:]
        </pre>

        <pre>
          left  = [8, 3]
          right = [5, 1]
        </pre>

      
        <p>
            We have successfully divided the problem into two smaller problems.
        </p>
      

      </div>

      <div className="write3">
        <h3>Question 3: How Do We Sort the Two Halves?</h3>
        <p>
            We already know how to sort a list:
            use Merge Sort.
        </p>

        <p>
            So we use the same function again on both halves.
        </p>

        <pre>
          left_sorted = merge_sort(left)
          right_sorted = merge_sort(right) 
        </pre>

      
        <p>
            This may look strange at first.
        </p>

        <p>
            The function is calling itself.
        </p>

        <p>
            This is called Recursion.
        </p>

        <p>
            We keep breaking the problem into smaller versions of the same problem.
        </p>
      

      </div>

      <div className="write3">
            <h3>Question 4: What Happens After Both Halves Are Sorted?</h3>

      
        <p>
            Suppose recursion gives us:
        </p>

        <pre>
          left_sorted  = [3, 8]
          right_sorted = [1, 5] 
        </pre>
      
        <p>
            Both halves are sorted individually.
        </p>

        <p>
            Now we must combine them into one sorted list.
        </p>

        <p>
            For that, we create a helper function called merge().
        </p>

        <pre>
          return merge(left_sorted, right_sorted) 
        </pre>

    
        <p>
          The job of merge() is simple:
          take two sorted lists and produce one larger sorted list.
        </p>
    

      </div>

      <div className="write2">

        <h3>Putting Everything Together</h3>


        <pre>
    

          def merge_sort(nums):

        
          if len(nums) less than equal to 1:
              return nums

          mid = len(nums) // 2

          left = nums[:mid]
          right = nums[mid:]

          left_sorted = merge_sort(left)
          right_sorted = merge_sort(right)

          return merge(left_sorted, right_sorted)

        </pre>

        <p>
            Notice that nothing in this code is random.
        </p>

        <p>
            Every line exists because the story demanded it:
        </p>

        <ol>
            <li>Stop when the list is already sorted.</li>
            <li>Find the middle.</li>
            <li>Split into two halves.</li>
            <li>Sort both halves recursively.</li>
            <li>Merge the sorted halves.</li>
        </ol>
   

      </div>

      <div className="write4">
            <h2>Step 6 — Measure Performance</h2>

        <p>
            We have successfully built Merge Sort.
        </p>

        <p>
            The next question is:
        </p>

        <p>
            <strong>How efficient is it?</strong>
        </p>

        <p>
            To answer that, let's see how much work Merge Sort performs as the size of the input grows.
        </p>

        <br/>

      
        <h3>How Many Times Do We Divide?</h3>

        <p>
            Merge Sort keeps dividing the list into halves.
        </p>

        <p>
            Suppose we have 16 elements.
        </p>

        <pre>

          16<br/>
          ↓<br/>
          8<br/>
          ↓<br/>
          4<br/>
          ↓<br/>
          2<br/>
          ↓<br/>
          1 <br/>
        </pre>

        <p>
            Notice that the size becomes half at every step.
        </p>

        <p>
            The number of divisions required to reach 1 element is approximately log₂N.
        </p>

        <p>
            This means the height of the recursion tree is:
        </p>

        <pre>
          log₂N
        </pre>

      </div>

      <div className="write3">
        <h3>How Much Work Happens At Each Level?</h3>

        <p>
            While coming back up, Merge Sort starts merging the smaller sorted lists.
        </p>

        <p>
            During a merge operation, every element is examined and copied exactly once.
        </p>

        <p>
            So if the list contains N elements, the total work done at one level is:
        </p>

        <pre> N </pre>

        <p>
            Even though there are many small merges, together they process all N elements.
        </p>
        <br/>


       <h3>Total Work Done</h3>

        <p>
            We have:
        </p>

        <ul>
            <li>log₂N levels of division</li>
            <li>N work at each level</li>
        </ul>

        <p>
            Therefore:
        </p>

        <pre> N × log₂N </pre>

        <p>
            This gives us the overall running time of Merge Sort.
        </p>

      </div>

      <div className="write2">
            <h3>Complexity Analysis</h3>

        <pre>

        Time Complexity  = O(N log N)

        Space Complexity = O(N) </pre>

        <p>
            Merge Sort needs extra space because it creates new lists while splitting and merging.
        </p>

        <p>
            This is why its space complexity is O(N).
        </p>

        </div>

        <div className="write2">
            <h3>Final Thoughts</h3>

        <p>
            Bubble Sort and Insertion Sort repeatedly move elements around, which makes them slower for large inputs.
        </p>

        <p>
            Merge Sort follows a smarter strategy:
        </p>

        <ol>
            <li>Divide the problem into smaller pieces.</li>
            <li>Sort the smaller pieces.</li>
            <li>Merge the results together.</li>
        </ol>

        <p>
            Because of this Divide and Conquer approach, Merge Sort can efficiently handle very large datasets.
        </p>

        <p>
            It is one of the most important sorting algorithms and forms the foundation for many advanced algorithms that you will learn later.
        </p>

        </div>
        <div className="write4">
            <h2>Step 7 — Identify Inefficiencies</h2>

       
        <p>
              Merge Sort is much faster than Bubble Sort and Insertion Sort.
          </p>

          <p>
              Its time complexity is O(N log N), which makes it efficient even for large inputs.
          </p>

          <p>
              But no algorithm is perfect.
          </p>

          <p>
              Let's look at one limitation of Merge Sort.
          </p>
       

        </div>

        <div className="write3">
            <h3>The Problem</h3>

       
          <p>
              Every time Merge Sort splits the list, it creates new smaller lists.
          </p>

          <pre>
        

          left = nums[:mid]
          right = nums[mid:] </pre>

        
          <p>
              Later, while merging, it creates another list to store the result.
          </p>

          <p>
              This means Merge Sort needs extra memory.
          </p>

          <pre>
        

          Space Complexity = O(N) </pre>

        
          <p>
              For small inputs this is not a big issue.
          </p>

          <p>
              But when dealing with millions of elements, this additional memory can become expensive.
          </p>
        

        </div>

        <div className="write3">
         <h3>Can We Sort Without Creating So Many Extra Lists?</h3>

       
          <p>
              Instead of continuously creating new arrays and then merging them,
              what if we rearranged the elements inside the same array?
          </p>

          <p>
              What if we could place elements on the correct side of a chosen element
              and gradually build a sorted array?
          </p>

          <p>
              This idea leads us to another famous Divide and Conquer algorithm:
          </p>

          <h3>Quick Sort</h3>
       

        </div>

        <div className="write2">
            <h3>The Big Idea</h3>

       
          <p>
              Merge Sort says:
          </p>

          <blockquote>
              Divide first, then merge later.
          </blockquote>

          <p>
              Quick Sort says:
          </p>

          <blockquote>
              Put one element in its correct position first, then sort the remaining parts.
          </blockquote>

          <p>
              That one special element is called the <strong>Pivot</strong>.
          </p>
        

        </div>
        <div className="write4">
            <h2>Quick Sort</h2>

      
          <p>
              Imagine a teacher enters a classroom and chooses one student as a reference.
          </p>

          <p>
              Every student shorter than that student stands on the left.
          </p>

          <p>
              Every student taller stands on the right.
          </p>

          <p>
              Once everyone is arranged this way, the chosen student is already standing in the correct final position.
          </p>

          <p>
              This chosen student is called the Pivot.
          </p>
        

        </div>

          <div className="write3">
              <h3>Example</h3>

          
            <pre>
          

            [8, 3, 5, 1, 7, 4, 2, 6] </pre>

          
            <p>
                Let's choose the last element as the pivot.
            </p>

            <pre>
          

            Pivot = 6 </pre>

          
            <p>
                Now place:
            </p>

            <ul>
                <li>Smaller elements on the left of 6</li>
                <li>Larger elements on the right of 6</li>
            </ul>

            <pre>
          

            [3, 5, 1, 4, 2, 6, 8, 7] </pre>

          
            <p>
                Notice something important.
            </p>

            <p>
                The pivot is now in its final sorted position.
            </p>

            <p>
                No matter what happens later, 6 will never move again.
            </p>
          

          </div>

          <div className="write3">
              <h3>What Next?</h3>

        
            <p>
                The left side is still unsorted.
            </p>

            <pre>
          

            [3, 5, 1, 4, 2] </pre>

          
            <p>
                The right side is also unsorted.
            </p>

            <pre>
          

            [8, 7] </pre>

          
            <p>
                So we apply the exact same idea again.
            </p>

            <p>
                Choose a pivot.
            </p>

            <p>
                Partition the elements.
            </p>

            <p>
                Repeat until every pivot reaches its correct position.
            </p>
        

          </div>

          <div className="write2">
              <h3>Quick Sort Strategy</h3>

        
            <ol>
                <li>Choose a pivot.</li>
                <li>Place smaller elements to its left.</li>
                <li>Place larger elements to its right.</li>
                <li>The pivot reaches its final position.</li>
                <li>Recursively sort the left part.</li>
                <li>Recursively sort the right part.</li>
            </ol>

            <p>
                Just like Merge Sort, Quick Sort follows Divide and Conquer.
            </p>

            <p>
                The difference is that instead of merging sorted halves later,
                Quick Sort rearranges elements around a pivot first and then sorts the remaining parts.
            </p>
          

          </div>
   
          <div className="write4">
              <h2>Step 4 — Build the Solution</h2>

  
            <p>
                We already know the idea behind Quick Sort.
            </p>

            <p>
                Choose a pivot.
            </p>

            <p>
                Move smaller elements to its left.
            </p>

            <p>
                Move larger elements to its right.
            </p>

            <p>
                Once the pivot reaches its correct position, repeat the same process on the left and right parts.
            </p>

            <p>
                Let's build the algorithm step by step and understand why every line exists.
            </p>

          </div>

          <div className="write3">
              <h3>Question 1: When Should We Stop?</h3>

  
            <p>
                Suppose the current part of the array contains only one element.
            </p>

            <pre>
    

            [8] </pre>

    
            <p>
                Is there anything to sort?
            </p>

            <p>
                No.
            </p>

            <p>
                A single element is already sorted.
            </p>

            <p>
                Therefore we continue only when there are at least two elements.
            </p>

            <pre>
    

            if(low less than high) </pre>

    
            <p>
                If low becomes equal to high, the current section is already sorted.
            </p>
    

          </div>

          <div className="write3">
              <h3>Question 2: How Do We Place The Pivot?</h3>

  
            <p>
                Consider the array:
            </p>

            <pre>
    

            [8, 3, 5, 1, 7, 4, 2, 6] </pre>

    
            <p>
                Let us choose the last element as the pivot.
            </p>

            <pre>
    

            pivot = 6 </pre>

    
            <p>
                Now our goal is simple.
            </p>

            <ul>
                <li>All smaller elements should go to the left.</li>
                <li>All larger elements should go to the right.</li>
            </ul>

            <p>
                The function responsible for doing this work is called:
            </p>

            <pre>
    

            partition() </pre>

    
            <p>
                After partitioning, the pivot reaches its final sorted position.
            </p>
    

          </div>

          <div className="write3">
              <h3>Question 3: What Does Partition Return?</h3>

  
            <p>
                After rearranging the elements, partition tells us where the pivot ended up.
            </p>

            <pre>
    

            pivot = partition(a, low, high) </pre>

    
            <p>
                Example:
            </p>

            <pre>
    

            [3, 5, 1, 4, 2, 6, 8, 7]
            ↑
            pivot </pre>

    
            <p>
                Here the pivot value 6 is now in its correct position.
            </p>

            <p>
                The returned index helps us divide the problem into two smaller problems.
            </p>
    

          </div>

          <div className="write3">
              <h3>Question 4: What Happens Next?</h3>

    
            <p>
                The pivot is already sorted.
            </p>

            <p>
                We don't need to touch it again.
            </p>

            <p>
                But the left side may still be unsorted.
            </p>

            <pre>
    

            [3, 5, 1, 4, 2] </pre>

    
            <p>
                And the right side may also be unsorted.
            </p>

            <pre>
    

            [8, 7] </pre>

    
            <p>
                So we recursively apply Quick Sort on both sides.
            </p>

            <pre>
    

            quicksort(a, low, pivot - 1)

            quicksort(a, pivot + 1, high) </pre>

    
            <p>
                This keeps shrinking the problem until every pivot reaches its correct position.
            </p>
    

            </div>

            <div className="write2">
              <h3>Putting Everything Together</h3>  

       
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
    
            <p>
                Notice that nothing here is random.
            </p>

            <ol>
                <li>Stop when the current section has one element.</li>
                <li>Choose and place a pivot.</li>
                <li>Find the pivot's final position.</li>
                <li>Sort the left side.</li>
                <li>Sort the right side.</li>
            </ol>

            <p>
                Every line exists because the story demanded it.
            </p>
    

          </div>

          <div className="write4">
            <h2>Step 5 — Measure Performance</h2>

            <p>
                We have now learned two powerful Divide and Conquer algorithms:
                Merge Sort and Quick Sort.
            </p>

            <p>
                Both algorithms are much faster than Bubble Sort and Insertion Sort when working with large datasets.
            </p>

            <p>
                But how fast are they exactly?
            </p>

            <p>
                Let's analyze their performance.
            </p>

            </div>

          <div className="write3">
                <h3>Merge Sort Analysis</h3>

            <p>
                Merge Sort repeatedly divides the array into halves.
            </p>

            <pre>

              N  <br/>
              ↓ <br/>
              N/2<br/>
              ↓<br/>
              N/4<br/>
              ↓<br/>
              N/8<br/>
              ↓<br/>
              ...<br/>
              ↓<br/>
              1 
            </pre>

            <p>
                The number of times we can keep dividing by 2 is:
            </p>

            <pre>log₂N </pre>

            <p>
                At each level, all N elements are processed during merging.
            </p>

            <p>
                Therefore:
            </p>

            <pre>
              Total Work = N × log₂N
            </pre>

           <pre>

            Time Complexity = O(N log N)
            Space Complexity = O(N)

           </pre>

            <p>
                Merge Sort is predictable and performs well even for very large inputs.
            </p>

          </div>

          <div className="write3">
                <h3>Quick Sort Analysis</h3>

            <p>
                Quick Sort works by selecting a pivot and partitioning the array.
            </p>

            <p>
                If the pivot divides the array into nearly equal halves, the recursion tree looks similar to Merge Sort.
            </p>

            <pre>

            N
            ↓
            N/2
            ↓
            N/4
            ↓
            N/8
            ↓
            ...
            ↓
            1 </pre>

            <p>
                This gives:
            </p>

            <pre>

            Time Complexity = O(N log N) </pre>

            <p>
                However, Quick Sort depends heavily on the choice of pivot.
            </p>

            <p>
                Consider an already sorted array:
            </p>

            <pre>

            [1, 2, 3, 4, 5, 6, 7] </pre>

            <p>
                If we always choose the last element as the pivot, one side becomes empty and the other side contains almost all elements.
            </p>

            <pre>

            N<br/>
            ↓<br/>
            N-1<br/>
            ↓<br/>
            N-2<br/>
            ↓<br/>
            N-3<br/>
            ↓<br/>
            ...<br/>
            ↓<br/>
            1 </pre>

            <p>
                In this case, Quick Sort performs much more work.
            </p>

            <pre>

            Worst Case Time Complexity = O(N²) </pre>

            <p>
                Fortunately, this situation is uncommon in practice.
            </p>

            <p>
                On average, Quick Sort performs extremely well.
            </p>

            <pre>

            Average Time Complexity = O(N log N)
            Space Complexity = O(log N) </pre>

           </div>

          <div className="write2">
                <h3>Comparison</h3>

            <table>
                <tr>
                    <th>Algorithm</th>
                    <th>Best Case</th>
                    <th>Average Case</th>
                    <th>Worst Case</th>
                    <th>Space</th>
                </tr>

                <tr>
                    <td>Bubble Sort</td>
                    <td>O(N)</td>
                    <td>O(N²)</td>
                    <td>O(N²)</td>
                    <td>O(1)</td>
                </tr>

                <tr>
                    <td>Insertion Sort</td>
                    <td>O(N)</td>
                    <td>O(N²)</td>
                    <td>O(N²)</td>
                    <td>O(1)</td>
                </tr>

                <tr>
                    <td>Merge Sort</td>
                    <td>O(N log N)</td>
                    <td>O(N log N)</td>
                    <td>O(N log N)</td>
                    <td>O(N)</td>
                </tr>

                <tr>
                    <td>Quick Sort</td>
                    <td>O(N log N)</td>
                    <td>O(N log N)</td>
                    <td>O(N²)</td>
                    <td>O(log N)</td>
                </tr>
            </table>

          </div>

          <div className="write2">
                <h3>Think About It 🤔</h3>

            <p>
                You're working on a new feature on Jovian called:
            </p>

            <h4>Top Notebooks of the Week</h4>

            <p>
                Every week, users create thousands or even millions of notebooks.
            </p>

            <p>
                Each notebook has a certain number of likes.
            </p>

            <p>
                To display the most popular notebooks, we need to sort them in decreasing order of likes.
            </p>

            <p>
                Your challenge is to write a function that sorts notebooks based on their likes.
            </p>

            <p>
                Before writing code, think about the following:
            </p>

            <ul>
                <li>Which sorting algorithm would you choose?</li>
                <li>Would Bubble Sort be practical for millions of notebooks?</li>
                <li>Would Merge Sort or Quick Sort be a better choice?</li>
                <li>How would you compare two notebooks?</li>
                <li>What would be the time complexity of your solution?</li>
            </ul>

            <p>
                Try solving this problem on your own.
            </p>

          </div>

          <div className="write2">
                <h3>Coming Up Next 🚀</h3>

            <p>
                Congratulations!
            </p>

            <p>
                You have completed the Divide and Conquer module.
            </p>

            <p>
                You learned how to break large problems into smaller ones, solve them recursively, and combine the results efficiently.
            </p>

            <p>
                In the next module, we'll explore more advanced applications of Divide and Conquer and learn how these ideas power many real-world algorithms.
            </p>

            <p>
                See you in the next module!
            </p>

          </div>


    </div>
  );
}