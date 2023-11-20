import { useQuery } from "@apollo/client";
import { QUERY_ALL_POSTS } from '../../utils/queries';
import Posts from "../Posts";

const PostList = () => {

    const { loading, data } = useQuery(QUERY_ALL_POSTS);
    const allPosts = data?.posts;
    
    return (
        <>
        {loading ? <div className="button is-primary is-loading"></div> : <div className="container is-fluid pb-7"><Posts posts={allPosts} /></div>}
        </>
    );
};

export default PostList;