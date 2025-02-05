export const auth = {
  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  setToken(token) {
    localStorage.setItem('token', token);
  },

  removeToken() {
    localStorage.removeItem('token');
  },

  getToken() {
    return localStorage.getItem('token');
  },
};