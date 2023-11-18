import { Link } from "react-router-dom"


const LogInSignUp = () => {

    return (
        <div className="columns is-desktop my-auto">
            <div className="column my-auto is-half">
                <figure className="container text-center "> 
                <img src="" alt="" />
                </figure>
            </div>
            <div className="column my-auto is-half has-text-centered">
                <div className="box section is-large">
                    <div className='title is-2'>Welcome to the POST ZONE</div>
                    <div className="buttons are-medium is-centered">
                    <Link className='button is-primary is-fullwidth my-3' to='/login' >Log In</Link>
                    <div className='divider'>Don't have an account?</div>
                    <Link className='button is-primary is-fullwidth my-3' to='/signup'>Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default LogInSignUp;
