const { model, Schema } = require("mongoose");
const Comment = require("./Comment");

const postSchema = new Schema(
  {
    body: String,

    likes: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

postSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "post",
});

postSchema.pre("remove", async function (next) {
  const post = this;
  await Comment.deleteMany({ post: post._id });

  next();
});

module.exports = model("Post", postSchema);
