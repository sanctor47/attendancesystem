const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true },
    password: String,
    created_at: { type: Date, default: Date.now },
    access_code: { type: String, unique: true },
    class: String,
    designation: String
});

module.exports = mongoose.model("Users", UserSchema);