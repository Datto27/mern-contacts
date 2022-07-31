import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from "react-router-dom"
import {GoSignOut} from "react-icons/go"
import ContactItem from '../components/ContactItem'
import { addContact } from '../redux/actions/contacts'


// აქაა წარმოდგენილი კონტაქტები და მათი მოძებნა
const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // global state
  const contactsState = useSelector(state => state.contacts)
  // local states
  const [search, setSearch] = useState({isString:true, content:""})
  const [contacts, setContacts] = useState(contactsState) // გამოყენებულია იმისათვის, რომ ფილტრაციის დროს პირდაპირ გლობალურ სთეითზე არ მოხდეს ზეგავლენა
  const [showAddForm, setShowAddForm] = useState(false) // ახალი კონტაქტის შესაქმნელი ფორმის საჩვენებლად/დასამალად
  const [name, setName] = useState("") // ადამიანის სახელი კონტაქტისთვის
  const [number, setNumber] = useState("") // ტელეფონის ნომერი 

  useEffect(() => {
    // console.log(search.isString)
    // search სთეითის ყოველ ცვლილებაზე გაფილტროს კონტაქტების სია
    // ფილტრაცია კეთდება გლობალურ სთეითზე და გაფილტრული აითემები უკვე გადაეცემა ლოკალურ სთეითს გამოსაჩენად
    let filtered
    if(search.isString) { // სტრინგის შეყვანის შემთხვევაში
      filtered = contactsState.filter((contact) => {
        return contact.name.includes(search.content)
      })
    } else { // რიცხვის შეყვანის შემთხვევაში
      filtered = contactsState.filter((contact) => {
        return contact.number.includes(search.content)
      })
    }
    setContacts(filtered)
  }, [contactsState, search])
  
  const signout = () => {
    localStorage.removeItem("accessToken")
    navigate("/")
  }

  const addNewItem = () => {
    // უნიკალი id-ის გენერაცია, კონტაქტისათვის
    const id = new Date().getTime().toString()
    // ახალი კონტაქტის დასამატებლად
    // console.log(name, number)
    dispatch(addContact(id, name, number))
    setName("")
    setNumber("")
  }

  return (
    <div className='home-page'>
      <div className="nav-bar">
        <h2>Hello</h2>
        <button className='sign-out'
          onClick={signout}>
          <GoSignOut size={28} />
        </button>
      </div>
      {/* ------------ საძიებო ინფუთი ------------ */}
      <div className="search-input">
        <input type="text" placeholder='Search contact'
          value={search.content}
          onChange={(e) => setSearch({
            isString: isNaN(+e.target.value), // სტრინგის შემტხვევაში true, false როცხვისთვის
            content: e.target.value,
          })}
        />
        <div className="underline"></div>
      </div>
      {/* ----------- ოკნტაქტის დასამატებელი ფორმა --------- */}
      <div className="add-contact-section">
        <h4 onClick={() => setShowAddForm(!showAddForm)}>
          ახალი კონტაქტის დამატება {showAddForm?"↑":"↓"}
        </h4>
        {showAddForm && (
          <div className='contact-form'>
            <input type="text" 
              placeholder='Name' 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input type="number" 
              placeholder='Phone Number' 
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
            <button className='add-btn'
              onClick={addNewItem}
            >Add</button>
          </div>
        )}
      </div>
      {/* ----------- კონტაქტების სია --------------- */}
      <div className="contacts-list">
        {contacts.length < 1 && <h4>კონტაქტები არ მოიძებნა</h4>}
        {contacts?.map((contact, i) => {
          return <ContactItem key={i} contact={contact} />
        })}
      </div>
    </div>
  )
}

export default Home