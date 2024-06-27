import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getEmployees = async () => {
    const response = await axios.get(`${API_URL}/employees`);
    return response.data;
};

export const addEmployee = async (employee) => {
    const response = await axios.post(`${API_URL}/employees/add`, employee);
    return response.data;
};

export const getGames = async () => {
    const response = await axios.get(`${API_URL}/games`);
    return response.data;
};

export const addGame = async (game) => {
    const response = await axios.post(`${API_URL}/games/add`, game);
    return response.data;
};
