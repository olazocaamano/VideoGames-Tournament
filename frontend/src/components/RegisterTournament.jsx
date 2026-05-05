import React, { useEffect, useState } from "react";
import axios from "axios";

import TournamentAutocomplete from "./TournamentAutocomplete";

function RegisterTournament() {

    const user = JSON.parse(localStorage.getItem("user"));

    const [search, setSearch] = useState("");
    const [tournaments, setTournaments] = useState([]);
    const [selectedTournament, setSelectedTournament] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const delay = setTimeout(async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/tournaments?active=true&search=${search}&limit=5`
                );
                setTournaments(res.data);
            } catch (err) {
                console.error(err);
            }
        }, 300);

        return () => clearTimeout(delay);
    }, [search]);

    const handleRegister = async () => {
        if (!selectedTournament) {
            setMessage("Select a tournament");
            return
        }

        try {
            const res = await axios.post("http://localhost:5000/api/register", {
                user_id: user.id,
                tournament_id: selectedTournament.id
            });

            setMessage(res.data.message);
        } catch (err) {
            setMessage(err.response?.data?.error || "Error");
        }
    };

    return (
        <div>
            <h3>Search tournaments</h3>

            <input
                type="text"
                placeholder="Enter tournament name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* 🔹 Resultados */}
            <ul>
                {tournaments.map((t) => (
                    <li key={t.id} onClick={() => setSelectedTournament(t)}>
                        {t.name}
                    </li>
                ))}
            </ul>

            {selectedTournament && (
                <p>Seleccionado: {selectedTournament.name}</p>
            )}

            <button onClick={handleRegister}>
                Register
            </button>

            {message && <p>{message}</p>}
        </div>
    );
}

export default RegisterTournament;