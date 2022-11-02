import {
  ADD_CATEGORY,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAIL,
  UPDATE_CATEGORY,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  DELETE_CATEGORY,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  category: [],
  isLoading: false,
  isSuccess: false,
}

const category = (state = INIT_STATE, action) => {
  switch (action.type) {
    // add category_
    case ADD_CATEGORY:
      return {
        ...state,
        isLoading: true,
      }
    case ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        category: action.payload,
        isLoading: false,
        isSuccess: true
      }
    case ADD_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }

    // update category_

    case UPDATE_CATEGORY:
      return {
        ...state,
        isLoading: true,
      }
    case UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        category: state.category.map(category_ =>
          category_.id.toString() === action.payload.id.toString()
            ? { category_, ...action.payload }
            : category_
        ),
        isLoading: false,
        isSuccess: true
      }
    case UPDATE_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }

    // delete category_

    case DELETE_CATEGORY:
      return {
        ...state,
        isLoading: true,
      }
    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        category: state.category.filter(
          category_ => category_.id.toString() !== action.payload.id.toString()
        ),
        isLoading: false,
        isSuccess: true
      }
    case DELETE_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }


    default:
      return state
  }
}

export default category
