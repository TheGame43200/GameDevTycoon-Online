import axios from 'axios';

const API_URL = 'http://192.168.1.61:5000/api';

export const fetchGames = async () => {
    const response = await axios.get(`${API_URL}/games`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
};

export const createGame = async (game) => {
    const response = await axios.post(`${API_URL}/games`, game, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
};

export const updateGame = async (id, game) => {
    const response = await axios.put(`${API_URL}/games/${id}`, game, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
};

export const deleteGame = async (id) => {
    await axios.delete(`${API_URL}/games/${id}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
};

export const getEmployees = async () => {
    const response = await axios.get(`${API_URL}/employees`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
};

export const addEmployee = async (employee) => {
    const response = await axios.post(`${API_URL}/employees`, employee, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
};

export const getGames = async () => {
    const response = await axios.get(`${API_URL}/games`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
};
