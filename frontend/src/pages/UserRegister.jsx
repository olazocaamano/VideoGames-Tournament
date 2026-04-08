import React, { useState } from "react";
import { registerUser } from "../services/userService";
import { useNavigate } from "react-router-dom";

function UserRegister() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await registerUser({
                username,
                nickname,
                email,
                password,
                role: "user"
            });

            setMessage(response.data.message);

            navigate("/player");

        } catch (err) {
            setMessage(err.response?.data?.error || "Server error");
        }
    };

    return (
        <div id="con-user-register" className="con-user">
            <h2>Register</h2>

            <form onSubmit={handleRegister}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => { setUsername(e.target.value); setMessage(""); }} />
                <input type="text" placeholder="Nickname" value={nickname} onChange={(e) => { setNickname(e.target.value); setMessage(""); }} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value); setMessage(""); }} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value); setMessage(""); }} />

                <button type="submit">Register</button>

                {message && <p>{message}</p>}
            </form>
        </div>
    );
}

export default UserRegister;