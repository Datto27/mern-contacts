const mongoose = require("mongoose")

const phoneCallSchema = new mongoose.Schema({
  author: {  // ადამიანი რომელმაც ეს ზარი განახორციელა
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true,
  }
}, {timestamps:true})

module.exports = mongoose.model("PhoneCall", phoneCallSchema)