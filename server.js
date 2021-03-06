const express = require("express");
const mongoose = require("mongoose");
const articles = require("./article/model");
const articleRouter = require("./routes/articles");
const methodOverride = require("method-override");
const app = express();

//Hook up DB
mongoose.connect("mongodb://localhost/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

//Set View Engine
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const articles = await Article.find.sort({
    createdAt: "desc",
  });
  //   const articles = [
  //     {
  //       title: "Test Article",
  //       createdAt: new Date(),
  //       description: "Test description",
  //       image:
  //         "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  //     },
  //     {
  //       title: "Test Article 2",
  //       createdAt: new Date(),
  //       description: "Test description 2",
  //       image:
  //         "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  //     },
  //   ];
  res.render("articles/index", { articles: articles });
});

app.use("/articles", articleRouter);

app.listen(5000);
