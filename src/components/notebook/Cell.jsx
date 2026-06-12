import React from "react";

export default function Cell({
  cell,
  onAddCell,
  onMoveCellUp,
  onMoveCellDown,
  onDeleteCell,
  onRunCell,
  onEditCode,
  isDefault,
}) {
  return (
    <div className="code-cell">
      <button className="next" onClick={onAddCell}>
        Add New Cell
      </button>
      <button disabled={isDefault} className="movecellup" onClick={onMoveCellUp}>
        Move Up
      </button>
      <button disabled={isDefault} className="movecelldown" onClick={onMoveCellDown}>
        Move Down
      </button>
      <button disabled={isDefault} className="deletecell" onClick={onDeleteCell}>
        Delete Cell
      </button>
      <button className="runcell" onClick={onRunCell}>
        Run Cell
      </button>
      <textarea
        value={cell.code}
        rows={10}
        cols={80}
        onChange={(e) => onEditCode(e.target.value)}
      />
      <div className={`output-box ${cell.isError ? "error" : ""}`}>
        <h4>Output</h4>
        <div className="output-content">
          {cell.output || "No output yet"}
        </div>
      </div>
    </div>
  );
}
