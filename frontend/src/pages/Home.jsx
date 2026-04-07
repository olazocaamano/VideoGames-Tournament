import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/userService";
import API from "../services/api";

function Home() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentSlide, setCurrentSlide] = useState(0);

    const handleUserLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await loginUser({ username, password });
            const role = response.data.user.role_name;

            if (role === "player") {
                localStorage.setItem("role", role);
                navigate("/player");
            } else {
                setMessage("Access denied. You are not a player.");
            }
        } catch {
            setMessage("Invalid credentials");
        }
    };

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await API.get("/games?active=1");
                setGames(response.data);
            } catch {
                setError("Failed to load games");
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    useEffect(() => {
        if (games.length === 0) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) =>
                prev === games.length - 1 ? 0 : prev + 1
            );
        }, 4000);

        return () => clearInterval(interval);
    }, [games]);

    return (
        <div className="window">
            <h1>TOE | the platform for gamers</h1>

            <div className="content">
                <div className="right-panel">
                    <div className="container">
                        <div className="container-center">
                            <Link to="/statistics" className="statistics-button">
                                Statistics
                            </Link>

                            <div className="carrousel">
                                <div className="carrousel-slide">
                                    <div
                                        className="carrousel-inner"
                                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                                    >
                                        {games.map((game) => (
                                            <div key={game.id} className="carrousel-item">
                                                <img
                                                    className="d-block w-100"
                                                    src={`http://localhost:5000${game.image_url}`}
                                                    alt={game.game_name}
                                                />

                                                <div className="slide-info">
                                                    <h1>{game.game_name}</h1>
                                                    <hr className="line-decorative" />
                                                    <p>{game.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="carrousel-indicators">
                                        {games.map((_, index) => (
                                            <span
                                                key={index}
                                                className={index === currentSlide ? "dot active" : "dot"}
                                                onClick={() => setCurrentSlide(index)}
                                            ></span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="con-user">
                            <h2>User</h2>
                            <form onSubmit={handleUserLogin}>
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
                                        Forgot your password? <Link to="/reset">Reset</Link>
                                    </p>
                                </div>
                                <button type="submit">Login</button>
                                <div className="register">
                                    <p>
                                        Don't have an account? <Link to="/user/register">Register</Link>
                                    </p>
                                </div>
                                <div className="admin-access">
                                    <Link to="/admin/login">Administrator access</Link>
                                </div>
                                <p>{message}</p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;