import {
  ADD_BOOKING_FAIL,
  ADD_BOOKING_SUCCESS,
  ADD_CLINICS_FAIL,
  ADD_CLINICS_SUCCESS,
  ADD_CONSULTATION_FAIL,
  ADD_CONSULTATION_SUCCESS,
  ADD_CONTACT_FAIL,
  ADD_CONTACT_SUCCESS,
  ADD_DOCTOR_FAIL,
  ADD_DOCTOR_SUCCESS,
  ADD_FILE_FAIL,
  ADD_FILE_SUCCESS,
  ADD_NEW_BOOKING,
  ADD_NEW_CLINICS,
  ADD_NEW_CONSULTATION,
  ADD_NEW_CONTACT,
  ADD_NEW_DOCTOR,
  ADD_NEW_FILE,
  ADD_NEW_OFFER,
  ADD_NEW_PAGE,
  ADD_NEW_USER,
  ADD_OFFER_FAIL,
  ADD_OFFER_SUCCESS,
  ADD_PAGE_FAIL,
  ADD_PAGE_SUCCESS,
  ADD_USER_FAIL,
  ADD_USER_SUCCESS,
  DELETE_BOOKING,
  DELETE_BOOKING_FAIL,
  DELETE_BOOKING_SUCCESS,
  DELETE_CLINICS,
  DELETE_CLINICS_FAIL,
  DELETE_CLINICS_SUCCESS,
  DELETE_CONSULTATION,
  DELETE_CONSULTATION_FAIL,
  DELETE_CONSULTATION_SUCCESS,
  DELETE_CONTACT,
  DELETE_CONTACT_FAIL,
  DELETE_CONTACT_SUCCESS,
  DELETE_DOCTOR,
  DELETE_DOCTOR_FAIL,
  DELETE_DOCTOR_SUCCESS,
  DELETE_FILE,
  DELETE_FILE_FAIL,
  DELETE_FILE_SUCCESS,
  DELETE_OFFER,
  DELETE_OFFER_FAIL,
  DELETE_OFFER_SUCCESS,
  DELETE_PAGE,
  DELETE_PAGE_FAIL,
  DELETE_PAGE_SUCCESS,
  DELETE_USER,
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
  GET_USERS,
  GET_USERS_FAIL,
  GET_USERS_SUCCESS,
  GET_USER_PROFILE,
  GET_USER_PROFILE_FAIL,
  GET_USER_PROFILE_SUCCESS,
  UPDATE_BOOKING,
  UPDATE_BOOKING_FAIL,
  UPDATE_BOOKING_SUCCESS,
  UPDATE_CLINIC,
  UPDATE_CLINIC_FAIL,
  UPDATE_CLINIC_SUCCESS,
  UPDATE_CONSULTATION,
  UPDATE_CONSULTATION_FAIL,
  UPDATE_CONSULTATION_SUCCESS,
  UPDATE_CONTACT,
  UPDATE_CONTACT_FAIL,
  UPDATE_CONTACT_SUCCESS,
  UPDATE_DOCTOR,
  UPDATE_DOCTOR_FAIL,
  UPDATE_DOCTOR_SUCCESS,
  UPDATE_FILE,
  UPDATE_FILE_FAIL,
  UPDATE_FILE_SUCCESS,
  UPDATE_OFFER,
  UPDATE_OFFER_FAIL,
  UPDATE_OFFER_SUCCESS,
  UPDATE_PAGE,
  UPDATE_PAGE_FAIL,
  UPDATE_PAGE_SUCCESS,
} from "./actionTypes"



// doctor
export const addNewDoctor = doctor => ({
  type: ADD_NEW_DOCTOR,
  payload: doctor,
})
export const addDoctorSuccess = doctor =>{
  return ({
    type: ADD_DOCTOR_SUCCESS,
    payload: doctor,
  })
}
export const addDoctorFail = error => ({
  type: ADD_DOCTOR_FAIL,
  payload: error,
})
export const deleteDoctor = doctor => ({
  type: DELETE_DOCTOR,
  payload: doctor,
})
export const deleteDoctorSuccess = doctor => ({
  type: DELETE_DOCTOR_SUCCESS,
  payload: doctor,
})
export const deleteDoctorFail = error => ({
  type: DELETE_DOCTOR_FAIL,
  payload: error,
})
export const updateDoctor = (doctor, id, cb) => ({
  type: UPDATE_DOCTOR,
  payload: { doctor, id, cb },
})
// export const updateDoctorSuccess = doctor => ({
//   type: UPDATE_DOCTOR_SUCCESS,
//   payload: { doctor },
// })
export const updateDoctorSuccess = (doctor, id) => ({
  type: UPDATE_DOCTOR_SUCCESS,
  payload:  { doctor, id },
})
export const updateDoctorFail = error => ({
  type: UPDATE_DOCTOR_FAIL,
  payload: error,
})

