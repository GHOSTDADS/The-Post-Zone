import PostList from '../components/PostList';
import NewPost from '../components/NewPost';
import Auth from '../utils/auth';
import Footer from '../components/Footer';

const Feed = () => {
    const loggedIn = Auth.loggedIn();

 return (
    <div>
        {loggedIn ? <NewPost /> : <div></div>}
        <div className="title is-2 has-text-centered">All Posts in the Zone</div>
        <PostList />
        {loggedIn ? <div></div> : <Footer />}
    </div>
 )
}

export default Feed;