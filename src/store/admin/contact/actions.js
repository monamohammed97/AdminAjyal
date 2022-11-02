import {
  DELETE_CONTACT,
  DELETE_CONTACT_FAIL,
  DELETE_CONTACT_SUCCESS,
} from "./actionTypes"

// actions contacts
export const deleteContact = (contact, cbDone, cbFail) => ({
  type: DELETE_CONTACT,
  payload: { contact, cbDone, cbFail },
})

export const deleteContactSuccess = contact => ({
  type: DELETE_CONTACT_SUCCESS,
  payload: contact ,
})

export const deleteContactFail = error => ({
  type: DELETE_CONTACT_FAIL,
  payload: error,
})

