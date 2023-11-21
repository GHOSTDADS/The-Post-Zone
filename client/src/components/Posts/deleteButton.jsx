import { useMutation } from "@apollo/client";
import { DELETE_POST } from '../../utils/mutations';
import React from 'react';
import Auth from "../../utils/auth";


const DeleteButton = (props) => {

    const userId = Auth.getUser();
    const [deletePost, { error }] = useMutation(DELETE_POST)

    const handleDeletePostClick = async (event) => {
        const { id } = event.target;
        try {
            const { data } = await deletePost({
                variables: { id: id },
                update(cache) {
                    const normalisedId = cache.identify({ id, __typename: 'Post' });
                    cache.evict({ id: normalisedId });
                    cache.gc();
                }
            });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <button id={props.postId} type="button" className="button is-danger mt-4" onClick={handleDeletePostClick}>Delete Post</button>
    )
}

export default DeleteButton;