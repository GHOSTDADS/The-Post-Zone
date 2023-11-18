import React from "react"

const Posts = ({userPosts}) => {

    return (
        <>
        {userPosts.map((userPost) => (
            <div>
                {userPost.body}
            </div>
        ))}
        </>
    )
}

export default Posts