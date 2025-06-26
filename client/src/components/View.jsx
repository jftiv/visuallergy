import useMeals from "../hooks/useMeals";

const View = () => {
  const { meals, isLoading, error } = useMeals('testuser'); // Replace 'testuser' with actual username

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading meals: {error.message}</div>;

  return (
    <div>
        {meals.map((meal, index) => (
          <div key={index}>
            <strong>At Home:</strong> {meal.atHome ? 'Yes' : 'No'}<br />
            <strong>Items:</strong>
              {meal.items.map((item, itemIndex) => (
                <p key={itemIndex}>
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
                </p>
              ))}
          </div>
        ))}
    </div>
  )
}

export default View;