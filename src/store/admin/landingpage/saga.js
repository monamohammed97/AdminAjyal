import { call, put, takeEvery } from "redux-saga/effects"

// Ecommerce Redux States
import { ADD_ABOUTUS } from "./actionTypes"
import { addAboutusSuccess, addAboutusFail } from "./actions"
import { addAboutusAjyal } from "helpers/fakebackend_helper"

function* onAddAboutus({ payload }) {
  console.log("1")
  const { aboutUs, cbDone, cbFail } = payload
  console.log("payload", payload)
  try {
    console.log("aboutUS", aboutUs)

    var data = new FormData()
    data.append("content", aboutUs.content)
    data.append("images[]", aboutUs.images)
    const response = yield call(addAboutusAjyal, data)
    console.log("try")
    yield put(addAboutusSuccess(response?.data))
    cbDone?.()
  } catch (error) {
    console.log(error)
    cbFail?.()
    yield put(addAboutusFail(error))
  }
}

function* landingPageSaga() {
  yield takeEvery(ADD_ABOUTUS, onAddAboutus)
}

export default landingPageSaga
