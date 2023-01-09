import { useFormik } from "formik"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { Link, withRouter } from "react-router-dom"

import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
} from "reactstrap"

import {
  Platform,
  Student,
  Group,
  Title,
  Salary,
  Status,
} from "./contactlistCol"

//Import Breadcrumb
//redux
import { useDispatch, useSelector } from "react-redux"
import DeleteModal from "components/Common/DeleteModal"
import TableContainer from "components/Common/TableContainer"
import Breadcrumbs from "components/Common/Breadcrumb"

import { getFreelancer, deleteFreelance } from "store/freelance/actions"
import { notify } from "components/Common/notify"

const StudentsPage = props => {
  //meta title
  document.title = "Freelancer Students"

  const dispatch = useDispatch()
  const [contact, setContact] = useState()

  const { freelance } = useSelector(store => store?.freelance)
  // const [filterData, setFilterData] = useState([])

  const columns = useMemo(
    () => [
      {
        Header: "#",
        id: "index",
        accessor: (_row, i) => i + 1,
      },
      {
        Header: "Platform",
        accessor: "platform",
        filterable: true,
        Cell: cellProps => {
          return <Platform {...cellProps} />
        },
      },
      {
        Header: "Student",
        accessor: "student",
        filterable: true,
        Cell: cellProps => {
          return <Student {...cellProps} />
        },
      },
      {
        Header: "Group",
        accessor: "group",
        filterable: true,
        Cell: cellProps => {
          return <Group {...cellProps} />
        },
      },
      {
        Header: "Title",
        accessor: "job_title",
        filterable: true,
        Cell: cellProps => {
          return <Title {...cellProps} />
        },
      },
      {
        Header: "Salary",
        accessor: "salary",
        filterable: true,
        Cell: cellProps => {
          return <Salary {...cellProps} />
        },
      },
      {
        Header: "Status",
        accessor: "status",
        filterable: true,
        Cell: cellProps => {
          return <Status {...cellProps} />
        },
      },
      {
        Header: "Attachment",
        accessor: "attachment",
        disableFilters: true,
        filterable: true,
        accessor: cellProps => (
          <>
            {!cellProps.attachment ? (
              <div className="avatar-xs">
                <span className="avatar-title rounded-circle">
                  {/* {cellProps.name.charAt(0)} */}
                </span>
              </div>
            ) : (
              <div>
                <img
                  className="rounded-circle avatar-xs"
                  src={cellProps.attachment}
                  alt=""
                />
              </div>
            )}
          </>
        ),
      },
    ],
    []
  )
  useEffect(() => {
    dispatch(getFreelancer())
  }, [dispatch])

  // useEffect(() => {
  //   if (freelancer && !freelancer.length) {
  //     dispatch(getFreelancer())
  //     setIsEdit(false)
  //   }
  // }, [dispatch, freelancer])

  useEffect(() => {
    setContact(freelance)
    // setIsEdit(false)
  }, [freelance])


  var node = useRef()
  const onPaginationPageChange = page => {
    if (
      node &&
      node.current &&
      node.current.props &&
      node.current.props.pagination &&
      node.current.props.pagination.options
    ) {
      node.current.props.pagination.options.onPageChange(page)
    }
  }

  //delete customer
  const [deleteModal, setDeleteModal] = useState(false)


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="Freelancer List"
            breadcrumbItem="All Freelancer"
          />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={freelance}
                    isGlobalFilter={true}
                    // isAddFreelance={true}
                    // handleUserClick={handleUserClicks}
                    customPageSize={10}
                    className="custom-header-css"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(StudentsPage)
