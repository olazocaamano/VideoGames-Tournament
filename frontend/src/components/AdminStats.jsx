/*
    File: AdminStats.jsx
    Description: Displays tournament statistics using charts.
*/

import { Bar } from "react-chartjs-2";

function AdminStats() {

    const data = {
        labels: ["Active", "Finished", "Pending"],
        datasets: [
            {
                label: "Tournaments",
                data: [5, 3, 2],
            }
        ]
    };

    return (
        <div className="admin-box">
            <div className="top">
                <h2>Statistics</h2>
            </div>

            <div className="admin-container">
                <Bar data={data} />
            </div>
        </div>
    );
}

export default AdminStats;