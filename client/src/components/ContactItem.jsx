import React, { useEffect, useState } from 'react'
import {useDispatch} from "react-redux"
import axios from "axios"
import {MdDelete, MdEditNote, MdLocalPhone} from "react-icons/md"
import {API_URL} from "../config"
import {getParsedJWT} from "../utils/parseJWT"
import { removeContact, updateContact } from '../redux/actions/contacts'
// components
import MyAlert from './MyAlert'


// კონტაქტის item-ი გამოყენებულია Home.jsx-ში ყოველი კონტაქტის საჩვენებლად
const ContactItem = ({contact}) => {
  const dispatch = useDispatch()
  // local states
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [newName, setNewName] = useState(contact.name)
  const [newNumber, setNewNumber] = useState(contact.number)

  useEffect(() => {
  
  }, [error, success])

  const updateItem = () => {
    dispatch(updateContact(contact.id, newName, newNumber))
    setIsEditing(false)
  }

  const phoneCall = (name, number) => {
    const {username} = getParsedJWT()
    axios.post(`${API_URL}/phone-call`, {
      author: username, // ბაზაში იუზერი რომელიც ზარს უშვებს ინახება როგორც author
      name, number
    })
    .then((res) => {
      // console.log(res.data)
      addSuccess("Phone call added!")
    })
    .catch((err) => {
      // console.log(err.response.data?.error)
      addError(err.response.data?.error)
    })
  }

  const addError = (error) => {
    // error შემთხვევაში ეკრანზე ჩნდება MyAlert, 
    //  შექმნის შემდეგ გასაქრობად გაწერილია 5წმ-იანი setTimeout
    setError(error)
    setTimeout(() => {
      setError(null)
    }, 5000)
  }
  const addSuccess = (success) => {
    setSuccess(success)
    setTimeout(() => {
      setSuccess(null)
    }, 4000)
  }

  return (
    <div className="contact-item-container">
      {error && <MyAlert type="error" text={error} />}
      {success && <MyAlert type="success" text={success} />}
      {isEditing ? (
        <div className="editing-item">
          <input type="text" 
            placeholder='Name' 
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <input type="number" 
            placeholder='Phone Number' 
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
          <button className='save-btn'
            onClick={updateItem}
          >Save</button>
        </div>
      ) : (
        <div className='contact-item'>
          <div className='contact-info'>
            <div className="call-btn">
              <MdLocalPhone size={24}
                onClick={() => phoneCall(contact.name, contact.number)}
              />  
            </div>
            <p className='name'>{contact.name}</p>
            <p className='number'>{contact.number}</p>
          </div>
          <MdEditNote size={28} color='green' 
            onClick={() => setIsEditing(true)}
          />
          <MdDelete size={26} color="red" 
            onClick={() => dispatch(removeContact(contact.id))}
          />
        </div>
      )}
    </div>
  )
}

export default ContactItem