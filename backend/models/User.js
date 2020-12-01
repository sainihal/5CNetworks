const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
  },
  html_url: {
    type: String,
  },
  description: {
    type: String,
  },
  created_at: {
    type: Date,
  },
  open_issues: {
    type: Number,
  },
  watchers: {
    type: Number,
  },
  owner: {
    id: {
      type: Number,
    },
    avatar_url: {
      type: String,
    },
    html_url: {
      type: String,
    },
    type: {
      type: String,
    },
    site_admin: {
      type: Boolean,
    },
  },
});

module.exports = mongoose.model("GithubUsersData", UserSchema);
