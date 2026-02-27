import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

function Admin() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role !== "admin") {
      navigate("/");
    }
  }, [role, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="window-admin">

      <div className="bar">

        <div className="left">
          <div className="circle"></div>
          <h1>Administrator</h1>
        </div>

        <ul className="menu">
          <li><a href="/home">Home</a></li>
          <li><a href="/tournaments">Tournaments</a></li>
          <li><a href="/players">Players</a></li>
          <li><a href="/statistics">Statistics</a></li>
        </ul>
      </div>

    </div>
  );
}

function Player() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role !== "player") {
      navigate("/")
    }
  }, [role, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div>

      <div className="user-panel">
        <h1>Player Panel</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

    </div>
  );
}

function Home() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  const [userUsername, setUserUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userMessage, setUserMessage] = useState("");

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        { username, password }
      );

      const role = response.data.user.role;

      if (role === "admin") {
        localStorage.setItem("role", role);
        navigate("/admin");
      } else {
        setLoginMessage("Access denied. You are not an admin.");
      }

    } catch (error) {
      setLoginMessage("Invalid credentials");
    }
  };

  const handleUserLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        { username: userUsername, password: userPassword }
      );

      const role = response.data.user.role;

      if (role === "player") {
        localStorage.setItem("role", role);
        navigate("/player");
      } else {
        setUserMessage("Access denied. You are not a player.");
      }

    } catch (error) {
      setUserMessage("Invalid credentials");
    }
  };

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/games");
        setGames(response.data);
      } catch (err) {
        setError("Failed to load games");
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  return (
    <div className="window">
      <h1>TOE | the platform for gamers</h1>

      <div className="content">
        <div className="list-games">
          <h2>List of available games</h2>
          <p>(It is updated every day!)</p>

          {loading && <p>Loading games...</p>}
          {error && <p>{error}</p>}

          {!loading && !error && (
            <ul>
              {games.map((game) => (
                <li key={game.id}>
                  <strong>{game.game_name}</strong> - {game.publisher}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="right-panel">
          <a href="index.html" className="statistics-button">
            Statistics
          </a>

          <div className="container">
            <div className="con-user">
              <h2>User</h2>
              <form onSubmit={handleUserLogin}>
                <input type="text" placeholder="Username" required value={userUsername} onChange={(e) => setUserUsername(e.target.value)} />
                <input type="password" placeholder="Password" required value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
                <div className="resetPass">
                  <p>Forgot your password? <a href="/Reset">Reset</a></p>
                </div>
                <button type="submit">Login</button>
                <div className="register">
                  <p>Don't have an account? <a href="/Register">Register</a></p>
                </div>
                <p>{userMessage}</p>
              </form>
            </div>

            <div className="con-admin">
              <h2>Admin</h2>
              <form onSubmit={handleAdminLogin}>
                <input
                  type="text"
                  placeholder="Username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div className="resetPass">
                  <p>Forgot your password? <a href="/Reset">Reset</a></p>
                </div>

                <button type="submit">Login</button>

                <div className="register">
                  <p>Don't have an account <a href="/Register">Register</a></p>
                </div>

                <p>{loginMessage}</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/player" element={<Player />} />
    </Routes>
  );
}

export default App;