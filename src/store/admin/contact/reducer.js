import {
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
          contact => contact.id.toString() !== action.payload.id.toString()
        ),
        isLoading: false,
        isSuccess: true
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
