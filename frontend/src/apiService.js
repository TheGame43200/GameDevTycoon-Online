import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.61:5000',
});

export const addFirstName = async (firstName) => {
  const response = await api.post('/admin/add-firstname', firstName);
  return response.data;
};

export const addLastName = async (lastName) => {
  const response = await api.post('/admin/add-lastname', lastName);
  return response.data;
};

export const addComment = async (comment) => {
  const response = await api.post('/admin/add-comment', comment);
  return response.data;
};
