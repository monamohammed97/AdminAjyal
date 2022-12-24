import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap"
import SimpleBar from "simplebar-react"
import * as moment from "moment"

//i18n
import { withTranslation } from "react-i18next"
import { useSelector, useDispatch } from "react-redux"
import { getNotifications } from "store/mentor/notification/actions"

const NotificationDropdown = props => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false)
  const dispatch = useDispatch()
  const { notification } = useSelector(store => store?.notifications)

  useEffect(() => {
    dispatch(getNotifications())
  }, [dispatch])

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="dropdown d-inline-block"
        tag="li"
      >
        <DropdownToggle
          className="btn header-item noti-icon"
          tag="button"
          id="page-header-notifications-dropdown"
        >
          <i className="bx bx-bell" /**bx-tada*/ />
          {notification && notification.length > 0 ? (
            <span className="badge bg-danger rounded-pill">
              {notification.length}
            </span>
          ) : null}
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0">
          <div className="p-3">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0"> {props.t("Notifications")} </h6>
              </Col>
            </Row>
          </div>

          <SimpleBar style={{ height: "250px" }}>
            {notification
              ? notification.map(item => (
                  <div key={item} className="text-reset notification-item">
                    <div className="d-flex">
                      <div className="flex-grow-1">
                        <h6 className="mt-0 mb-1">New Student</h6>
                        <div className="font-size-12 text-muted">
                          <p className="mb-1">Ahmad Added to React Group</p>
                          <p className="mb-0">
                            <i className="mdi mdi-clock-outline" />
                            {moment(new Date(item?.created_at)).format(
                              " MMMM Do YYYY, h:mm:ss a"
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </SimpleBar>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

export default withTranslation()(NotificationDropdown)

NotificationDropdown.propTypes = {
  t: PropTypes.any,
}