// offer
export const addNewOffer = (offer,cb, cb2) => ({
  type: ADD_NEW_OFFER,
  payload: {offer, cb, cb2},
})
export const addOfferSuccess = offer => ({
  type: ADD_OFFER_SUCCESS,
  payload: offer,
})
export const addOfferFail = error => ({
  type: ADD_OFFER_FAIL,
  payload: error,
})
export const deleteOffer = (offer,cb ,cb2) => ({
  type: DELETE_OFFER,
  payload: {offer, cb, cb2},
})
export const deleteOfferSuccess = offer => ({
  type: DELETE_OFFER_SUCCESS,
  payload: offer,
})
export const deleteOfferFail = error => ({
  type: DELETE_OFFER_FAIL,
  payload: error,
})
export const updateOffer = (offer, id, cb, cb2) => ({
  type: UPDATE_OFFER,
  payload: { offer, id, cb, cb2 },
})
export const updateOfferSuccess = (offer, id) => ({
  type: UPDATE_OFFER_SUCCESS,
  payload: { offer, id },
})
// export const updateOfferSuccess = (offer, id) => ({
//   type: UPDATE_OFFER_SUCCESS,
//   payload:  { offer, id },
// })
export const updateOfferFail = error => ({
  type: UPDATE_OFFER_FAIL,
  payload: error,
})

// Clinics
export const addNewClinics = clinics => ({
  type: ADD_NEW_CLINICS,
  payload: clinics,
})
export const addClinicsSuccess = clinics => ({
  type: ADD_CLINICS_SUCCESS,
  payload: clinics,
})
export const addClinicsFail = error => ({
  type: ADD_CLINICS_FAIL,
  payload: error,
})
export const deleteClinic = clinic => ({
  type: DELETE_CLINICS,
  payload: clinic,
})
export const deleteClinicSuccess = clinic => ({
  type: DELETE_CLINICS_SUCCESS,
  payload: clinic,
})
export const deleteClinicFail = error => ({
  type: DELETE_CLINICS_FAIL,
  payload: error,
})
export const updateClinic = clinic => ({
  type: UPDATE_CLINIC,
  payload: clinic,
})
export const updateClinicSuccess = clinic => ({
  type: UPDATE_CLINIC_SUCCESS,
  payload: clinic,
})
export const updateClinicFail = error => ({
  type: UPDATE_CLINIC_FAIL,
  payload: error,
})

// Pages
export const addNewPage = page => ({
  type: ADD_NEW_PAGE,
  payload: page,
})
export const addPageSuccess = page => ({
  type: ADD_PAGE_SUCCESS,
  payload: page,
})
export const addPageFail = error => ({
  type: ADD_PAGE_FAIL,
  payload: error,
})
export const deletePage = page => ({
  type: DELETE_PAGE,
  payload: page,
})
export const deletePageSuccess = page => ({
  type: DELETE_PAGE_SUCCESS,
  payload: page,
})
export const deletePageFail = error => ({
  type: DELETE_PAGE_FAIL,
  payload: error,
})
export const updatePage = (page, id, history, cb, cb2) => ({
  type: UPDATE_PAGE,
  payload: { page, id, history, cb, cb2 },
})
export const updatePageSuccess = (page, id) => ({
  type: UPDATE_PAGE_SUCCESS,
  payload: { page, id },
})
export const updatePageFail = error => ({
  type: UPDATE_PAGE_FAIL,
  payload: error,
})

