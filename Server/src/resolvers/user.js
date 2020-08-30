const userResolver = {
  async posts(parent, _, { Post }, __) {
    const posts = Post.find({ owner: parent.id });
    return posts;
  },
};

module.exports = userResolver;
