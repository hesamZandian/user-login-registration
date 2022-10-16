const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name: { type: String, default: "" },
    last_name: { type: String, default: "" },
    username: { type: String, default: "" },
    email: { type: String, default: "" },
    phone_number: { type: String, default: "" },
    password: { type: String },
    token: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("users", userSchema);