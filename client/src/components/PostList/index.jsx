import { useQuery } from "@apollo/client";
import { QUERY_ALL_POSTS } from '../../utils/queries';
import Auth from '../../utils/auth';
import { Navigate } from 'react-router-dom';
import Posts from "../Posts";


const PostList = () => {

    const { loading, data } = useQuery(QUERY_ALL_POSTS);
    const allPosts = data?.posts;
    
    const isLoggedIn = Auth.loggedIn();
    if(!isLoggedIn){
        return (
            <Navigate to="/" replace={true} />
        )
    }



    return (

        <>
        <div className="title is-2"> Posts</div>
        {loading ? <div> lording </div> : <Posts posts={allPosts} />}

        </>

    );

};

export default PostList;