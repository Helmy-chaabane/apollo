import React, { useState } from "react";
import { generateError } from "../apollo-client/generateError";
import { Button, Form, Input } from "semantic-ui-react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_POST } from "../gql/Mutations";
import { GET_POSTS } from "../gql/Queries";
import { GET_USER, MUTATION_ADD_ERRORS } from "../gql/localStore";

function NewPost() {
  const [body, setBody] = useState("");
  const {
    data: { user },
  } = useQuery(GET_USER);
  const [addError] = useMutation(MUTATION_ADD_ERRORS);
  const [addPost, { loading, error }] = useMutation(ADD_POST, {
    variables: {
      owner: user.id,
      body,
    },
    update(cache, { data: { addPost } }) {
      const data = cache.readQuery({ query: GET_POSTS });
      cache.writeQuery({
        query: GET_POSTS,
        data: { posts: [addPost, ...data.posts] },
      });
    },
    onError(errors) {
      generateError(errors, addError);
      setBody("");
    },
    onCompleted() {
      setBody("");
    },
  });

  const Submit = (e) => {
    addPost();
  };

  return (
    <React.Fragment>
      <Form onSubmit={(e) => Submit(e)}>
        <Form.Field>
          <label>Add Post</label>
          <Input
            error={body === "" || !!error}
            loading={loading}
            disabled={loading}
            placeholder="How was your day ..."
            value={body}
            onChange={(e) => setBody(e.currentTarget.value)}
          />
        </Form.Field>
        <Button
          type="submit"
          floated="right"
          color="facebook"
          size="small"
          disabled={body === ""}
        >
          Submit
        </Button>
      </Form>
    </React.Fragment>
  );
}

export default NewPost;
