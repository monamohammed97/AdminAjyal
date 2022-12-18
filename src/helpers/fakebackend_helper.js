import axios from "axios"
import Platforms from "pages/Platforms/Platforms"
import { del, get, post, put } from "./api_helper"
import * as url from "./url_helper"

// Gets the logged in user data from local session
const getLoggedInUser = () => {
  const user = localStorage.getItem("user")
  if (user) return JSON.parse(user)
  return null
}

//is user is logged in
const isUserAuthenticated = () => {
  return getLoggedInUser() !== null
}

// Register Method
const postFakeRegister = data => {
  return axios
    .post(url.POST_FAKE_REGISTER, data)
    .then(response => {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    })
    .catch(err => {
      let message
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found"
            break
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team"
            break
          case 401:
            message = "Invalid credentials"
            break
          default:
            message = err[1]
            break
        }
      }
      throw message
    })
}

// Login Method
const postLogin = data => post(url.POST_LOGIN, data)
export const adminLogin = data => post(url.ADMIN_LOGIN, data)
export const studentLogin = data => post(url.STUDENT_LOGIN, data)
export const mentorLogin = data => post(url.MENTOR_LOGIN, data)

// postForgetPwd
const postFakeForgetPwd = data => post(url.POST_FAKE_PASSWORD_FORGET, data)

// Edit profile
const postJwtProfile = data => post(url.POST_EDIT_JWT_PROFILE, data)

const postFakeProfile = data => post(url.POST_EDIT_PROFILE, data)

// Register Method
const postJwtRegister = (url, data) => {
  return axios
    .post(url, data)
    .then(response => {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    })
    .catch(err => {
      var message
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found"
            break
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team"
            break
          case 401:
            message = "Invalid credentials"
            break
          default:
            message = err[1]
            break
        }
      }
      throw message
    })
}

// Login Method
const postJwtLogin = data => post(url.POST_FAKE_JWT_LOGIN, data)
// Login Method
const postFakeLogin = data => post(url.POST_FAKE_LOGIN, data)

// postForgetPwd
const postJwtForgetPwd = data => post(url.POST_FAKE_JWT_PASSWORD_FORGET, data)

// postSocialLogin
export const postSocialLogin = data => post(url.SOCIAL_LOGIN, data)

// get Products
export const getProducts = () => get(url.GET_PRODUCTS)

// get offers
export const getOffers = () => get(url.GET_OFFERS)
export const addNewOffer = offer => post(url.ADD_NEW_OFFER, offer)
export const deleteOffer = offer => del(url.DELETE_OFFER, { id: offer?.id })
export const updateOffer = (id, offer) => {
  var config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-HTTP-Method-Override": "put",
    },
  }
  return post(`${url.UPDATE_OFFER}/${id}`, offer, config)
}

// get Product detail
export const getProductDetail = id =>
  get(`${url.GET_PRODUCTS_DETAIL}/${id}`, { params: { id } })

// get Events
export const getEvents = () => get(url.GET_EVENTS)

// add Events
export const addNewEvent = event => post(url.ADD_NEW_EVENT, event)

// update Event
export const updateEvent = event => put(url.UPDATE_EVENT, event)

// delete Event
export const deleteEvent = event =>
  del(url.DELETE_EVENT, { headers: { event } })

// get Categories
export const getCategories = () => get(url.GET_CATEGORIES)

// get chats
export const getChats = () => get(url.GET_CHATS)

// get groups
export const getGroups = () => get(url.GET_GROUPS)

// get Contacts
export const getContacts = () => get(url.GET_CONTACTS)

// get messages
export const getMessages = (roomId = "") =>
  get(`${url.GET_MESSAGES}/${roomId}`, { params: { roomId } })

// post messages
export const addMessage = message => post(url.ADD_MESSAGE, message)

// get orders
export const getOrders = () => get(url.GET_ORDERS)
export const getOrdersData = () => get(url.GET_ORDERS_DATA)

// add order
export const addNewOrder = order => post(url.ADD_NEW_ORDER, order)

// update order
export const updateOrder = order => put(url.UPDATE_ORDER, order)

// delete order
export const deleteOrder = order =>
  del(url.DELETE_ORDER, { headers: { order } })

