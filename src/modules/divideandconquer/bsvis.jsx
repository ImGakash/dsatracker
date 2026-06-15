import { useState } from "react";
import "./bsvis.css";

const INITIAL_ARRAY = [4, 2, 6, 3, 4, 6, 2, 1];

export default function BubbleSortVisualization() {
  const [array, setArray] = useState([...INITIAL_ARRAY]);

  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);

  const [compare, setCompare] = useState([]);
  const [swapped, setSwapped] = useState([]);

  const [sortedStart, setSortedStart] = useState(
    INITIAL_ARRAY.length
  );

  const [completed, setCompleted] = useState(false);

  const nextStep = () => {
    if (completed) return;

    const arr = [...array];

    setCompare([j, j + 1]);
    setSwapped([]);

    if (arr[j] > arr[j + 1]) {
      [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      setArray(arr);
      setSwapped([j, j + 1]);
      return;
    }

    moveForward();
  };

  const moveForward = () => {
    let nextJ = j + 1;
    let nextI = i;
    let nextSorted = sortedStart;

    if (nextJ > array.length - i - 2) {
      nextI++;
      nextJ = 0;
      nextSorted--;

      setSortedStart(nextSorted);

      if (nextI >= array.length - 1) {
        setCompleted(true);
      }
    }

    setI(nextI);
    setJ(nextJ);
  };

  const handleTransitionEnd = () => {
    if (swapped.length) {
      moveForward();
    }
  };

  return (
    <div className="bubble-container">
      <h1>Bubble Sort Visualization</h1>

      <div className="info">
        Pass: {i + 1}
      </div>

      <div className="array-container">
        {array.map((num, index) => {
          const isComparing =
            compare.includes(index);

          const isSwapped =
            swapped.includes(index);

          const isSorted =
            index >= sortedStart;

          return (
            <div
              key={index}
              className={`
                bubble-card
                ${isComparing ? "compare" : ""}
                ${isSwapped ? "swap" : ""}
                ${isSorted ? "sorted" : ""}
              `}
              onTransitionEnd={
                handleTransitionEnd
              }
            >
              {num}
            </div>
          );
        })}
      </div>

      <button
        className="next-btn"
        onClick={nextStep}
        disabled={completed}
      >
        {completed
          ? "Sorting Complete"
          : "Next Step"}
      </button>

      {completed && (
        <h2 className="success">
          ✅ Array Sorted
        </h2>
      )}
    </div>
  );
}