import {
  GET_STUDENTS,
  GET_STUDENTS_FAIL,
  GET_STUDENTS_SUCCESS,
  ADD_STUDENT,
  ADD_STUDENT_SUCCESS,
  ADD_STUDENT_FAIL,
  UPDATE_STUDENT,
  UPDATE_STUDENT_SUCCESS,
  UPDATE_STUDENT_FAIL,
  DELETE_STUDENT,
  DELETE_STUDENT_SUCCESS,
  DELETE_STUDENT_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  students: [],
  isLoading: false,
  isSuccess: false,
  error: null,
}

const students = (state = INIT_STATE, action) => {
  switch (action.type) {
    // GET_STUDENTS
    case GET_STUDENTS:
      return {
        ...state,
        isLoading: true,
      }
    case GET_STUDENTS_SUCCESS:
      return {
        ...state,
        students: action.payload || [],
      }
    case GET_STUDENTS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    // add student
    case ADD_STUDENT:
      return {
        ...state,
        isLoading: true,
      }
    case ADD_STUDENT_SUCCESS:
      return {
        ...state,
        students: [...state.students, action.payload],
        isLoading: false,
        isSuccess: true,
      }
    case ADD_STUDENT_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }

    // update student

    case UPDATE_STUDENT:
      return {
        ...state,
        isLoading: true,
      }
    case UPDATE_STUDENT_SUCCESS:
      return {
        ...state,
        students: state.students.map(student =>
          student.id.toString() === action.payload.id.toString()
            ? { student, ...action.payload }
            : student
        ),
        isLoading: false,
        isSuccess: true,
      }
    case UPDATE_STUDENT_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }

    // delete student

    case DELETE_STUDENT:
      return {
        ...state,
        isLoading: true,
      }
    case DELETE_STUDENT_SUCCESS:
      return {
        ...state,
        students: state.students.filter(
          student => student.id.toString() !== action.payload.toString()
        ),
        isLoading: false,
        isSuccess: true,
      }
    case DELETE_STUDENT_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }

    default:
      return state
  }
}

export default students
