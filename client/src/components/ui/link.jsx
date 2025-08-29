import * as React from "react"
import { Link as RouterLink } from "react-router-dom"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

const linkVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "text-primary underline-offset-4 hover:underline",
        muted: "text-muted-foreground hover:text-foreground underline-offset-4 hover:underline",
        destructive: "text-destructive hover:text-destructive/80 underline-offset-4 hover:underline",
        button: "bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md px-4 py-2",
        ghost: "hover:bg-accent hover:text-accent-foreground rounded-md px-4 py-2",
      },
      size: {
        default: "",
        sm: "text-xs",
        lg: "text-base",
        button: "h-10 px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const StyledLink = React.forwardRef(({ className, variant, size, to, children, ...props }, ref) => {
  return (
    <RouterLink
      to={to}
      className={cn(linkVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    >
      {children}
    </RouterLink>
  )
})
StyledLink.displayName = "StyledLink"

// Also provide a regular anchor link variant
const ExternalLink = React.forwardRef(({ className, variant, size, href, children, ...props }, ref) => {
  return (
    <a
      href={href}
      className={cn(linkVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    >
      {children}
    </a>
  )
})
ExternalLink.displayName = "ExternalLink"

export { StyledLink, ExternalLink, linkVariants }
