/*
    File: ActivityList.jsx
    Description: Displays a list of user activities in the system.
    Shows loading state, error handling, and formatted activity data.
 */

import React from "react";
import "../App.css";

/*
    ActivityList component
    @param {Array} activities - List of activity objects
    @param {boolean} loading - Loading state indicator
    @param {string|null} error - Error message if request fails
 */
function ActivityList({ activities, loading, error }) {

    // Show loading state while data is being fetched
    if (loading) return <p>Loading activities...</p>;
    // Show error message if request failed
    if (error) return <p>{error}</p>;

    return (
        <div className="box-activity-content">
            <ul>

                {/* Render list of activities */}
                {activities.map((activity) => (
                    <li key={activity.id}>

                        {/* Activity main description */}
                        <strong>{activity.description}</strong> <br />

                        {/* Additional metadata */}
                        <small>
                            User: {activity.username}{" "}

                            {/* Optional game reference */}
                            {activity.game_id && <>Game: {activity.game_id} </>}
                            {/* Optional tournament reference */}
                            {activity.tournament_id && <>Tournament: {activity.tournament_id}</>}
                        </small>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ActivityList;