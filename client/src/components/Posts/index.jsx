import React from "react"
import { Link } from "react-router-dom";
import ModalTime from "../LogInModal";

const styles = {
    cardStyle: {
        border: '1px solid black',
        padding: '12px',
        borderRadius: '10px',
    }
 };

const Posts = ({posts}) => {

    return (
        <>
        <ModalTime />
        {posts.map((post) => (
            <div key={post._id} className="media" style={styles.cardStyle} >
                <div className="media-content">
                    <div className="content">
                        <p>
                            <Link to={`/user/${post.userId}`}><strong>{post.username}</strong></Link><small>{post.createdAt}</small>
                            <Link to={`/user/${post.userId}`} >{post.userId}</Link>
                            {post.body}
                        </p>
                    </div>
                </div>
            </div>
        ))}
        </>
    )
}

export default Posts