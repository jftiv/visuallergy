import { useState, useEffect } from 'react';

const useAuth = () => {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ username, setUsername ] = useState(null);
  const [ userId, setUserId ] = useState(null);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    const storedUserId = sessionStorage.getItem('userId');

    if (storedUsername && storedUserId) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
      setUserId(storedUserId);
    }
  }, []);

  return {
    isLoggedIn,
    username,
    userId,
  }
}

export default useAuth;