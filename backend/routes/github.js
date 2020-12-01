const express = require("express");
const axios = require("axios");
const User = require("../models/User");
const redis = require("redis");
const { promisify } = require("util");

const router = express.Router();
const client = redis.createClient();

const GET_ASYNC = promisify(client.get).bind(client);
const SET_ASYNC = promisify(client.set).bind(client);

router.post("/", async (req, res) => {
  const { url } = req.body;
  let data;
  if (!url) {
    return res
      .status(400)
      .json({ error: true, message: "Url Cannot be empty" });
  }
  try {
    const reply = await GET_ASYNC(url);
    if (reply) {
      res.status(200).json({ error: false, message: "created" });
      return;
    }
    const gitHubResponse = await axios.get(url);
    const savingArray = [];
    gitHubResponse.data.map(async (userData, i) => {
      const {
        id,
        name,
        html_url,
        description,
        created_at,
        open_issues,
        watchers,
        owner,
      } = userData;
      const existedUser = await User.findOne({ id });
      if (existedUser) {
        savingArray.push("User Already Exists");
      } else {
        savingArray.push(
          User.create({
            id,
            name,
            html_url,
            description,
            created_at,
            open_issues,
            watchers,
            owner,
          })
            .then((response) => {
              return "created";
            })
            .catch((err) => {
              return err.message;
            })
        );
      }
    });
    axios.all(savingArray).then(async (response) => {
      const saveResult = await SET_ASYNC(
        url,
        JSON.stringify("created"),
        "EX",
        5
      );
      return res.status(200).json({ error: false, message: "Created" });
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: true, message: err.message, data: data });
  }
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const userData = await User.findOne({ id: id });
    return res.status(200).json({ error: false, userData: userData });
  } catch (err) {
    return res
      .status(400)
      .json({
        error: true,
        message: "Some thing went wrong please try again later",
      });
  }
});

module.exports = router;
