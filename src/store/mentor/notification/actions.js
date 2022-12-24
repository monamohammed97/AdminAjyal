import {
  GET_NOTIFICATION,
  GET_NOTIFICATION_SUCCESS,
  GET_NOTIFICATION_FAIL,
} from "./actionTypes"

// GET_RATES
export const getNotifications = () => ({
  type: GET_NOTIFICATION,
})

export const getNotificationsSuccess = notifications => ({
  type: GET_NOTIFICATION_SUCCESS,
  payload: notifications,
})

export const getNotificationsFail = error => ({
  type: GET_NOTIFICATION_FAIL,
  payload: error,
})
