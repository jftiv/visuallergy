import { useAuth } from "../../contexts/AuthContext.jsx";
import { StyledLink, Button } from "../../components";

export const Home = () => {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <div className="home-container">
      <h1>Welcome to the Meal Tracker</h1>
      <p>Track your meals and manage your dietary preferences.</p>
      
      {isLoggedIn ? (
        <div>
          <p>Hello, {user?.username}!</p>
          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
            <StyledLink to="/meals" variant="button">
              View Meals
            </StyledLink>
            <StyledLink to="/meals/add" variant="button">
              Add Meal
            </StyledLink>
            <Button onClick={logout} variant="outline">
              Logout
            </Button>
          </div>
        </div>
      ) : (
        <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
          <StyledLink to="/login" variant="button">
            Login
          </StyledLink>
          <StyledLink to="/register" variant="button">
            Register
          </StyledLink>
        </div>
      )}
    </div>
  );
}