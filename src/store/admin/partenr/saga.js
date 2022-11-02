import { call, put, takeEvery } from "redux-saga/effects"

// Ecommerce Redux States
import { ADD_PARTNER, UPDATE_PARTNER, DELETE_PARTNER } from "./actionTypes"
import {
  addPartnerSuccess,
  addPartnerFail,
  updatePartnerSuccess,
  updatePartnerFail,
  deletePartnerSuccess,
  deletePartnerFail,
} from "./actions"
import {
  addPartnerAjyal,
  deletePartnerAjyal,
  updatePartnerAjyal,
} from "helpers/fakebackend_helper"

function* onAddPartner({ payload }) {
  const { partner, cbDone, cbFail } = payload
  try {
    const response = yield call(addPartnerAjyal, partner)
    yield put(addPartnerSuccess(response?.data))
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(addPartnerFail(error))
  }
}

function* onUpdatePartner({ payload }) {
  const { partner, id, cbDone, cbFail } = payload
  try {
    const response = yield call(updatePartnerAjyal, id, partner)
    yield put(updatePartnerSuccess, response?.message)
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(updatePartnerFail(error))
  }
}
function* onDeletePartner({ payload }) {
  const { partner, cbDone, cbFail } = payload
  try {
    const response = yield call(deletePartnerAjyal, partner?.id)
    console.log(response)
    yield put(deletePartnerSuccess(response))
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(deletePartnerFail(error))
  }
}

function* partnersSaga() {
  yield takeEvery(ADD_PARTNER, onAddPartner)
  yield takeEvery(UPDATE_PARTNER, onUpdatePartner)
  yield takeEvery(DELETE_PARTNER, onDeletePartner)
}

export default partnersSaga
