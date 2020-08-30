import { gql } from "@apollo/client";

export const GET_USER = gql`
  query User {
    user @client {
      id
      username
    }
    isLoggedIn @client
  }
`;

export const MUTATION_GET_USER = gql`
  mutation userLoggedIn($id: ID!, $username: String!) {
    getUser(id: $id, username: $username) @client
  }
`;

export const MUTATION_LOGOUT = gql`
  mutation Logout {
    logout @client
  }
`;

export const GET_ERRORS = gql`
  query getErrors {
    errors @client {
      message
      __typename
    }
  }
`;

export const MUTATION_ADD_ERRORS = gql`
  mutation addError($message: String!) {
    addError(message: $message) @client {
      message
      __typename
    }
  }
`;

export const MUTATION_DELETE_ERRORS = gql`
  mutation deleteError {
    deleteError @client {
      message
      __typename
    }
  }
`;
