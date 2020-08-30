import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Containers from "./utils/Containers";
import { generateError } from "../apollo-client/generateError";
import { Button, Form, Input, Container, Icon } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../gql/Mutations";
import { MUTATION_GET_USER, MUTATION_ADD_ERRORS } from "../gql/localStore";

function Login() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [addError] = useMutation(MUTATION_ADD_ERRORS);
  const history = useHistory();
  const [getUser] = useMutation(MUTATION_GET_USER);
  const [login, { loading, error, data }] = useMutation(LOGIN, {
    update(
      _,
      {
        data: {
          login: { user },
        },
      }
    ) {
      getUser({
        variables: user,
      });
    },
    onCompleted({ login }) {
      localStorage.setItem("token", login.token);
      history.replace("/");
    },
    onError(errors) {
      generateError(errors, addError);
    },
  });

  const inputChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const Sumbit = (e) => {
    e.preventDefault();
    login({
      variables: user,
    });
  };

  return (
    <Containers as="h3" color="red" dividing content="Login" icon="user">
      <Container text>
        <Form onSubmit={Sumbit}>
          <Form.Field>
            <label>Username</label>
            <Input
              error={!!error}
              name="username"
              placeholder="Enter your username ..."
              icon="user"
              iconPosition="left"
              onChange={(e) => inputChange(e)}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <Input
              error={!!error}
              onChange={(e) => inputChange(e)}
              icon="key"
              name="password"
              iconPosition="left"
              placeholder="Enter your password ..."
              type="password"
            />
          </Form.Field>

          <Button
            color={(data && "green") || (error && "red") || "facebook"}
            type="submit"
            loading={loading}
            icon
            labelPosition="right"
          >
            Submit
            {data && <Icon name="check" />}
            {error && <Icon name="close" />}
          </Button>
        </Form>
      </Container>
    </Containers>
  );
}

export default Login;
