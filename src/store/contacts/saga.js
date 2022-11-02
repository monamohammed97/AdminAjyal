import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
     ADD_DOCTOR_SUCCESS,
     ADD_NEW_BOOKING,
     ADD_NEW_CLINICS,
     ADD_NEW_CONSULTATION,
     ADD_NEW_CONTACT,
     ADD_NEW_DOCTOR,
     ADD_NEW_FILE, ADD_NEW_OFFER, ADD_NEW_PAGE,
     ADD_NEW_USER,
     DELETE_BOOKING,
     DELETE_CLINICS,
     DELETE_CONSULTATION,
     DELETE_CONTACT,
     DELETE_DOCTOR,
     DELETE_FILE, DELETE_OFFER, DELETE_PAGE,
     DELETE_USER,
     GET_USERS,
     GET_USER_PROFILE,
     UPDATE_BOOKING,
     UPDATE_CLINIC,
     UPDATE_CONSULTATION,
     UPDATE_CONTACT,
     UPDATE_DOCTOR, UPDATE_FILE,
     UPDATE_OFFER,
     UPDATE_PAGE,
     UPDATE_USER
} from "./actionTypes"

import {
     addNewBooking,
     addNewClinic,
     addNewConsultation,
     addNewContact,
     addNewDoctor,
     addNewFile,
     addNewOffer,
     addNewPage,
     addNewUser,
     deleteBooking,
     deleteClinic,
     deleteConsultation,
     deleteContact,
     deleteDoctor,
     deleteFile,
     deleteOffer,
     deletePage,
     deleteUser,
     updateBooking,
     updateClinic,
     updateConsultation,
     updateContact,
     updateDoctor,
     updateFile,
     updateOffer,
     updatePage,
     updateUser
} from "helpers/fakebackend_helper"
import {
     addBookingFail,
     addBookingSuccess,
     addClinicsFail,
     addClinicsSuccess,
     addConsultationFail,
     addConsultationSuccess,
     addContactFail,
     addContactSuccess,
     addDoctorFail, addDoctorSuccess, addFileFail,
     addFileSuccess,
     addOfferFail,
     addOfferSuccess,
     addPageFail,
     addPageSuccess,
     addUserFail,
     addUserSuccess,
     deleteBookingFail,
     deleteBookingSuccess,
     deleteClinicFail,
     deleteClinicSuccess,
     deleteConsultationFail,
     deleteConsultationSuccess,
     deleteContactFail,
     deleteContactSuccess,
     deleteDoctorFail,
     deleteDoctorSuccess,
     deleteFileFail,
     deleteFileSuccess,
     deleteOfferFail,
     deleteOfferSuccess,
     deletePageFail,
     deletePageSuccess,
     deleteUserFail,
     deleteUserSuccess,
     getUserProfileFail,
     getUserProfileSuccess,
     getUsers,
     getUsersFail,
     getUsersSuccess,
     updateBookingFail,
     updateBookingSuccess,
     updateClinicFail,
     updateClinicSuccess,
     updateConsultationFail,
     updateConsultationSuccess,
     updateContactFail,
     updateContactSuccess,
     updateDoctorFail, updateDoctorSuccess, updateFileFail,
     updateFileSuccess,
     updateOfferFail,
     updateOfferSuccess,
     updatePageFail,
     updatePageSuccess,
     updateUserFail,
     updateUserSuccess
} from "./actions"







// doctor


export const getDoctor = (state) => state.doctors

function* onAddNewDoctor({ payload: doctor }) {
  try {
    const response = yield call(addNewDoctor, doctor)
    console.log("res :", response)
    yield put(addDoctorSuccess(response?.items))
  } catch (error) {
    yield put(addDoctorFail(error))
  }
}


function* onUpdateDoctor({ payload: { doctor, id ,cb} }) {
  try {
    const response = yield call(updateDoctor, id, doctor)
    yield put(updateDoctorSuccess,response?.message)
    cb?.()
  } catch (error) {
    yield put(updateDoctorFail(error))
  }
}
function* onDeleteDoctor({ payload: doctor }) {

  try {
    const response = yield call(deleteDoctor, doctor)
    yield put(deleteDoctorSuccess(response))
  } catch (error) {
    yield put(deleteDoctorFail(error))
  }
}

