import { useAuth } from "../../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { Button, StyledLink } from "../../components";

export const MealsNav = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{ 
      padding: '1rem', 
      borderBottom: '1px solid #ccc', 
      marginBottom: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <span style={{ marginRight: '1rem' }}>Welcome, {user?.username}!</span>
        <StyledLink to="/meals" style={{ marginRight: '1rem' }}>
          View Meals
        </StyledLink>
        <StyledLink to="/meals/add">
          Add Meal
        </StyledLink>
      </div>
      <div>
        <StyledLink to="/" style={{ marginRight: '1rem' }}>
          Home
        </StyledLink>
        <Button onClick={handleLogout} variant="outline" size="sm">
          Logout
        </Button>
      </div>
    </nav>
  );
};
