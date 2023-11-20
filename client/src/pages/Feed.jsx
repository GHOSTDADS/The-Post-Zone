import PostList from '../components/PostList';
import NewPost from '../components/NewPost';
import Auth from '../utils/auth';
import LogInModal from '../components/LogInModal';

const Feed = () => {
    const loggedIn = Auth.loggedIn();

 return (
    <div>
        {loggedIn ? <NewPost /> : <div></div>}
        <div className="title is-2 has-text-centered">All Posts in the Zone</div>
        <PostList />
        {loggedIn ? <div></div> : <LogInModal />}
    </div>
 )
}

export default Feed;