const { gql } = require("apollo-server");

const schema = gql`
  scalar Date
  type Query {
    users: [User!]!
    me: User!
    getUser(user: ID!): User!
    posts: [Post]!
    getPost(post: ID!): Post!
  }
  type Mutation {
    login(username: String!, password: String!): loginResponse
    addUser(
      username: String!
      email: String!
      password: String!
      confirmPassword: String!
    ): loginResponse!
    addPost(body: String!, owner: ID!): Post!
    addComment(body: String!, owner: ID!, post: ID!): Comment!
    likingPost(postId: ID!, user: ID!): Post!
    unLikingPost(postId: ID!, user: ID!): Post!
    likingComment(commentId: ID!, user: ID!): Comment!
    unLikingComment(commentId: ID!, user: ID!): Comment!
    removeUser(user: ID!): User
    removePost(post: ID!): Post
    removeComment(comment: ID!): Comment
    updateComment(comment: ID!, body: String!): Comment
  }
  type User {
    id: ID!
    username: String!
    posts: [Post!]!
    createdAt: Date!
  }
  type Post {
    id: ID!
    body: String!
    likes: [User!]!
    comments: [Comment!]!
    postOwner: User!
    createdAt: Date!
  }

  type loginResponse {
    user: User!
    token: String!
  }

  type Comment {
    id: ID!
    body: String!
    likes: [User!]!
    hates: [User!]!
    post: Post!
    commentOwner: User!
    createdAt: Date!
  }
`;

module.exports = schema;
