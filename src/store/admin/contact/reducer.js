import {
  GET_CONTACTS,
  GET_CONTACTS_FAIL,
  GET_CONTACTS_SUCCESS,
  DELETE_CONTACT,
  DELETE_CONTACT_SUCCESS,
  DELETE_CONTACT_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  contacts: [],
  isLoading: false,
  isSuccess: false,
}

const contact = (state = INIT_STATE, action) => {
  switch (action.type) {
    // GET_CONTACTS
    case GET_CONTACTS:
      return {
        ...state,
        isLoading: true,
      }
    case GET_CONTACTS_SUCCESS:
      return {
        ...state,
        contacts: action.payload || [],
        isLoading: false,
      }
    case GET_CONTACTS_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    // delete contact
    case DELETE_CONTACT:
      return {
        ...state,
        isLoading: true,
      }
    case DELETE_CONTACT_SUCCESS:
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id.toString() !== action.payload.toString()
        ),
        isLoading: false,
        isSuccess: true,
      }
    case DELETE_CONTACT_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }

    default:
      return state
  }
}

export default contact
