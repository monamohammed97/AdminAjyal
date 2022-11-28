import PropTypes from "prop-types"
import React, { useEffect, useRef } from "react"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"

const SidebarContent = props => {
  const role = localStorage?.getItem("Role")

  const ref = useRef()
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname

    const initMenu = () => {
      new MetisMenu("#side-menu")
      let matchingMenuItem = null
      const ul = document.getElementById("side-menu")
      const items = ul.getElementsByTagName("a")
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem)
      }
    }
    initMenu()
  }, [props.location.pathname])

  useEffect(() => {
    ref.current.recalculate()
  })

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item)
      return false
    }
    scrollElement(item)
    return false
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")} </li>
            {/* <li>
              <Link to="/dashboard">
                <i className="bx bx-home-circle"></i>
                <span>{props.t("Dashboards")}</span>
              </Link>
            </li> */}
            {role == "admin" ? (
              <li>
                <Link to="/#" className="has-arrow">
                  <i className="fas fa-user-shield"></i>
                  <span>{props.t("Admin")}</span>
                </Link>
                <ul className="sub-menu">
                  <li>
                    <Link to="/users">
                      <i className="fas fa-users"></i>
                      <span>{props.t("Users")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/mentors">
                      <i className="fas fa-chalkboard-teacher"></i>
                      <span>{props.t("Mentors")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/partners">
                      <i className="fas fa-user-friends"></i>
                      <span>{props.t("Partners")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/students">
                      <i className="fas fa-user-graduate"></i>
                      <span>{props.t("Students")}</span>
                    </Link>
                  </li>
                </ul>
              </li>
            ) : null}
            {role == "admin" || role == "mentor" ? (
              <li>
                <Link to="/#" className="has-arrow">
                  <i className="fas fa-user-alt"></i>
                  <span>{props.t("Mentors")}</span>
                </Link>
                <ul className="sub-menu">
                  <li>
                    <Link to="/attendence">
                      <i className="fas fa-check-square"></i>
                      <span>{props.t("Attendence")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/rates">
                      <i className="fas fa-star-half-alt"></i>
                      <span>{props.t("Rates")}</span>
                    </Link>
                  </li>
                </ul>
              </li>
            ) : null}
            {/* <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-store"></i>
                <span>{props.t("Offers")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/offers">{props.t("Offers")}</Link>
                </li>
                <li>
                  <Link to="/ecommerce-orders">{props.t("Orders")}</Link>
                </li>
              </ul>
            </li> */}
            {role == "admin" ? (
              <>
                {" "}
                <li>
                  <Link to="/#" className="has-arrow">
                    <i className="fas fa-pencil-ruler"></i>
                    <span>{props.t("Activities")}</span>
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/activityType">
                        <i className="fas fa-pencil-alt"></i>
                        <span>{props.t("Activity Type")}</span>
                      </Link>
                    </li>

                    <li>
                      <Link to="/activites">
                        <i className="fas fa-network-wired"></i>
                        <span>{props.t("Activites")}</span>
                      </Link>
                    </li>

                    <li>
                      <Link to="/projects">
                        <i className="fab fa-r-project"></i>
                        <span>{props.t("Projects")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/groups">
                        <i className="fas fa-layer-group"></i>
                        <span>{props.t("Groups")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/category">
                        <i className="fas fa-house-user"></i>
                        <span>{props.t("Category")}</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/#" className="has-arrow">
                    <i className="fas fa-file-alt"></i>
                    <span>{props.t("Landing Page")}</span>
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/aboutus">
                        <i className="fas fa-id-card"></i>
                        <span>{props.t("About Us")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/advertisings">
                        <i className="fab fa-buysellads"></i>
                        <span>{props.t("Advertisings")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/questions">
                        <i className="fas fa-question-circle"></i>
                        <span>{props.t("Questions")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/contacts">
                        <i className="fas fa-mail-bulk"></i>
                        <span>{props.t("Contacts")}</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/platforms">
                    <i className="fas fa-laptop"></i>
                    <span>{props.t("Platforms")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/courses">
                    <i className="fas fa-book"></i>
                    <span>{props.t("Courses")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/training">
                    <i className="far fa-newspaper"></i>
                    <span>{props.t("Latest Training Courses")}</span>
                  </Link>
                </li>
              </>
            ) : null}
            {role == "student" ? (
              <li>
                <Link to="/#" className="has-arrow">
                  <i className="fas fa-user-tie"></i>
                  <span>{props.t("Students")}</span>
                </Link>
                <ul className="sub-menu">
                  <li>
                    <Link to="/freelancer">
                      <i className="fab fa-foursquare"></i>
                      <span>{props.t("Freelancer")}</span>
                    </Link>
                  </li>
                </ul>
              </li>
            ) : null}
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))
