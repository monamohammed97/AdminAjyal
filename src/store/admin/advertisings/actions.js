import {
  GET_ADVERTISINGS,
  GET_ADVERTISINGS_FAIL,
  GET_ADVERTISINGS_SUCCESS,
  ADD_ADS,
  ADD_ADS_FAIL,
  ADD_ADS_SUCCESS,
  DELETE_ADS,
  DELETE_ADS_FAIL,
  DELETE_ADS_SUCCESS,
  UPDATE_ADS,
  UPDATE_ADS_FAIL,
  UPDATE_ADS_SUCCESS,
} from "./actionTypes"

// getAds 
export const getAds = () => ({
  type: GET_ADVERTISINGS,
})

export const getAdsSuccess = mentors => ({
  type: GET_ADVERTISINGS_SUCCESS,
  payload: mentors,
})

export const getAdsFail = error => ({
  type: GET_ADVERTISINGS_FAIL,
  payload: error,
})

// actions adss
export const addAds = (ads, cbDone, cbFail) => ({
  type: ADD_ADS,
  payload: { ads, cbDone, cbFail },
})

export const addAdsSuccess = ads => ({
  type: ADD_ADS_SUCCESS,
  payload: ads ,
})

export const addAdsFail = error => ({
  type: ADD_ADS_FAIL,
  payload: error,
})

export const updateAds = (ads, id, cbDone, cbFail) => ({
  type: UPDATE_ADS,
  payload: { ads, id, cbDone, cbFail },
})

export const updateAdsSuccess = (ads, id) => ({
  type: UPDATE_ADS_SUCCESS,
  payload: { ads, id },
})

export const updateAdsFail = error => ({
  type: UPDATE_ADS_FAIL,
  payload: error,
})

export const deleteAds = (ads, cbDone, cbFail) => ({
  type: DELETE_ADS,
  payload: { ads, cbDone, cbFail },
})

export const deleteAdsSuccess = ads => ({
  type: DELETE_ADS_SUCCESS,
  payload: ads ,
})

export const deleteAdsFail = error => ({
  type: DELETE_ADS_FAIL,
  payload: error,
})

