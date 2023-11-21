import React from 'react';
import Auth from '../../utils/auth';
import { mdiThumbUpOutline } from '@mdi/js';
import Icon from '@mdi/react';

const LikeButton = (props) => {


    
    return (
        <div className='container'>
        {Auth.loggedIn() ? <button className='button is-small'><span className='icon is-small'><Icon path={mdiThumbUpOutline} size={1} /></span></ button> : <></> }
        <div>{props.likeCount.length}</div>
        </div>
    )
}

export default LikeButton