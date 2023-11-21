import React from 'react';
import Auth from '../../utils/auth';
import { mdiThumbUpOutline, mdiThumbUp } from '@mdi/js';
import Icon from '@mdi/react';
import { LIKE_POST, UNLIKE_POST } from '../../utils/mutations';
import { useMutation } from '@apollo/client';


const LikeButton = (props) => {

    const postId = props.postId;
    const [unLikePost, { error2 }] = useMutation(UNLIKE_POST);
    const [likePost, { error1 }] = useMutation(LIKE_POST);


    const handleLikeClick = async () => {

        try {
        const { data } = await likePost({
            variables: { id: postId },
        })
        } catch (e) {
            console.error(e);
        }
    };

    const handleUnlikeClick = async () => {
        try {
            const mutationResponse = await unLikePost({
                variables: { id: props.postId }
            },
                { returnNewDocument: true });

        } catch (e) {
            console.error(e);
        }
    };


    return (
        <div className='container'>
            {Auth.loggedIn() &&
                props.likeCount.includes(Auth.getUser()) ? <div className='button is-small' onClick={handleUnlikeClick}><span className='icon is-small'><Icon path={mdiThumbUp} size={1} /></span></ div>
                : <button className='button is-small' onClick={handleLikeClick}><span className='icon is-small'><Icon path={mdiThumbUpOutline} size={1} /></span></ button>}
            <div>{props.likeCount.length}</div>
        </div>
    )
}

export default LikeButton