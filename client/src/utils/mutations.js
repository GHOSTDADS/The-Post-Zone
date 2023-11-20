import { gql } from '@apollo/client';

export const LOGIN = gql`
mutation Mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
  
`;

export const ADD_USER = gql`
    mutation CreateUser($username: String!, $password: String!, $email: String!) {
        createUser(username: $username, password: $password, email: $email) {
        user {
            username
            email
            _id
        }
        token
        }
    }
`;

export const FOLLOW_USER = gql`
    mutation AddFollowing($id: ID) {
        addFollowing(_id: $id) {
            following
        }
    }
`;

export const UNFOLLOW_USER = gql`
    mutation RemoveFollowing($id: ID) {
        removeFollowing(_id: $id) {
            following
        }
    }
`;

export const CREATE_POST = gql`
    mutation CreatePost($body: String!) {
        createPost(body: $body) {
            _id
            body
            createdAt
            userId
            username
        }
    }
`;

export const EDIT_POST = gql`
mutation UpdatePost($id: ID!, $body: String!) {
    updatePost(_id: $id, body: $body) {
      userId
      body
      _id
    }
  }
`;
