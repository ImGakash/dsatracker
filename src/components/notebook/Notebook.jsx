import React from "react";
import Cell from "./Cell";

export default function Notebook({
  cells,
  onAddCell,
  onMoveCell,
  onDeleteCell,
  onRunCell,
  onEditCode,
}) {
  return (
    <>
      {cells.map((cell) => (
        <Cell
          key={cell.id}
          cell={cell}
          onAddCell={() => onAddCell(cell.id)}
          onMoveCellUp={() => onMoveCell(cell.id, "up")}
          onMoveCellDown={() => onMoveCell(cell.id, "down")}
          onDeleteCell={() => onDeleteCell(cell.id)}
          onRunCell={() => onRunCell(cell.id)}
          onEditCode={(newCode) => onEditCode(cell.id, newCode)}
        />
      ))}
    </>
  );
}
