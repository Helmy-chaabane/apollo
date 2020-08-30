const { model, Schema } = require("mongoose");

const commentSchema = new Schema(
  {
    body: String,
    likes: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Comment", commentSchema);
