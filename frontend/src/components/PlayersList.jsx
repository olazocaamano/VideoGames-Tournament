/*
    File: PlayerList.jsx
    Description: Displays a filtered list of players (role_id = 3).
    Includes search functionality, loading/error states, and basic player actions UI.
 */

import React, { useState } from "react";

import "../App.css";

/*
    PlayerList component
    @param {Array} players - List of users from API
    @param {boolean} loading - Loading state indicator
    @param {string|null} error - Error message if request fails
 */
const PlayerList = ({ players, loading, error }) => {

    // Search input state
    const [searchTerm, setSearchTerm] = useState("");

    // Show loading state while fetching data
    if (loading) {
        return <p className="loading-text">Accessing player database...</p>;
    }

    // Show error message if API request fails
    if (error) {
        return <p className="error-text">{error}</p>;
    }

    /*
        Filter players:
        - Only include users with role_id = 3 (players)
        - Filter by nickname or username based on search input
     */
    const filteredPlayers = players.filter((player) => {

        // Ensure user is a player role
        const isPlayerRole = Number(player.role_id) === 3;

        // Match search term with nickname or username
        const matchesSearch =
            player.nickname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            player.username?.toLowerCase().includes(searchTerm.toLowerCase());

        return isPlayerRole && matchesSearch;
    });

    return (
        <div className="box-players-container">

            {/* Search bar section */}
            <div className="players-search-bar">
                <input
                    type="text"
                    placeholder="Search player by nickname..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                {/* Display number of filtered results */}
                <span className="player-count">
                    Players: {filteredPlayers.length}
                </span>
            </div>

            {/* Players table section */}
            <div className="players-grid">

                {/* No results state */}
                {filteredPlayers.length === 0 ? (
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
                            {filteredPlayers.map((player) => (
                                <tr key={player.id} className="grid-row">

                                    {/* Active / inactive indicator */}
                                    <td className="col-status">
                                        <div
                                            className={`status-indicator ${
                                                Number(player.is_active) === 1
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
        </div>
    );
};

export default PlayerList;