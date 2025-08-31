import { BodyCenter, MealsNav, StyledLink } from "../../components";
import { useAuth } from "../../contexts/AuthContext";
import { useMeals } from "../../hooks/useMeals";

export const ViewMeals = () => {
  const { user } = useAuth();
  const { meals, isLoading, error } = useMeals(user?.username || 'testuser');

  if (isLoading) return <div>Loading...</div>;

  if (!meals) {
    return <BodyCenter>
      No meals found. Start by <StyledLink to="/meals/add">adding a meal!</StyledLink>
    </BodyCenter>;
  }

  if (error) {
    return <BodyCenter>Error loading meals: {error.message}</BodyCenter>;
  }

  return (
    <div>
      <MealsNav />
      <div>
        {meals.map((meal, index) => (
          <div key={index}>
            <strong>At Home:</strong> {meal.atHome ? 'Yes' : 'No'}<br />
            <strong>Items:</strong>
              {meal.items.map((item, itemIndex) => (
                <div key={itemIndex}>
                  <div>
                    <strong>{item.name}</strong>
                  </div>
                  <div>
                    <i>{item.notes}</i>
                  </div>
                  <ul>
                    <li>Dairy: {item.dairy ? 'Yes' : 'No'},</li>
                    <li>Red Meat: {item.redMeat ? 'Yes' : 'No'},</li>
                    <li>Gluten: {item.gluten ? 'Yes' : 'No'},</li>
                    <li>Caffeine: {item.caffeine ? 'Yes' : 'No'},</li>
                    <li>Alcohol: {item.alcohol ? 'Yes' : 'No'}</li>
                  </ul>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  )
}
