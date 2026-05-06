/*
    File: tournamentService.js
    Description: Handles all API requests related to tournaments
*/

import API from "./api";

/*
    Get all active tournaments
*/
export const getTournaments = (params = {}) => {
    return API.get("/tournaments", { params });
};

/*
    Search tournaments (used in autocomplete)
*/
export const searchTournaments = (search) => {
    return API.get("/tournaments", {
        params: {
            active: true,
            search,
            limit: 6
        }
    });
};

/*
    Create a new tournament
*/
export const createTournament = (data) => {
    return API.post("/tournaments", data);
};

/*
    Update tournament
*/
export const updateTournament = (id, data) => {
    return API.put(`/tournaments/${id}`, data);
};

/*
    Register user to tournament
*/
export const registerToTournament = (data) => {
    return API.post("/register", data);
};

/*
    Update tournament status (optional admin control)
*/
export const updateTournamentStatus = (id, data) => {
    return API.put(`/tournaments/${id}/status`, data);
};