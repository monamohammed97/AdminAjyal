import {
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
  partenrs: [],
  isLoading: false,
  isSuccess: false,
}

const partenrs = (state = INIT_STATE, action) => {
  switch (action.type) {
    // add partenr
    case ADD_PARTNER:
      return {
        ...state,
        isLoading: true,
      }
    case ADD_PARTNER_SUCCESS:
      return {
        ...state,
        partenrs: action.payload,
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
        partenrs: state.partenrs.map(partenr =>
          partenr.id.toString() === action.payload.id.toString()
            ? { partenr, ...action.payload }
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
        partenrs: state.partenrs.filter(
          partenr => partenr.id.toString() !== action.payload.id.toString()
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

export default partenrs
