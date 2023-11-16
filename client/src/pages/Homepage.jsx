import { Link } from 'react-router-dom';

const Splash = () => {

    return (
        <div className="columns is-desktop my-auto">
            <div className="column my-auto is-half">
                <figure className="container text-center "> 
                <img src="" alt="" />
                </figure>
            </div>
            <div className="column my-auto is-half has-text-centered">
                <div className="box section is-large">
                    <div className="buttons are-medium is-centered">
                    <Link className='button is-primary is-fullwidth my-3'>Sign Up</Link>
                    <div className='divider'>or</div>
                    <Link className='button is-primary is-fullwidth my-3' to='/login'>Log In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Splash;
