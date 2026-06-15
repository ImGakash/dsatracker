import { useMemo, useState } from "react";
import "./InsertionSort.css";

export default function InsertionSortVisualization() {
  const steps = useMemo(
    () =>
      generateInsertionSteps([
        4, 2, 6, 3, 4, 6, 2, 1,
      ]),
    []
  );

  const [step, setStep] = useState(0);

  const current = steps[step];

  return (
    <div className="container">
      <h1>Insertion Sort Visualization</h1>

      <div className="cards">
        {current.array.map((value, index) => (
          <div
            key={index}
            className={`
              card
              ${
                index <= current.sortedUntil
                  ? "sorted"
                  : ""
              }
              ${
                index === current.keyIndex
                  ? "key"
                  : ""
              }
              ${
                index === current.compareIndex
                  ? "compare"
                  : ""
              }
            `}
          >
            {value}
          </div>
        ))}
      </div>

      <div className="message">
        {current.message}
      </div>

      <button
        className="btn"
        onClick={() =>
          setStep((s) =>
            Math.min(
              s + 1,
              steps.length - 1
            )
          )
        }
      >
        Next Step
      </button>

      {step === steps.length - 1 && (
        <h2 className="success">
          ✅ Sorting Complete
        </h2>
      )}
    </div>
  );
}

function generateInsertionSteps(input) {
  const arr = [...input];
  const steps = [];

  steps.push({
    array: [...arr],
    sortedUntil: 0,
    keyIndex: null,
    compareIndex: null,
    message: "Initial Array",
  });

  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    steps.push({
      array: [...arr],
      sortedUntil: i - 1,
      keyIndex: i,
      compareIndex: null,
      message: `Select key ${key}`,
    });

    while (j >= 0 && arr[j] > key) {
      steps.push({
        array: [...arr],
        sortedUntil: i - 1,
        keyIndex: i,
        compareIndex: j,
        message: `${arr[j]} > ${key}`,
      });

      arr[j + 1] = arr[j];

      steps.push({
        array: [...arr],
        sortedUntil: i - 1,
        keyIndex: j + 1,
        compareIndex: j,
        message: `Shift ${arr[j]} right`,
      });

      j--;
    }

    arr[j + 1] = key;

    steps.push({
      array: [...arr],
      sortedUntil: i,
      keyIndex: j + 1,
      compareIndex: null,
      message: `Insert ${key}`,
    });
  }

  return steps;
}