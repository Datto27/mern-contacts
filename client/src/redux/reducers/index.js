import { combineReducers } from "redux";
import { contactsReducer } from "./contacts";

export const allReducers = combineReducers({
  contactsState: contactsReducer,
})