import React from "react";
import Moment from "react-moment";
import LikeButtom from "./utils/likeButtom";
import { generateError } from "../apollo-client/generateError";
import Head from "./utils/Head";
import { Comment, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import {
  DELETE_COMMENT,
  LIKING_COMMENT,
  UNLIKING_COMMENT,
} from "../gql/Mutations";
import { GET_POST } from "../gql/Queries";
import { MUTATION_ADD_ERRORS } from "../gql/localStore";

function Comments({ comment, userId, liked }) {
  const [addError] = useMutation(MUTATION_ADD_ERRORS);
  const [deleteComment, { loading: deleteLoading }] = useMutation(
    DELETE_COMMENT,
    {
      onError(errors) {
        generateError(errors, addError);
      },
    }
  );

  const [likeComment, { loading: likeLoading }] = useMutation(LIKING_COMMENT, {
    onError(errors) {
      generateError(errors, addError);
    },
  }); //Add error catch
  const [unlikeComment, { loading: unlikeLoading }] = useMutation(
    UNLIKING_COMMENT,
    {
      onError(errors) {
        generateError(errors, addError);
      },
    }
  );

  const removeComment = (comment) => {
    deleteComment({
      variables: { comment: comment.id },
      update(cache, { data: { removeComment } }) {
        const { getPost } = cache.readQuery({
          query: GET_POST,
        });

        const newPost = {
          ...getPost,
          comments: getPost.comments.filter(
            (comment) => comment.id !== removeComment.id
          ),
        };
        cache.writeQuery({
          query: GET_POST,
          data: { getPost: newPost },
        });
      },
    });
  };

  return (
    <Comment>
      <Comment.Avatar
        as="a"
        src="https://react.semantic-ui.com/images/avatar/small/joe.jpg"
      />
      <Comment.Content>
        <Comment.Author>
          <Head as="h5" color="teal" content={comment.commentOwner.username} />
        </Comment.Author>
        <Comment.Metadata>
          <Moment fromNow>{comment.createdAt}</Moment>
        </Comment.Metadata>
        <Comment.Text>{comment.body}</Comment.Text>
        {userId && (
          <Comment.Actions>
            <Comment.Action>
              <LikeButtom
                liked={liked}
                content={comment.likes.length}
                query={GET_POST}
                collection="getPost"
                likedResult={liked ? "unLikingComment" : "likingComment"}
                likeFunction={liked ? unlikeComment : likeComment}
                loading={likeLoading || unlikeLoading}
                variables={{ commentId: comment.id, user: userId }}
                comments
              />
            </Comment.Action>
            {comment.commentOwner.id === userId && (
              <Comment.Action>
                <Button
                  size="tiny"
                  color="grey"
                  icon="trash"
                  onClick={() => removeComment(comment)}
                  loading={deleteLoading}
                />
              </Comment.Action>
            )}
          </Comment.Actions>
        )}
      </Comment.Content>
    </Comment>
  );
}

export default Comments;
