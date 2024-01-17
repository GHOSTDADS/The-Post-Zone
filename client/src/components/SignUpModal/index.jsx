import Auth from '../../utils/auth';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';

function SignUpModal() {

    //checks if logged in and redirects to feed
    const isLoggedIn = Auth.loggedIn();
    console.log(isLoggedIn);
    if (isLoggedIn) {
        return (
            <Navigate to="/feed" replace={true} />
        )
    }

    const [isOpen, setIsOpen] = useState(false); 
    const [formState, setFormState] = useState({ username: '', password: '', email: '' });
    const [register, { error }] = useMutation(ADD_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const mutationResponse = await register({
                variables: { username: formState.username, password: formState.password, email: formState.email },
            });
            console.log(mutationResponse)
            const token = mutationResponse.data.createUser.token;
            Auth.login(token);
        } catch (e) {
            console.error(e);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
          ...formState,
          [name]: value,
        });
    };

    const handleModalClick = () => {
        setIsOpen(!isOpen)
    };


    const active = isOpen ? "is-active" : "";

    return (
        <>
        <div className={`modal ${active}`}>
        <div className="modal-background"></div>
        <div className="modal-content column is-three-quarters">
            <form className="box mt-5" onSubmit={handleFormSubmit}>
               <button type="button" className="delete" onClick={handleModalClick} aria-label="close"></button>
                <div id='signupTitle' className='title is-1 has-text-centered modal-card-title mobileView'> Sign up Here!</div>
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
        </div>

<button className='button is-primary' onClick={handleModalClick} >Sign In</button>

</>
    );
};

export default SignUpModal;