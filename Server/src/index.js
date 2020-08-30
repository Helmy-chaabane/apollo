const { ApolloServer } = require("apollo-server");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const userResolver = require("./resolvers/user");
const postResolver = require("./resolvers/post");
const commentResolver = require("./resolvers/comment");
const schema = require("./shcema/schema");
const getUserId = require("./auth/auth");
require("./db/mongoose");

const User = require("./models/User");
const Post = require("./models/Post");
const Comment = require("./models/Comment");

const resolvers = {
  Query,
  Mutation,
  User: userResolver,
  Post: postResolver,
  Comment: commentResolver,
};
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context(req) {
    return { req, User, Post, Comment, getUserId };
  },

  cors: true,
  playground: true,
  introspection: true,
  tracing: true,
});
const port = 5000;
server.listen(port).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
