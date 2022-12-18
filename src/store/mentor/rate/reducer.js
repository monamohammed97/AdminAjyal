import {
  GET_RATES,
  GET_RATES_FAIL,
  GET_RATES_SUCCESS,
  ADD_RATE,
  ADD_RATE_SUCCESS,
  ADD_RATE_FAIL,
  UPDATE_RATE,
  UPDATE_RATE_SUCCESS,
  UPDATE_RATE_FAIL,
  DELETE_RATE,
  DELETE_RATE_SUCCESS,
  DELETE_RATE_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  rates: [],
  isLoading: false,
  isSuccess: false,
}

const rates = (state = INIT_STATE, action) => {
  switch (action.type) {
    // GET_RATES
    case GET_RATES:
      return {
        ...state,
        isLoading: true,
      }
    case GET_RATES_SUCCESS:
      return {
        ...state,
        rates: action.payload || [],
      }
    case GET_RATES_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    // add rate
    case ADD_RATE:
      return {
        ...state,
        isLoading: true,
      }
    case ADD_RATE_SUCCESS:
      return {
        ...state,
        rates: [...state.rates, action.payload],
        isLoading: false,
        isSuccess: true,
      }
    case ADD_RATE_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }

    // update rate

    case UPDATE_RATE:
      return {
        ...state,
        isLoading: true,
      }
    case UPDATE_RATE_SUCCESS:
      return {
        ...state,
        rates: state.rates.map(rate =>
          rate.id.toString() === action.payload.id.toString()
            ? { rate, ...action.payload }
            : rate
        ),
        isLoading: false,
        isSuccess: true,
      }
    case UPDATE_RATE_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }

    // delete rate

    case DELETE_RATE:
      return {
        ...state,
        isLoading: true,
      }
    case DELETE_RATE_SUCCESS:
      return {
        ...state,
        rates: state.rates.filter(
          rate => rate.id.toString() !== action.payload.toString()
        ),
        isLoading: false,
        isSuccess: true,
      }
    case DELETE_RATE_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }

    default:
      return state
  }
}

export default rates
