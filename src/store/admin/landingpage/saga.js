import { call, put, takeEvery } from "redux-saga/effects"
import { getErrorMessage } from "helpers/http-error"
import { notify } from "components/Common/notify"

// Ecommerce Redux States
import {
  GET_LANDING_PAGE_CONTENT,
  ADD_LANDING_PAGE_SECTION,
} from "./actionTypes"
import {
  getLandingPageContentSuccess,
  getLandingPageContentFail,
  addLandingPageContentSuccess,
  addLandingPageContentFail,
} from "./actions"
import {
  getLandingPageContentAjyal,
  addLandingPageContentAjyal,
} from "helpers/fakebackend_helper"

function* fetchLandingPageContent() {
  try {
    const response = yield call(getLandingPageContentAjyal)
    yield put(getLandingPageContentSuccess(response?.data?.pageContent))
  } catch (error) {
    yield put(getLandingPageContentFail(getErrorMessage(error)))
  }
}

function* onAddLandingPageContent({ payload }) {
  const { key, content, cbDone, cbFail } = payload
  try {
    const response = yield call(addLandingPageContentAjyal, key, content)
    yield put(addLandingPageContentSuccess(key, response?.data))
    cbDone?.()
  } catch (error) {
    const message = getErrorMessage(error)
    notify("error", "Failed: " + message)
    yield put(addLandingPageContentFail(message))
  }
}

function* landingPageSaga() {
  yield takeEvery(GET_LANDING_PAGE_CONTENT, fetchLandingPageContent)
  yield takeEvery(ADD_LANDING_PAGE_SECTION, onAddLandingPageContent)
}

export default landingPageSaga
