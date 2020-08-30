import React from "react";
import Loading from "./utils/Loading";
import Cards from "./Cards";
import NewPost from "./newPost";
import Containers from "./utils/Containers";
import { generateError } from "../apollo-client/generateError";
import { Grid, Card } from "semantic-ui-react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_POSTS } from "../gql/Queries";
import { GET_USER, MUTATION_ADD_ERRORS } from "../gql/localStore";

function Home() {
  const [addError] = useMutation(MUTATION_ADD_ERRORS);
  const { data, loading } = useQuery(GET_POSTS, {
    onError(errors) {
      generateError(errors, addError);
    },
  });
  const {
    data: { isLoggedIn },
  } = useQuery(GET_USER);

  if (loading) return <Loading />;
  if (!isLoggedIn && data?.posts.length === 0)
    return <h1>No posts exists, Log in and share your day with others </h1>;

  return (
    <React.Fragment>
      <Containers as="h3" icon="paste" content="Posts" color="red" dividing>
        <Grid columns={3}>
          <Grid.Row>
            {isLoggedIn && (
              <Grid.Column>
                <Card className="card" fluid>
                  <Card.Content>
                    <Card.Description>
                      <NewPost />
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
            )}
            {data?.posts.length === 0 && (
              <Grid.Column>
                <Card className="card" fluid>
                  <Card.Content>
                    <Card.Description>
                      <h1>No Posts exists</h1>
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
            )}
            {data?.posts.length !== 0 &&
              data.posts.map((post) => (
                <Grid.Column key={post.id}>
                  <Cards post={post} />
                </Grid.Column>
              ))}
          </Grid.Row>
        </Grid>
      </Containers>
    </React.Fragment>
  );
}

export default Home;
