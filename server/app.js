const express = require("express");
const path = require("path");
const app = express();

// basedir
global.__basedir = __dirname;

const db = require("./db/sequalize/models/index");
const cors = require("cors");

require("dotenv").config();

// db.sequelize.sync({ alter: true }).then(() => {
//   console.log("altered successfully");
// });

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("deleted and created successfully");
// });

//template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// body json
app.use(express.json({ limit: "50mb" }));

// form data
app.use(express.urlencoded({ limit: "100mb", extended: false }));

// middleware
app.use(require("./routes/index"));

app.get("/", function (req, res) {
  res.send("<h1>Hello World</h1>");
});

app.listen(process.env.PORT, async () => {
  try {
    await db.sequelize.authenticate();
    console.log("server started at PORT", process.env.PORT);
  } catch (error) {
    console.log("something went wrong", error);
  }
});
