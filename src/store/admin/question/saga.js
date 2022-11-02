import { call, put, takeEvery } from "redux-saga/effects"

// Ecommerce Redux States
import { ADD_QUESTION, UPDATE_QUESTION, DELETE_QUESTION } from "./actionTypes"
import {
  addQuestionSuccess,
  addQuestionFail,
  updateQuestionSuccess,
  updateQuestionFail,
  deleteQuestionSuccess,
  deleteQuestionFail,
} from "./actions"
import {
  addQuestionAjyal,
  deleteQuestionAjyal,
  updateQuestionAjyal,
} from "helpers/fakebackend_helper"

function* onAddQuestion({ payload }) {
  const { question, cbDone, cbFail } = payload
  try {
    const response = yield call(addQuestionAjyal, question)
    yield put(addQuestionSuccess(response?.data))
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(addQuestionFail(error))
  }
}

function* onUpdateQuestion({ payload }) {
  const { question, id, cbDone, cbFail } = payload
  try {
    const response = yield call(updateQuestionAjyal, id, question)
    yield put(updateQuestionSuccess, response?.message)
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(updateQuestionFail(error))
  }
}
function* onDeleteQuestion({ payload }) {
  const { question, cbDone, cbFail } = payload
  try {
    const response = yield call(deleteQuestionAjyal, question?.id)
    console.log(response)
    yield put(deleteQuestionSuccess(response))
    cbDone?.()
  } catch (error) {
    cbFail?.()
    yield put(deleteQuestionFail(error))
  }
}

function* questionsSaga() {
  yield takeEvery(ADD_QUESTION, onAddQuestion)
  yield takeEvery(UPDATE_QUESTION, onUpdateQuestion)
  yield takeEvery(DELETE_QUESTION, onDeleteQuestion)
}

export default questionsSaga
