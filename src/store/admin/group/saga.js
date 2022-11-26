import { call, put, takeEvery } from "redux-saga/effects"

// Ecommerce Redux States
import {
  GET_GROUPS,
  ADD_GROUP,
  UPDATE_GROUP,
  DELETE_GROUP,
} from "./actionTypes"
import {
  getGroupsSuccess,
  getGroupsFail,
  addGroupSuccess,
  addGroupFail,
  updateGroupSuccess,
  updateGroupFail,
  deleteGroupSuccess,
  deleteGroupFail,
} from "./actions"
import {
  getGroupsAjyal,
  addGroupAjyal,
  deleteGroupAjyal,
  updateGroupAjyal,
} from "helpers/fakebackend_helper"

// GET_GROUPS
function* fetchGroups() {
  try {
    const response = yield call(getGroupsAjyal)
    yield put(getGroupsSuccess(response?.data))
  } catch (error) {
    yield put(getGroupsFail(error))
  }
}

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
    yield put(updateGroupSuccess(response?.data, id))
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(updateGroupFail(error))
  }
}
function* onDeleteGroup({ payload }) {
  const { group, cbDone, cbFail } = payload
  try {
    yield call(deleteGroupAjyal, group?.id)
    yield put(deleteGroupSuccess(group?.id))
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(deleteGroupFail(error))
  }
}

function* groupsSaga() {
  yield takeEvery(GET_GROUPS, fetchGroups)
  yield takeEvery(ADD_GROUP, onAddGroup)
  yield takeEvery(UPDATE_GROUP, onUpdateGroup)
  yield takeEvery(DELETE_GROUP, onDeleteGroup)
}

export default groupsSaga
