const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const responseTime = require("response-time");

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
app.use(responseTime());

mongoose.connect(
  process.env.ATLAS_URI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => {
    console.log("The database is up and running");
  }
);
const githubRoute = require("./routes/github");

app.use("/github", githubRoute);

app.listen(8000, () => {
  console.log("The server is running on port 8000");
});
