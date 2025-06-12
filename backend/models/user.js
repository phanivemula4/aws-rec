const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    profileImage: String,
    posts: { type: [String], default: [] } // Store image URLs
});

module.exports = mongoose.model("User", UserSchema);
