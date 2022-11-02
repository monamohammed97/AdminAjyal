import {
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAIL,
  ADD_DOCTOR_SUCCESS,
  ADD_DOCTOR_FAIL,
  ADD_CLINICS_FAIL,
  ADD_CLINICS_SUCCESS,
  DELETE_DOCTOR_FAIL,
  DELETE_DOCTOR_SUCCESS,
  UPDATE_DOCTOR_SUCCESS,
  UPDATE_DOCTOR_FAIL,
  DELETE_CLINICS_FAIL,
  DELETE_CLINICS_SUCCESS,
  UPDATE_CLINIC_FAIL,
  UPDATE_CLINIC_SUCCESS,
  ADD_PAGE_SUCCESS,
  ADD_PAGE_FAIL,
  UPDATE_PAGE_SUCCESS,
  DELETE_PAGE_FAIL,
  DELETE_PAGE_SUCCESS,
  UPDATE_CONTACT_SUCCESS,
  UPDATE_CONTACT_FAIL,
  UPDATE_PAGE_FAIL,
  ADD_CONTACT_SUCCESS,
  ADD_CONTACT_FAIL,
  DELETE_CONTACT_SUCCESS,
  DELETE_CONTACT_FAIL,
  UPDATE_CONSULTATION_FAIL,
  UPDATE_CONSULTATION_SUCCESS,
  DELETE_CONSULTATION_FAIL,
  DELETE_CONSULTATION_SUCCESS,
  ADD_CONSULTATION_SUCCESS,
  ADD_CONSULTATION_FAIL,
  UPDATE_BOOKING_FAIL,
  UPDATE_BOOKING_SUCCESS,
  DELETE_BOOKING_FAIL,
  DELETE_BOOKING_SUCCESS,
  ADD_BOOKING_FAIL,
  ADD_BOOKING_SUCCESS,
  UPDATE_FILE_FAIL,
  UPDATE_FILE_SUCCESS,
  DELETE_FILE_FAIL,
  DELETE_FILE_SUCCESS,
  ADD_FILE_FAIL,
  ADD_FILE_SUCCESS,
  UPDATE_OFFER_FAIL,
  UPDATE_OFFER_SUCCESS,
  DELETE_OFFER_FAIL,
  DELETE_OFFER_SUCCESS,
  ADD_OFFER_FAIL,
  ADD_OFFER_SUCCESS,
} from "./actionTypes"

const INIT_STATE = {
  doctors: [],
  clinics: [],
  pages: [],
  contact: [],
  consultations: [],
  booking: [],
  files: [],
  offers: [],
  userProfile: {},
  error: {},
  isSuccessAdd: false,
  isSuccessUpdate: false,
  isSuccessDelete: false,
}

