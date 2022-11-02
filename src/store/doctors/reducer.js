import {
     GET_BOOKING, GET_BOOKING_FAIL,
     GET_BOOKING_SUCCESS, GET_CLINICS, GET_CLINICS_FAIL,
     GET_CLINICS_SUCCESS, GET_CONSULTATIONS,
     GET_CONSULTATIONS_FAIL, GET_CONSULTATIONS_SUCCESS, GET_CONTACT, GET_CONTACT_FAIL,
     GET_CONTACT_SUCCESS, GET_DOCTORS, GET_DOCTORS_FAIL, GET_DOCTORS_SUCCESS, GET_FILES, GET_FILES_FAIL,
     GET_FILES_SUCCESS, GET_OFFERS, GET_OFFERS_FAIL, GET_OFFERS_SUCCESS, GET_ORDERS_DATA,
     GET_ORDERS_DATA_FAIL, GET_ORDERS_DATA_SUCCESS, GET_PAGES, GET_PAGES_FAIL,
     GET_PAGES_SUCCESS
} from "./actionTypes"

const INIT_STATE = {
  doctors: [],
  clinics: [],
  pages: [],
  contact: [],
  consultations: [],
  booking: [],
  files: [],
  files: [],
  offers: [],
  ordersData: [],
  error: {},
  isLoading: false,
}

const doctors = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_DOCTORS:
      return {
        ...state,
        isLoading: true,
      }
    case GET_DOCTORS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        doctors: action.payload,
      }
    case GET_DOCTORS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    // offer
    case GET_OFFERS:
      return {
        ...state,
        isLoading: true,
      }
    case GET_OFFERS_SUCCESS:
      return {
        ...state,
        offers: action.payload,
        isLoading: false,
      }

    case GET_OFFERS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    // clinics
    case GET_CLINICS:
      return {
        ...state,
        isLoading: true,
      }
    case GET_CLINICS_SUCCESS:
      return {
        ...state,
        clinics: action.payload,
        isLoading: false,
      }

    case GET_CLINICS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    // pages
    case GET_PAGES:
      return {
        ...state,
        isLoading: true,
      }
    case GET_PAGES_SUCCESS:
      return {
        ...state,
        pages: action.payload,
        isLoading: false,
      }

    case GET_PAGES_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    // contact
    case GET_CONTACT:
      return {
        ...state,
        isLoading: true,
      }
    case GET_CONTACT_SUCCESS:
      return {
        ...state,
        contact: action.payload,
        isLoading: false,
      }

    case GET_CONTACT_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    // Consultation
    case GET_CONSULTATIONS:
      return {
        ...state,
        isLoading: true,
      }
    case GET_CONSULTATIONS_SUCCESS:
      return {
        ...state,
        consultations: action.payload,
        isLoading: false,
      }

    case GET_CONSULTATIONS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    // Booking
    case GET_BOOKING:
      return {
        ...state,
        isLoading: true,
      }
    case GET_BOOKING_SUCCESS:
      return {
        ...state,
        booking: action.payload,
        isLoading: false,
      }

    case GET_BOOKING_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    // files
    case GET_FILES:
      return {
        ...state,
        isLoading: true,
      }
    case GET_FILES_SUCCESS:
      return {
        ...state,
        files: action.payload,
        isLoading: false,
      }

    case GET_FILES_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    // files
    case GET_ORDERS_DATA:
      return {
        ...state,
        isLoading: true,
      }
    case GET_ORDERS_DATA_SUCCESS:
      return {
        ...state,
        ordersData: action.payload,
      }
    case GET_ORDERS_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default doctors
