import { createContext, useContext, useState, useEffect } from 'react';
import { userService } from '../services/api';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on initial render
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Failed to load user from localStorage', error);
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login with existing username
  const login = async (username) => {
    try {
      const userData = await userService.getUserByUsername(username);
      const userToStore = { ...userData, isAuthenticated: true };
      localStorage.setItem('user', JSON.stringify(userToStore));
      setUser(userToStore);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Check if username is available
  const checkUsername = async (username) => {
    return await userService.checkUsername(username);
  };

  // Register new user
  const register = async (userData) => {
    try {
      const response = await userService.createUser(userData);
      const userToStore = { ...response, isAuthenticated: true };
      localStorage.setItem('user', JSON.stringify(userToStore));
      setUser(userToStore);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, isLoading, login, register, checkUsername, logout }}>
      {!isLoading && children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;
