const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  } 
})
// სახელის უნიკალურობის ვალიდაცია
userSchema.path("username").validate(async (username) => {
  const nameCount = await mongoose.models.User.countDocuments({username})
  // console.log(nameCount)
  return !nameCount
}, "Name already exists!")

module.exports = mongoose.model("User", userSchema)