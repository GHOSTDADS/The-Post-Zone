import React from "react";
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import {CREATE_POST} from '../../utils/mutations';
import { QUERY_ALL_POSTS, QUERY_USER_POSTS } from "../../utils/queries";
import { useLocation } from "react-router-dom";
import Auth from "../../utils/auth";

const NewPost = () => {

    const userId = Auth.getUser();
    const location = useLocation();
    const [formState, setFormState] = useState({ body: '' });
    const [createPost, { error }] = useMutation(CREATE_POST, {
        update(cache, { data: { createPost } }) {
            if(location.pathname == '/feed'){
                try {
                    const { posts } = cache.readQuery({ query: QUERY_ALL_POSTS } );
        
                    cache.writeQuery({
                      query: QUERY_ALL_POSTS,
                      data: { posts: [createPost, ...posts] },
                    });
                  } catch (e) {
                    console.error(e);
                  }
            } else {
                try {
                    const { postsbyUser } = cache.readQuery({ query: QUERY_USER_POSTS,  variables: { userId: userId } });
        
                    cache.writeQuery({
                      query: QUERY_USER_POSTS,
                      variables: { userId: userId },
                      data: { postsbyUser: [createPost, ...postsbyUser] },
                    });
                  } catch (e) {
                    console.error(e);
                  }
            }
          
        },});

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await createPost({
                variables: { body: formState.body },
            });

            setFormState({
                body: '',
            });
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

    return (
        <>
            <form className="box mt-5" onSubmit={handleFormSubmit}>
                <div className="field has-text-centered is-offset-2 column is-8">
                    <label className="label is-medium">Something on your mind?</label>
                    <div className="control">
                        <input className="input is-medium" name='body' type="text" placeholder="Write a new post here" id="username" value={formState.body} onChange={handleChange} />
                    </div>
                </div>
                <div className="field has-text-centered is-offset-2 column is-8">
                    <div className="control">
                        <button className=" submit button is-primary">POST</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default NewPost