import { gql } from "@apollo/client";

export const Postfragments = {
  post: gql`
    fragment Postfrag on Post {
      id
      body
      postOwner {
        username
        id
      }
      likes {
        id
        username
      }
      comments {
        id
        body
        likes {
          id
        }
        commentOwner {
          username
          id
          createdAt
        }
        post {
          id
        }
        createdAt
      }
      createdAt
    }
  `,
};

export const Commentfragments = {
  comment: gql`
    fragment Commentfrag on Comment {
      id
      body
      likes {
        id
      }
      createdAt
      commentOwner {
        id
        username
        createdAt
      }
      post {
        id
      }
    }
  `,
};
