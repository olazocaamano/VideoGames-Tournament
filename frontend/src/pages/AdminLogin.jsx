import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/userService";

function AdminLogin() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginMessage, setLoginMessage] = useState("");

    const handleAdminLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await loginUser({ username, password });
            const role = response.data.user.role_name;

            localStorage.setItem("userId", response.data.user.id);

            if (role === "admin") {
                localStorage.setItem("role", role);
                navigate("/admin");
            } else {
                setLoginMessage("Access denied. You are not an admin.");
            }
        } catch {
            setLoginMessage("Invalid credentials");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("role");
        localStorage.removeItem("username");
        navigate("/");
    };

    return (
        <div className="con-admin">
            <h2>Admin</h2>

            <form onSubmit={handleAdminLogin}>
                <input type="text" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                <br></br>

                <button type="submit">Login</button>

                <div className="box-adminLogin-logout">
                    <button onClick={handleLogout} className="logout">Home</button>
                </div>

                <p>{loginMessage}</p>
            </form>
        </div>
    );
}

export default AdminLogin;