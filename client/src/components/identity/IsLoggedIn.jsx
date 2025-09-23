import { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useNavigate, Outlet } from 'react-router-dom';

export const IsLoggedIn = () => {
  const { isLoggedIn, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in when the component mounts
    if (!isLoading && !isLoggedIn) {
      navigate('/login', { replace: true });
    }
  }, [isLoggedIn, isLoading, navigate]);

  // Show loading while checking auth status
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
};
