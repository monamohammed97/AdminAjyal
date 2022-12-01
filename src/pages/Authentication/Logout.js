import PropTypes from "prop-types"
import React, { useEffect } from "react"
import { withRouter, useHistory } from "react-router-dom"
import { logoutUser } from "../../store/actions"

//redux
import { useDispatch } from "react-redux"

const Logout = props => {
  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(() => {
    dispatch(logoutUser(history))
  }, [])

  return <></>
}

Logout.propTypes = {
  history: PropTypes.object,
}

export default withRouter(Logout)
