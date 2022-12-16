import { call, put, takeEvery } from "redux-saga/effects"
import { getErrorMessage } from "helpers/http-error"
import { notify } from "components/Common/notify"

// Ecommerce Redux States
import {
  GET_PARTNERS,
  ADD_PARTNER,
  UPDATE_PARTNER,
  DELETE_PARTNER,
} from "./actionTypes"
import {
  getPartenrsFail,
  getPartenrsSuccess,
  addPartnerSuccess,
  addPartnerFail,
  updatePartnerSuccess,
  updatePartnerFail,
  deletePartnerSuccess,
  deletePartnerFail,
} from "./actions"
import {
  getPartnersAjyal,
  addPartnerAjyal,
  deletePartnerAjyal,
  updatePartnerAjyal,
} from "helpers/fakebackend_helper"

// GET_PARTNERS
function* fetchPartenrs() {
  try {
    const response = yield call(getPartnersAjyal)
    yield put(getPartenrsSuccess(response?.data))
  } catch (error) {
    yield put(getPartenrsFail(getErrorMessage(error)))
  }
}

function* onAddPartner({ payload }) {
  const { partner, cbDone, cbFail } = payload
  try {
    const response = yield call(addPartnerAjyal, partner)
    yield put(addPartnerSuccess(response?.data))
    cbDone?.()
  } catch (error) {
    const message = getErrorMessage(error)
    notify("error", "Failed: " + message)
    yield put(addPartnerFail(message))
  }
}

function* onUpdatePartner({ payload }) {
  const { partner, id, cbDone, cbFail } = payload
  try {
    const response = yield call(updatePartnerAjyal, id, partner)
    yield put(updatePartnerSuccess(response?.data, id))
    cbDone?.()
  } catch (error) {
    const message = getErrorMessage(error)
    notify("error", "Failed: " + message)
    yield put(updatePartnerFail(message))
  }
}
function* onDeletePartner({ payload }) {
  const { partner, cbDone, cbFail } = payload
  try {
    yield call(deletePartnerAjyal, partner?.id)
    yield put(deletePartnerSuccess(partner?.id))
    cbDone?.()
  } catch (error) {
    const message = getErrorMessage(error)
    notify("error", "Failed: " + message)
    yield put(deletePartnerFail(message))
  }
}

function* partnersSaga() {
  yield takeEvery(GET_PARTNERS, fetchPartenrs)
  yield takeEvery(ADD_PARTNER, onAddPartner)
  yield takeEvery(UPDATE_PARTNER, onUpdatePartner)
  yield takeEvery(DELETE_PARTNER, onDeletePartner)
}

export default partnersSaga