// Clinics
function* onAddNewClinic({ payload: clinic }) {
  try {
    const response = yield call(addNewClinic, clinic)
    // console.log("res :", response)
    yield put(addClinicsSuccess(response))
  } catch (error) {
    yield put(addClinicsFail(error))
  }
}

function* onUpdateClinic({ payload: clinic }) {
  try {
    const response = yield call(updateClinic, clinic)
    yield put(updateClinicSuccess(response))
  } catch (error) {
    yield put(updateClinicFail(error))
  }
}

function* onDeleteClinic({ payload: clinic }) {
  try {
    // console.log("clinic Delete", clinic)

    const response = yield call(deleteClinic, clinic)
    yield put(deleteClinicSuccess(response))
  } catch (error) {
    yield put(deleteClinicFail(error))
  }
}

// Pages
function* onAddNewPage({ payload: page }) {
  try {
    const response = yield call(addNewPage, page)
    // console.log("res :", response)
    yield put(addPageSuccess(response))
  } catch (error) {
    yield put(addPageFail(error))
  }
}

function* onUpdatePage({ payload }) {
  const { page, id, history, cb, cb2 } = payload
  try {
    const response = yield call(updatePage, id, page)
    yield put(updatePageSuccess(response))
    history.push("/pages")
    cb?.()
  } catch (error) {
    cb2?.()
    yield put(updatePageFail(error))
  }
}

function* onDeletePage({ payload: page }) {
  try {
    // console.log("page Delete", page)
    const response = yield call(deletePage, page)
    yield put(deletePageSuccess(response))
  } catch (error) {
    yield put(deletePageFail(error))
  }
}

// // Contacts
// function* onAddNewContact({ payload: contact }) {
//   // console.log("contact");
//   try {
//     const response = yield call(addNewContact, contact)
//     // console.log("res :", response)
//     yield put(addContactSuccess(response))
//   } catch (error) {
//     yield put(addContactFail(error))
//   }
// }

// function* onUpdateContact({ payload }) {
//   const { contact, id, cb, cb2 } = payload

//   try {
//     const response = yield call(updateContact, id, contact)
//     yield put(updateContactSuccess(response?.message))
//     cb?.()
//   } catch (error) {
//     cb2?.()
//     yield put(updateContactFail(error))
//   }
// }

// function* onDeleteContact({ payload: contact }) {
//   try {
//     // console.log("contact Delete", contact)

//     const response = yield call(deleteContact, contact)
//     yield put(deleteContactSuccess(response))
//   } catch (error) {
//     yield put(deleteContactFail(error))
//   }
// }

// Contacts
function* onAddNewOffer({ payload }) {
  const { offer, cb, cb2 } = payload

  try {
    const response = yield call(addNewOffer, offer)
    // console.log("res :", response)
    yield put(addOfferSuccess(response))
    cb?.()
  } catch (error) {
    cb2?.()
    yield put(addOfferFail(error))
  }
}

function* onUpdateOffer({ payload}) {
  const { offer, id, cb, cb2 } = payload
  try {
    const response = yield call(updateOffer, id, offer)
    yield put(updateOfferSuccess(response?.message))
    cb?.()
  } catch (error) {
    cb2?.()
    yield put(updateOfferFail(error))
  }
}

function* onDeleteOffer({ payload }) {
  const { offer, cb, cb2 } = payload
  try {
    const response = yield call(deleteOffer, offer)
    yield put(deleteOfferSuccess(response))
    cb?.()
  } catch (error) {
    cb2?.()
    yield put(deleteOfferFail(error))
  }
}

// Consultation
function* onAddNewConsultation({ payload: consultation }) {
  try {
    const response = yield call(addNewConsultation, consultation)
    // console.log("res :", response)
    yield put(addConsultationSuccess(response))
  } catch (error) {
    yield put(addConsultationFail(error))
  }
}

function* onUpdateConsultation({ payload }) {
  const { consultation, cb, cb2 } = payload
  try {
    const response = yield call(updateConsultation, consultation)
    yield put(updateConsultationSuccess(response))
    cb?.()
  } catch (error) {
    cb2?.()
    yield put(updateConsultationFail(error))
  }
}

function* onDeleteConsultation({ payload: consultation }) {
  try {
    // console.log("consultation Delete", consultation)

    const response = yield call(deleteConsultation, consultation)
    yield put(deleteConsultationSuccess(response))
  } catch (error) {
    yield put(deleteConsultationFail(error))
  }
}

