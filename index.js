const express = require("express");
const path = require("path");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const exphbs = require("express-handlebars");
const sequelize = require("./db.js");

const dashboardRoutes = require("./controllers/dashboardController.js");
const homeRoutes = require("./controllers/homeController");
const userRoutes = require("./controllers/userController");
const postRoutes = require("./controllers/postController");
const commentRoutes = require("./controllers/commentController");

const app = express();
const PORT = process.env.PORT || 3000;

const sessionConfig = {
  secret: "secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

const hbs = exphbs.create({
  helpers: {
    format_date: (date) => {
      if (!date) {
        date = new Date();
      }
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    },
  },
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session(sessionConfig));

app.use("/", homeRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

try {
  sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`running in port :- ${PORT}!`));
  });
} catch (err) {
  console.error("cannot connect to database", err);
}
