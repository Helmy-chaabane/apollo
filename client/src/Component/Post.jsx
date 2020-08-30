import React, { useState } from "react";
import { Container, Button, Form, Input, Comment } from "semantic-ui-react";
import Containers from "./utils/Containers";
import Loading from "./utils/Loading";
import Cards from "./Cards";
import Head from "./utils/Head";
import Comments from "./Comments";
import { useQuery, useMutation } from "@apollo/client";
import { GET_POST } from "../gql/Queries";
import { ADD_COMMENT } from "../gql/Mutations";
import { GET_USER, MUTATION_ADD_ERRORS } from "../gql/localStore";

function Post({ match }) {
  const [body, setBody] = useState("");
  const [addError] = useMutation(MUTATION_ADD_ERRORS);
  const { data, loading: postLoading, error: postError } = useQuery(GET_POST, {
    variables: { post: match.params.id },
    onError({ graphQLErrors, networkError }) {
      //console.log(graphQLErrors);
      if (graphQLErrors) {
        graphQLErrors.map(({ message }) =>
          addError({ variables: { message } })
        );
      }
      if (networkError)
        addError({ variables: { message: networkError.message } });
    },
  });

  const {
    data: { user },
  } = useQuery(GET_USER);

  const [
    addComment,
    { loading: commentLoading, error: commentError },
  ] = useMutation(ADD_COMMENT, {
    onError({ graphQLErrors, networkError }) {
      //console.log(graphQLErrors);
      if (graphQLErrors) {
        graphQLErrors.map(({ message }) =>
          addError({ variables: { message } })
        );
      }
      if (networkError)
        addError({ variables: { message: networkError.message } });
    },
  });

  const newComment = (e) => {
    e.preventDefault();
    addComment({
      variables: {
        body,
        post: match.params.id,
        owner: user.id,
      },
      update(cache, { data: { addComment } }) {
        const { getPost } = data;
        getPost.comments.push(addComment);

        cache.writeQuery({
          query: GET_POST,
          data: { getPost },
        });
      },
    });
    setBody("");
  };

  if (postLoading) return <Loading />;
  if (postError) return <h6>An error just acquired ...</h6>;

  if (data)
    return (
      <Containers as="h3" icon="comment" content="Post" color="red" dividing>
        <Cards post={data.getPost} />
        <Container text>
          {user && (
            <Form onSubmit={(e) => newComment(e)}>
              <Input
                autoFocus
                style={{ minHeight: 100 }}
                fluid
                placeholder="What do you think ..."
                onChange={(e) => setBody(e.currentTarget.value)}
                value={body}
                loading={commentLoading}
                error={!!commentError}
              />
              <Button
                color="twitter"
                icon="send"
                size="medium"
                toggle
                style={{ width: 70, margin: 10 }}
              />
            </Form>
          )}

          <Head dividing content="Comments" icon="comments" color="red" />
          <Comment.Group>
            {data.getPost.comments &&
              data.getPost.comments.map((comment) => (
                <Comments
                  key={comment.id}
                  comment={comment}
                  liked={
                    user && comment.likes.some((like) => like.id === user.id)
                  }
                  userId={user?.id}
                />
              ))}
          </Comment.Group>
        </Container>
      </Containers>
    );
}

export default Post;
