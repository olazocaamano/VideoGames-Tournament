import API from "./api";

export const loginUser = (data) => {
    return API.post("/users/login", data);
};

export const registerUser = (data) => {
    return API.post("/users", data);
};