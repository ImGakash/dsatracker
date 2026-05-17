import "./App.css";
import { useState, useEffect } from "react";
import Question from "./Question.jsx";
import Signup from "./signup.jsx";
import Login from "./login.jsx";

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [newText, setNewText] = useState("");
  const [newDifficulty, setNewDifficulty] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error("Error fetching questions:", err));
  },[]);

  const total = questions.length;
  const solved = questions.filter((q) => q.isDone).length;
  const percentSolved = total > 0 ? Math.round((solved / total) * 100) : 0;

const handleAddQuestion = () => {
  if (!newText.trim()) return;

  const newQuestion = {
    text: newText,
    isDone: false,
    note: "",
    difficulty: newDifficulty,
  };

  console.log("Sending:", newQuestion);

  fetch("http://localhost:3000/questions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newQuestion),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Received:", data);
      setQuestions((prev) => [...prev, data]);
      setNewText("");
      setNewDifficulty("");
    })
    .catch((err) => console.error("Error adding question:", err));
};


  const deleteQuestion = (id) => {
    fetch(`http://localhost:3000/questions/${id}`, { method: "DELETE" })
      .then(() => {
        setQuestions((prev) => prev.filter((q) => q._id !== id));
      })
      .catch((err) => console.error("Error deleting question:", err));
  };

  // ✅ PATCH toggle solved
  const toggleSolved = (id) => {
    const q = questions.find((q) => q._id === id);
    fetch(`http://localhost:3000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isDone: !q.isDone }),
    })
      .then((res) => res.json())
      .then((updated) => {
        setQuestions((prev) =>
          prev.map((q) => (q._id === id ? updated : q))
        );
      })
      .catch((err) => console.error("Error toggling solved:", err));
  };

  //  PATCH edit text
  const saveEditQuestion = (id, newText) => {
    fetch(`http://localhost:3000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newText }),
    })
      .then((res) => res.json())
      .then((updated) => {
        setQuestions((prev) =>
          prev.map((q) => (q._id === id ? updated : q))
        );
      })
      .catch((err) => console.error("Error editing question:", err));
  };

  // ✅ PATCH edit note
  const saveEditNote = (id, newNote) => {
    fetch(`http://localhost:3000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ note: newNote }),
    })
      .then((res) => res.json())
      .then((updated) => {
        setQuestions((prev) =>
          prev.map((q) => (q._id === id ? updated : q))
        );
      })
      .catch((err) => console.error("Error editing note:", err));
  };

  const deleteNote = (id) => {
    fetch(`http://localhost:3000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ note: "" }),
    })
      .then((res) => res.json())
      .then((updated) => {
        setQuestions((prev) =>
          prev.map((q) => (q._id === id ? updated : q))
        );
      })
      .catch((err) => console.error("Error deleting note:", err));
  };

  // Filter + search
  const filteredQuestions = questions.filter((q) => {
    if (filter === "solved" && !q.isDone) return false;
    if (filter === "unsolved" && q.isDone) return false;
    if (
      searchTerm &&
      !q.text.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !q.note.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div>
      <h1>DSA Tracker</h1>
      <Signup />
      <Login />
      <h2>Total: {total} | Solved: {solved} | Progress: {percentSolved}%</h2>

      <div className="progress-container">
        <div className="progress-label">Solved: {percentSolved}%</div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${percentSolved}%` }}
          ></div>
        </div>
      </div>

      <div className="questionInput">
        <input
          type="text"
          placeholder="Enter question"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
        <select
          value={newDifficulty}
          onChange={(e) => setNewDifficulty(e.target.value)}
        >
          <option value="">Select Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button onClick={handleAddQuestion}>Submit</button>
      </div>

      <div className="searchBar">
        <input
          type="text"
          placeholder="Search questions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="filters">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="solved">Solved</option>
          <option value="unsolved">Unsolved</option>
        </select>
      </div>

      <div className="questionList">
        {filteredQuestions.map((q) => (
          <Question
            key={q._id}
            question={q}
            onToggle={() => toggleSolved(q._id)}
            onDelete={() => deleteQuestion(q._id)}
            onEdit={(newText) => saveEditQuestion(q._id, newText)}
            onEditNote={(newNote) => saveEditNote(q._id, newNote)}
            onDeleteNote={() => deleteNote(q._id)}
          />
        ))}
      </div>
    </div>
  );
}
