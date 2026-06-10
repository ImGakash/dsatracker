import { useState } from "react";

export default function useNotebook(initialCells, runCodeFn) {
  const [cells, setCells] = useState(JSON.parse(JSON.stringify(initialCells)));

  const handleReset = () => {
    setCells(JSON.parse(JSON.stringify(initialCells)));
  };

  const handleEditCode = (id, newCode) => {
    setCells((prevCells) =>
      prevCells.map((cell) =>
        cell.id === id ? { ...cell, code: newCode } : cell
      )
    );
  };

  const addNewCellAfter = (id) => {
    setCells((prev) => {
      const idx = prev.findIndex((c) => c.id === id);
      const newId = prev.reduce((max, c) => Math.max(max, c.id), 0) + 1;
      const newCell = {
        id: newId,
        code: "",
        output: "",
        isError: false,
        isEditing: false,
      };
      if (idx === -1) return [...prev, newCell];
      const copy = [...prev];
      copy.splice(idx + 1, 0, newCell);
      return copy;
    });
  };

  const deleteCell = (id) => {
    setCells((prev) => prev.filter((cell) => cell.id !== id));
  };

  const moveCell = (id, direction) => {
    setCells((prev) => {
      const index = prev.findIndex((cell) => cell.id === id);
      if (index === -1) return prev;
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= prev.length) return prev;
      const updated = [...prev];
      const [movedCell] = updated.splice(index, 1);
      updated.splice(targetIndex, 0, movedCell);
      return updated;
    });
  };

  const runCell = async (id, isPyodideLoading, hasPyodide) => {
    if (isPyodideLoading || !hasPyodide) {
      setCells((prev) =>
        prev.map((c) =>
          c.id === id
            ? {
                ...c,
                output: "Python environment is loading. Please wait...",
                isError: true,
              }
            : c
        )
      );
      return;
    }

    const cell = cells.find((c) => c.id === id);
    if (!cell) return;

    try {
      const finalOutput = await runCodeFn(cell.code);
      setCells((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, output: finalOutput, isError: false } : c
        )
      );
    } catch (err) {
      setCells((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, output: err.message, isError: true } : c
        )
      );
    }
  };

  return {
    cells,
    handleReset,
    handleEditCode,
    addNewCellAfter,
    deleteCell,
    moveCell,
    runCell,
  };
}