// Contact
// export const addNewContact = contact => ({
//   type: ADD_NEW_CONTACT,
//   payload: contact,
// })
// export const addContactSuccess = contact => ({
//   type: ADD_CONTACT_SUCCESS,
//   payload: contact,
// })
// export const addContactFail = error => ({
//   type: ADD_CONTACT_FAIL,
//   payload: error,
// })
// export const deleteContact = contact => ({
//   type: DELETE_CONTACT,
//   payload: contact,
// })
// export const deleteContactSuccess = contact => ({
//   type: DELETE_CONTACT_SUCCESS,
//   payload: contact,
// })
// export const deleteContactFail = error => ({
//   type: DELETE_CONTACT_FAIL,
//   payload: error,
// })
// export const updateContact = (contact, id, cb, cb2) => ({
//   type: UPDATE_CONTACT,
//   payload: { contact, id, cb, cb2 },
// })
// export const updateContactSuccess = (contact, id) => ({
//   type: UPDATE_CONTACT_SUCCESS,
//   payload: { contact, id },
// })
// export const updateContactFail = error => ({
//   type: UPDATE_CONTACT_FAIL,
//   payload: error,
// })

// Consultation
export const addNewConsultation = consultation => ({
  type: ADD_NEW_CONSULTATION,
  payload: consultation,
})
export const addConsultationSuccess = consultation => ({
  type: ADD_CONSULTATION_SUCCESS,
  payload: consultation,
})
export const addConsultationFail = error => ({
  type: ADD_CONSULTATION_FAIL,
  payload: error,
})
export const deleteConsultation = consultation => ({
  type: DELETE_CONSULTATION,
  payload: consultation,
})
export const deleteConsultationSuccess = consultation => ({
  type: DELETE_CONSULTATION_SUCCESS,
  payload: consultation,
})
export const deleteConsultationFail = error => ({
  type: DELETE_CONSULTATION_FAIL,
  payload: error,
})
export const updateConsultation = consultation => ({
  type: UPDATE_CONSULTATION,
  payload: consultation,
})
export const updateConsultationSuccess = consultation => ({
  type: UPDATE_CONSULTATION_SUCCESS,
  payload: consultation,
})
export const updateConsultationFail = error => ({
  type: UPDATE_CONSULTATION_FAIL,
  payload: error,
})

// BOOKING
export const addNewBooking = booking => ({
  type: ADD_NEW_BOOKING,
  payload: booking,
})
export const addBookingSuccess = booking => ({
  type: ADD_BOOKING_SUCCESS,
  payload: booking,
})
export const addBookingFail = error => ({
  type: ADD_BOOKING_FAIL,
  payload: error,
})
export const deleteBooking = booking => ({
  type: DELETE_BOOKING,
  payload: booking,
})
export const deleteBookingSuccess = booking => ({
  type: DELETE_BOOKING_SUCCESS,
  payload: booking,
})
export const deleteBookingFail = error => ({
  type: DELETE_BOOKING_FAIL,
  payload: error,
})
export const updateBooking = (booking, cb, cb2) => ({
  type: UPDATE_BOOKING,
  payload: {booking, cb, cb2},
})
export const updateBookingSuccess = booking => ({
  type: UPDATE_BOOKING_SUCCESS,
  payload: booking,
})
export const updateBookingFail = error => ({
  type: UPDATE_BOOKING_FAIL,
  payload: error,
})

// File
export const addNewFile = file => ({
  type: ADD_NEW_FILE,
  payload: file,
})
export const addFileSuccess = file => ({
  type: ADD_FILE_SUCCESS,
  payload: file,
})
export const addFileFail = error => ({
  type: ADD_FILE_FAIL,
  payload: error,
})
export const deleteFile = file => ({
  type: DELETE_FILE,
  payload: file,
})
export const deleteFileSuccess = file => ({
  type: DELETE_FILE_SUCCESS,
  payload: file,
})
export const deleteFileFail = error => ({
  type: DELETE_FILE_FAIL,
  payload: error,
})
export const updateFile = (file, cb, cb2) => ({
  type: UPDATE_FILE,
  payload: {file, cb, cb2},
})
export const updateFileSuccess = file => ({
  type: UPDATE_FILE_SUCCESS,
  payload: file,
})
export const updateFileFail = error => ({
  type: UPDATE_FILE_FAIL,
  payload: error,
})
