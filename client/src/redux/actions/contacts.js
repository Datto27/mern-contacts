
export const addContact = (id, name, number) => {
  // გამოყენებულია Home.jsx-ში ახალი კონტაქტის დასამატებლად
  return {
    type: "ADD_CONTACT",
    newContact: {id, name, number}
  }
}

export const updateContact = (id, newName, newNumber) => {
  // dispatch-ი კეთდება ContactItem-დან სადაც არგუმენტად გადაეცემა ახალი სახელი და ტელეფონის ნომერი
  return {
    type: "UPDATE_CONTACT",
    contact: {id, newName, newNumber}
  }
}

export const removeContact = (id) => {
  // dispatch-ი კეთდება ContactItem-დან სადაც არგუმენტად გადაეცემა წასაშლელი კონტაქტის id (მიბმულია თვითონ icon-ის onClick-ზე)
  return {
    type: "REMOVE_CONTACT",
    contactID: id,
  }
}