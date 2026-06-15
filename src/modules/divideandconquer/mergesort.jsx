import { useMemo, useState } from "react";
import "./MergeSort.css";

function generateMergeSteps(arr) {
  const steps = [];

  function mergeSort(array) {
    steps.push({
      type: "split",
      arrays: [array],
    });

    if (array.length <= 1) return array;

    const mid = Math.floor(array.length / 2);

    const left = array.slice(0, mid);
    const right = array.slice(mid);

    steps.push({
      type: "divide",
      arrays: [left, right],
    });

    const sortedLeft = mergeSort(left);
    const sortedRight = mergeSort(right);

    const merged = merge(sortedLeft, sortedRight);

    steps.push({
      type: "merge",
      arrays: [sortedLeft, sortedRight],
      result: merged,
    });

    return merged;
  }

  function merge(left, right) {
    const result = [];

    let i = 0;
    let j = 0;

    while (
      i < left.length &&
      j < right.length
    ) {
      if (left[i] < right[j]) {
        result.push(left[i++]);
      } else {
        result.push(right[j++]);
      }
    }

    return [
      ...result,
      ...left.slice(i),
      ...right.slice(j),
    ];
  }

  mergeSort(arr);

  return steps;
}

export default function MergeSortVisualizer() {
  const steps = useMemo(
    () => generateMergeSteps([8,3,5,1]),
    []
  );

  const [stepIndex, setStepIndex] = useState(0);

  const step = steps[stepIndex];

  return (
    <div className="container">
      <h1>Merge Sort Visualization</h1>

      <div className="step-box">

        {step.arrays.map((group, index) => (
          <div
            key={index}
            className="array-group"
          >
            {group.map((num) => (
              <div
                key={num}
                className="card"
              >
                {num}
              </div>
            ))}
          </div>
        ))}

        {step.result && (
          <>
            <div className="arrow">
              ↓
            </div>

            <div className="array-group merged">
              {step.result.map((num) => (
                <div
                  key={num}
                  className="card result"
                >
                  {num}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <button
        onClick={() =>
          setStepIndex((s) =>
            Math.min(
              s + 1,
              steps.length - 1
            )
          )
        }
      >
        Next Step
      </button>
    </div>
  );
}