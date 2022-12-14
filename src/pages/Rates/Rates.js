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

import { StartDate, Rate, Note, StudentID, CourseID } from "./contactlistCol"

//Import Breadcrumb

import { isEmpty } from "lodash"

//redux
import { useDispatch, useSelector } from "react-redux"
import DeleteModal from "components/Common/DeleteModal"
import TableContainer from "components/Common/TableContainer"
import { FileInput } from "components/Form/FileInput"
import Breadcrumbs from "components/Common/Breadcrumb"
import { validationSchema } from "./validationSchema"
import { getStudents } from "store/admin/student/actions"
import { getCourses } from "store/admin/course/actions"
import { notify } from "components/Common/notify"
import {
  getRates,
  addRate,
  deleteRate,
  updateRate,
} from "store/mentor/rate/actions"

const Rates = props => {
  //meta student_id
  document.title = "Rates"

  const dispatch = useDispatch()
  const [contact, setContact] = useState()

  // validation
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      student_id: (contact && contact.student_id) || "",
      course_id: (contact && contact.course_id) || "",
      rate: (contact && contact.rate) || "",
      notes: (contact && contact.notes) || "",
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      if (isEdit) {
        var edit = new FormData()
        edit.append("student_id", values?.student_id)
        edit.append("course_id", values?.course_id)
        edit.append("notes", values?.notes)
        edit.append("_method", "put")
        edit.append("rate", values?.rate)
        dispatch(
          updateRate(
            edit,
            contact.id,
            () => {
              notify("success", "Success")
            },
            null
          )
        )
        setIsEdit(false)
        validation.resetForm()
        toggle()
      } else {
        var data = new FormData()
        data.append("student_id", values?.student_id)
        data.append("course_id", values?.course_id)
        data.append("notes", values?.notes)
        data.append("rate", values?.rate)

        dispatch(
          addRate(
            data,
            () => {
              notify("success", "Success")
            },
            null
          )
        )
        validation.resetForm()
        toggle()
      }
    },
  })

  const { rates } = useSelector(store => store?.rates)
  const { students } = useSelector(store => store?.students)
  const { courses } = useSelector(store => store?.courses)
  const MENTOR_ID = localStorage.getItem("ID")

  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const filterCourses = courses?.filter(el => el?.mentor_id == MENTOR_ID)

  const studentsOfCourse = []
  rates.filter(el => {
      filterCourses.map(course => {
        if (course.id == el.course_id) studentsOfCourse.push(el)
      })
  })
  const studentsOfCurrentCourse = []
  const currentCourse = filterCourses.filter(el => el?.id == validation.values.course_id)
  students.filter(el => {
    el.groups.map(group => {
      if (group.id == currentCourse[0]?.group_id) studentsOfCurrentCourse.push(el)
    })
  })


  const columns = useMemo(
    () => [
      {
        Header: "#",
        id: "index",
        accessor: (_row, i) => i + 1,
      },
      {
        Header: "Student",
        accessor: "student",
        filterable: true,
        Cell: cellProps => {
          return <StudentID {...cellProps} />
        },
      },
      {
        Header: "Course",
        accessor: "course",
        filterable: true,
        Cell: cellProps => {
          return <CourseID {...cellProps} />
        },
      },

      {
        Header: "Rate",
        accessor: "rate",
        filterable: true,
        Cell: cellProps => {
          return <Rate {...cellProps} />
        },
      },
      {
        Header: "Note",
        accessor: "notes",
        filterable: true,
        Cell: cellProps => {
          return <Note {...cellProps} />
        },
      },
      {
        Header: "Action",
        Cell: cellProps => {
          return (
            <div className="d-flex gap-3">
              <Link
                to="#"
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
    dispatch(getRates())
    dispatch(getStudents())
    dispatch(getCourses())
  }, [dispatch])

  useEffect(() => {
    if (rates && !rates.length) {
      dispatch(getRates())
      setIsEdit(false)
    }
  }, [dispatch, rates])

  useEffect(() => {
    setContact(rates)
    setIsEdit(false)
  }, [rates])

  useEffect(() => {
    if (!isEmpty(rates) && !!isEdit) {
      setContact(rates)
      setIsEdit(false)
    }
  }, [rates])

  const toggle = () => {
    setModal(!modal)
  }

  const handleUserClick = arg => {
    const rateStd = arg
    setContact({
      id: rateStd.id,
      student_id: rateStd.student_id,
      course_id: rateStd.course_id,
      notes: rateStd.notes,
      rate: rateStd.rate,
    })
    setIsEdit(true)

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

  const onClickDelete = rates => {
    setContact(rates)
    setDeleteModal(true)
  }

  const handleDeleteRate = () => {
    dispatch(
      deleteRate(
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

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteRate}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs student_id="Rates List" breadcrumbItem="All Rates" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={studentsOfCourse}
                    isGlobalFilter={true}
                    isAddUserList={true}
                    handleUserClick={handleUserClicks}
                    customPageSize={10}
                    className="custom-header-css"
                  />

                  <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} tag="h4">
                      {!!isEdit ? "Edit Rate" : "Add Rate"}
                    </ModalHeader>
                    <ModalBody>
                      <Form
                        onSubmit={e => {
                          e.preventDefault()
                          validation.handleSubmit()
                          return false
                        }}
                      >
                        <Row>
                          <Col xs={12}>
                            <div className="mb-3">
                              <Label className="form-label">Course</Label>
                              <Input
                                name="course_id"
                                className="form-control"
                                type="select"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.course_id || ""}
                                invalid={
                                  validation.touched.course_id &&
                                  validation.errors.course_id
                                    ? true
                                    : false
                                }
                              >
                                <option defaultValue disabled></option>
                                {filterCourses?.map(el => (
                                  <option key={el?.id} value={el.id}>
                                    {el.title}
                                  </option>
                                ))}
                              </Input>
                              {validation.touched.course_id &&
                              validation.errors.course_id ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.course_id}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Student</Label>
                              <Input
                                name="student_id"
                                className="form-control"
                                type="select"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.student_id || ""}
                                invalid={
                                  validation.touched.student_id &&
                                  validation.errors.student_id
                                    ? true
                                    : false
                                }
                              >
                                <option defaultValue disabled></option>
                                {studentsOfCurrentCourse?.map(el => (
                                  <option key={el?.id} value={el.id}>
                                    {el.name}
                                  </option>
                                ))}
                              </Input>
                              {validation.touched.student_id &&
                              validation.errors.student_id ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.student_id}
                                </FormFeedback>
                              ) : null}
                            </div>
                            
                            <div className="mb-3">
                              <Label className="form-label">Note</Label>
                              <Input
                                name="notes"
                                label="Note"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.notes || ""}
                                invalid={
                                  validation.touched.notes &&
                                  validation.errors.notes
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.notes &&
                              validation.errors.notes ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.notes}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Rate</Label>
                              <Input
                                name="rate"
                                type="select"
                                className="form-select"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.rate || ""}
                                invalid={
                                  validation.touched.rate &&
                                  validation.errors.rate
                                    ? true
                                    : false
                                }
                              >
                                <option defaultValue disabled></option>
                                <option value={"Featured"}>Featured</option>
                                <option value={"Average"}>Average</option>
                                <option value={"Junior"}>Junior</option>
                                <option value={"Unclassified"}>
                                  Unclassified
                                </option>
                              </Input>
                              {validation.touched.rate &&
                              validation.errors.rate ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.rate}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className="text-end">
                              <button
                                type="submit"
                                className="btn btn-success save-user"
                              >
                                Save
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                  </Modal>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(Rates)
