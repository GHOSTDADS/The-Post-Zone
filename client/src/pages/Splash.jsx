import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { Navigate } from 'react-router-dom';
import '../App.css';

const Splash = () => {

    const isLoggedIn = Auth.loggedIn();
    if (isLoggedIn) {
        return (
            <Navigate to="/feed" replace={true} />
        )
    }

    return (
        <div className="columns is-desktop my-auto">
            <div className="column my-auto is-half has-text-centered">
                <Link className='pt-2' to='/feed'>
                    <img id='mobileDisable' src="../../../assets/PostZoneIcon.png" alt="the post Zone logo" />
                    <div className='title is-2'>Come browse the Posts</div>
                </Link>
            </div>
            <div className="column my-auto is-half has-text-centered">
                <div className="box section is-large">
                    <div className='title is-2'>Welcome to the POST ZONE</div>
                    <div className="buttons are-medium is-centered">
                    <Link className='button is-link is-fullwidth my-3' to='/login' >Log In</Link>
                    <div className='divider'>Don't have an account?</div>
                    <Link className='button is-primary is-fullwidth my-3' to='/signup'>Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Splash;
