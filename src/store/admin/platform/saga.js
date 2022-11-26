import { call, put, takeEvery } from "redux-saga/effects"

// Ecommerce Redux States
import { ADD_PLATFORM, UPDATE_PLATFORM, DELETE_PLATFORM, GET_PLATFORMS } from "./actionTypes"
import {
  getPlatformsFail,
  getPlatformsSuccess,
  addPlatformSuccess,
  addPlatformFail,
  updatePlatformSuccess,
  updatePlatformFail,
  deletePlatformSuccess,
  deletePlatformFail,
} from "./actions"
import {
  getPlatformsAjyal,
  addPlatformAjyal,
  deletePlatformAjyal,
  updatePlatformAjyal,
} from "helpers/fakebackend_helper"

// GET_PLATFORMS
function* fetchPlatforms() {
  try {
    const response = yield call(getPlatformsAjyal)
    yield put(getPlatformsSuccess(response?.data))
  } catch (error) {
    yield put(getPlatformsFail(error))
  }
}

function* onAddPlatform({ payload }) {
  const { platform, cbDone, cbFail } = payload
  try {
    const response = yield call(addPlatformAjyal, platform)
    yield put(addPlatformSuccess(response?.data))
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(addPlatformFail(error))
  }
}

function* onUpdatePlatform({ payload }) {
  const { platform, id, cbDone, cbFail } = payload
  try {
    const response = yield call(updatePlatformAjyal, id, platform)
    yield put(updatePlatformSuccess(response?.data, id))
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(updatePlatformFail(error))
  }
}

function* onDeletePlatform({ payload }) {
  const { platform, cbDone, cbFail } = payload
  try {
    yield call(deletePlatformAjyal, platform?.id)
    yield put(deletePlatformSuccess(platform?.id))
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(deletePlatformFail(error))
  }
}

function* platformsSaga() {
  yield takeEvery(GET_PLATFORMS, fetchPlatforms)
  yield takeEvery(ADD_PLATFORM, onAddPlatform)
  yield takeEvery(UPDATE_PLATFORM, onUpdatePlatform)
  yield takeEvery(DELETE_PLATFORM, onDeletePlatform)
}

export default platformsSaga
