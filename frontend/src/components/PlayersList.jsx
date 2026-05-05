/*
    File: PlayerList.jsx
    Description: Displays a filtered list of players (role_id = 3).
    Includes search functionality, loading/error states, and basic player actions UI.
    OPTIMIZED: Uses backend pagination and search to avoid loading large datasets.
 */

import React, { useState, useEffect } from "react";

import "../App.css";

/*
    PlayerList component
    NOTE:
    - Now fetches players directly from API (no longer receives full dataset as props)
    - Uses pagination and server-side filtering for performance
*/
const PlayersList = () => {

    // Players data state (current page only)
    const [players, setPlayers] = useState([]);

    // Total players (for "xx of xx")
    const [totalPlayers, setTotalPlayers] = useState(0);

    // UI states
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Search input state
    const [searchTerm, setSearchTerm] = useState("");

    // Pagination state
    const [page, setPage] = useState(1);
    const limit = 20; // players per page

    /*
        Fetch players from backend:
        - Applies pagination (page)
        - Applies search filter (searchTerm)
    */
    const fetchPlayers = async () => {
        try {
            setLoading(true);
            setError(null);

            const res = await fetch(
                `http://localhost:5000/api/users/players?page=${page}&search=${encodeURIComponent(searchTerm)}`
            );

            // Validate response before parsing JSON
            if (!res.ok) {
                throw new Error(`Server error: ${res.status}`);
            }

            const data = await res.json();

            /*
                Expected response format:
                {
                    players: [...],
                    total: number
                }
            */
            setPlayers(data.players || []);
            setTotalPlayers(data.total || 0);

        } catch (err) {
            console.error("FULL ERROR:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    /*
        Trigger data fetch:
        - When page changes
    */
    useEffect(() => {
        fetchPlayers();
    }, [page]);

    /*
        Handle search action (button or Enter key)
    */
    const handleSearch = () => {
        setPage(1);
        fetchPlayers();
    };

    // Show loading state while fetching data
    if (loading) {
        return <p className="loading-text">Accessing player database...</p>;
    }

    // Show error message if API request fails
    if (error) {
        return <p className="error-text">{error}</p>;
    }

    return (
        <div className="box-players-container">

            {/* Search bar section */}
            <div className="players-search-bar">
                <input
                    type="text"
                    placeholder="Search player by nickname..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch();
                        }
                    }}
                />

                {/* SEARCH BUTTON */}
                <button
                    className="btn-search"
                    onClick={handleSearch}
                >
                    SEARCH
                </button>

                {/* Display number of players loaded vs total */}
                <span className="player-count">
                    Players: {players.length} of {totalPlayers}
                </span>
            </div>

            {/* Players table section */}
            <div className="players-grid">

                {/* No results state */}
                {players.length === 0 ? (
                    <p className="no-results">
                        No players found (Role 3).
                    </p>
                ) : (
                    <table className="pixel-table">

                        {/* Table header */}
                        <thead>
                            <tr>
                                <th>Status</th>
                                <th>Identity</th>
                                <th>Email</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {players.map((player) => (
                                <tr key={player.id} className="grid-row">

                                    {/* Active / inactive indicator */}
                                    <td className="col-status">
                                        <div
                                            className={`status-indicator ${Number(player.is_active) === 1
                                                    ? "active"
                                                    : "inactive"
                                                }`}
                                        />
                                    </td>

                                    {/* Player identity section */}
                                    <td className="col-identity">
                                        <div className="player-identity-block">
                                            <strong className="nickname-accent">
                                                {player.nickname || player.username}
                                            </strong>
                                            <span className="username-sub">
                                                @{player.username}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Contact information */}
                                    <td className="col-contact">
                                        {player.email}
                                    </td>

                                    {/* Action buttons (admin tools placeholders) */}
                                    <td className="col-actions text-center">
                                        <div className="action-buttons-group">

                                            {/* Manage player */}
                                            <button
                                                className="btn-manage"
                                                onClick={() =>
                                                    console.log("Manage ID:", player.id)
                                                }
                                            >
                                                MANAGE
                                            </button>

                                            {/* View logs */}
                                            <button
                                                className="btn-logs"
                                                onClick={() =>
                                                    console.log("View logs for ID:", player.id)
                                                }
                                            >
                                                LOGS
                                            </button>

                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <div className="bar-bottom">
                {/* Pagination controls */}
                <div className="pagination">

                    {/* Previous page */}
                    <button
                        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    >
                        Prev
                    </button>

                    {/* Current page indicator */}
                    <span className="page-indicator">
                        Page {page}
                    </span>

                    {/* Next page (disabled if no more data) */}
                    <button
                        onClick={() => setPage(prev => prev + 1)}
                        disabled={players.length < limit}
                    >
                        Next
                    </button>

                </div>
            </div>
        </div>
    );
};

export default PlayersList;