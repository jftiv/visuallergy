import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate, Outlet } from 'react-router-dom';

export const IsLoggedIn = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in when the component mounts
    if (!isLoggedIn) {
      navigate('/login', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return <Outlet />;
};
