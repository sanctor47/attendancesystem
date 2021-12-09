const mongoose = require("mongoose");

const EntrySchema = new mongoose.Schema({
    in_time: Date,
    out_time: Date,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

});

module.exports = mongoose.model("Entries", EntrySchema);