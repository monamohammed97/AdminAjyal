import {

  
  
} from "./actionTypes"

const INIT_STATE = {
  users: [],
  mentors: [],
  platforms: [],
  partners: [],
  ads: [],
  activities: [],
  projects: [],
  groups: [],
  category: [],
  students: [],
  rates: [],
  courses: [],
  questions: [],
  activityTypes: [],
  freelancer: [],
  contacts: [],
  aboutUS: {},
  isLoading: false,
}

const data = (state = INIT_STATE, action) => {
  switch (action.type) {

    

    
    default:
      return state
  }
}

export default data
