const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()
// routes
const AuthRoutes = require("./routes/authRoutes")
const PhoneCallRoutes = require("./routes/phoneCall")

// config
const app = express()

// db connect
mongoose.connect(process.env.DB_URI)
  .then(() => console.log("DB connected"))
  .catch(() => console.log("DB connection error!"))

// middlewares
app.use(morgan("dev")) // to log HTTP requests and errors
app.use(express.json())
app.use(cors())

// routes
app.get("/", (req, res) => {
  res.json({message:"good"})
})
app.use("/auth", AuthRoutes)
app.use("/phone-call", PhoneCallRoutes)

app.listen(process.env.PORT || 4000)