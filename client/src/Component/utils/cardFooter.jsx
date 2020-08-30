import React from "react";
import LikeButtom from "./likeButtom";
import { generateError } from "../../apollo-client/generateError";
import { Button } from "semantic-ui-react";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_POST, LIKING_POST, UNLINKNG_POST } from "../../gql/Mutations";
import { GET_USER, MUTATION_ADD_ERRORS } from "../../gql/localStore";
import { GET_POSTS } from "../../gql/Queries";

function CardFooter({ post }) {
  const [addError] = useMutation(MUTATION_ADD_ERRORS);
  const [deletePost, { loading: deleteLoading }] = useMutation(DELETE_POST, {
    onError(errors) {
      generateError(errors, addError);
    },
  });
  const [likingPost, { loading: likeLoading }] = useMutation(LIKING_POST, {
    onError(errors) {
      generateError(errors, addError);
    },
  });
  const [unLikingPost, { loading: unlikedLoading }] = useMutation(
    UNLINKNG_POST,
    {
      onError(errors) {
        generateError(errors, addError);
      },
    }
  );
  const {
    data: { user },
  } = useQuery(GET_USER);

  const removePost = (post) => {
    deletePost({
      variables: { post: post.id },
      update(cache, { data: { removePost } }) {
        const { posts } = cache.readQuery({
          query: GET_POSTS,
        });
        cache.writeQuery({
          query: GET_POSTS,
          data: { posts: posts.filter((post) => post.id !== removePost.id) },
        });
      },
    });
  };

  const liked = post.likes.some((like) => like.id === user.id);
  const commented = post.comments.some(
    (comment) => comment.commentOwner.id === user.id
  );

  return (
    <div>
      <LikeButtom
        liked={liked}
        content={post.likes.length}
        id={post.id}
        userId={user.id}
        query={GET_POSTS}
        collection="posts"
        likedResult={liked ? "unLikingPost" : "likingPost"}
        likeFunction={liked ? unLikingPost : likingPost}
        loading={likeLoading || unlikedLoading}
        variables={{ postId: post.id, user: user.id }}
      />
      <Button
        size="tiny"
        as="h6"
        basic={!commented}
        color="blue"
        content={post.comments.length}
        icon="comments"
        disabled
      />
      {post.postOwner.id === user.id && (
        <Button
          size="medium"
          color="grey"
          icon="trash"
          floated="right"
          onClick={() => removePost(post)}
          loading={deleteLoading}
        />
      )}
    </div>
  );
}

export default CardFooter;
