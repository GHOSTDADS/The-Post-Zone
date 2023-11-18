import  Auth  from '../utils/auth';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import { Navigate } from 'react-router-dom';

function Login() {

  const isLoggedIn = Auth.loggedIn();
  if (isLoggedIn) {
      return (
          <Navigate to="/feed" replace={true} />
      )
  }

  const [formState, setFormState] = useState({ username: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
      event.preventDefault();
      try {
        const mutationResponse = await login({
          variables: { username: formState.username, password: formState.password },
        });
        const token = mutationResponse.data.login.token;
        Auth.login(token);
      } catch (e) {
        console.log(e);
      }

      setFormState({
          username: '',
          password: '',
      });
  };

  const handleChange = (event) => {
      const { name, value } = event.target;
      setFormState({
        ...formState,
        [name]: value,
      });
    };

  return (
          <div className="column is-three-quarters is-offset-2">
              <form className="box" onSubmit={handleFormSubmit}>
                <div className='title is-1 has-text-centered'>Log in friend~</div> 

              <div className="field has-text-centered is-offset-2 column is-8">
                  <label className="label">Username</label>
                  <div className="control">
                      <input className="input is-medium" name='username' type="text" placeholder="Username"  id="username" onChange={handleChange} />
                  </div>
              </div>
              <div className="field has-text-centered is-offset-2 column is-8">
                  <label className="label">Password</label>
                  <div className="control">
                      <input className="input is-medium" type="password" placeholder="Password" name='password' id="password"
                      onChange={handleChange}/>
                  </div>
              </div> 
              <div className="field has-text-centered is-offset-2 column is-8">
                  <div className="control">
                      <button className=" submit button is-primary">Log In!</button>
                  </div>
              </div> 
              {error ? (
              <div>
                  <p className="error-text has-text-centered">The provided credentials are incorrect</p>
              </div>
              ) : null}
              </form>
          </div>
  );
};

export default Login;
