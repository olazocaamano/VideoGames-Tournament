import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getTournaments, createTournament, updateTournament } from "../services/tournamentService";
import API from "../services/api";

import TournamentList from "../components/TournamentList";
import ActivityList from "../components/ActivityList";
import PlayerList from "../components/PlayersList";
import Modal from "../components/Modal";
import CreateTournament from "../components/CreateTournament";

import formatDate from "../utils/formatDate";

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

    const [players, setPlayers] = useState([]);
    const [loadingPlayers, setLoadingPlayers] = useState(true);
    const [errorPlayers, setErrorPlayers] = useState(null);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await API.get("/users");
                setPlayers(response.data);
            } catch {
                setErrorPlayers("Failed to load players");
            } finally {
                setLoadingPlayers(false);
            }
        };

        fetchPlayers();
    }, []);

    const [showModal, setShowModal] = useState(false);
    const [editTournament, setEditTournament] = useState(null);

    const [newTournament, setNewTournament] = useState({
        name: "",
        game_id: "",
        prize_pool: "",
        start_date: "",
        status: ""
    });

    const [createMessage, setCreateMessage] = useState("");

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        const numericFields = ["game_id", "prize_pool", "status"];

        setNewTournament({
            ...newTournament,
            [name]: numericFields.includes(name) ? Number(value) : value
        });
    };

    const handleCreateTournament = async (e) => {
        e.preventDefault();

        try {
            const creator_id = localStorage.getItem("userId");

            await createTournament({
                ...newTournament,
                creator_id
            });

            setCreateMessage("Tournament created successfully");
            setShowModal(false);

            const tournamentsResponse = await getTournaments();
            setTournaments(tournamentsResponse.data);

            const activitiesResponse = await API.get("/activity");
            setActivities(activitiesResponse.data);
        } catch {
            setCreateMessage("Error creating tournament");
        }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        const numericFields = ["game_id", "prize_pool", "status", "is_active"];

        setEditTournament({
            ...editTournament,
            [name]: numericFields.includes(name) ? Number(value) : value
        });
    };

    const handleUpdateTournament = async (e) => {
        e.preventDefault();

        try {
            const editor_id = localStorage.getItem("userId");

            await updateTournament(editTournament.id, {
                ...editTournament,
                editor_id
            });

            setEditTournament(null);

            const tournamentsResponse = await getTournaments();
            setTournaments(tournamentsResponse.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                const response = await getTournaments();
                setTournaments(response.data);
            } catch {
                setError("Failed to load tournaments :(");
            } finally {
                setLoading(false);
            }
        };

        fetchTournaments();
    }, []);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await API.get("/activity");
                setActivities(response.data);
            } catch {
                setErrora("Failed to load activities :(");
            } finally {
                setLoadinga(false);
            }
        };

        fetchActivities();
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
                                <img src="./images/iconos/general_summary.png" className="icono" />
                            </div>
                            <h2>General Summary</h2>
                        </div>

                        <div className="admin-container">
                            <div className="box-tournaments">
                                <div className="box-tournaments-content">
                                    <h2>Active Tournaments</h2>
                                    <TournamentList
                                        tournaments={tournaments}
                                        loading={loading}
                                        error={error}
                                    />
                                </div>
                            </div>

                            <div className="box-activity">
                                <div className="box-activity-content">
                                    <h2>Recent Activity</h2>
                                    <ActivityList
                                        activities={activities}
                                        loading={loadinga}
                                        error={errora}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === "tournaments" && (
                    <div className="admin-box">
                        <div className="top">
                            <div className="circle">
                                <img src="./images/iconos/tournament.png" />
                            </div>
                            <h2>Tournament Control</h2>
                        </div>

                        <div className="admin-container">
                            <div className="box-tournaments">
                                <div className="box-tournaments-content">
                                    <h2>Active Tournaments</h2>

                                    <TournamentList
                                        tournaments={tournaments}
                                        loading={loading}
                                        error={error}
                                        onEdit={(tournament) =>
                                            setEditTournament({
                                                ...tournament,
                                                status: Number(tournament.status),
                                                is_active: Number(tournament.is_active),
                                                start_date: formatDate(tournament.start_date)
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="box-button-add">
                                <button onClick={() => setShowModal(true)}>Create Tournament</button>
                            </div>
                        </div>

                        {showModal && (
                            <Modal onClose={() => setShowModal(false)}>
                                <CreateTournament
                                    formData={newTournament}
                                    onChange={handleChange}
                                    onSubmit={handleCreateTournament}
                                />
                                <p>{createMessage}</p>
                            </Modal>
                        )}

                        {editTournament && (
                            <Modal onClose={() => setEditTournament(null)}>
                                <h2>Edit Tournament</h2>
                                <form onSubmit={handleUpdateTournament}>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editTournament.name}
                                        onChange={handleEditChange}
                                        required
                                    />
                                    <input
                                        type="number"
                                        name="game_id"
                                        value={editTournament.game_id}
                                        onChange={handleEditChange}
                                        required
                                    />
                                    <input
                                        type="number"
                                        name="prize_pool"
                                        value={editTournament.prize_pool}
                                        onChange={handleEditChange}
                                    />
                                    <input
                                        type="datetime-local"
                                        name="start_date"
                                        value={editTournament.start_date}
                                        onChange={handleEditChange}
                                        required
                                    />
                                    <select
                                        name="status"
                                        value={editTournament.status}
                                        onChange={handleEditChange}
                                    >
                                        <option value=""> -- Select an option -- </option>
                                        <option value={1}>Pending</option>
                                        <option value={2}>Active</option>
                                        <option value={3}>Finished</option>
                                        <option value={4}>Cancelled</option>
                                    </select>
                                    <select
                                        name="is_active"
                                        value={editTournament.is_active}
                                        onChange={handleEditChange}
                                    >
                                        <option value={1}>Active</option>
                                        <option value={0}>Inactive</option>
                                    </select>
                                    <button type="submit">Update</button>
                                </form>
                            </Modal>
                        )}
                    </div>
                )}

                {activeSection === "players" && (
                    <div className="admin-box">
                        <div className="top">
                            <div className="circle">
                                <img src="/images/iconos/players.png" />
                            </div>
                            <h2>Players Control | Players list</h2>
                        </div>

                        <div className="admin-container">
                            <div className="box-players">
                                <div className="box-players-content">

                                    <PlayerList
                                        players={players}
                                        loading={loadingPlayers}
                                        error={errorPlayers}
                                    />
                                </div>
                            </div>
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

export default Admin;