import React from "react";
import { Button } from "semantic-ui-react";

function LikeButtom({
  liked,
  content,
  likedResult,
  query,
  collection,
  likeFunction,
  loading,
  variables,
  comments,
}) {
  const like = () => {
    likeFunction({
      variables,

      update(cache, { data }) {
        const result = data[likedResult];
        const { [collection]: results } = cache.readQuery({
          query,
        });
        if (comments) {
          const oldObject = results.comments.find(
            (object) => object.id === result.id
          );
          const index = results.comments.indexOf(oldObject);
          results.comments[index] = result;
          return cache.writeQuery({
            query,
            data: { [collection]: { ...results } },
          });
        }

        const oldObject = results.find((object) => object.id === result.id);
        const index = results.indexOf(oldObject);
        results[index] = result;
        cache.writeQuery({
          query,
          data: { [collection]: [...results] },
        });
      },
    });
  };
  return (
    <Button
      icon="heart"
      color="red"
      content={content}
      size="tiny"
      basic={!liked}
      onClick={() => like()}
      loading={loading}
    />
  );
}

export default LikeButtom;
