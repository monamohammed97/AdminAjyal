import { call, put, takeEvery } from "redux-saga/effects"

// Ecommerce Redux States
import { GET_CONTACTS, DELETE_CONTACT } from "./actionTypes"
import {
  getContactsSuccess,
  getContactsFail,
  deleteContactSuccess,
  deleteContactFail,
} from "./actions"
import {
  getContactsAjyal,
  deleteContactAjyal,
} from "helpers/fakebackend_helper"

// GET_CONTACTS
function* fetchContacts() {
  try {
    const response = yield call(getContactsAjyal)
    yield put(getContactsSuccess(response?.data))
  } catch (error) {
    yield put(getContactsFail(error))
  }
}

function* onDeleteContact({ payload }) {
  const { contact, cbDone, cbFail } = payload
  try {
    const response = yield call(deleteContactAjyal, contact?.id)
    yield put(deleteContactSuccess(contact?.id))
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(deleteContactFail(error))
  }
}

function* contactSaga() {
  yield takeEvery(GET_CONTACTS, fetchContacts)
  yield takeEvery(DELETE_CONTACT, onDeleteContact)
}

export default contactSaga