const contacts = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return {
        ...state,
        doctors: action.payload,
      }

    case GET_USERS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_USER_SUCCESS:
      return {
        ...state,
        doctors: [...state.doctors, action.payload],
      }

    case ADD_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        userProfile: action.payload,
      }

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        doctors: state.doctors.map(user =>
          user.id.toString() === action.payload.id.toString()
            ? { user, ...action.payload }
            : user
        ),
      }

    case UPDATE_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        doctors: state.doctors.filter(
          user => user.id.toString() !== action.payload.id.toString()
        ),
      }

    case DELETE_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_USER_PROFILE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    // *******************************************************************
    // doctor

    case ADD_DOCTOR_SUCCESS:
      return {
        ...state,
        doctors: [action.payload, ...state.doctors],
      }

    case ADD_DOCTOR_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case UPDATE_DOCTOR_SUCCESS:
      return {
        ...state,
        doctors: state.doctors.map(doctor =>
          doctor.id.toString() === action.payload.id.toString()
            ? { doctor, ...action.payload }
            : doctor
        ),
        isSuccessUpdate: true,
      }

    case UPDATE_DOCTOR_FAIL:
      return {
        ...state,
        error: action.payload,
        isSuccessUpdate: false,
      }

    case DELETE_DOCTOR_SUCCESS:
      return {
        ...state,
        doctors: state.doctors.filter(
          doctor => doctor.id.toString() !== action.payload.id.toString()
        ),
        isSuccessDelete: true,
      }

    case DELETE_DOCTOR_FAIL:
      return {
        ...state,
        error: action.payload,
        isSuccessDelete: false,
      }

    // offer
    case ADD_OFFER_SUCCESS:
      return {
        ...state,
        offers: [...state.offers, action.payload],
      }

    case ADD_OFFER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case UPDATE_OFFER_SUCCESS:
      return {
        ...state,
        offers: state.offers.map(offer =>
          offer.id.toString() === action.payload.id.toString()
            ? { offer, ...action.payload }
            : offer
        ),
      }

    case UPDATE_OFFER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_OFFER_SUCCESS:
      return {
        ...state,
        offers: state.offers.filter(
          offer => offer.id.toString() !== action.payload.id.toString()
        ),
      }

    case DELETE_OFFER_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    // clinics

    case ADD_CLINICS_SUCCESS:
      return {
        ...state,
        clinics: [...state.clinics, action.payload],
      }

    case ADD_CLINICS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case UPDATE_CLINIC_SUCCESS:
      return {
        ...state,
        clinics: state.clinics.map(clinic =>
          clinic.id.toString() === action.payload.id.toString()
            ? { clinic, ...action.payload }
            : clinic
        ),
      }

    case UPDATE_CLINIC_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_CLINICS_SUCCESS:
      return {
        ...state,
        clinics: state.clinics.filter(
          clinic => clinic.id.toString() !== action.payload.id.toString()
        ),
      }

    case DELETE_CLINICS_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    // Pages

    case ADD_PAGE_SUCCESS:
      return {
        ...state,
        pages: [...state.pages, action.payload],
      }

    case ADD_PAGE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case UPDATE_PAGE_SUCCESS:
      return {
        ...state,
        pages: state.pages.map(page =>
          page.id.toString() === action.payload.id.toString()
            ? { page, ...action.payload }
            : page
        ),
      }

    case UPDATE_PAGE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_PAGE_SUCCESS:
      return {
        ...state,
        pages: state.pages.filter(
          page => page.id.toString() !== action.payload.id.toString()
        ),
      }

    case DELETE_PAGE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    // contact
    case ADD_CONTACT_SUCCESS:
      return {
        ...state,
        contact: [...state.contact, action.payload],
      }

    case ADD_CONTACT_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case UPDATE_CONTACT_SUCCESS:
      return {
        ...state,
        contact: state.contact.map(contact_ =>
          contact_.id.toString() === action.payload.id.toString()
            ? { contact_, ...action.payload }
            : contact_
        ),
      }

    case UPDATE_CONTACT_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_CONTACT_SUCCESS:
      return {
        ...state,
        contact: state.contact.filter(
          contact_ => contact_.id.toString() !== action.payload.id.toString()
        ),
      }

    case DELETE_CONTACT_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    // consultations
    case ADD_CONSULTATION_SUCCESS:
      return {
        ...state,
        consultations: [...state.consultations, action.payload],
      }

    case ADD_CONSULTATION_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case UPDATE_CONSULTATION_SUCCESS:
      return {
        ...state,
        consultations: state.consultations.map(consultation =>
          consultation.id.toString() === action.payload.id.toString()
            ? { consultation, ...action.payload }
            : consultation
        ),
      }

    case UPDATE_CONSULTATION_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_CONSULTATION_SUCCESS:
      return {
        ...state,
        consultations: state.consultations.filter(
          consultation =>
            consultation.id.toString() !== action.payload.id.toString()
        ),
      }

    case DELETE_CONSULTATION_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    // Booking
    case ADD_BOOKING_SUCCESS:
      return {
        ...state,
        booking: [...state.booking, action.payload],
      }

    case ADD_BOOKING_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case UPDATE_BOOKING_SUCCESS:
      return {
        ...state,
        booking: state.booking.map(booking_ =>
          booking_.id.toString() === action.payload.id.toString()
            ? { booking_, ...action.payload }
            : booking_
        ),
      }

    case UPDATE_BOOKING_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_BOOKING_SUCCESS:
      return {
        ...state,
        booking: state.booking.filter(
          booking_ =>
            booking_.id.toString() !== action.payload.id.toString()
        ),
      }

    case DELETE_BOOKING_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    // Open Files
    case ADD_FILE_SUCCESS:
      return {
        ...state,
        files: [...state.files, action.payload],
      }

    case ADD_FILE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case UPDATE_FILE_SUCCESS:
      return {
        ...state,
        files: state.files.map(file =>
          file.id.toString() === action.payload.id.toString()
            ? { file, ...action.payload }
            : file
        ),
      }

    case UPDATE_FILE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_FILE_SUCCESS:
      return {
        ...state,
        files: state.files.filter(
          file => file.id.toString() !== action.payload.id.toString()
        ),
      }

    case DELETE_FILE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default contacts
