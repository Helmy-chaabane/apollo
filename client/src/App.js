import React, { useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import {client,setupPersistence}from"./apollo-client/apollo"
import NavMenu from "./Component/Menu";
import { Route } from "react-router-dom";
import { Container, Segment } from "semantic-ui-react";
import Post from "./Component/Post";
import Home from "./Component/Home";
import Login from "./Component/Login";
import Register from "./Component/Register";
import "./App.css";
import Notify from "./Component/Notify";


function App() {
  useEffect(() => {
    setupPersistence();
  }, []);

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Container>
          <NavMenu />
          <Notify />
          <Segment raised padded="very">
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/post/:id" component={Post} />
          </Segment>
        </Container>
      </div>
    </ApolloProvider>
  );
}

export default App;
