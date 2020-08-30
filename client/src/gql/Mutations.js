import { gql } from "@apollo/client";
import { Postfragments, Commentfragments } from "./Fragments";

export const ADD_POST = gql`
  mutation addPost($body: String!, $owner: ID!) {
    addPost(body: $body, owner: $owner) {
      ...Postfrag
    }
  }
  ${Postfragments.post}
`;

export const DELETE_POST = gql`
  mutation removePost($post: ID!) {
    removePost(post: $post) {
      ...Postfrag
    }
  }
  ${Postfragments.post}
`;

export const LIKING_POST = gql`
  mutation likingPost($postId: ID!, $user: ID!) {
    likingPost(postId: $postId, user: $user) {
      ...Postfrag
    }
  }
  ${Postfragments.post}
`;

export const UNLINKNG_POST = gql`
  mutation unLikingPost($postId: ID!, $user: ID!) {
    unLikingPost(postId: $postId, user: $user) {
      ...Postfrag
    }
  }
  ${Postfragments.post}
`;

export const ADD_COMMENT = gql`
  mutation addComment($body: String!, $post: ID!, $owner: ID!) {
    addComment(body: $body, post: $post, owner: $owner) {
      ...Commentfrag
    }
  }
  ${Commentfragments.comment}
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($comment: ID!) {
    removeComment(comment: $comment) {
      ...Commentfrag
    }
  }
  ${Commentfragments.comment}
`;

export const LIKING_COMMENT = gql`
  mutation likeComment($commentId: ID!, $user: ID!) {
    likingComment(commentId: $commentId, user: $user) {
      ...Commentfrag
    }
  }
  ${Commentfragments.comment}
`;

export const UNLIKING_COMMENT = gql`
  mutation unlikeComment($commentId: ID!, $user: ID!) {
    unLikingComment(commentId: $commentId, user: $user) {
      ...Commentfrag
    }
  }
  ${Commentfragments.comment}
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user {
        id
        username
      }
      token
    }
  }
`;

export const REGISTER = gql`
  mutation register(
    $username: String!
    $password: String!
    $email: String!
    $confirmPassword: String!
  ) {
    addUser(
      username: $username
      password: $password
      email: $email
      confirmPassword: $confirmPassword
    ) {
      user {
        id
        username
      }
      token
    }
  }
`;
