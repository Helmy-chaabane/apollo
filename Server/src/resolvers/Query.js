const Query = {
  async users(_, args, { User, getUserId, req }, __) {
    getUserId(req);
    return await User.find();
  },
  async getUser(_, args, { User }, __) {
    getUserId(req);
    return await User.findById(args.user);
  },
  async posts(_, ___, { Post }, __) {
    return await Post.find();
  },
  async getPost(_, args, { Post }, __) {
    //getUserId(req);
    return await Post.findById(args.post);
  },
  async me(_, __, { User, getUserId, req }, ___) {
    const id = getUserId(req);
    return User.findById(id);
  },
};

module.exports = Query;
