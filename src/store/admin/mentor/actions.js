import {
  ADD_MENTOR,
  ADD_MENTOR_FAIL,
  ADD_MENTOR_SUCCESS,
  DELETE_MENTOR,
  DELETE_MENTOR_FAIL,
  DELETE_MENTOR_SUCCESS,
  UPDATE_MENTOR,
  UPDATE_MENTOR_FAIL,
  UPDATE_MENTOR_SUCCESS,
} from "./actionTypes"

// actions mentors
export const addMentor = (mentor, cbDone, cbFail) => ({
  type: ADD_MENTOR,
  payload: { mentor, cbDone, cbFail },
})

export const addMentorSuccess = mentor => ({
  type: ADD_MENTOR_SUCCESS,
  payload: mentor ,
})

export const addMentorFail = error => ({
  type: ADD_MENTOR_FAIL,
  payload: error,
})

export const updateMentor = (mentor, id, cbDone, cbFail) => ({
  type: UPDATE_MENTOR,
  payload: { mentor, id, cbDone, cbFail },
})

export const updateMentorSuccess = (mentor, id) => ({
  type: UPDATE_MENTOR_SUCCESS,
  payload: { mentor, id },
})

export const updateMentorFail = error => ({
  type: UPDATE_MENTOR_FAIL,
  payload: error,
})

export const deleteMentor = (mentor, cbDone, cbFail) => ({
  type: DELETE_MENTOR,
  payload: { mentor, cbDone, cbFail },
})

export const deleteMentorSuccess = mentor => ({
  type: DELETE_MENTOR_SUCCESS,
  payload: mentor ,
})

export const deleteMentorFail = error => ({
  type: DELETE_MENTOR_FAIL,
  payload: error,
})

