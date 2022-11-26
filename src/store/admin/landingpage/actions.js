import {
  GET_ABOUTUS,
  GET_ABOUTUS_FAIL,
  GET_ABOUTUS_SUCCESS,
  ADD_ABOUTUS,
  ADD_ABOUTUS_FAIL,
  ADD_ABOUTUS_SUCCESS,
} from "./actionTypes"

// GET_ABOUTUS
export const getAboutus = () => ({
  type: GET_ABOUTUS,
})

export const getAboutusSuccess = aboutUs => ({
  type: GET_ABOUTUS_SUCCESS,
  payload: aboutUs,
})

export const getAboutusFail = error => ({
  type: GET_ABOUTUS_FAIL,
  payload: error,
})

// actions aboutUss
export const addAboutus = (aboutUs, cbDone, cbFail) => ({
  type: ADD_ABOUTUS,
  payload: { aboutUs, cbDone, cbFail },
})

export const addAboutusSuccess = aboutUs => ({
  type: ADD_ABOUTUS_SUCCESS,
  payload: aboutUs,
})

export const addAboutusFail = error => ({
  type: ADD_ABOUTUS_FAIL,
  payload: error,
})
