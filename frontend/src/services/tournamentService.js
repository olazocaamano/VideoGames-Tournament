import API from "./api";

export const getTournaments = () => {
  return API.get("/tournaments?active=1");
};

export const createTournament = (data) => {
  return API.post("/tournaments", data);
};

export const updateTournament = (id, data) => {
  return API.put(`/tournaments/${id}`, data);
};