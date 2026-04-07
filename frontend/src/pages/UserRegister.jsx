import React, { useState } from "react";
import { registerUser } from "../services/userService";

function UserRegister() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await registerUser({
                username,
                email,
                password,
                role: "user"
            });

            setMessage(response.data.message);
        } catch {
            setMessage("Server error");
        }
    };

    return (
        <div className="con-user">
            <h2>Register</h2>

            <form onSubmit={handleRegister}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type="submit">Register</button>

                <p>{message}</p>
            </form>
        </div>
    );
}

export default UserRegister;