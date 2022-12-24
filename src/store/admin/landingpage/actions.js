import {
  GET_LANDING_PAGE_CONTENT,
  GET_LANDING_PAGE_CONTENT_FAIL,
  GET_LANDING_PAGE_CONTENT_SUCCESS,
  ADD_LANDING_PAGE_SECTION,
  ADD_LANDING_PAGE_SECTION_SUCCESS,
  ADD_LANDING_PAGE_SECTION_FAIL,
} from "./actionTypes"

export const getLandingPageContent = () => ({
  type: GET_LANDING_PAGE_CONTENT,
})

export const getLandingPageContentSuccess = content => ({
  type: GET_LANDING_PAGE_CONTENT_SUCCESS,
  payload: content,
})

export const getLandingPageContentFail = error => ({
  type: GET_LANDING_PAGE_CONTENT_FAIL,
  payload: error,
})

// actions aboutUss
export const addLandingPageContent = (key, content, cbDone, cbFail) => ({
  type: ADD_LANDING_PAGE_SECTION,
  payload: { key, content, cbDone, cbFail },
})

export const addLandingPageContentSuccess = (key, newContent) => ({
  type: ADD_LANDING_PAGE_SECTION_SUCCESS,
  payload: { key, newContent },
})

export const addLandingPageContentFail = error => ({
  type: ADD_LANDING_PAGE_SECTION_FAIL,
  payload: error,
})
