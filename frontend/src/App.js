import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

function CreateTournament() {
  const [formData, setFormData] = useState({
    name: "",
    game_id: "",
    prize_pool: "",
    start_date: "",
    status: "open"
  });

  const creator_id = localStorage.getItem("userId");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/tournaments", {
        ...formData,
        creator_id
      });

      alert("Tournament created successfully");
    } catch (error) {
      console.error(error);
      alert("Error creating tournament");
    }
  };

  return (
    < div >
      <h2>Create Tournament</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Tournament name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="game_id"
          placeholder="Game ID"
          value={formData.game_id}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="prize_pool"
          placeholder="Prize Pool"
          value={formData.prize_pool}
          onChange={handleChange}
        />

        <input
          type="datetime-local"
          name="start_date"
          value={formData.start_date}
          onChange={handleChange}
          required
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="open">Open</option>
          <option value="ongoing">Ongoing</option>
          <option value="finished">Finished</option>
        </select>

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

function Admin() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [activeSection, setActiveSection] = useState("home");

  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activities, setActivities] = useState([]);
  const [loadinga, setLoadinga] = useState(true);
  const [errora, setErrora] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const [newTournament, setNewTournament] = useState({
    name: "",
    game_id: "",
    prize_pool: "",
    start_date: "",
    status: "open"
  });

  const [createMessage, setCreateMessage] = useState("");

  const handleChange = (e) => {
    setNewTournament({
      ...newTournament,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateTournament = async (e) => {
    e.preventDefault();

    try {
      const creator_id = localStorage.getItem("userId");

      await axios.post("http://localhost:5000/api/tournaments", {
        ...newTournament,
        creator_id
      });

      setCreateMessage("Tournament created successfully");
      setShowModal(false);

      const tournamentsResponse = await axios.get("http://localhost:5000/api/tournaments?active=1");
      setTournaments(tournamentsResponse.data);

      const activitiesResponse = await axios.get("http://localhost:5000/api/activity");
      setActivities(activitiesResponse.data);

    } catch (error) {
      console.error(error);
      setCreateMessage("Error creating tournament");
    }
  };

  const [editTournament, setEditTournament] = useState(null);

  const handleEditChange = (e) => {
    setEditTournament({
      ...editTournament,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateTournament = async (e) => {
    e.preventDefault();
    try {
      const editor_id = localStorage.getItem("userId");
      await axios.put(`http://localhost:5000/api/tournaments/${editTournament.id}`, {
        ...editTournament,
        editor_id
      });

      setEditTournament(null);

      const tournamentsResponse = await axios.get("http://localhost:5000/api/tournaments?active=1");
      setTournaments(tournamentsResponse.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (role !== "admin") {
      navigate("/");
    }
  }, [role, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    navigate("/");
  };

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tournaments?active=1");
        setTournaments(response.data);
      } catch (err) {
        setError("Failed to load tournaments :(");
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  useEffect(() => {
    const fetchActivies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/activity");
        setActivities(response.data);
      } catch (err) {
        setErrora("Failed to load activities :(");
      } finally {
        setLoadinga(false);
      }
    };

    fetchActivies();
  }, []);

  return (
    <div className="window-admin">
      <div className="bar">
        <div className="left">
          <div className="circle">
            <img src="/images/iconos/administrador.png" alt="logo" />
          </div>
          <h1>Administrator</h1>
        </div>

        <ul className="menu">
          <li>
            <button
              className={activeSection === "home" ? "active" : ""}
              onClick={() => setActiveSection("home")}
            >
              Home
            </button>
          </li>
          <li>
            <button
              className={activeSection === "tournaments" ? "active" : ""}
              onClick={() => setActiveSection("tournaments")}
            >
              Tournaments
            </button>
          </li>
          <li>
            <button
              className={activeSection === "players" ? "active" : ""}
              onClick={() => setActiveSection("players")}
            >
              Players
            </button>
          </li>
          <li>
            <button
              className={activeSection === "statistics" ? "active" : ""}
              onClick={() => setActiveSection("statistics")}
            >
              Statistics
            </button>
          </li>
          <button onClick={handleLogout} className="logout">
            Logout
          </button>
        </ul>
      </div>

      <div className="content">
        {activeSection === "home" && (
          <div className="admin-box">
            <div className="top">
              <div className="circle">
                <img src="/images/iconos/general_summary.png" className="icono" />
              </div>
              <h2>General Summary</h2>
            </div>

            <div className="admin-container">
              <div className="box-tournaments">
                <div className="box-tournaments-content">
                  <h2>Active Tournaments</h2>

                  {loading && <p>Loading tournaments...</p>}
                  {error && <p>{error}</p>}

                  {!loading && !error && (
                    <ul>
                      {tournaments.map((tournament) => (
                        <li key={tournament.id}>
                          <strong>
                            {tournament.name}
                          </strong>{" "}
                          {" "}
                          <span
                            className={`status ${tournament.status}`}
                          >
                            {tournament.status.toUpperCase()}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="box-activity">
                <div className="box-activity-content">
                  <h2>Recent Activity</h2>

                  {loadinga && <p>Loading activities...</p>}
                  {errora && <p>{errora}</p>}

                  {!loadinga && !errora && (
                    <ul>
                      {activities.map((activity) => (
                        <li key={activity.id}>
                          <strong>{activity.description}</strong> <br />
                          <small>
                            User: {activity.username} {" "}
                            {activity.game_id && (
                              <>Game: {activity.game_id} </>
                            )}
                            {activity.tournament_id && (
                              <>Tournament: {activity.tournament_id}</>
                            )}
                          </small>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "tournaments" && (
          <div className="admin-box">
            <div className="top">
              <div className="circle">
                <img src="/images/iconos/tournament.png" />
              </div>
              <h2>Tournament Control</h2>
            </div>

            <div className="admin-container">

              <div className="box-tournaments">
                <div className="box-tournaments-content">
                  <h2>Active Tournaments</h2>

                  {loading && <p>Loading tournaments...</p>}
                  {error && <p>{error}</p>}

                  {!loading && !error && (
                    <ul>
                      {tournaments.map((tournament) => (
                        <li key={tournament.id}>
                          <strong>
                            {tournament.name}
                          </strong>{" "}
                          {" "}
                          <br /><span className={`status ${tournament.status}`}>
                            {tournament.status.toUpperCase()}
                          </span>
                          <button
                            style={{ marginLeft: "10px" }}
                            onClick={() => setEditTournament(tournament)}
                          >
                            Edit
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="box-button-add">
                <button onClick={() => setShowModal(true)}>Create Tournament</button>
              </div>

              <div className="box-bottom-button">


                {showModal && (
                  <div className="modal-overlay">
                    <div className="modal">
                      <button className="close-btn" onClick={() => setShowModal(false)}>X</button>

                      <h2>Create Tournament</h2>

                      <form onSubmit={handleCreateTournament}>
                        <input
                          type="text"
                          name="name"
                          placeholder="Tournament name"
                          required
                          value={newTournament.name}
                          onChange={handleChange}
                        />

                        <input
                          type="number"
                          name="game_id"
                          placeholder="Game ID"
                          required
                          value={newTournament.game_id}
                          onChange={handleChange}
                        />

                        <input
                          type="number"
                          name="prize_pool"
                          placeholder="Prize Pool"
                          value={newTournament.prize_pool}
                          onChange={handleChange}
                        />

                        <input
                          type="datetime-local"
                          name="start_date"
                          required
                          value={newTournament.start_date}
                          onChange={handleChange}
                        />

                        <select
                          name="status"
                          value={newTournament.status}
                          onChange={handleChange}
                        >
                          <option value="open">Open</option>
                          <option value="ongoing">Ongoing</option>
                          <option value="finished">Finished</option>
                        </select>

                        <button type="submit">Create</button>
                      </form>

                      <p>{createMessage}</p>
                    </div>
                  </div>
                )}

                {editTournament && (
                  <div className="modal-overlay">
                    <div className="modal-edit">
                      <button onClick={() => setEditTournament(null)} className="close-btn">X</button>
                      <h2>Edit Tournament</h2>
                      <form onSubmit={handleUpdateTournament}>
                        <input type="text" name="name" value={editTournament.name} onChange={handleEditChange} required />
                        <input type="number" name="game_id" value={editTournament.game_id} onChange={handleEditChange} required />
                        <input type="number" name="prize_pool" value={editTournament.prize_pool} onChange={handleEditChange} />
                        <input type="datetime-local" name="start_date" value={editTournament.start_date} onChange={handleEditChange} required />
                        <select name="status" value={editTournament.status} onChange={handleEditChange}>
                          <option value="open">Open</option>
                          <option value="ongoing">Ongoing</option>
                          <option value="finished">Finished</option>
                        </select>
                        <select name="is_active" value={editTournament.is_active} onChange={handleEditChange}>
                          <option value={1}>Active</option>
                          <option value={0}>Inactive</option>
                        </select>
                        <button type="submit">Update</button>
                      </form>
                    </div>
                  </div>
                )}

              </div>

            </div>
          </div>
        )}
        {activeSection === "players" && (
          <div className="admin-box">

            <div className="top">
              <div className="circle">
                <img src="/images/iconos/players.png" />
              </div>
              <h2>Players Control</h2>
            </div>

          </div>
        )}
        {activeSection === "statistics" && (
          <div className="admin-box">

            <div className="top">
              <div className="circ">
                <img src="/images/iconos/statistics.png" className="icono_statistics" />
              </div>
              <h2>Statistics</h2>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

function Player() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role !== "player") {
      navigate("/");
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

      localStorage.setItem("userId", response.data.user.id);

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
        const response = await axios.get(
          "http://localhost:5000/api/games?active=1"
        );
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
                <input
                  type="text"
                  placeholder="Username"
                  required
                  value={userUsername}
                  onChange={(e) => setUserUsername(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                />
                <div className="resetPass">
                  <p>
                    Forgot your password? <a href="/Reset">Reset</a>
                  </p>
                </div>
                <button type="submit">Login</button>
                <div className="register">
                  <p>
                    Don't have an account? <a href="/Register">Register</a>
                  </p>
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
                  <p>
                    Forgot your password? <a href="/Reset">Reset</a>
                  </p>
                </div>
                <button type="submit">Login</button>
                <div className="register">
                  <p>
                    Don't have an account <a href="/Register">Register</a>
                  </p>
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