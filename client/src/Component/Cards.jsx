import React from "react";
import { useHistory } from "react-router-dom";
import Head from "./utils/Head";
import Moment from "react-moment";
import CardFooter from "./utils/cardFooter";
import { Card } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../gql/localStore";

function Cards({ post }) {
  const {
    data: { isLoggedIn },
  } = useQuery(GET_USER);

  const history = useHistory();

  const displayPost = () => {
    history.push(`/post/${post.id}`);
  };
  return (
    <Card className="card" fluid color="blue">
      <Card.Content className="clickableCard" onClick={() => displayPost(post)}>
        <Card.Header>
          <Head as="h3" content={post.postOwner.username} color="teal" />
        </Card.Header>
        <Card.Meta>
          <Moment fromNow>{post.createdAt}</Moment>
        </Card.Meta>
        <Card.Description>{post.body}</Card.Description>
      </Card.Content>
      {isLoggedIn && (
        <Card.Content>
          <CardFooter post={post} />
        </Card.Content>
      )}
    </Card>
  );
}

export default Cards;
