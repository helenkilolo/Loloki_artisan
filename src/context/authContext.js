import { createContext, useContext, useState, useEffect } from 'react';
import { decode as jwtDecode } from 'jwt-decode';  // This is the correct import statement if 'decode' is a named export

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedUser = jwtDecode(token);  // Decode token to get user data
        setUser(decodedUser);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('token', userData.token);  // Save token on login
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');  // Remove token on logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


