
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
      <button className="next" onClick={onAddCell} title="Add New Cell After">
        Add New Cell
      </button>
      <button disabled={isDefault} className="movecellup" onClick={onMoveCellUp} title="Move Cell Up">
        Move Up
      </button>
      <button disabled={isDefault} className="movecelldown" onClick={onMoveCellDown} title="Move Cell Down">
        Move Down
      </button>
      <button disabled={isDefault} className="deletecell" onClick={onDeleteCell} title="Delete Cell">
        Delete Cell
      </button>
      <button className="runcell" onClick={onRunCell} title="Run Cell (Ctrl+Enter)">
        Run Cell
      </button>
      <textarea
        value={cell.code}
        rows={20}
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
