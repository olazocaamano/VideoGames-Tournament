import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Player() {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    useEffect(() => {
        if (role !== "player") {
            navigate("/");
        }
    }, [role, navigate]);

    const handleLogout = () => {
        localStorage.removeItem("role");
        navigate("/");
    };

    return (
        <div className="user-panel">
            <h1>Player Panel</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Player;