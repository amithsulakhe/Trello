const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.get("/", function (req, res) {
  res.send("<h1>Hello World</h1>");
});

app.listen(process.env.PORT, () => {
  console.log("server started at PORT", process.env.PORT);
});
