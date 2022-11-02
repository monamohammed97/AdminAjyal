import { call, put, takeEvery } from "redux-saga/effects"

// Ecommerce Redux States
import { ADD_ADS, UPDATE_ADS, DELETE_ADS } from "./actionTypes"
import {
  addAdsSuccess,
  addAdsFail,
  updateAdsSuccess,
  updateAdsFail,
  deleteAdsSuccess,
  deleteAdsFail,
} from "./actions"
import {
  addAdsAjyal,
  deleteAdsAjyal,
  updateAdsAjyal,
} from "helpers/fakebackend_helper"

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
    yield put(updateAdsSuccess, response?.message)
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(updateAdsFail(error))
  }
}
function* onDeleteAds({ payload }) {
  const { ads, cbDone, cbFail } = payload
  try {
    const response = yield call(deleteAdsAjyal, ads?.id)
    console.log(response)
    yield put(deleteAdsSuccess(response))
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(deleteAdsFail(error))
  }
}

function* advertisingsSaga() {
  yield takeEvery(ADD_ADS, onAddAds)
  yield takeEvery(UPDATE_ADS, onUpdateAds)
  yield takeEvery(DELETE_ADS, onDeleteAds)
}

export default advertisingsSaga
