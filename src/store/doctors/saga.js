import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  getBookingFail,
  getBookingSuccess,
  getClinicsFail,
  getClinicsSuccess,
  getConsultationsFail,
  getConsultationsSuccess,
  getContactFail,
  getContactSuccess,
  getDoctorsFail,
  getDoctorsSuccess,
  getFilesFail,
  getFilesSuccess,
  getOffersFail,
  getOffersSuccess,
  getOrdersDataFail,
  getOrdersDataSuccess,
  getPagesFail,
  getPagesSuccess,
} from "./actions"
import {
  GET_BOOKING,
  GET_CLINICS,
  GET_CONSULTATIONS,
  GET_CONTACT,
  GET_DOCTORS,
  GET_FILES,
  GET_OFFERS,
  GET_ORDERS_DATA,
  GET_PAGES,
} from "./actionTypes"

//Include Both Helper File with needed methods
import {
  getBooking,
  getClinics,
  getConsultation,
  getContact,
  getDoctors,
  getFile,
  getOffers,
  getOrders,
  getOrdersData,
  getPages,
} from "helpers/fakebackend_helper"

function* fetchOffers() {
  try {
    const response = yield call(getOffers)
    yield put(getOffersSuccess(response?.items || []))
  } catch (error) {
    yield put(getOffersFail(error))
  }
}
function* fetchDoctors() {
  try {
    const response = yield call(getDoctors)
    yield put(getDoctorsSuccess(response?.items || []))
  } catch (error) {
    yield put(getDoctorsFail(error))
  }
}
function* fetchClinics() {
  try {
    const response = yield call(getClinics)
    yield put(getClinicsSuccess(response?.items?.clinics || []))
  } catch (error) {
    yield put(getClinicsFail(error))
  }
}
function* fetchPages() {
  try {
    const response = yield call(getPages)
    yield put(getPagesSuccess(response?.items || []))
  } catch (error) {
    yield put(getPagesFail(error))
  }
}
function* fetchContact() {
  try {
    const response = yield call(getContact)
    yield put(getContactSuccess(response?.items || []))
  } catch (error) {
    yield put(getContactFail(error))
  }
}
function* fetchConsultations() {
  try {
    const response = yield call(getConsultation)
    yield put(getConsultationsSuccess(response?.items || []))
  } catch (error) {
    yield put(getConsultationsFail(error))
  }
}
function* fetchBooking() {
  try {
    const response = yield call(getBooking)
    yield put(getBookingSuccess(response?.items || []))
  } catch (error) {
    yield put(getBookingFail(error))
  }
}
function* fetchFiles() {
  try {
    const response = yield call(getFile)
    yield put(getFilesSuccess(response?.items || []))
  } catch (error) {
    yield put(getFilesFail(error))
  }
}
function* fetchOrders() {
  try {
    const response = yield call(getOrdersData)
    yield put(getOrdersDataSuccess(response?.items || []))
  } catch (error) {
    yield put(getOrdersDataFail(error))
  }
}

function* doctorsSaga() {
  yield takeEvery(GET_DOCTORS, fetchDoctors)
  yield takeEvery(GET_OFFERS, fetchOffers)
  yield takeEvery(GET_CLINICS, fetchClinics)
  yield takeEvery(GET_PAGES, fetchPages)
  yield takeEvery(GET_FILES, fetchFiles)
  yield takeEvery(GET_CONTACT, fetchContact)
  yield takeEvery(GET_BOOKING, fetchBooking)
  yield takeEvery(GET_CONSULTATIONS, fetchConsultations)
  yield takeEvery(GET_ORDERS_DATA, fetchOrders)
}

export default doctorsSaga
