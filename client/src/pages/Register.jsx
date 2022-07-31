import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"
import MyInput from '../components/MyInput'
import { API_URL } from '../config'
import MyAlert from '../components/MyAlert'


const Register = () => {
  const navigate = useNavigate()
  // states
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [repPassword, setRepPassword] = useState("")// პაროლის განმეორებით შესაყვანად განკუთვნილი სთეითი
  const [error, setError] = useState(null) // ერორის შემთხვევაში გამოჩნდება ალერტ ტოსტი

  useEffect(() => {
    // იმ შემთხვევაში თუ იუზერი უკვე დალოგინებული გაკეთდეს ნავიგაცია /home-ზე
    if(localStorage.getItem("accessToken")) navigate("/home", {replace:true})
  }, [])

  useEffect(() => {
    // ერორის შემთხვევაში ეკრანზე ჩნდება MyAlert, 
    // ერროის შექმნიდან მის გასაქრობად გაწერილია 3წმ-იანი setTimeout
    setTimeout(() => {
      setError(null)
    }, 3000)
  }, [error])

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(username, password, repPassword)
    if(username!=="" && password!=="" && repPassword!=="") {
      if(password===repPassword) {
        axios.post(`${API_URL}/auth/signup`, {username, password})
        .then((res) => {
          // console.log(res.data)
          navigate("/login")
        })
        .catch((err) => {
          // console.log(err.response?.data?.message)
          setError("Username already exists!")
        })
      } else setError("Passwords don't match!")
    } else {
      setError("All fileds are required!")
    }
  }

  return (
    <div className='register-page'>
      {error && <MyAlert type="error" text={error} />}
      <div className="form-window">
        <form onSubmit={handleSubmit}>
          <MyInput name="Username"
            type="text"
            state={username} setState={setUsername}
          />
          <MyInput name="Password"
            type="password"
            state={password} setState={setPassword} 
          />
          <MyInput name="Confirm Password"
            type="password"
            state={repPassword} setState={setRepPassword} 
            checker={password}
          />
          <button type='submit' className='submit-btn'>
            SUBMIT
          </button>
        </form>
        <Link to={"/login"} className="link">
          Already have an Account?
        </Link>
      </div>
    </div>
  )
}

export default Register