// get cart data
export const getCartData = () => get(url.GET_CART_DATA)

// get customers
export const getCustomers = () => get(url.GET_CUSTOMERS)

// add CUSTOMER
export const addNewCustomer = customer => post(url.ADD_NEW_CUSTOMER, customer)

// update CUSTOMER
export const updateCustomer = customer => put(url.UPDATE_CUSTOMER, customer)

// delete CUSTOMER
export const deleteCustomer = customer =>
  del(url.DELETE_CUSTOMER, { headers: { customer } })

// get shops
export const getShops = () => get(url.GET_SHOPS)

// get wallet
export const getWallet = () => get(url.GET_WALLET)

// get crypto order
export const getCryptoOrder = () => get(url.GET_CRYPTO_ORDERS)

// get invoices
export const getInvoices = () => get(url.GET_INVOICES)

// get invoice details
export const getInvoiceDetail = id =>
  get(`${url.GET_INVOICE_DETAIL}/${id}`, { params: { id } })

// get project
// export const getProjects = () => get(url.GET_PROJECTS)

// get project details
// export const getProjectsDetails = id =>
//   get(`${url.GET_PROJECT_DETAIL}/${id}`, { params: { id } })

// get tasks
export const getTasks = () => get(url.GET_TASKS)

// get doctors
export const getDoctors = () => get(url.GET_DOCTORS)
export const addNewDoctor = doctor => post(url.ADD_NEW_DOCTOR, doctor)
export const deleteDoctor = doctor => del(url.DELETE_DOCTOR, { id: doctor?.id })
export const updateDoctor = (id, doctor) => {
  var config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-HTTP-Method-Override": "put",
    },
  }
  return post(`${url.UPDATE_DOCTOR}/${id}`, doctor, config)
}

export const getClinics = () =>
  axios.get("api/clinic/clList?pageNo=1&offset=1&rows=50&lang=en")
export const addNewClinic = clinic => post(url.ADD_NEW_CLINIC, clinic)
export const deleteClinic = clinic => del(url.DELETE_CLINIC, { id: clinic?.id })
export const updateClinic = clinic => put(url.UPDATE_CLINIC, clinic)

// get Pages
export const getPages = () => get(url.GET_PAGES)
export const addNewPage = page => post(url.ADD_NEW_PAGE, page)
export const deletePage = page => del(url.DELETE_PAGE, { id: page?.id })
export const updatePage = (id, page) => put(`${url.UPDATE_PAGE}/${id}`, page)

// get Contact
export const getContact = () => get(url.GET_CONTACT)
export const addNewContact = contact => post(url.ADD_NEW_CONTACT, contact)
export const deleteContact = contact =>
  del(url.DELETE_CONTACT, { id: contact?.id })
export const updateContact = (id, contact) => {
  var config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-HTTP-Method-Override": "put",
    },
  }
  return post(`${url.UPDATE_CONTACT}/${id}`, contact, config)
}

// get Consultation
export const getConsultation = () => get(url.GET_CONSULTATION)
export const addNewConsultation = consultation =>
  post(url.ADD_NEW_CONSULTATION, consultation)
export const deleteConsultation = consultation =>
  del(url.DELETE_CONSULTATION, { id: consultation?.id })
export const updateConsultation = consultation =>
  put(url.UPDATE_CONSULTATION, consultation)

// get Booking
export const getBooking = () => get(url.GET_BOOKING)
export const addNewBooking = reservations =>
  post(url.ADD_NEW_BOOKING, reservations)
export const deleteBooking = reservations =>
  del(url.DELETE_BOOKING, { id: reservations?.id })
export const updateBooking = reservations =>
  put(url.UPDATE_BOOKING, reservations)

// get File
export const getFile = () => get(url.GET_FILE)
export const addNewFile = file => post(url.ADD_NEW_FILE, file)
export const deleteFile = file => del(url.DELETE_FILE, { id: file?.id })
export const updateFile = file => put(url.UPDATE_FILE, file)

// export const deleteDoctor = ()=> del(`${url.DELETE_DOCTOR}`);
// export const getDoctors = async () =>{
//   const res = await axiosApi.get(url.GET_DOCTORS);
//   const data = await res.JSON();
// };

