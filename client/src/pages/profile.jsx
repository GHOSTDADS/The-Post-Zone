import Posts from "../components/Posts";
import { QUERY_USER_POSTS } from "../utils/queries";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import { useEffect, useState } from "react";
import NewPost from "../components/NewPost";
import Footer from '../components/Footer';

const Profile = () => {
    const { userId } = useParams();
    const [loggedUserId, setLoggedIn] = useState('');

    const { loading, data } = useQuery(QUERY_USER_POSTS, {
        variables: { userId: userId }
    });

    const userPosts = data?.postsbyUser;

    useEffect(() => {
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
                            {!userPosts.length ? <><p className="title"> Your Profile page</p></> : <p className="title"> {userPosts[0].username}'s Profile page</p>}
                            <p className="subtitle">
                                Can you believe {!userPosts.length ? <span>you've made no posts yet!</span> : <span>they've made {userPosts.length} posts!</span>}
                            </p>
                        </div>
                    </section>
                    {userId == loggedUserId ? <NewPost /> : <div></div>}
                    {loading ? <div></div> : <>{!userPosts ? <></> : <div className="container is-fluid pb-7"><Posts posts={userPosts} /></div> }</> } 
                    {Auth.loggedIn() ? <div></div> : <Footer />}
                </>}
        </div>
    )
}

export default Profile;