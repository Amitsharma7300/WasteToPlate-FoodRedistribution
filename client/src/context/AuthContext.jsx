// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined); // ✅ initially undefined to track "loading"
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      const res = await axiosInstance.get('/api/auth/me');
      setUser(res.data); // ✅ set user if logged in
    } catch (err) {
      setUser(null); // ✅ explicitly set null if not logged in
    } finally {
      setLoading(false); // ✅ important for conditional rendering
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post('/api/auth/logout');
      setUser(null);
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {!loading && children} {/* ✅ only render app after auth check */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
