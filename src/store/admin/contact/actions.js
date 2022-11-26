import {
  GET_CONTACTS,
  GET_CONTACTS_FAIL,
  GET_CONTACTS_SUCCESS,
  DELETE_CONTACT,
  DELETE_CONTACT_FAIL,
  DELETE_CONTACT_SUCCESS,
} from "./actionTypes"

// GET_CONTACTS
export const getContacts = () => ({
  type: GET_CONTACTS,
})

export const getContactsSuccess = contatcs => ({
  type: GET_CONTACTS_SUCCESS,
  payload: contatcs,
})

export const getContactsFail = error => ({
  type: GET_CONTACTS_FAIL,
  payload: error,
})
// actions contacts
export const deleteContact = (contact, cbDone, cbFail) => ({
  type: DELETE_CONTACT,
  payload: { contact, cbDone, cbFail },
})

export const deleteContactSuccess = contact => ({
  type: DELETE_CONTACT_SUCCESS,
  payload: contact,
})

export const deleteContactFail = error => ({
  type: DELETE_CONTACT_FAIL,
  payload: error,
})
