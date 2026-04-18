/*
    File: Admin.jsx
    Description: Admin dashboard for managing tournaments, players, and system statistics.
    Includes creation, editing, and monitoring of tournaments and users.
 */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../App.css";

// Services (API communication)
import { getTournaments, createTournament, updateTournament } from "../services/tournamentService";
import API from "../services/api";

// Components
import TournamentList from "../components/TournamentList";
import ActivityList from "../components/ActivityList";
import PlayerList from "../components/PlayersList";
import Modal from "../components/Modal";
import CreateTournament from "../components/CreateTournament";

// Utils
import formatDate from "../utils/formatDate";

function Admin() {
    const navigate = useNavigate();

    // Get user role from local storage
    const role = localStorage.getItem("role");

    // Controls which section is displayed in the admin panel
    const [activeSection, setActiveSection] = useState("home");

    // Tournament state
    const [tournaments, setTournaments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Activity state
    const [activities, setActivities] = useState([]);
    const [loadinga, setLoadinga] = useState(true);
    const [errora, setErrora] = useState(null);

    // Players state
    const [players, setPlayers] = useState([]);
    const [loadingPlayers, setLoadingPlayers] = useState(true);
    const [errorPlayers, setErrorPlayers] = useState(null);

    /*
        Load players from API on component mount
     */
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

    // Modal & form state
    const [showModal, setShowModal] = useState(false);
    const [editTournament, setEditTournament] = useState(null);

    // Form data for creating a new tournament
    const [newTournament, setNewTournament] = useState({
        name: "",
        game_id: "",
        prize_pool: "",
        start_date: "",
        status: ""
    });

    const [createMessage, setCreateMessage] = useState("");

    

    /*
        Redirect non-admin users to home
     */
    useEffect(() => {
        if (role !== "admin") {
            navigate("/");
        }
    }, [role, navigate]);

    /*
        Logout user and clear session data
     */
    const handleLogout = () => {
        localStorage.removeItem("role");
        localStorage.removeItem("username");
        navigate("/");
    };

    /*
        Handle input changes for create tournament form
     */
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Fields that must be stored as numbers
        const numericFields = ["game_id", "prize_pool", "status"];

        setNewTournament({
            ...newTournament,
            [name]: numericFields.includes(name) ? Number(value) : value
        });
    };

    /*
        Create a new tournament
     */
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

            // Refresh tournaments and activity feed
            const tournamentsResponse = await getTournaments();
            setTournaments(tournamentsResponse.data);

            const activitiesResponse = await API.get("/activity");
            setActivities(activitiesResponse.data);
        } catch {
            setCreateMessage("Error creating tournament");
        }
    };

    /*
        Handle input changes for editing tournament
     */
    const handleEditChange = (e) => {
        const { name, value } = e.target;

        const numericFields = ["game_id", "prize_pool", "status", "is_active"];

        setEditTournament({
            ...editTournament,
            [name]: numericFields.includes(name) ? Number(value) : value
        });
    };

    /*
        Update an existing tournament
     */
    const handleUpdateTournament = async (e) => {
        e.preventDefault();

        try {
            const editor_id = localStorage.getItem("userId");

            await updateTournament(editTournament.id, {
                ...editTournament,
                editor_id
            });

            setEditTournament(null);

            // Refresh tournaments list after update
            const tournamentsResponse = await getTournaments();
            setTournaments(tournamentsResponse.data);
        } catch (err) {
            console.error(err);
        }
    };

    /*
        Load tournaments on component mount
     */
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

    /*
        Load recent activity feed
     */
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

            {/* Sidebar navigation */}
            <div className="bar">
                <div className="left">
                    <div className="circle">
                        <img src="/images/iconos/administrador.png" alt="logo" />
                    </div>
                    <h1>Administrator</h1>
                </div>

                {/* Navigation menu */}
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

                    {/* Logout button */}
                    <button onClick={handleLogout} className="logout">
                        Logout
                    </button>
                </ul>
            </div>

            {/* Main content area */}
            <div className="content">

                {/* HOME SECTION */}
                {activeSection === "home" && (
                    <div className="admin-box">
                        <div className="top">
                            <div className="circle">
                                <img src="/images/iconos/general_summary.png" className="icono" />
                            </div>
                            <h2>General Summary</h2>
                        </div>

                        {/* Overview of tournaments and activity */}
                        <div className="admin-container">
                            <div className="box-tournaments">
                                <h2>Active Tournaments</h2>
                                <TournamentList
                                    tournaments={tournaments}
                                    loading={loading}
                                    error={error}
                                />
                            </div>

                            <div className="box-activity">
                                <h2>Recent Activity</h2>
                                <ActivityList
                                    activities={activities}
                                    loading={loadinga}
                                    error={errora}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* TOURNAMENT SECTION */}
                {activeSection === "tournaments" && (
                    <div className="admin-box">
                        <div className="top">
                            <div className="circle">
                                <img src="./images/iconos/tournament.png" />
                            </div>
                            <h2>Tournament Control</h2>
                        </div>

                        {/* Tournament management panel */}
                        <div className="admin-container">

                            <div className="box-tournaments">
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

                            {/* Button to open create tournament modal */}
                            <div className="box-button-add">
                                <button onClick={() => setShowModal(true)}>
                                    Create Tournament
                                </button>
                            </div>
                        </div>

                        {/* Create tournament modal */}
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

                        {/* Edit tournament modal */}
                        {editTournament && (
                            <Modal onClose={() => setEditTournament(null)}>
                                <h2>Edit Tournament</h2>
                                <form onSubmit={handleUpdateTournament}>
                                    {/* form fields */}
                                </form>
                            </Modal>
                        )}
                    </div>
                )}

                {/* PLAYERS SECTION */}
                {activeSection === "players" && (
                    <div className="admin-box">
                        <div className="top">
                            <div className="circle">
                                <img src="/images/iconos/players.png" className="icono" />
                            </div>
                            <h2>Players Control | Players List</h2>
                        </div>


                        <PlayerList
                            players={players}
                            loading={loadingPlayers}
                            error={errorPlayers}
                        />
                    </div>
                )}

                {/* STATISTICS SECTION */}
                {activeSection === "statistics" && (
                    <div className="admin-box">
                        <h2>Statistics</h2>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Admin;