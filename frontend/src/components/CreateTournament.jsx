import React, { useState } from "react";
import { createTournament } from "../services/tournamentService";

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
            await createTournament({
                ...formData,
                creator_id
            });

            alert("Tournament created successfully");
        } catch (error) {
            alert("Error creating tournament");
        }
    };

    return (
        <div>
            <h2>Create Tournament</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Tournament name" value={formData.name} onChange={handleChange} required />
                <input type="number" name="game_id" placeholder="Game ID" value={formData.game_id} onChange={handleChange} required />
                <input type="number" name="prize_pool" placeholder="Prize Pool" value={formData.prize_pool} onChange={handleChange} />
                <input type="datetime-local" name="start_date" value={formData.start_date} onChange={handleChange} required />

                <select name="status" value={formData.status} onChange={handleChange}>
                    <option value="open">Open</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="finished">Finished</option>
                </select>

                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateTournament;