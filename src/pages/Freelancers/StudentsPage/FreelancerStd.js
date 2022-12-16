import { useFormik } from "formik"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { Link, withRouter } from "react-router-dom"

import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  UncontrolledTooltip,
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

import { isEmpty } from "lodash"

//redux
import { useDispatch, useSelector } from "react-redux"
import DeleteModal from "components/Common/DeleteModal"
import TableContainer from "components/Common/TableContainer"
import Breadcrumbs from "components/Common/Breadcrumb"

import { validationSchema } from "./validationSchema"
import { getFreelancer, deleteFreelance } from "store/freelance/actions"
import { notify } from "components/Common/notify"

const FreelancerStd = props => {
  //meta title
  document.title = "Freelancer Students"

  const dispatch = useDispatch()
  const [contact, setContact] = useState()

  const { freelance } = useSelector(store => store?.freelance)
  // const [filterData, setFilterData] = useState([])
  const [modal, setModal] = useState(false)
  // const [isEdit, setIsEdit] = useState(false)

  // const [selectedFiles, setselectedFiles] = useState([])
  function handleAcceptedFiles(files) {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )
    setselectedFiles(files)
  }

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
      {
        Header: "Action",
        Cell: cellProps => {
          return (
            <div className="d-flex gap-3">
              <Link
                to={`/edit/${cellProps.row.original.id}`}
                className="text-success"
                onClick={() => {
                  const userData = cellProps.row.original
                  handleUserClick(userData)
                }}
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit
                </UncontrolledTooltip>
              </Link>
              <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  const userData = cellProps.row.original
                  onClickDelete(userData)
                }}
              >
                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
                <UncontrolledTooltip placement="top" target="deletetooltip">
                  Delete
                </UncontrolledTooltip>
              </Link>
            </div>
          )
        },
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

  // useEffect(() => {
  //   if (!isEmpty(freelancer) && !!isEdit) {
  //     setContact(freelancer)
  //     setIsEdit(false)
  //   }
  // }, [freelancer])

  // const STUDENT_ID = localStorage.getItem("ID")
  // useEffect(() => {
  //   setFilterData(freelance.filter(el => el?.student_id == STUDENT_ID))
  // }, [freelance])
  const toggle = () => {
    setModal(!modal)
  }

  const handleUserClick = arg => {
    const student = arg
    setContact({
      id: student.id,
      platform_id: student.platform_id,
      student_id: student.student_id,
      group_id: student.group_id,
      job_title: student.job_title,
      job_link: student.job_link,
      job_description: student.job_description,
      salary: student.salary,
      status: student.status,
      client_feedback: student.client_feedback,
      notes: student.notes,
      image: student.image,
    })
    // setIsEdit(true)

    toggle()
  }

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

  const onClickDelete = freelancer => {
    setContact(freelancer)
    setDeleteModal(true)
  }

  const handleDeleteStudent = () => {
    dispatch(
      deleteFreelance(
        contact,
        () => {
          notify("success", "Success")
        },
        null
      )
    )
    onPaginationPageChange(1)
    setDeleteModal(false)
  }

  const handleUserClicks = () => {
    setContact("")
    setIsEdit(false)
    toggle()
  }

  const keyField = "id"

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteStudent}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="FreelancerStd List"
            breadcrumbItem="All FreelancerStd"
          />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={freelance}
                    isGlobalFilter={true}
                    isAddFreelance={true}
                    handleUserClick={handleUserClicks}
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

export default withRouter(FreelancerStd)
