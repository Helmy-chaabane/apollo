import { GET_USER, GET_ERRORS } from "./localStore";

export const resolvers = {
  Mutation: {
    getUser: (_, args, { cache }, __) => {
      cache.writeQuery({
        query: GET_USER,
        data: {
          user: { ...args, __typename: "AUTH" },
          isLoggedIn: true,
        },
      });
    },

    logout: (_, __, { cache }) => {
      cache.writeQuery({
        query: GET_USER,
        data: {
          user: null,
          isLoggedIn: false,
        },
      });
    },

    addError: (_, { message }, { cache }) => {
      const data = cache.readQuery({ query: GET_ERRORS });
      cache.writeQuery({
        query: GET_ERRORS,
        data: {
          errors: [{ message, __typename: "ERROR" }, ...data.errors],
        },
      });
    },
    deleteError: (_, __, { cache }) => {
      const { errors } = cache.readQuery({ query: GET_ERRORS });
      if (errors.length === 0 || !errors) return;
      const fakesErrors = [...errors];
      fakesErrors.pop();
      cache.writeQuery({
        query: GET_ERRORS,
        data: {
          errors: fakesErrors,
        },
      });
    },
  },
};
