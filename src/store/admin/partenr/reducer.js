import {
  GET_PARTNERS,
  GET_PARTNERS_FAIL,
  GET_PARTNERS_SUCCESS,
  ADD_PARTNER,
  ADD_PARTNER_SUCCESS,
  ADD_PARTNER_FAIL,
  UPDATE_PARTNER,
  UPDATE_PARTNER_SUCCESS,
  UPDATE_PARTNER_FAIL,
  DELETE_PARTNER,
  DELETE_PARTNER_SUCCESS,
  DELETE_PARTNER_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  partners: [],
  isLoading: false,
  isSuccess: false,
}

const partners = (state = INIT_STATE, action) => {
  
  switch (action.type) {
     // GET_PARTNERS
     case GET_PARTNERS:
      return {
        ...state,
        isLoading: true,
      }
    case GET_PARTNERS_SUCCESS:
      return {
        ...state,
        partners: action.payload,
      }
    case GET_PARTNERS_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    // add partenr
    case ADD_PARTNER:
      return {
        ...state,
        isLoading: true,
      }
    case ADD_PARTNER_SUCCESS:
      return {
        ...state,
        partners: [...state.partners, action.payload],
        isLoading: false,
        isSuccess: true
      }
    case ADD_PARTNER_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }

    // update partenr

    case UPDATE_PARTNER:
      return {
        ...state,
        isLoading: true,
      }
    case UPDATE_PARTNER_SUCCESS:
      return {
        ...state,
        partners: state.partners.map(partenr =>
          partenr.id.toString() === action.payload.id.toString()
            ? { partenr, ...action.payload?.partenr }
            : partenr
        ),
        isLoading: false,
        isSuccess: true
      }
    case UPDATE_PARTNER_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }

    // delete partenr

    case DELETE_PARTNER:
      return {
        ...state,
        isLoading: true,
      }
    case DELETE_PARTNER_SUCCESS:
      return {
        ...state,
        partners: state.partners.filter(
          partenr => partenr.id.toString() !== action.payload.toString()
        ),
        isLoading: false,
        isSuccess: true
      }
    case DELETE_PARTNER_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }


    default:
      return state
  }
}

export default partners
