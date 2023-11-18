import { useQuery } from "@apollo/client";
import { QUERY_ALL_POSTS } from '../../utils/queries';
import Posts from "../Posts";


const PostList = () => {

    const { loading, data } = useQuery(QUERY_ALL_POSTS);
    const allPosts = data?.posts;
    

    return (

        <>
        <div className="title is-2"> Posts</div>
        {loading ? <div> lording </div> : <Posts posts={allPosts} />}
        </>
    );

};

export default PostList;