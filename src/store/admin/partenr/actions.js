import {
  GET_PARTNERS,
  GET_PARTNERS_FAIL,
  GET_PARTNERS_SUCCESS,
  ADD_PARTNER,
  ADD_PARTNER_FAIL,
  ADD_PARTNER_SUCCESS,
  DELETE_PARTNER,
  DELETE_PARTNER_FAIL,
  DELETE_PARTNER_SUCCESS,
  UPDATE_PARTNER,
  UPDATE_PARTNER_FAIL,
  UPDATE_PARTNER_SUCCESS,
} from "./actionTypes"

// getPartenrs 
export const getPartenrs = () => ({
  type: GET_PARTNERS,
})

export const getPartenrsSuccess = mentors => ({
  type: GET_PARTNERS_SUCCESS,
  payload: mentors,
})

export const getPartenrsFail = error => ({
  type: GET_PARTNERS_FAIL,
  payload: error,
})

// actions partners
export const addPartner = (partner, cbDone, cbFail) => ({
  type: ADD_PARTNER,
  payload: { partner, cbDone, cbFail },
})

export const addPartnerSuccess = partner => ({
  type: ADD_PARTNER_SUCCESS,
  payload: partner ,
})

export const addPartnerFail = error => ({
  type: ADD_PARTNER_FAIL,
  payload: error,
})

export const updatePartner = (partner, id, cbDone, cbFail) => ({
  type: UPDATE_PARTNER,
  payload: { partner, id, cbDone, cbFail },
})

export const updatePartnerSuccess = (partner, id) => ({
  type: UPDATE_PARTNER_SUCCESS,
  payload: { partner, id },
})

export const updatePartnerFail = error => ({
  type: UPDATE_PARTNER_FAIL,
  payload: error,
})

export const deletePartner = (partner, cbDone, cbFail) => ({
  type: DELETE_PARTNER,
  payload: { partner, cbDone, cbFail },
})

export const deletePartnerSuccess = partner => ({
  type: DELETE_PARTNER_SUCCESS,
  payload: partner ,
})

export const deletePartnerFail = error => ({
  type: DELETE_PARTNER_FAIL,
  payload: error,
})

