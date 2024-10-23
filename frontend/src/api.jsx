import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const registerUser = (userData) => {
    return axios.post(`${API_URL}/auth/register`, userData);
};

export const loginUser = (userData) => {
    return axios.post(`${API_URL}/auth/login`, userData);
};

export const logoutUser = () => {
    return axios.post(`${API_URL}/auth/logout`);
};

export const createUser = (userData) => {
    return axios.post(`${API_URL}/users`, userData);
};

export const getUsers = () => {
    return axios.get(`${API_URL}/users`);
};

export const updateUser = (id, userData) => {
    return axios.put(`${API_URL}/users/${id}`, userData);
};

export const deleteUser = (id) => {
    return axios.delete(`${API_URL}/users/${id}`);
};

export const sendMessage = (messageData) => {
    return axios.post(`${API_URL}/messages`, messageData);
};

export const getMessages = (userId) => {
    return axios.get(`${API_URL}/messages/${userId}`);
};

export const updateMessage = (id, messageData) => {
    return axios.put(`${API_URL}/messages/${id}`, messageData);
};

export const deleteMessage = (id) => {
    return axios.delete(`${API_URL}/messages/${id}`);
};
