import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import MyInput from '../components/MyInput'
import { API_URL } from '../config'
import MyAlert from '../components/MyAlert'

const Login = () => {
  const navigate = useNavigate()
  // states
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  useEffect(() => {
    // იმ შემთხვევაში თუ იუზერი უკვე დალოგინებული გაკეთდეს ნავიგაცია /home-ზე
    // console.log(localStorage.getItem("accessToken"))
    if(localStorage.getItem("accessToken")) navigate("/home", {replace:true})
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if(username!=="" && password!=="") {
      axios.post(`${API_URL}/auth/signin`, {username, password})
      .then((res) => {
        // console.log(res.data)
        localStorage.setItem("accessToken", res.data.token)
        navigate("/home")
      })
      .catch((err) => {
        // console.log(err.response.data?.error)
        setError(err.response.data?.error)
      })
    } else {
      setError("All fields are required!")
    }
  }

  return (
    <div className='login-page'>
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
          <button type='submit' className='submit-btn'>
            Login
          </button>
        </form>
        <Link to="/" className='link'>
          Back to register page.
        </Link>
      </div>
    </div>
  )
}

export default Login