# GitHub Copilot Instructions

## General Guidelines
- Always use functional components with hooks instead of class components
- Prefer arrow function syntax for component definitions
- Use ES6+ features and modern JavaScript practices
- Include proper error handling in async operations
- Instead of using comments try to name functions and variables clearly
- Ensure code is modular and reusable

## React/Frontend Specific
- If an index file exists in a directory, import from the directory directly
- Use multi imports if possible when importing
- Use the shadcn/ui component system for all UI elements
- Follow the existing component structure in `/client/src/components/`
- Use React Hook Form for form handling
- Store authentication data in sessionStorage
- Use fetch API for HTTP requests with proper error handling
- Use React Router for navigation and routing

## Styling Guidelines
- Use Tailwind CSS classes when possible
- For custom styling, use inline styles sparingly and prefer CSS classes
- Try to use one css file per folder and share it among components in that folder
- Avoid using global CSS unless absolutely necessary
- Use descriptive class names that reflect the purpose of the style
- Follow the shadcn design system (components.json configuration)
- Maintain consistent spacing and layout patterns
- Ensure responsive design with proper mobile support

## File Organization
- UI components go in `/client/src/components/ui/`
- Feature components go in `/client/src/components/[feature]/`
- Export components from index files for clean imports
- Use descriptive file names that match component names

## Code Quality
- Use meaningful variable and function names
- Keep components focused on single responsibilities
- Extract reusable logic into custom hooks when appropriate
- Add loading states and error boundaries for better UX

## API Integration
- Include proper Content-Type headers for POST requests
- Handle both success and error responses appropriately
- Implement proper loading states during API calls
- Use useSwr for data fetching and caching when applicable

## Accessibility
- Include proper ARIA labels and roles
- Ensure keyboard navigation works correctly
- Use semantic HTML elements
- Maintain proper color contrast ratios
- Include alt text for images