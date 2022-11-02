import {
  GET_CLINICS,
  GET_CLINICS_FAIL,
  GET_CLINICS_SUCCESS,
  GET_DOCTORS,
  GET_DOCTORS_FAIL,
  GET_DOCTORS_SUCCESS,
  GET_OFFERS,
  GET_OFFERS_FAIL,
  GET_OFFERS_SUCCESS,
  GET_PAGES,
  GET_PAGES_FAIL,
  GET_PAGES_SUCCESS,
  GET_CONTACT,
  GET_CONTACT_FAIL,
  GET_CONTACT_SUCCESS,
  GET_CONSULTATIONS,
  GET_CONSULTATIONS_FAIL,
  GET_CONSULTATIONS_SUCCESS,
  GET_BOOKING,
  GET_BOOKING_FAIL,
  GET_BOOKING_SUCCESS,
  GET_FILES,
  GET_FILES_FAIL,
  GET_FILES_SUCCESS,
  GET_ORDERS_DATA,
  GET_ORDERS_DATA_SUCCESS,
  GET_ORDERS_DATA_FAIL,
} from "./actionTypes"
// doctors
export const getDoctors = () => ({
  type: GET_DOCTORS,
})

export const getDoctorsSuccess = doctors => ({
  type: GET_DOCTORS_SUCCESS,
  payload: doctors,
})

export const getDoctorsFail = error => ({
  type: GET_DOCTORS_FAIL,
  payload: error,
})

// offers
export const getOffers = () => ({
  type: GET_OFFERS,
})

export const getOffersSuccess = offers => ({
  type: GET_OFFERS_SUCCESS,
  payload: offers,
})

export const getOffersFail = error => ({
  type: GET_OFFERS_FAIL,
  payload: error,
})

// clinics
export const getClinics = () => ({
  type: GET_CLINICS,
})

export const getClinicsSuccess = clinics => ({
  type: GET_CLINICS_SUCCESS,
  payload: clinics,
})

export const getClinicsFail = error => ({
  type: GET_CLINICS_FAIL,
  payload: error,
})

// pages
export const getPages = () => ({
  type: GET_PAGES,
})

export const getPagesSuccess = pages => ({
  type: GET_PAGES_SUCCESS,
  payload: pages,
})

export const getPagesFail = error => ({
  type: GET_PAGES_FAIL,
  payload: error,
})

// contact
export const getContact = () => ({
  type: GET_CONTACT,
})

export const getContactSuccess = contact => ({
  type: GET_CONTACT_SUCCESS,
  payload: contact,
})

export const getContactFail = error => ({
  type: GET_CONTACT_FAIL,
  payload: error,
})

// Consultation
export const getConsultations = () => ({
  type: GET_CONSULTATIONS,
})

export const getConsultationsSuccess = consultation => ({
  type: GET_CONSULTATIONS_SUCCESS,
  payload: consultation,
})

export const getConsultationsFail = error => ({
  type: GET_CONSULTATIONS_FAIL,
  payload: error,
})


// Booking
export const getBooking = () => ({
  type: GET_BOOKING,
})

export const getBookingSuccess = booking => ({
  type: GET_BOOKING_SUCCESS,
  payload: booking,
})

export const getBookingFail = error => ({
  type: GET_BOOKING_FAIL,
  payload: error,
})

// files
export const getFiles = () => ({
  type: GET_FILES,
})

export const getFilesSuccess = files => ({
  type: GET_FILES_SUCCESS,
  payload: files,
})

export const getFilesFail = error => ({
  type: GET_FILES_FAIL,
  payload: error,
})

// Order
export const getOrdersData = () => ({
  type: GET_ORDERS_DATA,
})

export const getOrdersDataSuccess = ordersData => ({
  type: GET_ORDERS_DATA_SUCCESS,
  payload: ordersData,
})

export const getOrdersDataFail = error => ({
  type: GET_ORDERS_DATA_FAIL,
  payload: error,
})