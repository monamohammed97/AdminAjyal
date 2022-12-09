import { call, put, takeEvery } from "redux-saga/effects"

// Ecommerce Redux States
import { GET_MENTORS, ADD_MENTOR, UPDATE_MENTOR, DELETE_MENTOR } from "./actionTypes"
import {
  getMentorsFail,
  getMentorsSuccess,
  addMentorSuccess,
  addMentorFail,
  updateMentorSuccess,
  updateMentorFail,
  deleteMentorSuccess,
  deleteMentorFail,
} from "./actions"
import {
  getMentorsAjyal,
  addMentorAjyal,
  deleteMentorAjyal,
  updateMentorAjyal,
} from "helpers/fakebackend_helper"

// mentors
function* fetchMentors() {
  try {
    const response = yield call(getMentorsAjyal)
    yield put(getMentorsSuccess(response?.data))
  } catch (error) {
    yield put(getMentorsFail(error))
  }
}

function* onAddMentor({ payload }) {
  const { mentor, cbDone, cbFail } = payload
  try {
    const response = yield call(addMentorAjyal, mentor)
    yield put(addMentorSuccess(response?.data))
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(addMentorFail(error))
  }
}

function* onUpdateMentor({ payload }) {
  const { mentor, id, cbDone, cbFail } = payload
  try {
    const response = yield call(updateMentorAjyal, id, mentor)
    yield put(updateMentorSuccess(response?.data ,id))
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(updateMentorFail(error))
  }
}
function* onDeleteMentor({ payload }) {
  const { mentor, cbDone, cbFail } = payload
  try {
    yield call(deleteMentorAjyal, mentor?.id)
    yield put(deleteMentorSuccess(mentor?.id))
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(deleteMentorFail(error))
  }
}

function* mentorsSaga() {
  yield takeEvery(GET_MENTORS, fetchMentors)
  yield takeEvery(ADD_MENTOR, onAddMentor)
  yield takeEvery(UPDATE_MENTOR, onUpdateMentor)
  yield takeEvery(DELETE_MENTOR, onDeleteMentor)
}

export default mentorsSaga
