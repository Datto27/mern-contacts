import {createStore} from "redux"
import { contactsReducer } from "./reducers/contacts"


export const store = createStore(contactsReducer)

// store.subscribe(() => console.log(store.getState()))