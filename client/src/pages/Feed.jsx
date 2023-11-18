import PostList from '../components/PostList';
import NewPost from '../components/NewPost';
import LogInSignUp from '../components/LoginSignup';
import Auth from '../utils/auth';
import ModalTime from '../components/LogInModal';

const Feed = () => {
    const loggedIn = Auth.loggedIn();

 return (
    <div>
        {loggedIn ? <NewPost /> : <div></div>}
        <PostList />
        {loggedIn ? <div></div> : <LogInSignUp />}
        <ModalTime />
    </div>

 )
}

export default Feed;