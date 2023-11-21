import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import  Auth  from '../../utils/auth';

const Header = () => {
    const logout = (event) => {
      event.preventDefault();
      Auth.logout();
    };

    const location = useLocation();

    return (

            <nav id='mobileShift' className='navbar' role='navigation' aria-label='main navigation'>
            <div className='navbar-brand'>
                <Link className='pt-2' to='/'>
                    <img src="../../../assets/PostZoneIcon.png" alt="" />
                </Link>
            </div>
            <div className='navbar-end'>
                <div className='navbar-item'>
                    <div id='mobileNavItems' className='buttons has-addons'>
                        {Auth.loggedIn() ? 
                            <>
                            <Link className='button is-primary' to={`/user/${Auth.getUser()}`}>
                                Profile
                            </Link>
                            <button className='button is-link' onClick={logout}>
                                Log Out
                            </button>
                            </>
                         : <>
                            {location.pathname == '/feed' ? <div></div> :
                            <>
                            <Link className='button is-primary' to='/signup'>
                                Sign Up!
                            </Link>
                            <Link className='button is-link' to='/login'>
                                Log In!
                            </Link>
                            </>
                        }</>}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;