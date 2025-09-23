import { forwardRef } from "react"
import { Check } from "lucide-react"
import { cn } from "../../lib/utils"

const Checkbox = forwardRef(({ className, checked, onCheckedChange, ...props }, ref) => {
  const handleChange = (e) => {
    if (onCheckedChange) {
      onCheckedChange(e.target.checked);
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <input
        type="checkbox"
        ref={ref}
        checked={checked}
        onChange={handleChange}
        className="sr-only peer"
        {...props}
      />
      <div
        className={cn(
          "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:border-primary",
          "flex items-center justify-center",
          className
        )}
      >
        {checked && <Check className="h-3 w-3 text-current" />}
      </div>
    </div>
  );
});

Checkbox.displayName = "Checkbox"

export { Checkbox }
