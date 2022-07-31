
// კლიენტიდან გამოგზავნილი კონტაქტის შესახებ სიგნალის ვალიდაციისათვის
// (სახელი არ შეიცავს ნომრებს, ნომერი კი ასოებს). 

exports.validateContact = (req, res, next) => {
  const {name, number} = req.body
  const checkName = /^([^0-9]*)$/.test(name) // სახელი არ შეიცავს რიცხვებს
  const checkNumber =  /^[0-9]+$/.test(number) // ტელეფონის ნომრის შემოწმება
  // console.log(checkName, checkNumber)

  if(checkName && checkNumber) {
    next()
  } else {
    if(!checkName) {
      return res.status(400).json({error: "Name can't containe number!"})
    } else {
      return res.status(400).json({error: "Phone number can't contain letter!"})
    }
    // throw new Error("Name can't containes digit or phone number can't contains letter!")
  }
}
