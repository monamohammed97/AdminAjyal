import { call, put, takeEvery } from "redux-saga/effects"

// Ecommerce Redux States
import { ADD_GROUP, UPDATE_GROUP, DELETE_GROUP } from "./actionTypes"
import {
  addGroupSuccess,
  addGroupFail,
  updateGroupSuccess,
  updateGroupFail,
  deleteGroupSuccess,
  deleteGroupFail,
} from "./actions"
import {
  addGroupAjyal,
  deleteGroupAjyal,
  updateGroupAjyal,
} from "helpers/fakebackend_helper"

function* onAddGroup({ payload }) {
  const { group, cbDone, cbFail } = payload
  try {
    const response = yield call(addGroupAjyal, group)
    yield put(addGroupSuccess(response?.data))
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(addGroupFail(error))
  }
}

function* onUpdateGroup({ payload }) {
  const { group, id, cbDone, cbFail } = payload
  try {
    const response = yield call(updateGroupAjyal, id, group)
    yield put(updateGroupSuccess, response?.message)
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(updateGroupFail(error))
  }
}
function* onDeleteGroup({ payload }) {
  const { group, cbDone, cbFail } = payload
  try {
    const response = yield call(deleteGroupAjyal, group?.id)
    console.log(response)
    yield put(deleteGroupSuccess(response))
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(deleteGroupFail(error))
  }
}

function* groupsSaga() {
  yield takeEvery(ADD_GROUP, onAddGroup)
  yield takeEvery(UPDATE_GROUP, onUpdateGroup)
  yield takeEvery(DELETE_GROUP, onDeleteGroup)
}

export default groupsSaga
