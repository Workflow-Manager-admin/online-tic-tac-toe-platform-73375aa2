import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  register: (userData) => api.post('/register', userData),
  login: (username, password) => api.post('/token', new URLSearchParams({
    username,
    password,
    grant_type: 'password'
  })),
};

export const games = {
  create: (opponentId) => api.post('/games', null, { params: { opponent_id: opponentId } }),
  getGame: (gameId) => api.get(`/games/${gameId}`),
  makeMove: (gameId, move) => api.post(`/games/${gameId}/move`, move),
  getHistory: () => api.get('/games/history'),
};

export default api;
