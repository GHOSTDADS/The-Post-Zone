import { gql } from '@apollo/client';

export const QUERY_ALL_POSTS = gql`
query Posts {
  posts {
    _id
    body
    createdAt
    userId
    username
  }
} 
`;

export const QUERY_USER_POSTS = gql`
query PostsbyUser($userId: ID) {
    postsbyUser(userId: $userId) {
      userId
      username
      body
      _id
      createdAt
    }
  }
  `;

// export const QUERY_USER = gql`
//     query Query($id: ID) {
//         user(_id: $id) {
//             username
//             postCount
//             email
//             description
//             following
//             followers
//             _id
//         }
//     }
  
// `