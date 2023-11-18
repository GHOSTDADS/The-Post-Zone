import  Auth  from '../utils/auth';
import { Navigate } from 'react-router-dom';
import PostList from '../components/PostList';


const Feed = () => {

 return (
    <div>
        <PostList />
    </div>
 )
}

export default Feed;