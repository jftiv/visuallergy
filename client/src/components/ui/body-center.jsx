import { cn } from "../../lib/utils"

export const BodyCenter = ({ children, className = "", ...props }) => {
  return (
    <div 
      className={cn(
        "min-h-screen flex items-center justify-center p-4",
        className
      )}
      {...props}
    >
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
};
