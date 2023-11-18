import PostList from '../components/PostList';
import NewPost from '../components/NewPost';
import LogInSignUp from '../components/LoginSignup';
import Auth from '../utils/auth';

const Feed = () => {
    const loggedIn = Auth.loggedIn();

 return (
    <div>
        {loggedIn ? <NewPost /> : <div></div>}
        <PostList />
        {loggedIn ? <div></div> : <LogInSignUp />}
    </div>
 )
}

export default Feed;