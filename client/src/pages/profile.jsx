import Posts from "../components/Posts";
import { QUERY_USER_POSTS } from "../utils/queries";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import { useEffect, useState } from "react";
import NewPost from "../components/NewPost";

const Profile = () => {
    const { userId } = useParams();
    const [loggedUserId, setLoggedIn] = useState('');

    const { loading, data } = useQuery(QUERY_USER_POSTS, {
        variables: { userId: userId }
    });

    const userPosts = data?.postsbyUser;

    useEffect(() => {
        console.log('im triggered');
        if (Auth.loggedIn()) {
            setLoggedIn(Auth.getUser());
        }
    }, [])

    return (
        <div>
            {loading ? <div className="has-text-centered"> loading </div> :
                <>
                    <section className="hero is-info mb-3">
                        <div className="hero-body">
                            <p className="title">
                                {userPosts[0].username}'s Profile page
                            </p>
                            <p className="subtitle">
                                Can you believe they've made {!userPosts.length ? <span>0 posts???</span> : <span>{userPosts.length} posts!</span>}
                            </p>
                        </div>
                    </section>
                    {userId == loggedUserId ? <NewPost /> : <div></div>}
                    {loading ? <div></div> : <div className="container is-fluid pb-7"><Posts posts={userPosts} /></div> } 
                </>}
        </div>
    )
}

export default Profile;