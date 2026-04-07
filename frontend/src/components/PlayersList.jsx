import React, { useState } from "react";

const PlayerList = ({ players, loading, error }) => {
    const [searchTerm, setSearchTerm] = useState("");

    if (loading) return <p className="loading-text">Accessing player database...</p>;
    if (error) return <p className="error-text">{error}</p>;

    // Filtramos por Role ID: 3 (Players) y por el término de búsqueda
    const filteredPlayers = players.filter((player) => {
        const isPlayerRole = Number(player.role_id) === 3;
        const matchesSearch = 
            player.nickname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            player.username?.toLowerCase().includes(searchTerm.toLowerCase());
        return isPlayerRole && matchesSearch;
    });

    return (
        <div className="box-players-container">
            <div className="players-search-bar">
                <input
                    type="text"
                    placeholder="Search player by nick..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="player-count">Players: {filteredPlayers.length}</span>
            </div>

            <div className="players-grid">
                {filteredPlayers.length === 0 ? (
                    <p className="no-results">No players found (Role 3).</p>
                ) : (
                    <table className="pixel-table">
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
                                    <td className="col-status">
                                        <div className={`status-indicator ${Number(player.is_active) === 1 ? 'active' : 'inactive'}`}></div>
                                    </td>
                                    <td className="col-identity">
                                        <div className="player-identity-block">
                                            <strong className="nickname-accent">{player.nickname || player.username}</strong>
                                            <span className="username-sub">@{player.username}</span>
                                        </div>
                                    </td>
                                    <td className="col-contact">{player.email}</td>
                                    <td className="col-actions text-center">
                                        <div className="action-buttons-group">
                                            <button 
                                                className="btn-manage"
                                                onClick={() => console.log("Manage ID:", player.id)}
                                            >
                                                MANAGE
                                            </button>
                                            <button 
                                                className="btn-logs"
                                                onClick={() => console.log("View logs for ID:", player.id)}
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