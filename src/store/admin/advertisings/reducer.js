import {
  ADD_ADS,
  ADD_ADS_SUCCESS,
  ADD_ADS_FAIL,
  UPDATE_ADS,
  UPDATE_ADS_SUCCESS,
  UPDATE_ADS_FAIL,
  DELETE_ADS,
  DELETE_ADS_SUCCESS,
  DELETE_ADS_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  ads: [],
  isLoading: false,
  isSuccess: false,
}

const ads = (state = INIT_STATE, action) => {
  switch (action.type) {
    // add ad
    case ADD_ADS:
      return {
        ...state,
        isLoading: true,
      }
    case ADD_ADS_SUCCESS:
      return {
        ...state,
        ads: action.payload,
        isLoading: false,
        isSuccess: true
      }
    case ADD_ADS_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }

    // update ad

    case UPDATE_ADS:
      return {
        ...state,
        isLoading: true,
      }
    case UPDATE_ADS_SUCCESS:
      return {
        ...state,
        ads: state.ads.map(ad =>
          ad.id.toString() === action.payload.id.toString()
            ? { ad, ...action.payload }
            : ad
        ),
        isLoading: false,
        isSuccess: true
      }
    case UPDATE_ADS_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }

    // delete ad

    case DELETE_ADS:
      return {
        ...state,
        isLoading: true,
      }
    case DELETE_ADS_SUCCESS:
      return {
        ...state,
        ads: state.ads.filter(
          ad => ad.id.toString() !== action.payload.id.toString()
        ),
        isLoading: false,
        isSuccess: true
      }
    case DELETE_ADS_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }


    default:
      return state
  }
}

export default ads
