import React, { useEffect } from "react"
import { Link, useLocation } from "react-router-dom";
import { formatDistanceToNow } from 'date-fns';
import { fromUnixTime } from 'date-fns'
import { useState } from 'react';
import EditModal from "../editPostModal";
import Auth from "../../utils/auth";
import LikeButton from "../LikeButton";
import './Posts.css'

const Posts = ({ posts }) => {

    const [open, setOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [body, setBody] = useState('');
    const [loggedUserId, setLoggedIn] = useState('');
    const location = useLocation();

   useEffect(() => {
    if (Auth.loggedIn()) {
        setLoggedIn(Auth.getUser());
    }
   }, [])



    return (
        <>
            {posts.map((post) => (
                <div key={post._id} className="media" >
                    <figure className="media-left">
                        <p className="image is-64x64">
                            <Link to={`/user/${post.userId}`}>
                            <img src="https://bulma.io/images/placeholders/128x128.png" />
                            </Link>
                        </p>
                    </figure>
                    <div className="media-content">
                        <div className="content">
                            <Link className="has-text-dark" to={`/user/${post.userId}`}><strong>{post.username}</strong></Link>
                            <small>{` posted ${formatDistanceToNow(new Date(fromUnixTime((post.createdAt) / 1000)), new Date())} ago`}</small>
                            <p className="mt-2">
                                {post.body}
                            </p>
                            <small><LikeButton /></small>
                        </div>
                    </div>
                    {location.pathname == '/feed' ? <div></div> : <div> {loggedUserId == post.userId ? <div className="media-right">
                        <div>
                            <button type="button" data-id={post._id} className="button is-warning mt-4" onClick={() => {
                                setOpen(true) 
                                setModalData(post._id)
                                setBody(post.body)
                            }}>Edit Post</button>
                        </div>
                    </div> : <></> }
                    </div>
                    }
                    
                </div>
            ))}
            <EditModal open={open} modalData={modalData} body={body}/>
        </>
    )
}

export default Posts