// get clinics

// get contacts

export const getUsers = () => get(url.GET_USERS)

// add user
export const addNewUser = user => post(url.ADD_NEW_USER, user)

// add user

// update user
export const updateUser = user => put(url.UPDATE_USER, user)

// delete user
export const deleteUser = user => del(url.DELETE_USER, { headers: { user } })

/** PROJECT */
// add user
// export const addNewProject = project => post(url.ADD_NEW_PROJECT, project)

// update user
// export const updateProject = project => put(url.UPDATE_PROJECT, project)

// delete user
// export const deleteProject = project =>
//   del(url.DELETE_PROJECT, { headers: { project } })

export const getUserProfile = () => get(url.GET_USER_PROFILE)

// get inboxmail
export const getInboxMails = () => get(url.GET_INBOX_MAILS)

// add inboxmail
export const addNewInboxMail = inboxmail =>
  post(url.ADD_NEW_INBOX_MAIL, inboxmail)

// delete inboxmail
export const deleteInboxMail = inboxmail =>
  del(url.DELETE_INBOX_MAIL, { headers: { inboxmail } })

// get starredmail
export const getStarredMails = () => get(url.GET_STARRED_MAILS)

// get importantmail
export const getImportantMails = () => get(url.GET_IMPORTANT_MAILS)

// get sent mail
export const getSentMails = () => get(url.GET_SENT_MAILS)

// get trash mail
export const getTrashMails = () => get(url.GET_TRASH_MAILS)

// get starredmail
export const getDraftMails = () => get(url.GET_DRAFT_MAILS)

// get dashboard charts data
export const getWeeklyData = () => get(url.GET_WEEKLY_DATA)
export const getYearlyData = () => get(url.GET_YEARLY_DATA)
export const getMonthlyData = () => get(url.GET_MONTHLY_DATA)

export const topSellingData = month =>
  get(`${url.TOP_SELLING_DATA}/${month}`, { params: { month } })

export const getEarningChartsData = month =>
  get(`${url.GET_EARNING_DATA}/${month}`, { params: { month } })

const getProductComents = () => get(url.GET_PRODUCT_COMMENTS)

const onLikeComment = (commentId, productId) => {
  return post(`${url.ON_LIKNE_COMMENT}/${productId}/${commentId}`, {
    params: { commentId, productId },
  })
}
const onLikeReply = (commentId, productId, replyId) => {
  return post(`${url.ON_LIKNE_COMMENT}/${productId}/${commentId}/${replyId}`, {
    params: { commentId, productId, replyId },
  })
}

const onAddReply = (commentId, productId, replyText) => {
  return post(`${url.ON_ADD_REPLY}/${productId}/${commentId}`, {
    params: { commentId, productId, replyText },
  })
}

const onAddComment = (productId, commentText) => {
  return post(`${url.ON_ADD_COMMENT}/${productId}`, {
    params: { productId, commentText },
  })
}

export {
  getLoggedInUser,
  isUserAuthenticated,
  postFakeRegister,
  postLogin,
  postFakeProfile,
  postFakeForgetPwd,
  postJwtRegister,
  postJwtLogin,
  postFakeLogin,
  postJwtForgetPwd,
  postJwtProfile,
  getProductComents,
  onLikeComment,
  onLikeReply,
  onAddReply,
  onAddComment,
}

// newwwwwwwwwwwwwwwwwwwwwwww

export const getUsersAjyal = () => get(url.GET_USERS_AJYAL)
export const addUserAjyal = user => post(url.ADD_USER_AJYAL, user)
export const deleteUserAjyal = id => del(`${url.DELETE_USER_AJYAL}/${id}`)
export const updateUserAjyal = (id, user) => {
  var config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-HTTP-Method-Override": "put",
    },
  }
  return post(`${url.UPDATE_USER_AJYAL}/${id}`, user, config)
}

