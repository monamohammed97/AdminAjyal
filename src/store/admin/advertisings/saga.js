import { call, put, takeEvery } from "redux-saga/effects"

// Ecommerce Redux States
import { GET_ADVERTISINGS, ADD_ADS, UPDATE_ADS, DELETE_ADS } from "./actionTypes"
import {
  getAdsFail,
  getAdsSuccess,
  addAdsSuccess,
  addAdsFail,
  updateAdsSuccess,
  updateAdsFail,
  deleteAdsSuccess,
  deleteAdsFail,
} from "./actions"
import {
  getAdsAjyal,
  addAdsAjyal,
  deleteAdsAjyal,
  updateAdsAjyal,
} from "helpers/fakebackend_helper"

// GET_ADVERTISINGS
function* fetchAds() {
  try {
    const response = yield call(getAdsAjyal)
    yield put(getAdsSuccess(response?.data))
  } catch (error) {
    yield put(getAdsFail(error))
  }
}

function* onAddAds({ payload }) {
  const { ads, cbDone, cbFail } = payload
  try {
    const response = yield call(addAdsAjyal, ads)
    yield put(addAdsSuccess(response?.data))
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(addAdsFail(error))
  }
}

function* onUpdateAds({ payload }) {
  const { ads, id, cbDone, cbFail } = payload
  try {
    const response = yield call(updateAdsAjyal, id, ads)
    yield put(updateAdsSuccess(response?.data, id))
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(updateAdsFail(error))
  }
}
function* onDeleteAds({ payload }) {
  const { ads, cbDone, cbFail } = payload
  try {
    yield call(deleteAdsAjyal, ads?.id)
    yield put(deleteAdsSuccess(ads?.id))
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(deleteAdsFail(error))
  }
}

function* advertisingsSaga() {
  yield takeEvery(GET_ADVERTISINGS, fetchAds)
  yield takeEvery(ADD_ADS, onAddAds)
  yield takeEvery(UPDATE_ADS, onUpdateAds)
  yield takeEvery(DELETE_ADS, onDeleteAds)
}

export default advertisingsSaga
