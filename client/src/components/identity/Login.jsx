import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Input, Button, StyledLink } from "../../components";
import "./Identity.css";

export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmitLogin = async (data) => {
    const response = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        'username': data['username'],
        'password': data['password'],
      })
    })
    if (response.ok) {
      const body = await response.json();
      sessionStorage.setItem('username', body['username']);
      sessionStorage.setItem('userId', body['userId']);
      // Redirect to meals page after successful login
      navigate('/meals');
    }
  }

  const handleForgotPassword = (event) => {
    event.preventDefault();

    //TODO:
    console.log("User forgot password, need to send a reset password email.");
  }

  // if (embedded) {
  //   //TODO: return inline login form
  // }

  // Dedicated login form
  return (
    <div className="identity-container">
      <form 
        onSubmit={handleSubmit(onSubmitLogin)}
        className="identity-form"
      >
        <div>
          <label className="identity-label">Username</label>
        </div>
        <Input type="text" {...register("username")}></Input>
        <div>
          <label className="identity-label">Password</label>
        </div>
        <Input type="password" {...register("password")}></Input>
        <br />
        <p>
          <Button type="submit" className="w-full">Login</Button>
        </p>
        <p>
          <StyledLink href="#" onClick={handleForgotPassword} variant="muted">
            Forgot your password?
          </StyledLink>
        </p>
        <p>
          <StyledLink to="/register">Register</StyledLink>
        </p>
      </form>
    </div>
  )
}
