import { gql } from "@apollo/client";
import { Postfragments } from "./Fragments";
export const GET_POSTS = gql`
  query getPosts {
    posts {
      ...Postfrag
    }
  }
  ${Postfragments.post}
`;

export const GET_POST = gql`
  query getPost($post: ID!) {
    getPost(post: $post) {
      ...Postfrag
    }
  }
  ${Postfragments.post}
`;
