import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      try {
        const res = await axios.get('/api/auth/me');
        setAuthState({
          user: res.data,
          isAuthenticated: true,
          isLoading: false
        });
      } catch (err) {
        logout();
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const login = async (formData) => {
    const res = await axios.post('/api/auth/login', formData);
    localStorage.setItem('token', res.data.token);
    await loadUser();
    return res;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    setAuthState({ user: null, isAuthenticated: false, isLoading: false });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);