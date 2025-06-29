import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';

export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

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
      // convert to route action
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
    <form onSubmit={handleSubmit(onSubmitLogin)}>
      <div>
        <label>Username</label>
      </div>
      <input type="text" {...register("username")}></input>
      <div>
        <label>Password</label>
      </div>
      <input type="password" {...register("password")}></input>
      <br />
      <button type="submit">Login</button>
      <a href="#" onClick={handleForgotPassword}>Forgot your password?</a>
      <Link to="/register">Register</Link>
    </form>
  )
}
