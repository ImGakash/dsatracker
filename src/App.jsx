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
  const [newDifficulty, setNewDifficulty] = useState("easy");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authTab, setAuthTab] = useState("login");

  // ---------------- FETCH QUESTIONS ----------------
  useEffect(() => {
    if (!token) {
      setQuestions([]);
      return;
    }

    fetch("http://localhost:3000/questions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          // Token expired or invalid, log out
          handleLogout();
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setQuestions(data);
        } else {
          console.error("Backend error:", data);
          setQuestions([]);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setQuestions([]);
      });
  }, [token]);

  const total = questions.length;
  const solved = questions.filter((q) => q.isDone).length;
  const percentSolved = total > 0 ? Math.round((solved / total) * 100) : 0;

  // ---------------- LOGOUT ----------------
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setQuestions([]);
  };

  // ---------------- ADD QUESTION ----------------
  const handleAddQuestion = () => {
    if (!newText.trim() || !token) return;

    const newQuestion = {
      text: newText,
      isDone: false,
      note: "",
      difficulty: newDifficulty || "easy",
    };

    fetch("http://localhost:3000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newQuestion),
    })
      .then((res) => res.json())
      .then((data) => {
        setQuestions((prev) => [...prev, data]);
        setNewText("");
        setNewDifficulty("easy");
      })
      .catch((err) => console.error("Error adding question:", err));
  };

  // ---------------- DELETE QUESTION ----------------
  const deleteQuestion = (id) => {
    fetch(`http://localhost:3000/questions/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setQuestions((prev) => prev.filter((q) => q._id !== id));
      })
      .catch((err) => console.error("Error deleting question:", err));
  };

  // ---------------- TOGGLE SOLVED ----------------
  const toggleSolved = (id) => {
    const q = questions.find((q) => q._id === id);

    fetch(`http://localhost:3000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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

  // ---------------- EDIT QUESTION ----------------
  const saveEditQuestion = (id, newText) => {
    fetch(`http://localhost:3000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text: newText }),
    })
      .then((res) => res.json())
      .then((updated) => {
        setQuestions((prev) =>
          prev.map((q) => (q._id === id ? updated : q))
        );
      });
  };

  // ---------------- EDIT NOTE ----------------
  const saveEditNote = (id, newNote) => {
    fetch(`http://localhost:3000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ note: newNote }),
    })
      .then((res) => res.json())
      .then((updated) => {
        setQuestions((prev) =>
          prev.map((q) => (q._id === id ? updated : q))
        );
      });
  };

  // ---------------- DELETE NOTE ----------------
  const deleteNote = (id) => {
    fetch(`http://localhost:3000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ note: "" }),
    })
      .then((res) => res.json())
      .then((updated) => {
        setQuestions((prev) =>
          prev.map((q) => (q._id === id ? updated : q))
        );
      });
  };

  // ---------------- FILTER ----------------
  const filteredQuestions = questions.filter((q) => {
    if (filter === "solved" && !q.isDone) return false;
    if (filter === "unsolved" && q.isDone) return false;

    if (
      searchTerm &&
      !q.text.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !(q.note || "").toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  // ---------------- RENDER AUTH SCREEN ----------------
  if (!token) {
    return (
      <div className="landingPage">
        <header className="landingHeader">
          <div className="logo">🚀 DSA Tracker</div>
          <p className="landingTagline">
            Organize, structure, and master your Data Structures & Algorithms preparation.
          </p>
        </header>

        <div className="authWrapper">
          <div className="authTabSwitch">
            <button
              className={`tabBtn ${authTab === "login" ? "active" : ""}`}
              onClick={() => setAuthTab("login")}
            >
              Login
            </button>
            <button
              className={`tabBtn ${authTab === "signup" ? "active" : ""}`}
              onClick={() => setAuthTab("signup")}
            >
              Sign Up
            </button>
          </div>

          <div className="authContainer">
            {authTab === "login" ? (
              <Login
                onLoginSuccess={(jwtToken) => setToken(jwtToken)}
                onSwitchToSignup={() => setAuthTab("signup")}
              />
            ) : (
              <Signup
                onSignupSuccess={() => setAuthTab("login")}
                onSwitchToLogin={() => setAuthTab("login")}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  // ---------------- RENDER DASHBOARD ----------------
  return (
    <div className="dashboardPage">
      <header className="dashboardHeader">
        <div className="logo">🚀 DSA Tracker</div>
        <button onClick={handleLogout} className="btnLogout">
          Logout
        </button>
      </header>

      <div className="dashboardContent">
        {/* Statistics & Progress */}
        <div className="statsCard">
          <h2>Your Progress</h2>
          <div className="statsRow">
            <div className="statItem">
              <span className="statValue">{total}</span>
              <span className="statLabel">Total</span>
            </div>
            <div className="statItem">
              <span className="statValue solvedColor">{solved}</span>
              <span className="statLabel">Solved</span>
            </div>
            <div className="statItem">
              <span className="statValue accentColor">{percentSolved}%</span>
              <span className="statLabel">Completion</span>
            </div>
          </div>

          <div className="progress-container">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${percentSolved}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Action Bar (Add Question, Search & Filters) */}
        <div className="actionsCard">
          <h3>Add New Question</h3>
          <div className="questionInput">
            <input
              type="text"
              placeholder="e.g. Two Sum, Reverse a Linked List..."
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
            />

            <select
              value={newDifficulty}
              onChange={(e) => setNewDifficulty(e.target.value)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <button onClick={handleAddQuestion} className="btnAdd">
              Add Question
            </button>
          </div>

          <div className="searchFilterRow">
            <div className="searchBar">
              <input
                type="text"
                placeholder="Search by title or notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filters">
              <label htmlFor="filter-select">Status:</label>
              <select
                id="filter-select"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="solved">Solved</option>
                <option value="unsolved">Unsolved</option>
              </select>
            </div>
          </div>
        </div>

        {/* Question List */}
        <div className="questionListSection">
          <h3>Questions ({filteredQuestions.length})</h3>
          {filteredQuestions.length === 0 ? (
            <div className="emptyState">
              No questions found. Try adding one or modifying your filters!
            </div>
          ) : (
            <div className="questionList">
              {filteredQuestions.map((q) => (
                <Question
                  key={q._id}
                  question={q}
                  onToggle={() => toggleSolved(q._id)}
                  onDelete={() => deleteQuestion(q._id)}
                  onEdit={saveEditQuestion}
                  onEditNote={saveEditNote}
                  onDeleteNote={() => deleteNote(q._id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}