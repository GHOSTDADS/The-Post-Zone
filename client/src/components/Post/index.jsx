import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { QUERY_USER_POSTS } from '../../utils/queries';
import Auth from '../../utils/auth';
import { Navigate } from 'react-router-dom';


const SinglePost = () => {

    const [getPosts, { error }] = useQuery(QUERY_USER_POSTS);


    const isLoggedIn = Auth.loggedIn();
    if(!isLoggedIn){
        return (
            <Navigate to="/" replace={true} />
        )
    }

    const userId = Auth.getUser();

    const fetchPosts = async () => {
        try {
            const userPosts = await getPosts({
                variables: { _id: userId },
            });
            console.log(userPosts.data);
        } catch (e) {
            console.log(e);
        }
    }

    // useEffect(() => {
    //     const fetchPosts = async () => {
    //         try {
    //             const userPosts = await getPosts({
    //                 variables: { _id: userId },
    //             });
    //             console.log(userPosts.data);
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     };
    //     fetchPosts();
    // }, [])

    return (
        <div>Timeline Post</div>
    );

};

export default SinglePost;