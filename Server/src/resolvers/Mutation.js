const Mutation = {
  async addUser(_, args, { User }, __) {
    const { password, confirmPassword } = args;
    if (password !== confirmPassword) return new Error("Verify your passwords");
    delete args.confirmPassword;
    const user = new User(args);
    await user.save();
    const token = await user.generateAuthToken();
    return { user, token };
  },
  async addPost(_, args, { Post, getUserId, req }, __) {
    getUserId(req);
    const post = new Post(args);
    return await post.save();
  },
  async likingPost(_, { postId, user }, { Post, getUserId, req }, __) {
    getUserId(req);
    const post = await Post.findById(postId);
    post.likes.push(user);
    return await post.save();
  },
  async unLikingPost(_, { postId, user }, { Post, getUserId, req }, __) {
    getUserId(req);
    const post = await Post.findById(postId);
    post.likes = post.likes.filter(
      (likedUser) => likedUser.toString() !== user.toString()
    );
    return await post.save();
  },
  async likingComment(_, { commentId, user }, { Comment, getUserId, req }, __) {
    getUserId(req);
    const comment = await Comment.findById(commentId);
    comment.likes.push(user);
    return await comment.save();
  },
  async unLikingComment(
    _,
    { commentId, user },
    { Comment, getUserId, req },
    __
  ) {
    getUserId(req);
    const comment = await Comment.findById(commentId);
    comment.likes = comment.likes.filter(
      (likedUser) => likedUser.toString() !== user.toString()
    );
    return await comment.save();
  },
  async addComment(_, args, { Comment, getUserId, req }, __) {
    getUserId(req);
    const comment = new Comment(args);
    return await comment.save();
  },
  async removeUser(_, { user: id }, { User, getUserId, req }, __) {
    //  getUserId(req);
    const user = await User.findById(id);
    await user.remove();
    return user;
  },
  async removePost(_, { post: id }, { Post, getUserId, req }, __) {
    getUserId(req);
    const post = await Post.findById(id);
    await post.remove();
    return post;
  },
  async removeComment(_, { comment: id }, { Comment, getUserId, req }, __) {
    getUserId(req);
    const comment = await Comment.findById(id);
    await comment.remove();
    return comment;
  },
  async updateComment(_, args, { Comment, getUserId, req }, __) {
    getUserId(req);
    const comment = await Comment.findById(args.comment);
    comment.body = args.body;
    return await comment.save();
  },
  async login(_, args, { User }, __) {
    const { username, password } = args;
    if (!username || !password) return new Error("Please fill the form !");
    const user = await User.findByCredentials(args);
    if (!user) return new Error("Please enter your crendentials correctly !");
    const token = await user.generateAuthToken();
    return { user, token };
  },
};

module.exports = Mutation;
