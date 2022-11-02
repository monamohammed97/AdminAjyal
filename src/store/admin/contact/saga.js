import { call, put, takeEvery } from "redux-saga/effects"

// Ecommerce Redux States
import { DELETE_CONTACT } from "./actionTypes"
import {
  deleteContactSuccess,
  deleteContactFail,
} from "./actions"
import {
  deleteContactAjyal,
} from "helpers/fakebackend_helper"

function* onDeleteContact({ payload }) {
  const { contact, cbDone, cbFail } = payload
  try {
    const response = yield call(deleteContactAjyal, contact?.id)
    console.log(response)
    yield put(deleteContactSuccess(response))
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(deleteContactFail(error))
  }
}

function* contactSaga() {
  yield takeEvery(DELETE_CONTACT, onDeleteContact)
}

export default contactSaga
