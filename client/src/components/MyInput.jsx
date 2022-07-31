import React, { useState } from 'react'
import { useEffect } from 'react'
import {AiFillEyeInvisible, AiFillEye} from "react-icons/ai"

// აუთენტიფიკაციისათვის განუთვნილი ინფუთი (წითელი/მწვანე ბორედერით)
// checker - გამოყენბეულია პაროლის განმეორებით ჩაწერის დროს იმისათვის რომ შემოწმდეს ემთხვევა თუ არა ინფუთები ერთმანეთს
// type - რომელი ტიპის ინფუთია საჭირო password/text
const MyInput = ({name, state, setState, type, checker=null}) => {
  const [valid, setValid] = useState("") // იცვლება ვალიდაციის შემოწმბის დროს, გამოიყენება სტილის შესაცვლელად
  const [showPass, setShowPass] = useState(false) // გამოიყენება მხოლოდ პაროლის ინპუთის შემთხვევაში


  useEffect(() => {
    // იმ შემთხვევაში თუ შესაბამისი state ცარიელი სტრინგია ინფუთს მოაშოროს სფეციალური ეფექტები (წითელი/მწვანე ბორდერები)
    if(state==="" || checker==="") setValid("")
  }, [state, checker])

  useEffect(() => {
    // console.log(state, checker)
    // პაროლის დასადასტურებელი ინფუთის შემოწმება ყოველ checker/password state ცვლილებაზე
    if(name==="Confirm Password" && state!==checker) setValid("not-valid")
    else if(checker==="") setValid("")
    else setValid("valid")
  }, [checker])

  const validateInput = (e) => {
    // პირველ რიგში შეიცვალოს მშობლიდან მომავალი სთეითი
    setState(e.target.value)
    // checker არსებობის შემთხვევაში (რაც იმას ნიშნავს რომ განმეორებითი პაროლის ინფუთია აქტიური)
    // შეამოწმოს ემთხვევა თუ არა მოცემული state პაროლის checker-ს (password - repPassword)
    if(checker) {
      // console.log(checker)
      if(e.target.value===checker) setValid("valid")
      else setValid("not-valid")
    } else {
      // console.log(state)
      // სხვა შემთხვევაში შეამოწმოს არის თუ არა სხვა ინფუთებში რაიმე შეყვანილი
      if(e.target.value === "") setValid("not-valid") 
      else setValid("valid")
    }
  }

  return (
    <div className="my-input">
      <h4>{name}:</h4>
      <div className={`input-container ${valid}`}>
        <input type={type=="password" && !showPass ? "password":"text"} 
          className={`input `}
          placeholder={name}
          value={state}
          onChange={validateInput}
        />
        {/* ორი კონდიცია ერთდორულად: იმისათვის რომ თვალის აიქონები გამოჩნდეს
        საჭირო რომ ინფუთის ტიპი იყოს password. */}
        {type==="password" ? showPass 
          ? <AiFillEye color='white'
              onClick={()=>setShowPass(false)} 
            /> 
          : <AiFillEyeInvisible color='white'
              onClick={()=>setShowPass(true)} 
            />
        : null}
      </div>
    </div>
  )
}

export default MyInput