import {
  ADD_ABOUTUS,
  ADD_ABOUTUS_SUCCESS,
  ADD_ABOUTUS_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  aboutUS:{},
  isLoading: false,
  isSuccess: false,
}

const landingPage = (state = INIT_STATE, action) => {
  switch (action.type) {
    // add 
    case ADD_ABOUTUS:
      return {
        ...state,
        isLoading: true,
      }
    case ADD_ABOUTUS_SUCCESS:
      return {
        ...state,
        aboutUS: {...action.payload},
        isLoading: false,
        isSuccess: true
      }
    case ADD_ABOUTUS_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }


    default:
      return state
  }
}

export default landingPage
