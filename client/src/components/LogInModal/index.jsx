import './logInModal.css';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../utils/mutations';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import React from 'react';

const LogInModal = () => {

    const [open, setOpen] = useState(false)
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

    const handleModalClick = () => {
        setOpen(!open)
    };

    const active = open ? "is-active" : "";

    return (
        <>
            <div className={`modal ${active}`}>
                <div className="modal-background"></div> 
                <div className="modal-content column is-three-quarters">
                    <form className="box" onSubmit={handleFormSubmit}>
                        <button type="button" className="delete" onClick={handleModalClick} aria-label="close"></button>
                        <div id='mobileView2' className='title is-1 has-text-centered modal-card-title mobileView'>Log in, friend</div>

                        <div className="field has-text-centered is-offset-2 column is-8">
                            <label className="label">Username</label>
                            <div className="control">
                                <input className="input is-medium" name='username' type="text" placeholder="Username" id="username" onChange={handleChange} />
                            </div>
                        </div>
                        <div className="field has-text-centered is-offset-2 column is-8">
                            <label className="label">Password</label>
                            <div className="control">
                                <input className="input is-medium" type="password" placeholder="Password" name='password' id="password"
                                    onChange={handleChange} />
                            </div>
                        </div>
                        <div className="field has-text-centered is-offset-2 column is-8">
                            <div className="control">
                                <button className="submit button is-primary">Log In!</button>
                            </div>
                        </div>
                        {error ? (
                            <div>
                                <p className="error-text has-text-centered">The provided credentials are incorrect</p>
                            </div>
                        ) : null}
                    </form>
                </div>
            </div>

            <footer className='footer'>
                <div className='content has-text-centered'>
                    <div id='mobileView' className='title is-2'>Welcome to the POST ZONE</div>
                    <p>Feel free to browse but why not sign up or log in to contribute! </p>
                    <div className='buttons is-centered'>
                        <Link className='button is-primary' to='/signup' >Sign Up</Link>
                        <button className='button is-link' onClick={handleModalClick} >Log In</button>
                    </div>
                </div>
            </footer>
            
        </>
    )
}

export default LogInModal;   