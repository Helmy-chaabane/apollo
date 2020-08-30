export const generateError = ({ graphQLErrors, networkError }, addError) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => addError({ variables: { message } }));
  }
  if (networkError) addError({ variables: { message: networkError.message } });
};
