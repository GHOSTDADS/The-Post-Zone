import React from "react"

const styles = {
    cardStyle: {
        border: '1px solid black',
        padding: '12px',
        borderRadius: '10px',
    }
 };

const Posts = ({userPosts}) => {

    return (
        <>
        {userPosts.map((userPost) => (
            <div key={userPost._id} className="media" style={styles.cardStyle} >
                <div className="media-content">
                    <div className="content">
                        <p>
                            <strong>{userPost.userId}</strong><small>{userPost.createdAt}</small>
                            {userPost.body}
                        </p>
                    </div>
                </div>
            </div>
        ))}
        </>
    )
}

export default Posts