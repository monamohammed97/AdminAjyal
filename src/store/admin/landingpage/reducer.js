import {
  GET_LANDING_PAGE_CONTENT,
  GET_LANDING_PAGE_CONTENT_FAIL,
  GET_LANDING_PAGE_CONTENT_SUCCESS,
  ADD_LANDING_PAGE_SECTION,
  ADD_LANDING_PAGE_SECTION_SUCCESS,
  ADD_LANDING_PAGE_SECTION_FAIL,
} from "./actionTypes"
import { getKeyByValue } from "helpers/find-key"

const INIT_STATE = {
  //please don't rename these variables
  aboutUs: {},
  hero: {},
  overview: {},
  ourGoals: {},
  facebook_link: {},
  email: {},
  phone: {},
  telephone: {},
  isLoading: false,
  isSuccess: false,
}

const landingPage = (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case GET_LANDING_PAGE_CONTENT:
      return {
        ...state,
        isLoading: true,
      }
    case GET_LANDING_PAGE_CONTENT_SUCCESS:
      return {
        ...state,
        aboutUs: getKeyByValue(payload, "aboutUs")?.aboutUs || null,
        hero: getKeyByValue(payload, "hero")?.hero || null,
        overview: getKeyByValue(payload, "overview")?.overview || null,
        ourGoals: getKeyByValue(payload, "ourGoals")?.ourGoals || null,
        facebook_link:
          getKeyByValue(payload, "facebook_link")?.facebook_link || null,
        email: getKeyByValue(payload, "email")?.email || null,
        phone: getKeyByValue(payload, "phone")?.phone || null,
        telephone: getKeyByValue(payload, "telephone")?.telephone || null,
        isLoading: false,
      }
    case GET_LANDING_PAGE_CONTENT_FAIL:
      return {
        ...state,
        error: payload,
      }

    case ADD_LANDING_PAGE_SECTION:
      return {
        ...state,
        isLoading: true,
      }
    case ADD_LANDING_PAGE_SECTION_SUCCESS:
      return {
        ...state,
        [payload?.key]: {
          ...state?.[payload?.key],
          content: JSON.parse(payload?.newContent?.value)?.content,
          images: JSON.parse(payload?.newContent?.value)?.images,
        },
        isLoading: false,
        isSuccess: true,
      }
    case ADD_LANDING_PAGE_SECTION_FAIL:
      return {
        ...state,
        error: payload,
        isLoading: false,
      }
    default:
      return state
  }
}

export default landingPage
