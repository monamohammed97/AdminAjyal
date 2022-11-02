import {
  ADD_QUESTION,
  ADD_QUESTION_SUCCESS,
  ADD_QUESTION_FAIL,
  UPDATE_QUESTION,
  UPDATE_QUESTION_SUCCESS,
  UPDATE_QUESTION_FAIL,
  DELETE_QUESTION,
  DELETE_QUESTION_SUCCESS,
  DELETE_QUESTION_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  questions: [],
  isLoading: false,
  isSuccess: false,
}

const questions = (state = INIT_STATE, action) => {
  switch (action.type) {
    // add question
    case ADD_QUESTION:
      return {
        ...state,
        isLoading: true,
      }
    case ADD_QUESTION_SUCCESS:
      return {
        ...state,
        questions: action.payload,
        isLoading: false,
        isSuccess: true
      }
    case ADD_QUESTION_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }

    // update question

    case UPDATE_QUESTION:
      return {
        ...state,
        isLoading: true,
      }
    case UPDATE_QUESTION_SUCCESS:
      return {
        ...state,
        questions: state.questions.map(question =>
          question.id.toString() === action.payload.id.toString()
            ? { question, ...action.payload }
            : question
        ),
        isLoading: false,
        isSuccess: true
      }
    case UPDATE_QUESTION_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }

    // delete question

    case DELETE_QUESTION:
      return {
        ...state,
        isLoading: true,
      }
    case DELETE_QUESTION_SUCCESS:
      return {
        ...state,
        questions: state.questions.filter(
          question => question.id.toString() !== action.payload.id.toString()
        ),
        isLoading: false,
        isSuccess: true
      }
    case DELETE_QUESTION_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }


    default:
      return state
  }
}

export default questions
