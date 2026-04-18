/*
    File: CreateTournament.jsx
    Description: Form component for creating new tournaments.
    Sends tournament data to the API and assigns the creator ID from local storage.
 */

import React, { useState } from "react";
import { createTournament } from "../services/tournamentService";

import "../App.css";

function CreateTournament() {

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        game_id: "",
        prize_pool: "",
        start_date: "",
        status: "open"
    });

    // Get creator ID from session (localStorage)
    const creator_id = localStorage.getItem("userId");

    /*
        Handle input changes
        Updates form state dynamically
     */
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    /*
        Submit new tournament to API
     */
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

            {/* Component title */}
            <h2>Create Tournament</h2>

            {/* Tournament creation form */}
            <form onSubmit={handleSubmit}>

                {/* Tournament name */}
                <input
                    type="text"
                    name="name"
                    placeholder="Tournament name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                {/* Game ID reference */}
                <input
                    type="number"
                    name="game_id"
                    placeholder="Game ID"
                    value={formData.game_id}
                    onChange={handleChange}
                    required
                />

                {/* Prize pool amount */}
                <input
                    type="number"
                    name="prize_pool"
                    placeholder="Prize Pool"
                    value={formData.prize_pool}
                    onChange={handleChange}
                />

                {/* Tournament start date */}
                <input
                    type="datetime-local"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleChange}
                    required
                />

                {/* Tournament status selector */}
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option value="open">Open</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="finished">Finished</option>
                </select>

                {/* Submit button */}
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateTournament;