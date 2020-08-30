const mongoose = require("mongoose");

//ctrl + c +k
//ctrl + k +u

mongoose
  .connect("mongodb://localhost:27017/graphql", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection to database"));
