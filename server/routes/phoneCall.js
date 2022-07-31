const express = require("express")
const { validateContact } = require("../middlewares/validateContact")
const PhoneCalls = require("../models/phoneCallModel")

const router = express.Router()

// კლიენტიდან გამოგზავნილი რექვესთის მიმღები კონტაკზე დარეკვის შემდეგ
router.post("/", validateContact, (req, res) => {
  // console.log(req.body)

  PhoneCalls.create(req.body, (err, data) => {
    if(err) {
      console.log(err)
      return res.status(400).json({message:err._message})
    }
    return res.status(200).json({"Phone call saved": data})
  })
})

module.exports = router