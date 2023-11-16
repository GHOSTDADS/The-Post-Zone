const typeDefs = `
    type User {
        _id: ID
        username: String
        email: String
        password: String
        description: String
        postCount: Int
        following: [ID]
        followers: [ID]
        activated: Boolean
        createdAt: String
        updatedAt: String
    }

    type Post {
        _id: ID
        userId: String
        body: String
        likes: [ID]
        createdAt: String
        updatedAt: String
    }

    type MediaLibrary {
        _id: ID
        title: String
        url: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query { 
        users: [User]
        user(_id: ID): User
        userbyUsername(username: String): User

        posts: [Post]
        post(_id: ID): Post
        postsbyUser(userId: ID): [Post]

        mediaLibrarys: [MediaLibrary]
        mediaLibrary(_id: ID): MediaLibrary
    }

    type Mutation {
        createUser(username: String!, password: String!, email: String!): Auth
        login(username: String!, password: String!): Auth
        addFollowing(_id: ID): User
        removeFollowing(_id: ID): User
        createPost(body: String!): Post
        createML(title: String!, url: String!): MediaLibrary
        updateUser(username: String, email: String, password: String, description: String): User
        updatePost(_id: ID!, body: String!): Post
        removePost(_id: ID!): Post
        
    }
`;

module.exports = typeDefs;