import { Link } from 'react-router-dom';
import  Auth  from '../../utils/auth';

const Header = () => {
    const logout = (event) => {
      event.preventDefault();
      Auth.logout();
    };

    return (

            <nav className='navbar' role='navigation' aria-label='main navigation'>
            <div className='navbar-brand'>
                <div className='title is-3'>The Post Zone</div>
            </div>
            <div className='navbar-end'>
                <div className='navbar-item'>
                    <div className='buttons'>
                        {Auth.loggedIn() ? (
                            <>
                            <Link className='button is-primary'>
                                Profile
                            </Link>
                            <Link className='button is-danger' onClick={logout}>
                                Log Out
                            </Link>
                            </>
                        ) : ( 
                            <>
                            <Link className='button is-primary' to='/signup'>
                                Sign Up!
                            </Link>
                            <Link className='button is-light' to='/login'>
                                Log In!
                            </Link>
                            </>
                        )}  
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;