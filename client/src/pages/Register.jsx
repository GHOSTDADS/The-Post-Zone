import  Auth  from '../utils/auth';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import validation from '../utils/signupValidation';

function Register() {

    //checks if logged in and redirects to feed
    const isLoggedIn = Auth.loggedIn();
    console.log(isLoggedIn);
    if (isLoggedIn) {
        return (
            <Navigate to="/" replace={true} />
        )
    }

    const [errors, setErrors] = useState({});


    const [formState, setFormState] = useState({ username: '', password: '', email: '' });
    const [register, { error }] = useMutation(ADD_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
            // setErrors(validation(values));
        try {
            const mutationResponse = await register({
                variables: { username: formState.username, password: formState.password, email: formState.email },
            });
            console.log(mutationResponse)
            const token = mutationResponse.data.createUser.token;
            Auth.login(token);
        } catch (e) {
            console.log(e);
        }
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
            <form className="box mt-5" onSubmit={handleFormSubmit}>
                <div className='title is-1 has-text-centered'> Sign up Here!</div>
                <div className="field has-text-centered is-offset-2 column is-8">
                    <label className="label">Username</label>
                    <div className="control">
                        <input className="input is-medium" name='username' type="text" placeholder="Username"  id="username"onChange={handleChange} />
                        <span></span>
                    </div>
                </div>
                <div className="field has-text-centered is-offset-2 column is-8">
                    <label className="label">Password</label>
                    <div className="control">
                        <input className="input is-medium" name='password' type="password" placeholder="Password"  id="password" onChange={handleChange} />
                    </div>
                </div>
                <div className="field has-text-centered is-offset-2 column is-8">
                    <label className="label">Email</label>
                    <div className="control">
                        <input className="input is-medium" name='email' type="email" placeholder="Email"  id="email" onChange={handleChange} />
                    </div>
                </div>
                <div className="field has-text-centered is-offset-2 column is-8">
                    <div className="control">
                        <button className=" submit button is-primary">Sign In!</button>
                    </div>
                </div>
            </form>
        </div>

    );
};

export default Register;