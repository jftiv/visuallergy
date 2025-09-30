import { useState } from "react";
import { BodyCenter, MealsNav, StyledLink, AllergenChart, TimeRangeFilter } from "../../components";
import { useAuth } from "../../contexts/AuthContext";
import { useMeals } from "../../hooks/useMeals";

export const ViewMeals = () => {
  const { user } = useAuth();
  const { getMeals } = useMeals();
  
  // Time range options
  const [timeRange, setTimeRange] = useState('90days');
  const [customDate, setCustomDate] = useState('');
  
  // Calculate start date based on selection
  const getStartDate = () => {
    const now = new Date();
    
    switch (timeRange) {
      case '90days':
        const ninetyDaysAgo = new Date(now);
        ninetyDaysAgo.setMonth(now.getMonth() - 3);
        return ninetyDaysAgo.toISOString().split('T')[0];
      case '6months':
        const sixMonthsAgo = new Date(now);
        sixMonthsAgo.setMonth(now.getMonth() - 6);
        return sixMonthsAgo.toISOString().split('T')[0];
      case '1year':
        const oneYearAgo = new Date(now);
        oneYearAgo.setFullYear(now.getFullYear() - 1);
        return oneYearAgo.toISOString().split('T')[0];
      case 'custom':
        return customDate;
      case 'all':
      default:
        return '';
    }
  };
  
  // Build query params
  const queryParams = {};
  const startDate = getStartDate();
  if (startDate) {
    queryParams.startDate = startDate;
  }
  
  const { meals, isLoading, error } = getMeals(user?.username || 'testuser', queryParams);

  const handleTimeRangeChange = (e) => {
    setTimeRange(e.target.value);
  };

  const handleCustomDateChange = (e) => {
    setCustomDate(e.target.value);
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    return <BodyCenter>Error loading meals: {error.message}</BodyCenter>;
  }

  if (!meals) {
    return (
      <div>
        <MealsNav />
        <div className="max-w-7xl mx-auto p-4">
          <TimeRangeFilter 
            timeRange={timeRange}
            customDate={customDate}
            onTimeRangeChange={handleTimeRangeChange}
            onCustomDateChange={handleCustomDateChange}
          />
          <div className="text-center py-12 px-4">
            <div className="text-muted-foreground text-sm sm:text-base">
              No meals found. Start by <StyledLink to="/meals/add">adding a meal!</StyledLink> or try adjusting the date range to find older meals.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <MealsNav />
      <div className="max-w-7xl mx-auto p-4">
        <TimeRangeFilter 
          timeRange={timeRange}
          customDate={customDate}
          onTimeRangeChange={handleTimeRangeChange}
          onCustomDateChange={handleCustomDateChange}
        />
        
        {/* Allergen Chart */}
        <AllergenChart meals={meals} />
        
        {/* Meals Content */}
        <div className="space-y-4">
          {meals?.map((meal, index) => (
            <div key={index} className="p-3 sm:p-4 border border-border rounded-lg bg-card">
              <div className="mb-3 text-sm sm:text-base">
                <strong>At Home:</strong> {meal.atHome ? 'Yes' : 'No'}
              </div>
              <div>
                <strong className="text-sm sm:text-base">Items:</strong>
                {meal.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="mt-3 p-3 border border-border rounded bg-background">
                    <div className="mb-2">
                      <strong className="text-sm sm:text-base">{item.name}</strong>
                    </div>
                    {item.notes && (
                      <div className="mb-2 text-muted-foreground text-sm">
                        <i>{item.notes}</i>
                      </div>
                    )}
                    
                    {/* Mobile-optimized allergen display */}
                    <div className="mt-2">
                      {/* Desktop view - horizontal list */}
                      <ul className="hidden sm:flex justify-between items-center text-sm p-2 bg-muted rounded">
                        <li className={`font-medium ${item.dairy ? 'text-red-600 bg-red-50 px-2 py-1 rounded' : 'text-muted-foreground'}`}>
                          Dairy
                        </li>
                        <li className={`font-medium ${item.redMeat ? 'text-red-600 bg-red-50 px-2 py-1 rounded' : 'text-muted-foreground'}`}>
                          Red Meat
                        </li>
                        <li className={`font-medium ${item.gluten ? 'text-red-600 bg-red-50 px-2 py-1 rounded' : 'text-muted-foreground'}`}>
                          Gluten
                        </li>
                        <li className={`font-medium ${item.caffeine ? 'text-red-600 bg-red-50 px-2 py-1 rounded' : 'text-muted-foreground'}`}>
                          Caffeine
                        </li>
                        <li className={`font-medium ${item.alcohol ? 'text-red-600 bg-red-50 px-2 py-1 rounded' : 'text-muted-foreground'}`}>
                          Alcohol
                        </li>
                      </ul>
                      
                      {/* Mobile view - smaller, wrapped grid */}
                      <div className="grid grid-cols-2 gap-2 sm:hidden p-2 bg-muted rounded">
                        <div className={`text-xs font-medium text-center py-1 px-2 rounded ${item.dairy ? 'text-red-600 bg-red-50' : 'text-muted-foreground'}`}>
                          Dairy
                        </div>
                        <div className={`text-xs font-medium text-center py-1 px-2 rounded ${item.redMeat ? 'text-red-600 bg-red-50' : 'text-muted-foreground'}`}>
                          Red Meat
                        </div>
                        <div className={`text-xs font-medium text-center py-1 px-2 rounded ${item.gluten ? 'text-red-600 bg-red-50' : 'text-muted-foreground'}`}>
                          Gluten
                        </div>
                        <div className={`text-xs font-medium text-center py-1 px-2 rounded ${item.caffeine ? 'text-red-600 bg-red-50' : 'text-muted-foreground'}`}>
                          Caffeine
                        </div>
                        <div className={`text-xs font-medium text-center py-1 px-2 rounded col-span-2 ${item.alcohol ? 'text-red-600 bg-red-50' : 'text-muted-foreground'}`}>
                          Alcohol
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
