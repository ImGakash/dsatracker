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

  const diff = question.difficulty || "easy";
  const difficultyClass = `badge badge-${diff}`;
  const cardDifficultyClass = `card-${diff}`;

  return (
    <div className={`questionCard ${question.isDone ? "card-solved" : ""} ${cardDifficultyClass}`}>
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
              {diff.toUpperCase()}
            </span>
          </div>
        )}

        {!isEditing && (
          <div className="cardButtons">
            <button className="btn-icon btn-edit" onClick={handleStartEdit} title="Edit Question">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button className="btn-icon btn-delete" onClick={() => onDelete(question._id)} title="Delete Question">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
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
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="14" height="14" style={{display: "inline-block"}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Edit Note
                  </button>
                  <button className="btn-note-action btn-delete-note" onClick={() => onDeleteNote(question._id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="14" height="14" style={{display: "inline-block"}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Note
                  </button>
                </div>
              </div>
            ) : (
              <button className="btn-add-note" onClick={handleStartEditNote}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Add Note
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}