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

  const handleStartEdit = () => {
    setEditText(question.text);
    setIsEditing(true);
  };

  const handleStartEditNote = () => {
    setEditNoteText(question.note || "");
    setIsEditingNote(true);
  };

  const difficultyClass = `badge badge-${question.difficulty || "easy"}`;

  return (
    <div className={`questionCard ${question.isDone ? "card-solved" : ""}`}>
      <div className="cardMain">
        <label className="checkboxContainer">
          <input
            type="checkbox"
            checked={question.isDone}
            onChange={() => onToggle(question._id)}
          />
          <span className="checkmark"></span>
        </label>

        {isEditing ? (
          <div className="editInputRow">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="editTextField"
              autoFocus
            />
            <div className="editActions">
              <button
                className="btn-save"
                onClick={() => {
                  onEdit(question._id, editText);
                  setIsEditing(false);
                }}
              >
                Save
              </button>
              <button className="btn-cancel" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="questionTextDetails">
            <span className={`questionText ${question.isDone ? "text-solved" : ""}`}>
              {question.text}
            </span>
            <span className={difficultyClass}>
              {(question.difficulty || "easy").toUpperCase()}
            </span>
          </div>
        )}

        {!isEditing && (
          <div className="cardButtons">
            <button className="btn-icon btn-edit" onClick={handleStartEdit} title="Edit Question">
              Edit
            </button>
            <button className="btn-icon btn-delete" onClick={() => onDelete(question._id)} title="Delete Question">
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Notes section */}
      <div className="cardNoteSection">
        {isEditingNote ? (
          <div className="noteEditContainer">
            <textarea
              value={editNoteText}
              onChange={(e) => setEditNoteText(e.target.value)}
              placeholder="Add some notes, hints or key algorithms..."
              className="noteTextarea"
              rows={2}
            />
            <div className="noteEditActions">
              <button
                className="btn-save-note"
                onClick={() => {
                  onEditNote(question._id, editNoteText);
                  setIsEditingNote(false);
                }}
              >
                Save Note
              </button>
              <button className="btn-cancel-note" onClick={() => setIsEditingNote(false)}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="noteDisplayContainer">
            {question.note ? (
              <div className="noteContent">
                <span className="noteLabel">Note:</span>
                <p className="noteText">{question.note}</p>
                <div className="noteActions">
                  <button className="btn-note-action" onClick={handleStartEditNote}>
                    Edit Note
                  </button>
                  <button className="btn-note-action btn-delete-note" onClick={() => onDeleteNote(question._id)}>
                    Delete Note
                  </button>
                </div>
              </div>
            ) : (
              <button className="btn-add-note" onClick={handleStartEditNote}>
                + Add Note
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}