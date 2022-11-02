import { call, put, takeEvery } from "redux-saga/effects"

// Ecommerce Redux States
import { ADD_PLATFORM, UPDATE_PLATFORM, DELETE_PLATFORM } from "./actionTypes"
import {
  addPlatformSuccess,
  addPlatformFail,
  updatePlatformSuccess,
  updatePlatformFail,
  deletePlatformSuccess,
  deletePlatformFail,
} from "./actions"
import {
  addPlatformAjyal,
  deletePlatformAjyal,
  updatePlatformAjyal,
} from "helpers/fakebackend_helper"

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
    yield put(updatePlatformSuccess, response?.message)
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(updatePlatformFail(error))
  }
}
function* onDeletePlatform({ payload }) {
  const { platform, cbDone, cbFail } = payload
  try {
    const response = yield call(deletePlatformAjyal, platform?.id)
    console.log(response)
    yield put(deletePlatformSuccess(response))
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(deletePlatformFail(error))
  }
}

function* platformsSaga() {
  yield takeEvery(ADD_PLATFORM, onAddPlatform)
  yield takeEvery(UPDATE_PLATFORM, onUpdatePlatform)
  yield takeEvery(DELETE_PLATFORM, onDeletePlatform)
}

export default platformsSaga
