const commentResolver = {
  async post(parent, _, { Post }, __) {
    return await Post.findById(parent.post);
  },
  async commentOwner(parent, _, { User }, __) {
    return await User.findById(parent.owner);
  },
  async hates(parent, _, { User }, __) {
    const records = await User.find().where("_id").in(parent.hates).exec();
    return records;
  },
  async likes(parent, _, { User }, __) {
    const records = await User.find().where("_id").in(parent.likes).exec();
    return records;
  },
};

module.exports = commentResolver;
