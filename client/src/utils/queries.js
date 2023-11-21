import { gql } from '@apollo/client';

export const QUERY_ALL_POSTS = gql`
query Posts {
  posts {
    _id
    body
    createdAt
    userId
    username
    likes
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
      likes
    }
  }
  `;

  export const QUERY_LIKE_POST = gql`
  query Post($id: ID) {
    post(_id: $id) {
      _id
      likes
    }
  }
`;