import { call, put, takeEvery } from "redux-saga/effects"
import { getKeyByValue } from "helpers/find-key"
import { getErrorMessage } from "helpers/http-error"
import { notify } from "components/Common/notify"

// Ecommerce Redux States
import { GET_ABOUTUS, ADD_ABOUTUS } from "./actionTypes"
import {
  getAboutusSuccess,
  getAboutusFail,
  addAboutusSuccess,
  addAboutusFail,
} from "./actions"
import { getAboutusAjyal, addAboutusAjyal } from "helpers/fakebackend_helper"

// GET_ABOUTUS
function* fetchAboutus() {
  try {
    const response = yield call(getAboutusAjyal)
    yield put(
      getAboutusSuccess(
        getKeyByValue(response?.data?.pageContent, "aboutUs")?.aboutUs
      )
    )
  } catch (error) {
    yield put(getAboutusFail(getErrorMessage(error)))
  }
}

function* onAddAboutus({ payload }) {
  const { aboutUs, cbDone, cbFail } = payload
  try {
    const response = yield call(addAboutusAjyal, aboutUs)
    yield put(addAboutusSuccess(response?.data))
    cbDone?.()
  } catch (error) {
    const message = getErrorMessage(error)
    notify("error", "Failed: " + message)
    yield put(addAboutusFail(message))
  }
}

function* landingPageSaga() {
  yield takeEvery(GET_ABOUTUS, fetchAboutus)
  yield takeEvery(ADD_ABOUTUS, onAddAboutus)
}

export default landingPageSaga