// BOOKING
function* onAddNewBooking({ payload: consultation }) {
  try {
    const response = yield call(addNewBooking, consultation)
    // console.log("res :", response)
    yield put(addBookingSuccess(response))
  } catch (error) {
    yield put(addBookingFail(error))
  }
}

function* onUpdateBooking({ payload }) {
  const { booking, cb, cb2 } = payload
  try {
    const response = yield call(updateBooking, booking)
    yield put(updateBookingSuccess(response?.items || []))
    cb?.()
  } catch (error) {
    cb2?.()
    yield put(updateBookingFail(error))
  }
}

function* onDeleteBooking({ payload: consultation }) {
  try {
    // console.log("consultation Delete", consultation)

    const response = yield call(deleteBooking, consultation)
    yield put(deleteBookingSuccess(response))
  } catch (error) {
    yield put(deleteBookingFail(error))
  }
}

// BOOKING
function* onAddNewFile({ payload: file }) {
  try {
    const response = yield call(addNewFile, file)
    // console.log("res :", response)
    yield put(addFileSuccess(response))
  } catch (error) {
    yield put(addFileFail(error))
  }
}

function* onUpdateFile({ payload }) {
  const {file, cb, cb2}= payload
  try {
    const response = yield call(updateFile, file)
    yield put(updateFileSuccess(response))
    cb?.()
  } catch (error) {
    cb2?.()
    yield put(updateFileFail(error))
  }
}

function* onDeleteFile({ payload: file }) {
  try {
    // console.log("file Delete", file)

    const response = yield call(deleteFile, file)
    yield put(deleteFileSuccess(response))
  } catch (error) {
    yield put(deleteFileFail(error))
  }
}

// function* onDeleteDoctor({ payload: doctor }) {
//   try {
//     console.log("doctor Delete",doctor)
//     const response = yield call(deleteDoctor, {id : doctor?.id})
//     yield put(deleteDoctorSuccess(doctor?.id))
//   } catch (error) {
//     yield put(deleteUserFail(error))
//   }
// }

// function* onDeleteDoctor({ payload }) {
//   try {
//     const response = yield call(deleteDoctor, payload)
//     console.log("doctor Delete",response)

//     yield put(deleteDoctorSuccess(response))
//   } catch (error) {
//     yield put(deleteUserFail(error))
//   }
// }
function* contactsSaga() {
  yield takeEvery(ADD_NEW_DOCTOR, onAddNewDoctor)
  yield takeEvery(DELETE_DOCTOR, onDeleteDoctor)
  yield takeEvery(UPDATE_DOCTOR, onUpdateDoctor)
  yield takeEvery(ADD_NEW_CLINICS, onAddNewClinic)
  yield takeEvery(UPDATE_CLINIC, onUpdateClinic)
  yield takeEvery(DELETE_CLINICS, onDeleteClinic)
  yield takeEvery(ADD_NEW_PAGE, onAddNewPage)
  yield takeEvery(UPDATE_PAGE, onUpdatePage)
  yield takeEvery(DELETE_PAGE, onDeletePage)
  // yield takeEvery(ADD_NEW_CONTACT, onAddNewContact)
  // yield takeEvery(UPDATE_CONTACT, onUpdateContact)
  // yield takeEvery(DELETE_CONTACT, onDeleteContact)
  yield takeEvery(ADD_NEW_CONSULTATION, onAddNewConsultation)
  yield takeEvery(UPDATE_CONSULTATION, onUpdateConsultation)
  yield takeEvery(DELETE_CONSULTATION, onDeleteConsultation)
  yield takeEvery(ADD_NEW_BOOKING, onAddNewBooking)
  yield takeEvery(UPDATE_BOOKING, onUpdateBooking)
  yield takeEvery(DELETE_BOOKING, onDeleteBooking)
  yield takeEvery(ADD_NEW_FILE, onAddNewFile)
  yield takeEvery(UPDATE_FILE, onUpdateFile)
  yield takeEvery(DELETE_FILE, onDeleteFile)
  yield takeEvery(ADD_NEW_OFFER, onAddNewOffer)
  yield takeEvery(UPDATE_OFFER, onUpdateOffer)
  yield takeEvery(DELETE_OFFER, onDeleteOffer)
}

export default contactsSaga
