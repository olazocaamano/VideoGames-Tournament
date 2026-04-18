/*
    File: Player.jsx
    Description: Player dashboard page.
    This page is protected and only accessible for users with "player" role.
 */

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../App.css";

function Player() {
    const navigate = useNavigate();

    // Get user role from local storage (session simulation)
    const role = localStorage.getItem("role");

    /*
        Route protection
        Redirects user to home if they are not a player
     */
    useEffect(() => {
        if (role !== "player") {
            navigate("/");
        }
    }, [role, navigate]);

    /*
        Logout user and clear session data
     */
    const handleLogout = () => {
        localStorage.removeItem("role");
        navigate("/");
    };

    return (
        <div className="user-panel">

            {/* Page title */}
            <h1>Player Panel</h1>

            {/* Logout button */}
            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}

export default Player;