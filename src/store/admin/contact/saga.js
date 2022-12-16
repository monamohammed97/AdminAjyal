import { call, put, takeEvery } from "redux-saga/effects"
import { getErrorMessage } from "helpers/http-error"
import { notify } from "components/Common/notify"

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
    yield put(getContactsFail(getErrorMessage(error)))
  }
}

function* onDeleteContact({ payload }) {
  const { contact, cbDone, cbFail } = payload
  try {
    const response = yield call(deleteContactAjyal, contact?.id)
    yield put(deleteContactSuccess(contact?.id))
    cbDone?.()
  } catch (error) {
    const message = getErrorMessage(error)
    notify("error", "Failed: " + message)
    yield put(deleteContactFail(message))
  }
}

function* contactSaga() {
  yield takeEvery(GET_CONTACTS, fetchContacts)
  yield takeEvery(DELETE_CONTACT, onDeleteContact)
}

export default contactSaga
