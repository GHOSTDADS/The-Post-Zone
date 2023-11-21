import React from 'react';
import LogInModal from '../LogInModal';
import SignUpModal from '../SignUpModal';

const Footer = () => {

    return (
            <footer className='footer'>
                <div className='content has-text-centered'>
                    <div id='mobileView' className='title is-2'>Welcome to the POST ZONE</div>
                    <p>Feel free to browse but why not sign up or log in to contribute! </p>
                    <div className='buttons is-centered'>
                        <SignUpModal />
                        <LogInModal />
                    </div>
                </div>
            </footer>
    )
}

export default Footer;   