export const getMentorsAjyal = () => get(url.GET_MENTORS_AJYAL)
export const addMentorAjyal = mentor => post(url.ADD_MENTOR_AJYAL, mentor)
export const deleteMentorAjyal = id => del(`${url.DELETE_MENTOR_AJYAL}/${id}`)
export const updateMentorAjyal = (id, mentor) => {
  var config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-HTTP-Method-Override": "put",
    },
  }
  return post(`${url.UPDATE_MENTOR_AJYAL}/${id}`, mentor, config)
}
// GET_PLATFORMS
export const getPlatformsAjyal = () => get(url.GET_PLATFORMS_AJYAL)
export const addPlatformAjyal = platform =>
  post(url.ADD_PLATFORM_AJYAL, platform)
export const deletePlatformAjyal = id =>
  del(`${url.DELETE_PLATFORM_AJYAL}/${id}`)
export const updatePlatformAjyal = (id, mentor) => {
  var config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-HTTP-Method-Override": "put",
    },
  }
  return post(`${url.UPDATE_PLATFORM_AJYAL}/${id}`, platform, config)
}
// GET_PARTNERS
export const getPartnersAjyal = () => get(url.GET_PARTNERS_AJYAL)
export const addPartnerAjyal = Platform => post(url.ADD_PARTNER_AJYAL, Platform)
export const deletePartnerAjyal = id => del(`${url.DELETE_PARTNER_AJYAL}/${id}`)
export const updatePartnerAjyal = (id, Platform) => {
  var config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-HTTP-Method-Override": "put",
    },
  }
  return post(`${url.UPDATE_PARTNER_AJYAL}/${id}`, Platform, config)
}
// GET_ADVERTISINGS
export const getAdsAjyal = () => get(url.GET_ADVERTISINGS_AJYAL)
export const addAdsAjyal = ads => post(url.ADD_ADVERTISING_AJYAL, ads)
export const deleteAdsAjyal = id => del(`${url.DELETE_ADVERTISING_AJYAL}/${id}`)
export const updateAdsAjyal = (id, ads) => {
  var config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-HTTP-Method-Override": "put",
    },
  }
  return post(`${url.UPDATE_ADVERTISING_AJYAL}/${id}`, ads, config)
}
// GET_ACTIVITES
export const getActivitiesAjyal = () => get(url.GET_ACTIVITES_AJYAL)
export const addActivityAjyal = activity =>
  post(url.ADD_ACTIVITE_AJYAL, activity)
export const deleteActivityAjyal = id =>
  del(`${url.DELETE_ACTIVITE_AJYAL}/${id}`)
export const updateActivityAjyal = (id, activity) => {
  var config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-HTTP-Method-Override": "put",
    },
  }
  return post(`${url.UPDATE_ACTIVITE_AJYAL}/${id}`, activity, config)
}
// GET_GROUPS
export const getGroupsAjyal = () => get(url.GET_GROUPS_AJYAL)
export const addGroupAjyal = group => post(url.ADD_GROUP_AJYAL, group)
export const deleteGroupAjyal = id => del(`${url.DELETE_GROUP_AJYAL}/${id}`)
export const updateGroupAjyal = (id, group) => {
  var config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-HTTP-Method-Override": "put",
    },
  }
  return post(`${url.UPDATE_GROUP_AJYAL}/${id}`, group, config)
}
// CATEGORY
export const getCategoryAjyal = () => get(url.GET_CATEGORY_AJYAL)
export const addCategoryAjyal = category =>
  post(url.ADD_CATEGORY_AJYAL, category)
export const deleteCategoryAjyal = id =>
  del(`${url.DELETE_CATEGORY_AJYAL}/${id}`)
export const updateCategoryAjyal = (id, category) => {
  var config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-HTTP-Method-Override": "put",
    },
  }
  return post(`${url.UPDATE_CATEGORY_AJYAL}/${id}`, category, config)
}
// GET_STUDENTS
export const getStudentsAjyal = () => get(url.GET_STUDENTS_AJYAL)
export const addStudentAjyal = student => post(url.ADD_STUDENT_AJYAL, student)
export const deleteStudentAjyal = id => del(`${url.DELETE_STUDENT_AJYAL}/${id}`)
export const updateStudentAjyal = (id, student) => {
  var config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-HTTP-Method-Override": "put",
    },
  }
  return post(`${url.UPDATE_STUDENT_AJYAL}/${id}`, student, config)
}

