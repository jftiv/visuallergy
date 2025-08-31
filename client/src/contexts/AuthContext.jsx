import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on app load
    const storedUsername = sessionStorage.getItem('username');
    const storedUserId = sessionStorage.getItem('userId');

    if (storedUsername && storedUserId) {
      setUser({
        username: storedUsername,
        userId: storedUserId,
      });
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    // Keep sessionStorage for persistence across browser sessions
    sessionStorage.setItem('username', userData.username);
    sessionStorage.setItem('userId', userData.userId);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('userId');
  };

  const value = {
    user,
    isLoggedIn,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
