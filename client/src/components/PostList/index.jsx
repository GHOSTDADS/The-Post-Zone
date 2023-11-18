import { useQuery } from "@apollo/client";
import { QUERY_USER_POSTS } from '../../utils/queries';
import Auth from '../../utils/auth';
import { Navigate } from 'react-router-dom';
import Posts from "../Posts";


const PostList = () => {

    const userId = Auth.getUser();
    const { loading, data } = useQuery(QUERY_USER_POSTS, {variables: { userId: userId }});
    const userPosts = data?.postsbyUser;

    console.log("userPosts", userPosts);
    const isLoggedIn = Auth.loggedIn();
    if(!isLoggedIn){
        return (
            <Navigate to="/" replace={true} />
        )
    }



    return (

        <>
        <div className="title is-2">{userId} Post</div>
        {loading ? <div> lording </div> : <Posts userPosts={userPosts} />}

        </>

    );

};

export default PostList;