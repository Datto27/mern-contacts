
const initialState = {
  contacts: [
    {id:1, name:"გელა", number:"591649713"}, 
    {id:2, name:"ლელა", number:"591236541"},
    {id:3, name:"მესი", number:"598101010"}, 
    {id:4, name:"მორატა", number:"57700000"},  
  ]
}

export const contactsReducer = (state=initialState, action) => {
  switch(action.type) {
    case "ADD_CONTACT":
      return {
        ...state,
        contacts: [...state.contacts, action.newContact]
      }
    
    case "UPDATE_CONTACT": 
      // console.log(action.contact)
      state.contacts.map((contact) => {
        if(contact.id===action.contact.id) {
          contact.name = action.contact.newName
          contact.number = action.contact.newNumber
        }
      })
      return {
        ...state,
      }

    case "REMOVE_CONTACT":
      // console.log(action.contactID)
      const filterdContacts = state.contacts.filter((contact) => contact.id !== action.contactID)
      return {...state, contacts: filterdContacts}
  }
  return state
}