const express = require("express")
const { sign } = require("jsonwebtoken")
const bcrypt = require("bcrypt")
// models
const Users = require("../models/userModel")

// config
const router = express.Router()
const saltRounds = 10 // hashing rounds


router.get("/", (req, res) => {
  res.send("good morning")
})

router.post("/signup", (req, res) => {
  console.log("sign up --> ", req.body)
  // პაროლის ჰეშირება და ისე შენახვა mongoდბ-ზე
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    Users.create({...req.body, password:hash}, (err, data) => {
      if(err) {
        console.log(err)
        return res.status(400).json({message:err._message})
      }
      return res.status(200).json({"user created": data})
    })
  })
})

router.post("/signin", (req, res) => {
  // console.log("sign in --> ", req.body)
  const {username, password} = req.body

  Users.findOne({username}, (err, foundUser) => {
    if(err || !foundUser) {
      return res.status(404).json(err||{error:"User not found!"})
    }
    // მოძებნიილი იუზერის ჰაშირებული პაროლთან შედარება
    bcrypt.compare(password, foundUser.password, (err, result) => {
      // console.log(password, foundUser.password, result)
      if(err || !result) {
        return res.status(400).json({error: "Email and password don't match!"})
      } else {
        // generate jwt with username
        const accessToken = sign({username}, process.env.JWT_SECRET, {expiresIn:"24h"})
        return res.status(200).json({token: accessToken, username})
      }
    })
  })
})



module.exports = router