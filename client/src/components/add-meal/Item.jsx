import { Input } from "../ui/input.jsx";
import { Checkbox } from "../ui/checkbox.jsx";

export const Item = ({index, register, errors}) => {
  return (
    <div className="space-y-4 p-4 border border-border rounded-lg bg-card">
      <h3 className="text-lg font-semibold mb-4">Item {index + 1}</h3>
      
      <div className="space-y-2">
        <label htmlFor={`name-${index}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Name *
        </label>
        <Input 
          id={`name-${index}`}
          type="text"
          {...register(`name-${index}`, { required: true })} 
          className={errors[`name-${index}`] ? "border-destructive" : ""} 
          data-1p-ignore
        />
        {errors[`name-${index}`] && (
          <span className="text-sm text-destructive">This field is required</span>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor={`notes-${index}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Notes
        </label>
        <Input id={`notes-${index}`} type="text" {...register(`notes-${index}`)} data-1p-ignore />
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-medium">Allergens & Dietary Information</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`dairy-${index}`}
              {...register(`dairy-${index}`)}
            />
            <label htmlFor={`dairy-${index}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Dairy
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id={`redMeat-${index}`}
              {...register(`redMeat-${index}`)}
            />
            <label htmlFor={`redMeat-${index}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Red Meat
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id={`gluten-${index}`}
              {...register(`gluten-${index}`)}
            />
            <label htmlFor={`gluten-${index}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Gluten
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id={`caffeine-${index}`}
              {...register(`caffeine-${index}`)}
            />
            <label htmlFor={`caffeine-${index}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Caffeine
            </label>
          </div>

          <div className="flex items-center space-x-2 col-span-2">
            <Checkbox
              id={`alcohol-${index}`}
              {...register(`alcohol-${index}`)}
            />
            <label htmlFor={`alcohol-${index}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Alcohol
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}