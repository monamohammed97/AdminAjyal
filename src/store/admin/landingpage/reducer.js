import {
  GET_ABOUTUS,
  GET_ABOUTUS_FAIL,
  GET_ABOUTUS_SUCCESS,
  ADD_ABOUTUS,
  ADD_ABOUTUS_SUCCESS,
  ADD_ABOUTUS_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  aboutUS: {},
  isLoading: false,
  isSuccess: false,
}

const landingPage = (state = INIT_STATE, action) => {
  switch (action.type) {
    // GET_ABOUTUS
    case GET_ABOUTUS:
      return {
        ...state,
        isLoading: true,
      }
    case GET_ABOUTUS_SUCCESS:
      return {
        ...state,
        aboutUS: action.payload,
        isLoading: false,
      }
    case GET_ABOUTUS_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    // add
    case ADD_ABOUTUS:
      return {
        ...state,
        isLoading: true,
      }
    case ADD_ABOUTUS_SUCCESS:
      return {
        ...state,
        aboutUS: {
          ...state?.aboutUS,
          content: JSON.parse(action.payload?.value)?.content,
          images: JSON.parse(action.payload?.value)?.images,
        },
        isLoading: false,
        isSuccess: true,
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
