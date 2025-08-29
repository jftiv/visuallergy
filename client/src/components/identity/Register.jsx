import { useState } from "react";
import { useForm } from "react-hook-form"
import { Input, Button, StyledLink } from "../../components";
import "./Identity.css";

export const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [ registerSuccess, setRegisterSuccess ] = useState(false);
  const [ registerError, setRegisterError ] = useState(false);

  const onSubmitRegisterUser = (data) => {
    fetch('http://localhost:3001/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        'email': data['email'],
        'username': data['username'],
        'password': data['password'],
      }),
    }).then(response => {
      if (!response.ok) {
        setRegisterError(true);
        console.log(JSON.stringify(response.body));
        return;
      }
      setRegisterSuccess(true);
    })
  };

  if (registerError) {
    return (
      <div className="identity-container">
        <div className="identity-error-card">
          <h2 className="identity-error-title">Registration Error</h2>
          <p>Error registering user. Please try again.</p>
          <Button 
            onClick={() => setRegisterError(false)} 
            variant="outline" 
            className="mt-4"
          >
            Try Again
          </Button>
        </div>
      </div>
    )
  };

  if (registerSuccess) {
    return (
      <div className="identity-container">
        <div className="identity-success-card">
          <h2 className="identity-success-title">Registration Successful!</h2>
          <p className="identity-success-message">Your account has been created successfully.</p>
          <StyledLink to="/login" variant="button">
            Continue to Login
          </StyledLink>
        </div>
      </div>
    )
  }

  return (
    <div className="identity-container">
      <form 
        onSubmit={handleSubmit(onSubmitRegisterUser)}
        className="identity-form"
      >
        <h2 className="identity-form-title">
          Create Account
        </h2>
        
        <div className="identity-form-group">
          <label className="identity-label">
            Email
          </label>
          <Input 
            type="email" 
            name="email" 
            placeholder="Enter your email" 
            {...register("email")}
          />
        </div>
        
        <div className="identity-form-group">
          <label className="identity-label">
            Username
          </label>
          <Input 
            type="text" 
            name="username" 
            placeholder="Choose a username" 
            {...register("username")}
          />
        </div>
        
        <div className="identity-form-group-large">
          <label className="identity-label">
            Password
          </label>
          <Input 
            type="password" 
            name="password" 
            placeholder="Create a password" 
            {...register("password")}
          />
        </div>
        
        <Button type="submit" className="w-full mb-4">
          Create Account
        </Button>
        
        <p className="identity-centered-text">
          Already have an account?{' '}
          <StyledLink to="/login">
            Sign in here
          </StyledLink>
        </p>
      </form>
    </div>
  )
}