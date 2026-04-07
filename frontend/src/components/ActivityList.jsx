import React from "react";

function ActivityList({ activities, loading, error }) {
    if (loading) return <p>Loading activities...</p>;
    if (error) return <p>{error}</p>;

    return (
        <ul>
            {activities.map((activity) => (
                <li key={activity.id}>
                    <strong>{activity.description}</strong> <br />
                    <small>
                        User: {activity.username}{" "}
                        {activity.game_id && <>Game: {activity.game_id} </>}
                        {activity.tournament_id && <>Tournament: {activity.tournament_id}</>}
                    </small>
                </li>
            ))}
        </ul>
    );
}

export default ActivityList;