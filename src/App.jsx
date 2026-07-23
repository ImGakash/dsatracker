import "./App.css";
import { useState, useEffect, useCallback } from "react";
import Question from "./question.jsx";
import Signup from "./signup.jsx";
import Login from "./login.jsx";
import BinarySearch from "./modules/binarySearch/binarySearch.jsx";
import DivideAndConquer from "./modules/divideandconquer/dc.jsx";
import Graphs from "./modules/graphs/graph.jsx";
const API_URL = import.meta.env.VITE_API_URL;

let lastToastId = 0;
const generateToastId = () => {
  lastToastId += 1;
  return lastToastId;
};

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [newText, setNewText] = useState("");
  const [newDifficulty, setNewDifficulty] = useState("easy");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authTab, setAuthTab] = useState("login");
  const [showBinarySearch, setShowBinarySearch] = useState(false);
  const [showDivideAndConquer, setShowDivideAndConquer] = useState(false);
  const [showGraphs, setShowGraphs] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [donationAmount, setDonationAmount] = useState(100);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptDetails, setReceiptDetails] = useState(null);

  // ---------------- TOAST SYSTEM ----------------
  const showToast = useCallback((message, type = "success") => {
    const id = generateToastId();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3500);
  }, []);


      const handlePayment = async () => {
        if (donationAmount < 1) {
          showToast("Please enter a donation amount of at least ₹1", "error");
          return;
        }
        try {
          // 1. Create order from backend
          const res = await fetch(`${API_URL}/api/payment/create-order`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: donationAmount }),
          });

          const data = await res.json();

          if (!data.success) {
            throw new Error(data.message || "Order creation failed");
          }

          const order = data.order;

          // 2. Razorpay options
          const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: "DSA Support",
            description: "Support our project with a donation",
            order_id: order.id,

            handler: async function (response) {
              try {
                // 3. VERIFY PAYMENT (IMPORTANT STEP)
                const verifyRes = await fetch(
                  `${API_URL}/api/payment/verify`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      razorpay_order_id: response.razorpay_order_id,
                      razorpay_payment_id: response.razorpay_payment_id,
                      razorpay_signature: response.razorpay_signature,
                    }),
                  }
                );

                const verifyData = await verifyRes.json();

                if (verifyData.success) {
                  showToast(verifyData.message || "Payment Verified Successfully ✅", "success");
                  console.log("Verified Payment:", verifyData);
                  setReceiptDetails({
                    paymentId: response.razorpay_payment_id,
                    orderId: response.razorpay_order_id,
                    amount: donationAmount,
                    date: new Date().toLocaleString(),
                  });
                  setShowReceipt(true);
                } else {
                  showToast("Payment verification failed ❌", "error");
                }
              } catch (err) {
                console.error("Verification error:", err);
                showToast("Payment verification error", "error");
              }
            },

            theme: {
              color: "#8b5cf6",
            },
          };

          // 4. Open Razorpay popup
          const rzp = new window.Razorpay(options);
          rzp.open();
        } catch (err) {
          console.error("Payment init error:", err);
          showToast("Payment failed to start", "error");
        }
      };

  // ---------------- LOGOUT ----------------
  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    setQuestions([]);
    setShowBinarySearch(false);
    setShowDivideAndConquer(false);
    setShowGraphs(false);
    setShowReceipt(false);
    setReceiptDetails(null);
    showToast("Logged out successfully.", "info");
  }, [showToast]);

  // ---------------- FETCH QUESTIONS ----------------
  useEffect(() => {
    if (!token) {
      return;
    }

    fetch(`${API_URL}/questions`, {
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
  }, [token, handleLogout]);

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

  // ---------------- ADD QUESTION ----------------
  const handleAddQuestion = () => {
    if (!newText.trim() || !token) return;

    const newQuestion = {
      text: newText,
      isDone: false,
      note: "",
      difficulty: newDifficulty || "easy",
    };

    fetch(`${API_URL}/questions`, {
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
    fetch(`${API_URL}/questions/${id}`, {
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

    fetch(`${API_URL}/questions/${id}`, {
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
    fetch(`${API_URL}/questions/${id}`, {
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
    fetch(`${API_URL}/questions/${id}`, {
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
    fetch(`${API_URL}/questions/${id}`, {
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
            <span>🚀</span> DSA
          </div>
          <p className="landingTagline">
            Organize, structure, and master your Data Structures & Algorithms preparation on our DSA learning platform.
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
            <span>🚀</span> DSA
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

  // ---------------- RENDER DIVIDE AND CONQUER PAGE ----------------
  if (showDivideAndConquer) {
    return (
      <div className="dashboardPage">
        <div className="bg-glow-container">
          <div className="bg-glow-1"></div>
          <div className="bg-glow-2"></div>
        </div>

        <header className="dashboardHeader">
          <div className="logo" onClick={() => setShowDivideAndConquer(false)} style={{ cursor: "pointer" }}>
            <span>🚀</span> DSA
          </div>
          <button onClick={() => setShowDivideAndConquer(false)} className="btnNav">
            ← Back to Dashboard
          </button>
        </header>

        <div className="glassCard" style={{ padding: "40px", textAlign: "left" }}>
          <DivideAndConquer />
        </div>
      </div>
    );
  }

  // ---------------- RENDER GRAPHS PAGE ----------------
  if (showGraphs) {
    return (
      <div className="dashboardPage">
        <div className="bg-glow-container">
          <div className="bg-glow-1"></div>
          <div className="bg-glow-2"></div>
        </div>

        <header className="dashboardHeader">
          <div className="logo" onClick={() => setShowGraphs(false)} style={{ cursor: "pointer" }}>
            <span>🚀</span> DSA
          </div>
          <button onClick={() => setShowGraphs(false)} className="btnNav">
            ← Back to Dashboard
          </button>
        </header>

        <div className="glassCard" style={{ padding: "40px", textAlign: "left" }}>
          <Graphs />
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
          <span>🚀</span> DSA
        </div>
        
        <div className="navButtonGroup">
          <button
            onClick={() => {
              setShowBinarySearch(true);
              setShowDivideAndConquer(false);
              setShowGraphs(false);
            }}
            className="btnNav"
          >
            📚 Binary Search
          </button>
          <button
            onClick={() => {
              setShowDivideAndConquer(true);
              setShowBinarySearch(false);
              setShowGraphs(false);
            }}
            className="btnNav"
          >
            🧩 Divide & Conquer
          </button>
          <button
            onClick={() => {
              setShowGraphs(true);
              setShowBinarySearch(false);
              setShowDivideAndConquer(false);
            }}
            className="btnNav"
          >
            📊 Graphs
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
          <div className="glassCard donateCard">
            <h3>Support Us 💖</h3>
            <p className="donateText">
              If you find this platform helpful, consider supporting us with a donation!
            </p>
            <div className="donateInputGroup">
              <span className="currencySymbol">₹</span>
              <input
                type="number"
                min="1"
                value={donationAmount}
                onChange={(e) => setDonationAmount(Math.max(1, parseInt(e.target.value) || 0))}
                className="donateInput"
                placeholder="Amount"
              />
              <button onClick={handlePayment} className="btnDonate">
                Donate
              </button>
            </div>
          </div>

          {/* Quick topic navigation */}
          <div className="glassCard quickNavCard">
            <h3>Topics</h3>
            <div className="quickNavList">
              <button
                className="quickNavBtn"
                onClick={() => {
                  setShowBinarySearch(true);
                  setShowDivideAndConquer(false);
                  setShowGraphs(false);
                }}
              >
                <span>📚 Binary Search</span>
                <span className="badgeCount">Topic</span>
              </button>
              <button
                className="quickNavBtn"
                onClick={() => {
                  setShowDivideAndConquer(true);
                  setShowBinarySearch(false);
                  setShowGraphs(false);
                }}
              >
                <span>🧩 Divide & Conquer</span>
                <span className="badgeCount">Topic</span>
              </button>
              <button
                className="quickNavBtn"
                onClick={() => {
                  setShowGraphs(true);
                  setShowBinarySearch(false);
                  setShowDivideAndConquer(false);
                }}
              >
                <span>📊 Graphs</span>
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

      {/* Receipt Modal Overlay */}
      {showReceipt && receiptDetails && (
        <div className="receiptModalOverlay">
          <div className="receiptModalCard glassCard animate-receipt">
            <div className="receiptHeader">
              <div className="receiptHeart">💖</div>
              <h2>Donation Confirmed!</h2>
              <p>Thank you for supporting DSA</p>
            </div>
            
            <div className="receiptDivider"></div>
            
            <div className="receiptDetailsTable">
              <div className="receiptRow">
                <span className="receiptLabel">Status</span>
                <span className="receiptValue successText">Paid Success ✅</span>
              </div>
              <div className="receiptRow">
                <span className="receiptLabel">Payment ID</span>
                <span className="receiptValue">{receiptDetails.paymentId}</span>
              </div>
              <div className="receiptRow">
                <span className="receiptLabel">Order ID</span>
                <span className="receiptValue">{receiptDetails.orderId}</span>
              </div>
              <div className="receiptRow">
                <span className="receiptLabel">Amount</span>
                <span className="receiptValue font-mono">₹{receiptDetails.amount}.00</span>
              </div>
              <div className="receiptRow">
                <span className="receiptLabel">Date & Time</span>
                <span className="receiptValue">{receiptDetails.date}</span>
              </div>
            </div>

            <div className="receiptFooter">
              <button onClick={() => window.print()} className="btnPrint">
                🖨️ Print / Save PDF
              </button>
              <button onClick={() => {
                setShowReceipt(false);
                setReceiptDetails(null);
              }} className="btnCloseReceipt">
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

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