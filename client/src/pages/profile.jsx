import Posts from "../components/Posts";
import { QUERY_USER_POSTS } from "../utils/queries";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

const Profile = () => {
    const { userId } = useParams(); 

    const { loading, data } = useQuery(QUERY_USER_POSTS, {
        variables: { userId: userId }
    });
    const userPosts = data?.postsbyUser;
    

    return (
        <div>
            hello im a profile
            {loading ? <div> lording </div> : <Posts posts={userPosts} />}
        </div>
    )
}

export default Profile;