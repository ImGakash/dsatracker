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
          <h3>Let's Start With a Problem</h3>

          <div className="write1">
            In this course, we won't just memorize algorithms. Instead, we'll learn how to
            think like a problem solver.
            <br /><br />
            For every problem, we'll follow a simple process:
            <strong>
             the 6 steps that will be discussed later.
            </strong>
            <br /><br />
            This is the same mindset used by good programmers during interviews,
            competitive programming, and real-world software development.
          </div>

          <div className="write3">
            Akash has several cards with numbers written on them.
            He arranges the cards in decreasing order and places them face down on a table.
            <br /><br />
            He then challenges Akshay to find a specific number by turning over as few cards
            as possible.
            <br /><br />
            Your task is to write a function that helps Akshay find the position of the target card.
            
            <video className="module-video" controls>
              <source src={introVideo} type="video/mp4" />
            </video>

          </div>

          <h2>How can we solve this problem efficiently?</h2>
          
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
            <h3>1. Understand the Goal</h3>

            <p>
              Before writing any code, let's make sure we clearly understand the problem.
            </p>

            <h4>What are we given?</h4>

            <ul>
              <li>A list of cards sorted in decreasing order.</li>
              <li>A target number that we need to find.</li>
            </ul>

            <h4>What do we need to return?</h4>

            <p>
              We need to return the position (index) of the target number in the list.
            </p>

            <h4>What does "as few cards as possible" mean?</h4>

            <p>
              It means we should try to find the target using the minimum number of checks.
              In other words, we are looking for an efficient solution, not just a correct one.
            </p>

            <p>
              A correct solution finds the answer.
              An efficient solution finds the answer quickly.
            </p>

            
          </div>

        <div className="write1">
          <h4>Problem</h4>
          <blockquote>
            We need to write a program to find the position of a given number in a list of numbers arranged in decreasing order.
            We also need to minimize the number of times we access elements from the list.
          </blockquote>
          <h4>Input</h4>
          <ul>
            <li><code>cards</code>: A list of numbers sorted in decreasing order. E.g. <code>[90, 80, 70, 60, 50, 40, 30, 20, 10]</code></li>
            <li><code>query</code>: A number whose position in the array is to be determined. E.g. <code>40</code></li>
          </ul>
          <h4>Output</h4>
          <ul>
            <li><code>position</code>: The position of <code>query</code> in the list <code>cards</code>. E.g. <code>5</code> in the above case (counting from <code>0</code>).</li>
          </ul>
        </div>
      </div>

      <div className="write4">
        <h2>2. Explore examples, Test Cases and edge cases</h2>
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
 
      </div> 

      <div className="write1">      
        <p>
          We have created a function called <code>locate_card()</code>, which will eventually
          solve our problem. For now, the function is empty, but we can still understand
          how testing works.
        </p>

        <p>
          To test a function, we provide it with some inputs and compare the result it
          returns with the answer we expect.
        </p>

        <ul>
          <li><code>cards</code> contains the list of numbers.</li>
          <li><code>query</code> is the number we want to find.</li>
          <li><code>output</code> is the expected answer.</li>
        </ul>

        <p>
          When we call:
        </p>

        <pre>
        result = locate_card(cards, query)
        </pre>

        <p>
          the value returned by the function is stored in the variable
          <code>result</code>.
        </p>

        <p>
          Finally, we compare:
        </p>

        <pre>
        result == output
        </pre>

        <p>
          If the comparison returns <code>True</code>, our function has produced the
          correct answer for this test case. If it returns <code>False</code>, our
          solution needs to be fixed.
        </p>

        <blockquote>
          Every good program should be tested with different inputs. Testing helps us
          verify that our solution works correctly before moving on to more complex cases.
        </blockquote>
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
        Obviously, the results do not match the expected output as we have not yet implemented the function.
        We'll represent our test cases as dictionaries to make it easier to test them once we implement our function. 
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
        <h3>What We Have Done So Far?</h3>
        <p>
          Up to this point, we have not changed the actual algorithm or the solution code.
          We have only learned and set up a way to test all our test cases using Python dictionaries.
          That means we are just organizing the inputs and expected results, and preparing a clean way
          to run those checks. We are not yet implementing the search logic itself.
        </p>

      </div>
      <div className="write4">
        <h3>Possible Variations</h3>
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
        <p>Edge Cases = Rare or special situations that can break your program if you don't think about them.</p>
      </div>
      <h2>Query Occurs in the Middle</h2>
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
      <h2>Query is the First Element</h2>

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
      <h2>Query is the Last Element</h2>
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
      <h2>Cards Contains Just One Element (Query)</h2>
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
        <h2>The problem statement does not specify what to do if the list cards does not contain the number query:</h2>
        <ol>
          <li>Read the problem statement again, carefully.</li>
          <li>Look through the examples provided with the problem.</li>
          <li>Ask the interviewer/platform for a clarification.</li>
          <li>Make a reasonable assumption, state it and move forward.</li>
          <li>We will assume that our function will return -1 in case cards does not contain query.</li>
        </ol>
      </div>
      <h2>Cards Does Not Contain Query</h2>
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
      <h2>Cards is Empty</h2>
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
      <h2>Cards Contains Repeating Numbers</h2>
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
      <h2>Query Number Card is Repeated Multiple Times</h2>
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
      <h3>It's your time to think and list some more test cases. Click the '+' button on any cell above to add a new cell and write your test cases.</h3>
      
      <h2>Let's look at the full set of test cases we have created so far. Run the cell below to see the output:</h2>
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
      <div className="write1">
        <p>
          Great! We now have a good collection of test cases to check whether our solution works correctly.
        </p>

        <p>
          Creating test cases before writing code helps us think about different situations
          the program might face. It also helps us discover special cases that are easy to miss,
          such as an empty list, a missing target value, or duplicate elements.
        </p>

        <p>
          Sometimes you may not know how to solve a problem immediately. That's completely normal.
          In many cases, creating and exploring test cases helps you understand the problem better,
          and the solution starts becoming clearer.
        </p>

        <p>
          As we write our code, these test cases will help us verify that our solution works
          correctly for different inputs, not just the example shown in the problem statement.
        </p>

        <blockquote>
          <strong>Tip:</strong> Don't worry if you can't think of every possible test case right away.
          Start with a few important ones and add more as you discover new situations.
          Writing good test cases is a skill that improves with practice.
        </blockquote>
      </div>
    
      <div className="write4">
        <h2>3. Discover a Baseline Approach</h2>

        <p>
          Before thinking about optimization, our first goal should be to find a solution that works correctly.
          It does not need to be the fastest or smartest solution. We just need a clear and reliable way to solve the problem.
        </p>

        <p>
          This first working solution is called the <em>baseline approach</em>. In many problems, the baseline
          approach is also known as the <em>brute force approach</em>, because it checks possibilities in the
          most straightforward way.
        </p>

        <p>
          For this problem, the simplest idea is to start from the first card and check each card one by one
          until we find the number we are looking for.
        </p>

        <h3>Plain English Solution</h3>

        <ol>
          <li>Start at the first card in the list.</li>
          <li>Check if the current card contains the number we are searching for.</li>
          <li>If it does, return its position.</li>
          <li>If not, move to the next card.</li>
          <li>Keep repeating this process until the number is found or all cards have been checked.</li>
          <li>If the number is not found after checking every card, return <code>-1</code>.</li>
        </ol>

        <blockquote>
          <p>
            <strong>Why write the approach in plain English?</strong>
          </p>

          <p>
            Many beginners jump directly into coding and get stuck. Instead, try explaining the solution as if
            you are teaching it to a friend who doesn't know programming.
          </p>

          <p>
            If you can clearly describe the steps in simple words, converting them into code becomes much easier.
            If you struggle to explain the solution, it usually means you need a better understanding of the problem first.
          </p>
        </blockquote>

        <blockquote>
          <p>
            <strong>What algorithm did we just create?</strong>
          </p>

          <p>
            We have just described the <em>Linear Search</em> algorithm. It searches through the list one element
            at a time from beginning to end until the target value is found.
          </p>
        </blockquote>
        <h3>just try to see this card one by one and find which card gives you the target</h3>
        < Visual/>
      </div>

      <div className="write4">
        <h2>4. Build the Solution.</h2>
        <p>
          Great! We now have a clear understanding of the problem, and we've prepared several test cases to verify our solution.
        </p>

        <p>
          Since we know exactly what inputs our function will receive and what output it should produce, we're finally ready to start writing code.
        </p>

        <p>
          The work we've done so far is important because it gives us a clear direction and helps us catch mistakes early while testing.
        </p>

        <p>
          Let's begin by implementing a simple solution that works correctly. We can always improve and optimize it later.
        </p>

        <p>
          Here's our first attempt at building the function:
        </p>
      </div>
      <div className="write1">
        <h3>What Did We Just Do?</h3>

        <p>
          In the animation above, we searched for the target number by looking at one card at a time.
        </p>

        <p>
          We started from the very first card and asked a simple question:
          <strong>"Is this the number we're looking for?"</strong>
        </p>

        <p>
          If the answer was <strong>No</strong>, we moved to the next card and asked the same question again.
        </p>

        <p>
          We repeated this process until we finally found the target number.
          As soon as we found it, we stopped searching because there was no need to check the remaining cards.
        </p>

        <p>
          For example, if we are searching for <code>40</code>, our thinking process looks like this:
        </p>

        <blockquote>
          Is 90 equal to 40? ❌ No
          <br />
          Is 80 equal to 40? ❌ No
          <br />
          Is 70 equal to 40? ❌ No
          <br />
          Is 60 equal to 40? ❌ No
          <br />
          Is 50 equal to 40? ❌ No
          <br />
          Is 40 equal to 40? ✅ Yes! Stop searching.
        </blockquote>

        <p>
          Notice that we checked each card one after another in a straight line, moving from the beginning of the list toward the end.
        </p>

        <p>
          This way of searching is called <strong>Linear Search</strong>.
        </p>

        <p>
          The word <em>linear</em> simply means that we move through the list one element at a time, checking each position until we find the target value.
        </p>

        <p>
          Now let's convert this exact thought process into step-by-step instructions that a computer can follow.
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
        <p>Now let's focus only on the failing case:</p>
        <p><code>cards = []</code><br />
           <code>query = 40</code></p>
        <h2>How do we trace this error? and not that python is saying "out-of-range" issue</h2>
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

      <div className="write4">
        <h2>5. Measure Performance</h2>

        <p>
          Our solution works correctly, but is it the best possible solution?
        </p>

        <p>
          Remember the original challenge:
        </p>

        <blockquote>
          Akash wants Akshay to find the target card by turning over as few cards as possible.
        </blockquote>

        <p>
          In our Linear Search solution, we start from the first card and keep checking
          cards one by one until we find the target.
        </p>

        <p>
          This works well for small lists, but what happens when the number of cards becomes very large?
        </p>

        <h3>Let's Think About It</h3>

        <p>
          Imagine there are 30 cards on the table and the target card is the last one.
        </p>

        <p>
          Akshay may need to turn over all 30 cards before finding the answer.
        </p>

        <p>
          If there are 1,000 cards, he may need to check 1,000 cards.
        </p>

        <p>
          As the number of cards grows, the number of checks also grows.
        </p>

        <h3>Time Complexity</h3>

        <p>
          Time Complexity tells us how the running time of an algorithm grows as the input size grows.
        </p>

        <p>
          For Linear Search:
        </p>

        <ul>
          <li>1 card → up to 1 check</li>
          <li>10 cards → up to 10 checks</li>
          <li>100 cards → up to 100 checks</li>
          <li>N cards → up to N checks</li>
        </ul>

        <p>
          Because the number of checks grows directly with the number of cards,
          the time complexity of Linear Search is:
        </p>

        <blockquote>
          <strong>O(N)</strong>
        </blockquote>

        <p>
          This means that in the worst case, we may have to examine every element in the list.
        </p>

        <h3>Space Complexity</h3>

        <p>
          Space Complexity tells us how much extra memory an algorithm uses.
        </p>

        <p>
          Our solution only uses one extra variable (<code>position</code>) while searching.
        </p>

        <p>
          Since the amount of extra memory stays the same regardless of the number of cards,
          the space complexity is:
        </p>

        <blockquote>
          <strong>O(1)</strong>
        </blockquote>

        <h3>Can We Do Better?</h3>

        <p>
          Linear Search may require checking every card one by one.
        </p>

        <p>
          But notice something interesting:
          the cards are already arranged in decreasing order.
        </p>

        <p>
          Can we use this ordering to find the target much faster without checking every card?
        </p>

        <p>
          That's exactly the question we'll explore next.
        </p>
      </div>



      <div className="write4">
        <h2>6. Improve and Generalize</h2>

        <p>
          Our Linear Search solution works correctly, but it has one problem:
          we may need to check many cards before finding the answer.
        </p>

        <p>
          Imagine there are 1,000 cards on the table and the target card is near the end.
          Checking cards one by one could take a very long time.
        </p>

        <p>
          But notice something important:
        </p>

        <blockquote>
          The cards are already arranged in decreasing order.
        </blockquote>

        <p>
          Instead of checking every card, can we use this ordering to eliminate many cards at once?
        </p>

        <h3>A Smarter Strategy</h3>

        <p>
          Suppose Akshay is looking for the card containing <code>40</code>.
        </p>

        <code>
          [90, 80, 70, 60, 50, 40, 30, 20, 10]
        </code>

        <p>
          Instead of starting from the first card, Akshay picks the middle card.
        </p>

        <p>
          The middle card is <code>50</code>.
        </p>

        <p>
          Now he asks:
        </p>

        <blockquote>
          Is 50 equal to 40?
        </blockquote>

        <p>
          No.
        </p>

        <p>
          Since the cards are sorted in decreasing order, Akshay immediately knows that
          all cards to the left of 50 are larger than 50.
        </p>

        <p>
          Since 40 is smaller than 50, there is no need to check any of those cards.
        </p>

        <p>
          He can completely ignore half of the cards!
        </p>

        <code>
          [90, 80, 70, 60] ❌ Ignore
          <br />
          [50]
          <br />
          [40, 30, 20, 10] ✅ Search Here
        </code>

        <p>
          Now he looks at the middle card of the remaining section.
        </p>

        <p>
          He keeps repeating the same idea:
        </p>

        <ul>
          <li>Look at the middle card.</li>
          <li>Compare it with the target.</li>
          <li>Discard half of the remaining cards.</li>
          <li>Repeat until the target is found.</li>
        </ul>

        <h3>Why Is This Faster?</h3>

        <p>
          Linear Search removes only one card from consideration at a time.
        </p>

        <p>
          Binary Search removes half of the remaining cards in a single step.
        </p>

        <p>
          For example:
        </p>

        <blockquote>
          1000 cards → 500 → 250 → 125 → 62 → 31 → 15 → 7 → 3 → 1
        </blockquote>

        <p>
          In just a few checks, the search space becomes very small.
        </p>
        <Visual1 />

        <p>
          This powerful technique is called <strong>Binary Search</strong>.
        </p>

        <blockquote>
          Binary Search works by repeatedly checking the middle element and eliminating half of the remaining search space.
        </blockquote>

        <p>
          Let's now convert this idea into a step-by-step algorithm.
        </p>
      </div>


      <div className="write4">
        <h2>Iterate the process</h2>
        <h2>step 4. Build the Improved Solution</h2>

        <p>
          We now iterate with the process of problem solving from step4 to step 6.
        </p>

        <p>
          Instead of checking cards one by one, we repeatedly look at the middle card
          and eliminate half of the remaining cards from our search.
        </p>

        <p>
          Before writing code, let's convert our idea into simple step-by-step instructions.
          This helps us make sure we understand the algorithm clearly.
        </p>

        <h3>Binary Search Algorithm</h3>

        <ol>
          <li>Start with the entire list of cards.</li>
          <li>Find the middle card.</li>
          <li>If the middle card is the target, return its position.</li>
          <li>If the target is smaller than the middle card, search the right half.</li>
          <li>If the target is larger than the middle card, search the left half.</li>
          <li>Repeat the process on the remaining half.</li>
          <li>If there are no cards left to search,(means) return <code>-1</code>.</li>
        </ol>

        <blockquote>
          Notice how we never search the entire list again.
          After every comparison, we throw away half of the remaining cards.
          This is what makes Binary Search much faster than Linear Search.
        </blockquote>

        <p>
          Now let's translate these steps into code.
        </p>
      </div>

      <div className="write1">
        <h3>Understanding <code>low</code> and <code>high</code></h3>

        <p>
          In Binary Search, we do not search the entire list every time.
          Instead, we keep track of the portion of the list where the answer
          can still exist.
        </p>

        <p>
          We use two variables:
        </p>

        <ul>
          <li><strong>low</strong> → The starting position of our search area.</li>
          <li><strong>high</strong> → The ending position of our search area.</li>
        </ul>

        <p>
          At the beginning, we do not know where the target is, so our search
          area is the entire list.
        </p>

        <pre>
      cards = [90, 80, 70, 60, 50, 40, 30, 20, 10]

      low = 0
      high = 8
        </pre>

        <p>
          This means we are currently searching from index 0 to index 8,
          which covers all the cards.
        </p>
        <p>we perform this process untill there is no card to search , which implies high is greater than or equal to low.</p>
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
        section={sections.find((s) => s.id === "b27")}
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

      <div className="write1">
        <h3>A New Problem Appears</h3>

        <p>
          Our Binary Search implementation works correctly when every card
          appears only once.
        </p>

        <p>
          However, our test with  input:
        </p>

        <pre>
      cards = [90, 80, 70, 40, 40, 40, 30, 20, 10]
      query = 40
        </pre>

        <p>
          The first occurrence of <strong>40</strong> is at index
          <strong>3</strong>.
        </p>

        <p>
          But our Binary Search returns <strong>4</strong>.
        </p>

        <pre>
      Expected Output: 3
      Actual Output: 4
        </pre>

        <p>
          Why did this happen?
        </p>

        <p>
          Binary Search stops as soon as it finds the target value.
          In this case, it found the 40 at index 4 and immediately returned it.
        </p>

        <p>
          The algorithm does not know that another 40 exists before it.
        </p>

        <p>
          Therefore, simply finding the target is not enough.
          We must find the <strong>first occurrence</strong> of the target.
        </p>
      </div>
      <div className="write1">
        <h3>How Can We Find the First Occurrence?</h3>

        <p>
          Whenever Binary Search finds the target value, we should not
          immediately stop.
        </p>

        <p>
          Instead, we need to check whether another copy of the target exists
          on the left side.
        </p>

        <p>
          If it does, we continue searching toward the left.
        </p>

        <p>
          If it does not, then we have found the first occurrence.
        </p>
      </div>
      <Notebook
        section={sections.find((s) => s.id === "b28")}
        onAddCell={addNewCellAfter}
        onMoveCell={moveCell}
        onDeleteCell={deleteCell}
        onRunCell={(sectionId, cellId) =>
          runCell(sectionId, cellId, isPyodideLoading, !!getPyodide())
        }
        onEditCode={handleEditCode}
      />

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
      <h2>Now Verify All Test Cases</h2>
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
      <div className="write1">
        <h2>CONGRATULATIONS!</h2>

        <h3>We now have a correct and efficient solution.</h3>

        <p>
          We started with a simple Linear Search solution, analyzed its performance,
          discovered a better approach, and finally implemented Binary Search.
        </p>

        <p>
          Along the way, we also handled an important edge case where the query
          appeared multiple times and modified our algorithm to correctly return
          the first occurrence.
        </p>

        <p>
          Since all our test cases pass, we can be confident that our solution
          works correctly.
        </p>

        <p>
          However, correctness is only one part of problem solving. We should
          also understand how efficient our solution is.
        </p>
      </div>

      <div className="write4">
        <h2>step 5. Measure Performance</h2>

        <p>
          Our solution works correctly, but how fast is it?
        </p>

        <p>
          Unlike Linear Search, Binary Search does not check every element one by one.
          Instead, it eliminates half of the remaining search space after every step.
        </p>

        <p>
          Let's see how the search space shrinks:
        </p>

        <p>
          <strong>Initial size</strong> → N<br />
          <strong>After 1 step</strong> → N/2<br />
          <strong>After 2 steps</strong> → N/4<br />
          <strong>After 3 steps</strong> → N/8<br />
          ...<br />
          <strong>After k steps</strong> → N/2<sup>k</sup>
        </p>

        <p>
          Eventually, only one element remains:
        </p>

        <p>
          <code>N/2<sup>k</sup> = 1</code>
        </p>

        <p>
          Rearranging:
        </p>

        <p>
          <code>N = 2<sup>k</sup></code>
        </p>

        <p>
          Taking log base 2 on both sides:
        </p>

        <p>
          <code>k = log₂N</code>
        </p>

        <p>
          This means the number of steps grows very slowly even when the input
          size becomes very large.
        </p>

        <p>
          Therefore, Binary Search runs in <strong>O(log N)</strong> time.
        </p>

        <p>
          We only use a few extra variables such as <code>low</code>,
          <code>high</code>, and <code>mid</code>, so the space complexity is
          <strong>O(1)</strong>.
        </p>
      </div>

      <div className="write1">
        <h2>What's Next?</h2>

        <p>
          Finding the first occurrence of a value is just one variation of
          Binary Search.
        </p>

        <p>
          Many interview and coding problems can be solved using the same idea
          with small modifications.
        </p>

        <blockquote>
          Q. Given an array of integers <code>nums</code> sorted in ascending
          order, find the starting and ending positions of a given number.
        </blockquote>

        <p>
          Think about how you can modify the solution we built in this lesson
          to solve this problem.
        </p>
      </div>

      <div className="write2">
        <h2>Variations of Binary Search</h2>

        <p>
          This lesson introduced the most important Binary Search pattern:
          repeatedly eliminate half of the search space.
        </p>

        <p>
          In future modules, we'll explore several Binary Search variations,
          including finding the last occurrence, insertion position, search
          boundaries, and many interview-style problems.
        </p>
      </div>

      <div className="write4">
        <h2>6.  Measure Performance.</h2>
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

      <div className="write1">
        <h2>Try it out</h2>
        <p>Just a minor modification will result in a correct solution for this problem:</p>
        <blockquote>
          Q. Given an array of integers <code>nums</code> sorted in ascending order, find the starting and ending position of a given number.
        </blockquote>
        <p>This is a variation of binary search where you need to locate the first and last occurrence of the target value.</p>
      </div>

      <div className="write1">
        <h2>Variations of Binary Search:</h2>
        <p>Binary search variations and solutions, a problem-based assignment module, are coming soon.</p>
      </div>

    </div>
  );
}
