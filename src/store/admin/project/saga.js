import { call, put, takeEvery } from "redux-saga/effects"

// Ecommerce Redux States
import { ADD_PROJECT, UPDATE_PROJECT, DELETE_PROJECT } from "./actionTypes"
import {
  addProjectSuccess,
  addProjectFail,
  updateProjectSuccess,
  updateProjectFail,
  deleteProjectSuccess,
  deleteProjectFail,
} from "./actions"
import {
  addProjectAjyal,
  deleteProjectAjyal,
  updateProjectAjyal,
} from "helpers/fakebackend_helper"

function* onAddProject({ payload }) {
  const { project, cbDone, cbFail } = payload
  try {
    const response = yield call(addProjectAjyal, project)
    yield put(addProjectSuccess(response?.data))
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(addProjectFail(error))
  }
}

function* onUpdateProject({ payload }) {
  const { project, id, cbDone, cbFail } = payload
  try {
    const response = yield call(updateProjectAjyal, id, project)
    yield put(updateProjectSuccess, response?.message)
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(updateProjectFail(error))
  }
}
function* onDeleteProject({ payload }) {
  const { project, cbDone, cbFail } = payload
  try {
    const response = yield call(deleteProjectAjyal, project?.id)
    console.log(response)
    yield put(deleteProjectSuccess(response))
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(deleteProjectFail(error))
  }
}

function* projectsSaga() {
  yield takeEvery(ADD_PROJECT, onAddProject)
  yield takeEvery(UPDATE_PROJECT, onUpdateProject)
  yield takeEvery(DELETE_PROJECT, onDeleteProject)
}

export default projectsSaga
