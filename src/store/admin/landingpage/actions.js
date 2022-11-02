import {
  ADD_ABOUTUS,
  ADD_ABOUTUS_FAIL,
  ADD_ABOUTUS_SUCCESS,
} from "./actionTypes"

// actions aboutUss
export const addAboutus = (aboutUs, cbDone, cbFail) => ({
  type: ADD_ABOUTUS,
  payload: { aboutUs, cbDone, cbFail },
})

export const addAboutusSuccess = aboutUs => ({
  type: ADD_ABOUTUS_SUCCESS,
  payload: aboutUs ,
})

export const addAboutusFail = error => ({
  type: ADD_ABOUTUS_FAIL,
  payload: error,
})
