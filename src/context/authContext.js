import { createContext, useContext, useState, useEffect } from 'react';
import { decode } from 'jwt-decode';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let isMounted = true; // Prevent state updates on unmounted components

    const token = localStorage.getItem('token');
    if (token && isMounted) {
      try {
        const decodedUser = jwtDecode(token); // Decode token to get user data
        const currentTime = Date.now() / 1000; // Current time in seconds

        if (decodedUser.exp && decodedUser.exp < currentTime) {
          console.warn("Token has expired");
          localStorage.removeItem('token');
          setUser(null);
        } else {
          setUser(decodedUser);
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }

    return () => {
      isMounted = false; // Cleanup function
    };
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('token', userData.token); // Save token on login
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token'); // Remove token on logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
