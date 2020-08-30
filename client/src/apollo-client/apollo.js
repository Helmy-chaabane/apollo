import ApolloClient, { InMemoryCache } from "apollo-boost";
import { resolvers } from "../gql/resolvers";
import { persistCache } from "apollo-cache-persist";

const cache = new InMemoryCache({});

export const client = new ApolloClient({
  connectToDevTools: true,
  cache,
  request: (operation) => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "http://localhost:5000/",
  clientState: {
    defaults: {
      user: null,
      isLoggedIn: false,
      errors: [],
    },
    resolvers: resolvers,
  },
});

export const setupPersistence = async () => {
  try {
    await persistCache({
      cache,
      storage: window.localStorage,
    });
  } catch (err) {
    console.log(err);
  }
};
