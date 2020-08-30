const postResolver = {
  async comments(parent, _, { Comment }, __) {
    const comments = await Comment.find({ post: parent.id });
    return comments;
  },
  async postOwner(parent, _, { User }, __) {
    return await User.findById(parent.owner);
  },
  async likes(parent, _, { User }, __) {
    const records = await User.find().where("_id").in(parent.likes).exec();
    return records;
  },
};

module.exports = postResolver;
