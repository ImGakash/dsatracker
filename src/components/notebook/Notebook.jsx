import Cell from "./Cell";

export default function Notebook({
  section,
  onAddCell,
  onMoveCell,
  onDeleteCell,
  onRunCell,
  onEditCode,
}) {
  if (!section) return null;

  return (
    
    <div className="notebook-section">

      {/* ===================== */}
      {/* DEFAULT CELL (FIXED) */}
      {/* ===================== */}
      
      <Cell
        cell={section.defaultCell}
        isDefault={true}
        onRunCell={() =>
          onRunCell(section.id, section.defaultCell.id)
        }
        onEditCode={(newCode) =>
          onEditCode(
            section.id,
            section.defaultCell.id,
            newCode
          )
        }
        onAddCell={() =>
          onAddCell(section.id, section.defaultCell.id)
        }
        onMoveCellUp={() => {}}
        onMoveCellDown={() => {}}
        onDeleteCell={() => {}}
      />

      {/* ===================== */}
      {/* USER CELLS */}
      {/* ===================== */}
      {section.userCells.map((cell) => (
        <Cell
          key={cell.id}
          cell={cell}
          isDefault={false}
          onRunCell={() =>
            onRunCell(section.id, cell.id)
          }
          onEditCode={(newCode) =>
            onEditCode(section.id, cell.id, newCode)
          }
          onAddCell={() =>
            onAddCell(section.id, cell.id)
          }
          onMoveCellUp={() =>
            onMoveCell(section.id, cell.id, "up")
          }
          onMoveCellDown={() =>
            onMoveCell(section.id, cell.id, "down")
          }
          onDeleteCell={() =>
            onDeleteCell(section.id, cell.id)
          }
        />
      ))}

    </div>
  );
}