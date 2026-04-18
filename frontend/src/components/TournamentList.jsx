/*
    File: TournamentList.jsx
    Description: Displays a list of tournaments.
    Includes loading/error handling and optional edit functionality.
 */

import React from "react";

/*
    TournamentList component
    @param {Array} tournaments - List of tournament objects
    @param {boolean} loading - Loading state indicator
    @param {string|null} error - Error message if request fails
    @param {Function} onEdit - Optional callback for editing a tournament
 */

import "../App.css";

function TournamentList({ tournaments, loading, error, onEdit }) {

    // Loading state
    if (loading) return <p>Loading tournaments...</p>;
    // Error state
    if (error) return <p>{error}</p>;

    return (
        <div className="box-tournaments-content">
            <ul>
                {/* Render list of tournaments */}
                {tournaments.map((tournament) => (
                    <li key={tournament.id}>
                        {/* Tournament name */}
                        <strong>{tournament.name}</strong>

                        {/* Tournament status */}
                        <span className={`status ${tournament.status_name}`}>
                            {tournament.status_name?.toUpperCase()}
                        </span>

                        {/* Optional edit button (only if onEdit is provided) */}
                        {onEdit && (
                            <button
                                style={{ marginLeft: "10px" }}
                                onClick={() => onEdit(tournament)}
                            >
                                Edit
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TournamentList;