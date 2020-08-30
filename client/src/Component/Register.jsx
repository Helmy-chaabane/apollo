import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Containers from "./utils/Containers";
import { generateError } from "../apollo-client/generateError";
import { Button, Form, Input, Container, Icon } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../gql/Mutations";
import { MUTATION_GET_USER, MUTATION_ADD_ERRORS } from "../gql/localStore";

function Register() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const history = useHistory();
  const [getUser] = useMutation(MUTATION_GET_USER);
  const [addError] = useMutation(MUTATION_ADD_ERRORS);
  const [register, { loading, error }] = useMutation(REGISTER, {
    variables: user,
    onCompleted({ addUser: { token, user } }) {
      localStorage.setItem("token", token);
      getUser({ variables: user });
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
    register();
  };

  return (
    <Containers as="h3" icon="user" content="Register" color="red" dividing>
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
            <label>Email</label>
            <Input
              error={!!error}
              onChange={(e) => inputChange(e)}
              icon="mail"
              name="email"
              iconPosition="left"
              placeholder="Enter your email ..."
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
          <Form.Field>
            <label>confirm Password</label>
            <Input
              error={!!error}
              onChange={(e) => inputChange(e)}
              icon="key"
              name="confirmPassword"
              iconPosition="left"
              placeholder="Enter your password again..."
              type="password"
            />
          </Form.Field>

          <Button
            type="submit"
            icon
            labelPosition="right"
            color={!!error ? "red" : "facebook"}
            loading={loading}
          >
            Submit
            {error && <Icon name="close" />}
          </Button>
        </Form>
      </Container>
    </Containers>
  );
}

export default Register;
