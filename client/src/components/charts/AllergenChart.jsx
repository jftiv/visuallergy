import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

export const AllergenChart = ({ meals }) => {
  const [syncId] = useState('allergen-charts');
  
  const processAllergenData = () => {
    if (!meals || meals.length === 0) return { data: [], groupingType: 'none' };

    const sortedMeals = [...meals].sort((a, b) => {
      const dateA = new Date(a.date || new Date().toISOString().split('T')[0]);
      const dateB = new Date(b.date || new Date().toISOString().split('T')[0]);
      return dateA - dateB;
    });

    const uniqueDates = [...new Set(sortedMeals.map(meal => 
      meal.date || new Date().toISOString().split('T')[0]
    ))];

    const dateRange = uniqueDates.length;
    
    // Determine grouping strategy
    let groupingType;
    if (dateRange <= 1) {
      groupingType = 'meal';
    } else if (dateRange <= 21) {
      groupingType = 'daily';
    } else {
      groupingType = 'weekly';
    }

    let processedData = [];

    switch (groupingType) {
      case 'meal':
        processedData = sortedMeals.map((meal, index) => {
          const mealData = {
            date: meal.date || new Date().toISOString().split('T')[0],
            label: `Meal ${index + 1}`,
            dairy: 0,
            redMeat: 0,
            gluten: 0,
            caffeine: 0,
            alcohol: 0,
          };

          meal.items.forEach(item => {
            if (item.dairy) mealData.dairy++;
            if (item.redMeat) mealData.redMeat++;
            if (item.gluten) mealData.gluten++;
            if (item.caffeine) mealData.caffeine++;
            if (item.alcohol) mealData.alcohol++;
          });

          return mealData;
        });
        break;

      case 'daily':
        const dailyData = {};
        
        sortedMeals.forEach(meal => {
          const mealDate = meal.date || new Date().toISOString().split('T')[0];
          const dateKey = mealDate;
          
          if (!dailyData[dateKey]) {
            dailyData[dateKey] = {
              date: dateKey,
              label: dateKey,
              dairy: 0,
              redMeat: 0,
              gluten: 0,
              caffeine: 0,
              alcohol: 0,
            };
          }
          
          meal.items.forEach(item => {
            if (item.dairy) dailyData[dateKey].dairy++;
            if (item.redMeat) dailyData[dateKey].redMeat++;
            if (item.gluten) dailyData[dateKey].gluten++;
            if (item.caffeine) dailyData[dateKey].caffeine++;
            if (item.alcohol) dailyData[dateKey].alcohol++;
          });
        });
        
        processedData = Object.values(dailyData);
        break;

      case 'weekly':
        const weeklyData = {};
        
        sortedMeals.forEach(meal => {
          const mealDate = new Date(meal.date || new Date().toISOString().split('T')[0]);
          // Get the start of the week (Sunday)
          const weekStart = new Date(mealDate);
          weekStart.setDate(mealDate.getDate() - mealDate.getDay());
          const weekKey = weekStart.toISOString().split('T')[0];
          
          if (!weeklyData[weekKey]) {
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 6);
            
            weeklyData[weekKey] = {
              date: weekKey,
              label: `Week of ${weekStart.getMonth() + 1}/${weekStart.getDate()}`,
              dairy: 0,
              redMeat: 0,
              gluten: 0,
              caffeine: 0,
              alcohol: 0,
            };
          }
          
          meal.items.forEach(item => {
            if (item.dairy) weeklyData[weekKey].dairy++;
            if (item.redMeat) weeklyData[weekKey].redMeat++;
            if (item.gluten) weeklyData[weekKey].gluten++;
            if (item.caffeine) weeklyData[weekKey].caffeine++;
            if (item.alcohol) weeklyData[weekKey].alcohol++;
          });
        });
        
        processedData = Object.values(weeklyData).sort((a, b) => new Date(a.date) - new Date(b.date));
        break;

      default:
        processedData = [];
        break;
    }
    
    return { data: processedData, groupingType };
  };

  const { data, groupingType } = processAllergenData();

  const chartConfigs = [
    {
      title: 'Gluten Consumption',
      dataKey: 'gluten',
      color: '#ef4444',
      name: 'Gluten'
    },
    {
      title: 'Dairy Consumption',
      dataKey: 'dairy',
      color: '#3b82f6',
      name: 'Dairy'
    },
    {
      title: 'Red Meat Consumption',
      dataKey: 'redMeat',
      color: '#f59e0b',
      name: 'Red Meat'
    },
    {
      title: 'Caffeine Consumption',
      dataKey: 'caffeine',
      color: '#8b5cf6',
      name: 'Caffeine'
    },
    {
      title: 'Alcohol Consumption',
      dataKey: 'alcohol',
      color: '#10b981',
      name: 'Alcohol'
    }
  ];

  const formatDate = (value, label) => {
    if (groupingType === 'meal') {
      return label || `Meal ${value}`;
    } else if (groupingType === 'daily') {
      const date = new Date(value);
      return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
    } else {
      return label || value;
    }
  };

  const getGroupingDescription = () => {
    switch (groupingType) {
      case 'meal':
        return 'Showing individual meals';
      case 'daily':
        return 'Showing daily totals';
      case 'weekly':
        return 'Showing weekly totals';
      default:
        return '';
    }
  };

  const renderChart = (config, index) => (
    <div key={config.dataKey} className="w-full p-3 sm:p-4 border border-border rounded-lg bg-card mb-3 overflow-hidden">
      <h4 className="text-sm sm:text-base font-medium mb-2">{config.title}</h4>
      <div className="h-32 sm:h-40 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={data} 
            margin={{ top: 5, right: 15, left: 10, bottom: 5 }}
            syncId={syncId}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey={groupingType === 'meal' ? 'label' : 'date'}
              stroke="hsl(var(--muted-foreground))"
              fontSize={9}
              angle={groupingType === 'weekly' ? -45 : 0}
              textAnchor={groupingType === 'weekly' ? 'end' : 'middle'}
              height={groupingType === 'weekly' ? 50 : 40}
              interval="preserveStartEnd"
              tickFormatter={(value) => {
                const dataPoint = data.find(d => 
                  groupingType === 'meal' ? d.label === value : d.date === value
                );
                return formatDate(value, dataPoint?.label);
              }}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={9}
              width={25}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px',
                color: 'hsl(var(--card-foreground))',
                fontSize: '12px'
              }}
              labelFormatter={(label) => {
                const dataPoint = data.find(d => 
                  groupingType === 'meal' ? d.label === label : d.date === label
                );
                if (groupingType === 'meal') {
                  return dataPoint?.label || label;
                } else if (groupingType === 'daily') {
                  return `Date: ${formatDate(label, dataPoint?.label)}`;
                } else {
                  return dataPoint?.label || `Week of ${formatDate(label)}`;
                }
              }}
            />
            <Line 
              type="monotone" 
              dataKey={config.dataKey} 
              stroke={config.color} 
              strokeWidth={2} 
              name={config.name}
              dot={{ fill: config.color, strokeWidth: 2, r: 2 }}
              activeDot={{ r: 4, fill: config.color }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  if (data.length === 0) {
    return (
      <div className="w-full p-3 sm:p-4 border border-border rounded-lg bg-card mb-6">
        <h3 className="text-base sm:text-lg font-semibold mb-4">Allergen Trends</h3>
        <div className="text-muted-foreground text-center py-8 text-sm sm:text-base">
          No data available for charts
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-3 mb-6">
      <div className="p-3 sm:p-4 border border-border rounded-lg bg-card">
        <h3 className="text-base sm:text-lg font-semibold mb-2">Allergen Consumption Trends</h3>
        <p className="text-xs sm:text-sm text-muted-foreground mb-2">
          Charts are synchronized - hover over any chart to see data across all allergens for that date
        </p>
        <p className="text-xs text-muted-foreground font-medium">
          {getGroupingDescription()}
        </p>
      </div>
      
      <div className="space-y-3">
        {chartConfigs.map((config, index) => renderChart(config, index))}
      </div>
    </div>
  );
};
