import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [userRole, setUserRole] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        { username, password }
      );

      setLoginMessage(response.data.message);
      setUserRole(response.data.user.role);
      
    } catch (error) {
      setLoginMessage("Invalid credentials");
    }
  }

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/games");
        setGames(response.data);
      } catch (err) {
        setError("Failed to load games");
        console.error(err);
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
              <form>
                <input type="text" placeholder="Username" required />
                <input type="password" placeholder="Password" required />
                <div className="resetPass">
                  <p>Forgot your password? <a href="/Reset">Reset</a></p>
                </div>
                <button type="submit">Login</button>
                <div className="register">
                  <p>Don't have an account <a href="/Register">Register</a></p>
                </div>
              </form>
            </div>

            <div className="con-admin">
              <h2>Admin</h2>
              <form onSubmit={handleLogin}>
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

export default App;