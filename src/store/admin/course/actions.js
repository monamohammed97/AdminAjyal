import {
  GET_COURSES,
  GET_COURSES_FAIL,
  GET_COURSES_SUCCESS,
  ADD_COURSE,
  ADD_COURSE_FAIL,
  ADD_COURSE_SUCCESS,
  DELETE_COURSE,
  DELETE_COURSE_FAIL,
  DELETE_COURSE_SUCCESS,
  UPDATE_COURSE,
  UPDATE_COURSE_FAIL,
  UPDATE_COURSE_SUCCESS,
} from "./actionTypes"

// GET_COURSES
export const getCourses = () => ({
  type: GET_COURSES,
})

export const getCoursesSuccess = mentors => ({
  type: GET_COURSES_SUCCESS,
  payload: mentors,
})

export const getCoursesFail = error => ({
  type: GET_COURSES_FAIL,
  payload: error,
})

// actions courses
export const addCourse = (course, cbDone, cbFail) => ({
  type: ADD_COURSE,
  payload: { course, cbDone, cbFail },
})

export const addCourseSuccess = course => ({
  type: ADD_COURSE_SUCCESS,
  payload: course,
})

export const addCourseFail = error => ({
  type: ADD_COURSE_FAIL,
  payload: error,
})

export const updateCourse = (course, id, cbDone, cbFail) => ({
  type: UPDATE_COURSE,
  payload: { course, id, cbDone, cbFail },
})

export const updateCourseSuccess = (course, id) => ({
  type: UPDATE_COURSE_SUCCESS,
  payload: { course, id },
})

export const updateCourseFail = error => ({
  type: UPDATE_COURSE_FAIL,
  payload: error,
})

export const deleteCourse = (course, cbDone, cbFail) => ({
  type: DELETE_COURSE,
  payload: { course, cbDone, cbFail },
})

export const deleteCourseSuccess = course => ({
  type: DELETE_COURSE_SUCCESS,
  payload: course,
})

export const deleteCourseFail = error => ({
  type: DELETE_COURSE_FAIL,
  payload: error,
})
