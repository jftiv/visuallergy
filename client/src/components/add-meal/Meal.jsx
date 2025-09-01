import { useState } from "react"
import { useForm } from "react-hook-form"
import { useAuth } from "../../contexts/AuthContext"
import { Item, MealsNav } from "../../components"
import { createDateTimeWithCurrentTime, getTodayLocalDate } from "../../utils/DateTimeHelpers"

export const Meal = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [ itemCount, setItemCount ] = useState(1);
  const [ submitSuccess, setSubmitSuccess ] = useState(false);
  const [ submitError, setSubmitError ] = useState(null);
  const [ mealDate, setMealDate ] = useState(() => {
    return getTodayLocalDate();
  });
  const { user } = useAuth();

  const handleItemCountChange = (e, operation) => {
    e.preventDefault()
    switch (operation) {
      case 'add':
        setItemCount(itemCount+1)
        break
      case 'remove':
        if (itemCount > 1) {
          setItemCount(itemCount-1)
        }
        break
      default:
        break
    }
  }

  const handleResetForm = () => {
    setItemCount(1);
    setSubmitSuccess(false);
    setSubmitError(null);
    setMealDate(getTodayLocalDate());
    reset();
  }

  const onSubmit = (data) => {
    const request = reformatData(data);
    fetch('http://localhost:3001/meals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Username': user?.username || 'testuser', // Use actual username from context
      },
      body: JSON.stringify(request),
    })
    .then(response => {
      if (!response.ok) {
        setSubmitError('Failed to submit meal data');
        return;
      }
      setSubmitSuccess(true);
      return response.json();
    })
  }

  const reformatData = (data) => {
    const items = [];
    for (let i = 0; i < itemCount; i++) {
      items.push({
        name: data[`name-${i}`],
        notes: data[`notes-${i}`],
        dairy: data[`dairy-${i}`] || false,
        redMeat: data[`redMeat-${i}`] || false,
        gluten: data[`gluten-${i}`] || false,
        caffeine: data[`caffeine-${i}`] || false,
        alcohol: data[`alcohol-${i}`] || false,
      });
    }
    
    // Create datetime with the selected date and current time
    const mealDateTime = createDateTimeWithCurrentTime(mealDate);
    
    return { items, atHome: data.at_home, date: mealDateTime };
  }

  if (submitError) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <MealsNav />
        <div className="max-w-md mx-auto text-center space-y-4">
          <div className="text-destructive">Error: {submitError}</div>
        </div>
      </div>
    );
  }

  if (submitSuccess) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <MealsNav />
        <div className="max-w-md mx-auto text-center space-y-4">
          <div className="text-green-600">Meal submitted successfully!</div>
          <button 
            onClick={handleResetForm}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Reset Form
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto p-4">
      <MealsNav />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: itemCount }, (_, index) => (
            <div key={index} className="max-w-[320px] w-full">
              <Item index={index} register={register} errors={errors} />
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start space-y-4 max-w-[320px]">
          <div className="flex items-center space-x-2">
            <label htmlFor="mealDate" className="text-sm font-medium leading-none">
              Meal Date:
            </label>
            <input 
              type="date" 
              id="mealDate" 
              value={mealDate}
              onChange={(e) => setMealDate(e.target.value)}
              className="px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" id="atHome" {...register("at_home")} className="h-4 w-4 rounded border border-primary text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2" />
            <label htmlFor="atHome" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              At Home
            </label>
          </div>

          <div className="flex flex-wrap gap-2">
            <button 
              onClick={e => handleItemCountChange(e, 'add')}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Add Item
            </button>
            <button 
              onClick={e => handleItemCountChange(e, 'remove')}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
            >
              Remove Item
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}