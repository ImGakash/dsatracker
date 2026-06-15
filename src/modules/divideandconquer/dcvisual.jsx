import { useState } from "react";
import "./dcvis.css";

function Card({
  value,
  isMid,
  isDiscarded,
  isFound,
}) {
  return (
    <div
      className={`
        card
        ${isMid ? "mid" : ""}
        ${isDiscarded ? "discarded" : ""}
        ${isFound ? "found" : ""}
      `}
    >
      {value}
    </div>
  );
}

export default function BinarySearchVisualization() {
  const arr = [90,80,70,60,50,40,30,20,10];
  const target = 40;

  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(arr.length - 1);

  const [mid, setMid] = useState(
    Math.floor((0 + arr.length - 1) / 2)
  );

  const [foundIndex, setFoundIndex] = useState(null);

  const nextStep = () => {
    if (foundIndex !== null) return;

    const currentMid = Math.floor((low + high) / 2);

    if (arr[currentMid] === target) {
      setFoundIndex(currentMid);
      return;
    }

    if (target < arr[currentMid]) {
      const newLow = currentMid + 1;

      setLow(newLow);

      setMid(
        Math.floor((newLow + high) / 2)
      );
    } else {
      const newHigh = currentMid - 1;

      setHigh(newHigh);

      setMid(
        Math.floor((low + newHigh) / 2)
      );
    }
  };

  return (
    <div className="container">
      <h1>Binary Search Visualization</h1>

      <h2>Target : {target}</h2>

      <div className="cards-container">
        {arr.map((value, index) => {
          const discarded =
            index < low || index > high;

          return (
            <Card
              key={index}
              value={value}
              isMid={
                index === mid &&
                foundIndex === null
              }
              isDiscarded={discarded}
              isFound={index === foundIndex}
            />
          );
        })}
      </div>

      <div className="info">
        <p>
          Low: {low} | Mid: {mid} | High: {high}
        </p>
      </div>

      {foundIndex !== null ? (
        <h2 className="success">
          ✅ Found {target} at index {foundIndex}
        </h2>
      ) : (
        <button
          className="step-btn"
          onClick={nextStep}
        >
          Next Step
        </button>
      )}
    </div>
  );
}
