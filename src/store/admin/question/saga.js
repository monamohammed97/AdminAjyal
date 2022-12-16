import { call, put, takeEvery } from "redux-saga/effects"
import { getErrorMessage } from "helpers/http-error"
import { notify } from "components/Common/notify"

// Ecommerce Redux States
import {
  GET_QUESTIONS,
  ADD_QUESTION,
  UPDATE_QUESTION,
  DELETE_QUESTION,
} from "./actionTypes"
import {
  getQuestionsFail,
  getQuestionsSuccess,
  addQuestionSuccess,
  addQuestionFail,
  updateQuestionSuccess,
  updateQuestionFail,
  deleteQuestionSuccess,
  deleteQuestionFail,
} from "./actions"
import {
  getQuestionsAjyal,
  addQuestionAjyal,
  deleteQuestionAjyal,
  updateQuestionAjyal,
} from "helpers/fakebackend_helper"

// GET_QUESTIONS
function* fetchQuestions() {
  try {
    const response = yield call(getQuestionsAjyal)
    yield put(getQuestionsSuccess(response?.data))
  } catch (error) {
    yield put(getQuestionsFail(getErrorMessage(error)))
  }
}

function* onAddQuestion({ payload }) {
  const { question, cbDone, cbFail } = payload
  try {
    const response = yield call(addQuestionAjyal, question)
    yield put(addQuestionSuccess(response?.data))
    cbDone?.()
  } catch (error) {
    const message = getErrorMessage(error)
    notify("error", "Failed: " + message)
    yield put(addQuestionFail(message))
  }
}

function* onUpdateQuestion({ payload }) {
  const { question, id, cbDone, cbFail } = payload
  try {
    const response = yield call(updateQuestionAjyal, id, question)
    yield put(updateQuestionSuccess(response?.data, id))
    cbDone?.()
  } catch (error) {
    const message = getErrorMessage(error)
    notify("error", "Failed: " + message)
    yield put(updateQuestionFail(message))
  }
}
function* onDeleteQuestion({ payload }) {
  const { question, cbDone, cbFail } = payload
  try {
    const response = yield call(deleteQuestionAjyal, question?.id)
    yield put(deleteQuestionSuccess(question?.id))
    cbDone?.()
  } catch (error) {
    const message = getErrorMessage(error)
    notify("error", "Failed: " + message)
    yield put(deleteQuestionFail(message))
  }
}

function* questionsSaga() {
  yield takeEvery(GET_QUESTIONS, fetchQuestions)
  yield takeEvery(ADD_QUESTION, onAddQuestion)
  yield takeEvery(UPDATE_QUESTION, onUpdateQuestion)
  yield takeEvery(DELETE_QUESTION, onDeleteQuestion)
}

export default questionsSaga
