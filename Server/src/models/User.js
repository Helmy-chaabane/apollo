const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Post = require("./Post");
const validator = require("validator");
const Comment = require("./Comment");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "owner",
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.__v;
  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    {
      _id: user.id.toString(),
      username: user.username,
    },
    "secret",
    {
      expiresIn: "2 days",
    }
  );

  return token;
};

userSchema.statics.findByCredentials = async ({ username, password }) => {
  const user = await User.findOne({ username });
  if (!user) return;
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return;
  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.pre("remove", async function (next) {
  const user = this;
  await Comment.deleteMany({ owner: user._id });
  await Post.deleteMany({ owner: user._id });
  next();
});

//public

const User = mongoose.model("User", userSchema);

module.exports = User;
