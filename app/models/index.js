const mongoose = require("mongoose");
const creatContactModel = require("./contact.model");

mongoose.set("useFindAndModify", false);

const db = {};
db.mongoose = mongoose;
db.Contact = creatContactModel(mongoose);

module.exports = db;