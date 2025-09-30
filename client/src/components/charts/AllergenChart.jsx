import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const AllergenChart = ({ meals }) => {
  const processAllergenData = () => {
    if (!meals || meals.length === 0) return [];

    // Group meals by date and count allergens
    const allergensByDate = {};
    
    meals.forEach(meal => {
      // Use the meal's date field, fallback to current date if not available
      const mealDate = meal.date || new Date().toISOString().split('T')[0];
      const dateKey = mealDate;
      
      if (!allergensByDate[dateKey]) {
        allergensByDate[dateKey] = {
          date: dateKey,
          dairy: 0,
          redMeat: 0,
          gluten: 0,
          caffeine: 0,
          alcohol: 0,
        };
      }
      
      // Count allergens in each meal's items
      meal.items.forEach(item => {
        if (item.dairy) allergensByDate[dateKey].dairy++;
        if (item.redMeat) allergensByDate[dateKey].redMeat++;
        if (item.gluten) allergensByDate[dateKey].gluten++;
        if (item.caffeine) allergensByDate[dateKey].caffeine++;
        if (item.alcohol) allergensByDate[dateKey].alcohol++;
      });
    });
    
    // Sort by date to ensure proper chronological order
    return Object.values(allergensByDate).sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const data = processAllergenData();

  if (data.length === 0) {
    return (
      <div className="w-full p-3 sm:p-4 border border-border rounded-lg bg-card mb-6">
        <h3 className="text-base sm:text-lg font-semibold mb-4">Allergen Trends</h3>
        <div className="text-muted-foreground text-center py-8 text-sm sm:text-base">
          No data available for chart
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-3 sm:p-4 border border-border rounded-lg bg-card mb-6 overflow-hidden">
      <h3 className="text-base sm:text-lg font-semibold mb-4">Allergen Consumption Trends</h3>
      <div className="h-64 sm:h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 15, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={10}
              angle={-45}
              textAnchor="end"
              height={60}
              interval="preserveStartEnd"
              tickFormatter={(value) => {
                // Format date as MM/DD
                const date = new Date(value);
                return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
              }}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={10}
              width={30}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px',
                color: 'hsl(var(--card-foreground))',
                fontSize: '12px'
              }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px' }}
            />
            <Line 
              type="monotone" 
              dataKey="dairy" 
              stroke="#3b82f6" 
              strokeWidth={2} 
              name="Dairy" 
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 3 }}
            />
            <Line 
              type="monotone" 
              dataKey="redMeat" 
              stroke="#ef4444" 
              strokeWidth={2} 
              name="Red Meat" 
              dot={{ fill: '#ef4444', strokeWidth: 2, r: 3 }}
            />
            <Line 
              type="monotone" 
              dataKey="gluten" 
              stroke="#f59e0b" 
              strokeWidth={2} 
              name="Gluten" 
              dot={{ fill: '#f59e0b', strokeWidth: 2, r: 3 }}
            />
            <Line 
              type="monotone" 
              dataKey="caffeine" 
              stroke="#8b5cf6" 
              strokeWidth={2} 
              name="Caffeine" 
              dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 3 }}
            />
            <Line 
              type="monotone" 
              dataKey="alcohol" 
              stroke="#10b981" 
              strokeWidth={2} 
              name="Alcohol" 
              dot={{ fill: '#10b981', strokeWidth: 2, r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
