import { call, put, takeEvery } from "redux-saga/effects"

// Ecommerce Redux States
import { ADD_MENTOR, UPDATE_MENTOR, DELETE_MENTOR } from "./actionTypes"
import {
  addMentorSuccess,
  addMentorFail,
  updateMentorSuccess,
  updateMentorFail,
  deleteMentorSuccess,
  deleteMentorFail,
} from "./actions"
import {
  addMentorAjyal,
  deleteMentorAjyal,
  updateMentorAjyal,
} from "helpers/fakebackend_helper"

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
    yield put(updateMentorSuccess, response?.message)
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(updateMentorFail(error))
  }
}
function* onDeleteMentor({ payload }) {
  const { mentor, cbDone, cbFail } = payload
  try {
    const response = yield call(deleteMentorAjyal, mentor?.id)
    console.log(response)
    yield put(deleteMentorSuccess(response))
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(deleteMentorFail(error))
  }
}

function* mentorsSaga() {
  yield takeEvery(ADD_MENTOR, onAddMentor)
  yield takeEvery(UPDATE_MENTOR, onUpdateMentor)
  yield takeEvery(DELETE_MENTOR, onDeleteMentor)
}

export default mentorsSaga
