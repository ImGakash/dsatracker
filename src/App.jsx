import "./App.css";
import { useState, useEffect } from "react";
import Question from "./Question.jsx";
import Signup from "./signup.jsx";
import Login from "./login.jsx";
import BinarySearch from "./modules/binarySearch/binarySearch.jsx";

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [newText, setNewText] = useState("");
  const [newDifficulty, setNewDifficulty] = useState("easy");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authTab, setAuthTab] = useState("login");
  const [showBinarySearch, setShowBinarySearch] = useState(false);
  const [toasts, setToasts] = useState([]);

  // ---------------- TOAST SYSTEM ----------------
  const showToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3500);
  };

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

  // Circle SVG metrics
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentSolved / 100) * circumference;

  // Difficulty breakdowns
  const easyQuestions = questions.filter((q) => (q.difficulty || "easy") === "easy");
  const solvedEasy = easyQuestions.filter((q) => q.isDone).length;

  const mediumQuestions = questions.filter((q) => q.difficulty === "medium");
  const solvedMedium = mediumQuestions.filter((q) => q.isDone).length;

  const hardQuestions = questions.filter((q) => q.difficulty === "hard");
  const solvedHard = hardQuestions.filter((q) => q.isDone).length;

  // ---------------- LOGOUT ----------------
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setQuestions([]);
    setShowBinarySearch(false);
    showToast("Logged out successfully.", "info");
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
        showToast("Question added successfully!", "success");
      })
      .catch((err) => {
        console.error("Error adding question:", err);
        showToast("Failed to add question.", "error");
      });
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
        showToast("Question deleted.", "info");
      })
      .catch((err) => {
        console.error("Error deleting question:", err);
        showToast("Failed to delete question.", "error");
      });
  };

  // ---------------- TOGGLE SOLVED ----------------
  const toggleSolved = (id) => {
    const q = questions.find((q) => q._id === id);
    const newIsDone = !q.isDone;

    fetch(`http://localhost:3000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ isDone: newIsDone }),
    })
      .then((res) => res.json())
      .then((updated) => {
        setQuestions((prev) =>
          prev.map((q) => (q._id === id ? updated : q))
        );
        showToast(
          newIsDone ? "Question solved! 🎉 Keep it up!" : "Question marked unsolved.",
          newIsDone ? "success" : "info"
        );
      })
      .catch((err) => {
        console.error("Error toggling solved:", err);
        showToast("Failed to update status.", "error");
      });
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
        showToast("Question updated.", "success");
      })
      .catch((err) => {
        console.error("Error editing question:", err);
        showToast("Failed to save changes.", "error");
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
        showToast("Note saved.", "success");
      })
      .catch((err) => {
        console.error("Error editing note:", err);
        showToast("Failed to save note.", "error");
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
        showToast("Note deleted.", "info");
      })
      .catch((err) => {
        console.error("Error deleting note:", err);
        showToast("Failed to delete note.", "error");
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
        <div className="bg-glow-container">
          <div className="bg-glow-1"></div>
          <div className="bg-glow-2"></div>
        </div>

        <header className="landingHeader">
          <div className="logo">
            <span>🚀</span> DSA Tracker
          </div>
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
                onLoginSuccess={(jwtToken) => {
                  setToken(jwtToken);
                  showToast("Welcome back!", "success");
                }}
                onSwitchToSignup={() => setAuthTab("signup")}
              />
            ) : (
              <Signup
                onSignupSuccess={() => {
                  setAuthTab("login");
                  showToast("Account created! You can now log in.", "success");
                }}
                onSwitchToLogin={() => setAuthTab("login")}
              />
            )}
          </div>
        </div>

        <div className="toast-container">
          {toasts.map((toast) => (
            <div key={toast.id} className={`toast toast-${toast.type}`}>
              {toast.type === "success" && (
                <svg className="toast-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
              {toast.type === "error" && (
                <svg className="toast-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              )}
              {toast.type === "info" && (
                <svg className="toast-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              <span>{toast.message}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ---------------- RENDER BINARY SEARCH PAGE ----------------
  if (showBinarySearch) {
    return (
      <div className="dashboardPage">
        <div className="bg-glow-container">
          <div className="bg-glow-1"></div>
          <div className="bg-glow-2"></div>
        </div>

        <header className="dashboardHeader">
          <div className="logo" onClick={() => setShowBinarySearch(false)} style={{ cursor: "pointer" }}>
            <span>🚀</span> DSA Tracker
          </div>
          <button onClick={() => setShowBinarySearch(false)} className="btnNav">
            ← Back to Dashboard
          </button>
        </header>

        <div className="glassCard" style={{ padding: "40px", textAlign: "left" }}>
          <BinarySearch />
        </div>
      </div>
    );
  }

  // ---------------- RENDER DASHBOARD ----------------
  return (
    <div className="dashboardPage">
      <div className="bg-glow-container">
        <div className="bg-glow-1"></div>
        <div className="bg-glow-2"></div>
      </div>

      <header className="dashboardHeader">
        <div className="logo">
          <span>🚀</span> DSA Tracker
        </div>
        
        <div className="navButtonGroup">
          <button
            onClick={() => setShowBinarySearch(true)}
            className="btnNav"
          >
            📚 Binary Search
          </button>
          <button onClick={handleLogout} className="btnLogout">
            Logout
          </button>
        </div>
      </header>

      <div className="dashboardGrid">
        
        {/* LEFT COLUMN: SIDEBAR */}
        <div className="sidebarColumn">
          
          {/* SVG Circular Progress Card */}
          <div className="glassCard statsCard">
            <h2>Your Progress</h2>
            
            <div className="progressContainer">
              <div className="progressCircleWrapper">
                <svg className="progressCircleSvg" width="90" height="90" viewBox="0 0 90 90">
                  <defs>
                    <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="var(--accent)" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                  <circle className="progressCircleBg" cx="45" cy="45" r={radius} />
                  <circle
                    className="progressCircleFill"
                    cx="45"
                    cy="45"
                    r={radius}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                  />
                </svg>
                <div className="progressCircleText">{percentSolved}%</div>
              </div>
              
              <div className="progressLabelWrapper">
                <div className="progressLabelText">
                  You have solved <strong>{solved}</strong> out of <strong>{total}</strong> questions.
                </div>
              </div>
            </div>

            {/* Difficulty Stats breakdown */}
            <div className="difficultyStats">
              <div className="diffStatRow">
                <span className="diffStatLabel">
                  <span className="diffDot easy"></span> Easy
                </span>
                <span className="diffStatValue">
                  {solvedEasy} <span>/ {easyQuestions.length}</span>
                </span>
              </div>
              <div className="diffStatRow">
                <span className="diffStatLabel">
                  <span className="diffDot medium"></span> Medium
                </span>
                <span className="diffStatValue">
                  {solvedMedium} <span>/ {mediumQuestions.length}</span>
                </span>
              </div>
              <div className="diffStatRow">
                <span className="diffStatLabel">
                  <span className="diffDot hard"></span> Hard
                </span>
                <span className="diffStatValue">
                  {solvedHard} <span>/ {hardQuestions.length}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick topic navigation */}
          <div className="glassCard quickNavCard">
            <h3>Topics</h3>
            <div className="quickNavList">
              <button
                className="quickNavBtn"
                onClick={() => setShowBinarySearch(true)}
              >
                <span>📚 Binary Search</span>
                <span className="badgeCount">Topic</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: MAIN CONTENT */}
        <div className="mainColumn">
          
          {/* Actions Panel (Add Question + Filter) */}
          <div className="glassCard actionsCard">
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

            {/* Search & Filters */}
            <div className="searchFilterRow">
              <div className="searchBar">
                <svg className="searchIcon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search questions or notes..."
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

          {/* Question List Section */}
          <div className="questionListSection">
            <div className="questionListHeader">
              <h3>Questions</h3>
              <span className="questionCount">{filteredQuestions.length} listed</span>
            </div>

            {filteredQuestions.length === 0 ? (
              <div className="emptyState">
                <svg className="emptyStateSvg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <p>No questions found. Try adding a new challenge or adjusting your filters!</p>
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

      {/* Floating Toasts container */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            {toast.type === "success" && (
              <svg className="toast-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
            {toast.type === "error" && (
              <svg className="toast-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            )}
            {toast.type === "info" && (
              <svg className="toast-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}