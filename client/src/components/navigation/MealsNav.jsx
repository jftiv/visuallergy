import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { Button, StyledLink } from "../../components";

export const MealsNav = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMore = () => {
    setShowMore(!showMore);
  };

  const collapsibleButton = () => {
    return (
      <div className="text-center mb-3">
        <button
          onClick={toggleMore}
          className="text-sm font-medium text-primary hover:text-primary/80 hover:underline hover:cursor-pointer transition-colors"
        >
          {showMore ? 'Less ↑' : 'More ↓'}
        </button>
      </div>
    )
  }

  return (
    <nav className="p-4 border-b border-gray-300 mb-4">
      <div className="max-w-7xl mx-auto">
        {/* Desktop layout */}
        <div className="hidden sm:flex justify-between items-center">
          <div>
            <span className="text-sm font-medium mr-4">Welcome, {user?.username}!</span>
            <StyledLink to="/meals" className="mr-4">
              View Meals
            </StyledLink>
            <StyledLink to="/meals/add">
              Add Meal
            </StyledLink>
          </div>
          <div>
            <StyledLink to="/" className="mr-4">
              Home
            </StyledLink>
            <Button onClick={handleLogout} variant="outline" size="sm">
              Logout
            </Button>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="sm:hidden">
          <div className="text-center mb-3">
            <span className="text-sm font-medium">Welcome, {user?.username}!</span>
          </div>

          <div className="text-center mb-3">
            <StyledLink to="/meals/add" className="font-medium">
              Add Meal
            </StyledLink>
          </div>

          {/* More button */}
          {!showMore ? collapsibleButton() : null}

          {/* Collapsible menu */}
          {showMore && (
            <div className="space-y-3 text-center animate-in slide-in-from-top-2 duration-200">
              <div>
                <StyledLink to="/meals">
                  View Meals
                </StyledLink>
              </div>
              <div>
                <StyledLink to="/">
                  Home
                </StyledLink>
              </div>
              {/* More button */}
              {showMore ? collapsibleButton() : null}
              <div>
                <Button onClick={handleLogout} variant="outline" size="sm">
                  Logout
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
