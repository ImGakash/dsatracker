import { useState } from "react";

export default function Question({
  question,
  onToggle,
  onDelete,
  onEdit,
  onEditNote,
  onDeleteNote,
}) {
  const [editText, setEditText] = useState(question.text);
  const [editNoteText, setEditNoteText] = useState(question.note || "");
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingNote, setIsEditingNote] = useState(false);

  return (
    <div className="questionCard">
      <input
        type="checkbox"
        checked={question.isDone}
        onChange={onToggle}
      />

      {isEditing ? (
        <>
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button
            onClick={() => {
              onEdit(editText);
              setIsEditing(false);
            }}
          >
            Save
          </button>
        </>
      ) : (
        <>
          <span className={question.isDone ? "solved" : ""}>
            {question.text} ({question.difficulty})
          </span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}

      <button onClick={onDelete}>Delete</button>

      {isEditingNote ? (
        <>
          <input
            value={editNoteText}
            onChange={(e) => setEditNoteText(e.target.value)}
          />
          <button
            onClick={() => {
              onEditNote(editNoteText);
              setIsEditingNote(false);
            }}
          >
            Save Note
          </button>
        </>
      ) : (
        <>
          {question.note && <p>Note: {question.note}</p>}
          <button onClick={() => setIsEditingNote(true)}>Edit Note</button>
          <button onClick={onDeleteNote}>Delete Note</button>
        </>
      )}
    </div>
  );
}
