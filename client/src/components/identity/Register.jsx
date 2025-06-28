import { useState } from "react";
import { useForm } from "react-hook-form"

const Register = () => {
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
      <div>
        Error registering user.
      </div>
    )
  };

  if (registerSuccess) {
    return (
      <div>
        Registration was successful. Please continue to login!
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmitRegisterUser)}>
      <div>
        <label>Email</label>
      </div>
      <input type="email" name="email" placeholder="E-mail" {...register("email")}></input>
      <div>
        <label>Username</label>
      </div>
      <input type="text" name="username" placeholder="Username" {...register("username")}></input>
      <div>
        <label>Password</label>
      </div>
      <input type="password" name="password" placeholder="Password" {...register("password")}></input>
      <button type="submit">Submit</button>
    </form>
  )
}

export default Register;