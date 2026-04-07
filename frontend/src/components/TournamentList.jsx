import React from "react";

function TournamentList({ tournaments, loading, error, onEdit }) {
    if (loading) return <p>Loading tournaments...</p>;
    if (error) return <p>{error}</p>;

    return (
        <ul>
            {tournaments.map((tournament) => (
                <li key={tournament.id}>
                    <strong>{tournament.name}</strong>

                    <span className={`status ${tournament.status_name}`}>
                        {tournament.status_name?.toUpperCase()}
                    </span>

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
    );
}

export default TournamentList;