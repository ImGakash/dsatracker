import { useState } from "react";

export default function useNotebook(initialSections, runCodeFn) {
  const [sections, setSections] = useState(
    JSON.parse(JSON.stringify(initialSections))
  );

  const handleReset = () => {
    setSections(JSON.parse(JSON.stringify(initialSections)));
  };

  // -------------------------
  // EDIT CODE (default or user)
  // -------------------------
  const handleEditCode = (sectionId, cellId, newCode) => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id !== sectionId) return section;

        if (section.defaultCell.id === cellId) {
          return {
            ...section,
            defaultCell: {
              ...section.defaultCell,
              code: newCode,
            },
          };
        }

        return {
          ...section,
          userCells: section.userCells.map((cell) =>
            cell.id === cellId ? { ...cell, code: newCode } : cell
          ),
        };
      })
    );
  };

  // -------------------------
  // ADD CELL (ONLY USER CELLS)
  // -------------------------
  const addNewCellAfter = (sectionId, afterCellId = null) => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id !== sectionId) return section;

        const newCell = {
          id: Date.now(),
          code: "",
          output: "",
          isError: false,
        };

        if (!afterCellId) {
          return {
            ...section,
            userCells: [...section.userCells, newCell],
          };
        }

        let idx = section.userCells.findIndex(
          (c) => c.id === afterCellId
        );

        if (idx === -1 && afterCellId === section.defaultCell.id) {
          idx = -1; // Insert at index 0 (idx + 1 = 0)
        }

        const updated = [...section.userCells];
        updated.splice(idx + 1, 0, newCell);

        return {
          ...section,
          userCells: updated,
        };
      })
    );
  };

  // -------------------------
  // DELETE CELL (USER ONLY)
  // -------------------------
  const deleteCell = (sectionId, cellId) => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id !== sectionId) return section;

        return {
          ...section,
          userCells: section.userCells.filter(
            (c) => c.id !== cellId
          ),
        };
      })
    );
  };

  // -------------------------
  // MOVE CELL (USER ONLY)
  // -------------------------
  const moveCell = (sectionId, cellId, direction) => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id !== sectionId) return section;

        const idx = section.userCells.findIndex(
          (c) => c.id === cellId
        );

        const target =
          direction === "up" ? idx - 1 : idx + 1;

        if (idx < 0 || target < 0 || target >= section.userCells.length)
          return section;

        const updated = [...section.userCells];
        const [moved] = updated.splice(idx, 1);
        updated.splice(target, 0, moved);

        return {
          ...section,
          userCells: updated,
        };
      })
    );
  };

  // -------------------------
  // RUN CELL (default OR user)
  // -------------------------
  const runCell = async (
    sectionId,
    cellId,
    isPyodideLoading,
    hasPyodide
  ) => {
    if (isPyodideLoading || !hasPyodide) return;

    const section = sections.find((s) => s.id === sectionId);
    if (!section) return;

    let cell =
      section.defaultCell.id === cellId
        ? section.defaultCell
        : section.userCells.find((c) => c.id === cellId);

    if (!cell) return;

    try {
      const finalOutput = await runCodeFn(cell.code);

      setSections((prev) =>
        prev.map((section) => {
          if (section.id !== sectionId) return section;

          if (section.defaultCell.id === cellId) {
            return {
              ...section,
              defaultCell: {
                ...section.defaultCell,
                output: finalOutput,
                isError: false,
              },
            };
          }

          return {
            ...section,
            userCells: section.userCells.map((c) =>
              c.id === cellId
                ? { ...c, output: finalOutput, isError: false }
                : c
            ),
          };
        })
      );
    } catch (err) {
      console.error(err);
      const errorMsg = err.message || String(err);
      setSections((prev) =>
        prev.map((section) => {
          if (section.id !== sectionId) return section;

          if (section.defaultCell.id === cellId) {
            return {
              ...section,
              defaultCell: {
                ...section.defaultCell,
                output: errorMsg,
                isError: true,
              },
            };
          }

          return {
            ...section,
            userCells: section.userCells.map((c) =>
              c.id === cellId
                ? { ...c, output: errorMsg, isError: true }
                : c
            ),
          };
        })
      );
    }
  };

  return {
    sections,
    handleReset,
    handleEditCode,
    addNewCellAfter,
    deleteCell,
    moveCell,
    runCell,
  };
}