// Import-excel
export const ImportExcelAjyal = excel => post(url.IMPORT_EXCEL, excel)

// GET_RATES
export const getRatesAjyal = () => get(url.GET_RATES_AJYAL)
export const addRateAjyal = rate => post(url.ADD_RATE_AJYAL, rate)
export const deleteRateAjyal = id => del(`${url.DELETE_RATE_AJYAL}/${id}`)
export const updateRateAjyal = (id, rate) => {
  var config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-HTTP-Method-Override": "put",
    },
  }
  return post(`${url.UPDATE_RATE_AJYAL}/${id}`, rate, config)
}
// GET_COURSES
export const getCoursesAjyal = () => get(url.GET_COURSES_AJYAL)
export const addCourseAjyal = course => post(url.ADD_COURSE_AJYAL, course)
export const deleteCourseAjyal = id => del(`${url.DELETE_COURSE_AJYAL}/${id}`)
export const updateCourseAjyal = (id, course) => {
  var config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-HTTP-Method-Override": "put",
    },
  }
  return post(`${url.UPDATE_COURSE_AJYAL}/${id}`, course, config)
}
// GET_QUESTIONS
export const getQuestionsAjyal = () => get(url.GET_QUESTIONS_AJYAL)
export const addQuestionAjyal = course => post(url.ADD_QUESTION_AJYAL, course)
export const deleteQuestionAjyal = id =>
  del(`${url.DELETE_QUESTION_AJYAL}/${id}`)
export const updateQuestionAjyal = (id, course) => {
  var config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-HTTP-Method-Override": "put",
    },
  }
  return post(`${url.UPDATE_QUESTION_AJYAL}/${id}`, course, config)
}
// GET_PROJECTS
export const getProjectsAjyal = () => get(url.GET_PROJECTS_AJYAL)
export const addProjectAjyal = project => post(url.ADD_PROJECT_AJYAL, project)
export const deleteProjectAjyal = id => del(`${url.DELETE_PROJECT_AJYAL}/${id}`)
export const updateProjectAjyal = (id, project) => {
  var config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-HTTP-Method-Override": "put",
    },
  }
  return post(`${url.UPDATE_PROJECT_AJYAL}/${id}`, project, config)
}
// ACTIVITY_TYPE
export const getActivityTypesAjyal = () => get(url.GET_ACTIVITY_TYPES_AJYAL)
export const addActivityTypeAjyal = activityType =>
  post(url.ADD_ACTIVITY_TYPE_AJYAL, activityType)
export const deleteActivityTypeAjyal = id =>
  del(`${url.DELETE_ACTIVITY_TYPE_AJYAL}/${id}`)

export const updateActivityTypeAjyal = (id, activityType) => {
  var config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-HTTP-Method-Override": "put",
    },
  }
  return post(`${url.UPDATE_ACTIVITY_TYPE_AJYAL}/${id}`, activityType, config)
}

//NOTIFICATION
export const getNotificationsAjyal = () => get(url.GET_NOTIFICATION)

// FREELANCER
export const getFreelanceAjyal = () => get(url.GET_FREELANCER_AJYAL)
export const addFreelanceAjyal = freelance =>
  post(url.ADD_FREELANCER_AJYAL, freelance)
export const deleteFreelanceAjyal = id =>
  del(`${url.DELETE_FREELANCER_AJYAL}/${id}`)
export const updateFreelanceAjyal = (id, freelance) => {
  var config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-HTTP-Method-Override": "put",
    },
  }
  return post(`${url.UPDATE_FREELANCER_AJYAL}/${id}`, freelance, config)
}

// GET_CONTACTS
export const getContactsAjyal = () => get(url.GET_CONTACTS_AJYAL)
export const deleteContactAjyal = id =>
  del(`${url.DELETE_CONTACTS_AJYAL}/${id}`)

// GET_CONTACTS
export const getAboutusAjyal = () => get(url.GET_ABOUTUS_AJYAL)
export const addAboutusAjyal = aboutus => {
  var config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  }
  return post(url.ADD_ABOUTUS_AJYAL, aboutus, config)
}
// change Pass
export const changePass = data => {
  const token = localStorage.getItem("token")
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  return post(url.CHANGE_PASS, data, config)
}
