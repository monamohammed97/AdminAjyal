import { call, put, takeEvery } from "redux-saga/effects"
import { getErrorMessage } from "helpers/http-error"
import { notify } from "components/Common/notify"

// Ecommerce Redux States
import {
  GET_PROJECTS,
  ADD_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
} from "./actionTypes"
import {
  getProjectsFail,
  getProjectsSuccess,
  addProjectSuccess,
  addProjectFail,
  updateProjectSuccess,
  updateProjectFail,
  deleteProjectSuccess,
  deleteProjectFail,
} from "./actions"
import {
  getProjectsAjyal,
  addProjectAjyal,
  deleteProjectAjyal,
  updateProjectAjyal,
} from "helpers/fakebackend_helper"

// GET_PROJECTS
function* fetchProjects() {
  try {
    const response = yield call(getProjectsAjyal)
    yield put(getProjectsSuccess(response?.data))
  } catch (error) {
    yield put(getProjectsFail(getErrorMessage(error)))
  }
}

function* onAddProject({ payload }) {
  const { project, cbDone, cbFail } = payload
  try {
    const response = yield call(addProjectAjyal, project)
    yield put(addProjectSuccess(response?.data))
    cbDone?.()
  } catch (error) {
    const message = getErrorMessage(error)
    notify("error", "Failed: " + message)
    yield put(addProjectFail(message))
  }
}

function* onUpdateProject({ payload }) {
  const { project, id, cbDone, cbFail } = payload
  try {
    const response = yield call(updateProjectAjyal, id, project)
    yield put(updateProjectSuccess(response?.data, id))
    cbDone?.()
  } catch (error) {
    const message = getErrorMessage(error)
    notify("error", "Failed: " + message)
    yield put(updateProjectFail(message))
  }
}
function* onDeleteProject({ payload }) {
  const { project, cbDone, cbFail } = payload
  try {
    yield call(deleteProjectAjyal, project?.id)
    yield put(deleteProjectSuccess(project?.id))
    cbDone?.()
  } catch (error) {
    const message = getErrorMessage(error)
    notify("error", "Failed: " + message)
    yield put(deleteProjectFail(message))
  }
}

function* projectsSaga() {
  yield takeEvery(GET_PROJECTS, fetchProjects)
  yield takeEvery(ADD_PROJECT, onAddProject)
  yield takeEvery(UPDATE_PROJECT, onUpdateProject)
  yield takeEvery(DELETE_PROJECT, onDeleteProject)
}

export default projectsSaga
