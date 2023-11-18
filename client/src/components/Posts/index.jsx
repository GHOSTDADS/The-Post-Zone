import React from "react"

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
        {posts.map((post) => (
            <div key={post._id} className="media" style={styles.cardStyle} >
                <div className="media-content">
                    <div className="content">
                        <p>
                            <strong>{post.userId}</strong><small>{post.createdAt}</small>
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