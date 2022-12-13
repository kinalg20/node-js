const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SomeModelSchema = new Schema({
    first_name: {
      type : String,
      required : true
    },
    last_name: String,
    email: {
      type : String , 
      required : true,
      unique : true
    },
    password : String
  });

const SomeModel = mongoose.model("NewModel", SomeModelSchema);

module.exports = SomeModel