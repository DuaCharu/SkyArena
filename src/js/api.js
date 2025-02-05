const API_URL = 'http://localhost:5000/api';

export const api = {
  async register(userData) {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  async login(credentials) {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },

  async getGames() {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/games`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },

  async getGame(id) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/games/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },
};