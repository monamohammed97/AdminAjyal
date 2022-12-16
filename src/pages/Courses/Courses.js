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
  StartDate,
  Title,
  Description,
  GroupID,
  EndDate,
  HourCount,
  MentorID,
  Status,
} from "./contactlistCol"

//Import Breadcrumb

import { isEmpty } from "lodash"

//redux
import { useDispatch, useSelector } from "react-redux"
import DeleteModal from "components/Common/DeleteModal"
import TableContainer from "components/Common/TableContainer"
import { FileInput } from "components/Form/FileInput"
import Breadcrumbs from "components/Common/Breadcrumb"
import { validationSchema } from "./validationSchema"
import { getMentors } from "store/admin/mentor/actions"
import { getCourses } from "store/admin/course/actions"
import { getGroups } from "store/admin/group/actions"

import { notify } from "components/Common/notify"
import {
  deleteCourse,
  updateCourse,
  addCourse,
} from "store/admin/course/actions"
import img from "assets/images/img.png"

const Courses = props => {
  //meta group_id
  document.title = "Courses"

  const dispatch = useDispatch()
  const [contact, setContact] = useState()
  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  // validation
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      group_id: (contact && contact.group_id) || "",
      end_date: (contact && contact.end_date) || "",
      title: (contact && contact.title) || "",
      description: (contact && contact.description) || "",
      start_date: (contact && contact.start_date) || "",
      hour_count: (contact && contact.hour_count) || "",
      mentor_id: (contact && contact.mentor_id) || "",
      status: (contact && contact.status) || "",
      image: (contact && contact?.image) || null,
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      if (isEdit) {
        var edit = new FormData()
        edit.append("group_id", values?.group_id)
        edit.append("end_date", values?.end_date)
        edit.append("description", values?.description)
        edit.append("title", values?.title)
        edit.append("start_date", values?.start_date)
        edit.append("hour_count", values?.hour_count)
        edit.append("mentor_id", values?.mentor_id)
        edit.append("status", values?.status)
        edit.append("_method", "put")
        if (values?.image instanceof File) {
          edit.append("image", values?.image)
        }
        dispatch(
          updateCourse(
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
        data.append("group_id", values?.group_id)
        data.append("end_date", values?.end_date)
        data.append("description", values?.description)
        data.append("title", values?.title)
        data.append("start_date", values?.start_date)
        data.append("hour_count", values?.hour_count)
        data.append("status", values?.status)
        data.append("mentor_id", values?.mentor_id)
        data.append("image", values?.image)

        dispatch(
          addCourse(
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

  const { courses } = useSelector(store => store?.courses)
  const { groups } = useSelector(store => store?.groups)
  const { mentors } = useSelector(store => store?.mentors)

  const columns = useMemo(
    () => [
      {
        Header: "#",
        id: "index",
        accessor: (_row, i) => i + 1,
      },
      {
        Header: "Title",
        accessor: "title",
        filterable: true,
        Cell: cellProps => {
          return <Title {...cellProps} />
        },
      },
      {
        Header: "Description",
        accessor: "description",
        filterable: true,
        Cell: cellProps => {
          return <Description {...cellProps} />
        },
      },
      {
        Header: "Hour Count",
        accessor: "hour_count",
        filterable: true,
        Cell: cellProps => {
          return <HourCount {...cellProps} />
        },
      },
      {
        Header: "Mentor",
        accessor: "mentor",
        filterable: true,
        Cell: cellProps => {
          return <MentorID {...cellProps} />
        },
      },
      {
        Header: "Group",
        accessor: "group",
        filterable: true,
        Cell: cellProps => {
          return <GroupID {...cellProps} />
        },
      },
      {
        Header: "Start Date",
        accessor: "start_date",
        filterable: true,
        Cell: cellProps => {
          return <StartDate {...cellProps} />
        },
      },
      {
        Header: "End Date",
        accessor: "end_date",
        filterable: true,
        Cell: cellProps => {
          return <EndDate {...cellProps} />
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
        Header: "Image",
        accessor: "image",
        disableFilters: true,
        filterable: true,
        accessor: cellProps => (
          <>
            {!cellProps.image ? (
              <div className="avatar-xs">
                <span className="avatar-group_id rounded-circle">
                  {cellProps.group_id.charAt(0)}
                </span>
              </div>
            ) : (
              <div>
                <img
                  className="rounded-circle avatar-xs"
                  src={cellProps.image}
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
    dispatch(getCourses())
    dispatch(getGroups())
    dispatch(getMentors())
  }, [dispatch])

  useEffect(() => {
    if (courses && !courses.length) {
      dispatch(getCourses())
      setIsEdit(false)
    }
  }, [dispatch, courses])

  useEffect(() => {
    setContact(courses)
    setIsEdit(false)
  }, [courses])

  useEffect(() => {
    if (!isEmpty(courses) && !!isEdit) {
      setContact(courses)
      setIsEdit(false)
    }
  }, [courses])

  const toggle = () => {
    setModal(!modal)
  }

  const handleUserClick = arg => {
    const course = arg
    setContact({
      id: course.id,
      group_id: course.group_id,
      end_date: course.end_date,
      description: course.description,
      title: course.title,
      start_date: course.start_date,
      hour_count: course.hour_count,
      mentor_id: course.mentor_id,
      status: course.status,
      image: course.image,
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

  const onClickDelete = courses => {
    setContact(courses)
    setDeleteModal(true)
  }

  const handleDeleteCourse = () => {
    dispatch(
      deleteCourse(
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
        onDeleteClick={handleDeleteCourse}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs group_id="Courses List" breadcrumbItem="All Courses" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={courses}
                    isGlobalFilter={true}
                    isAddUserList={true}
                    handleUserClick={handleUserClicks}
                    customPageSize={10}
                    className="custom-header-css"
                  />

                  <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} tag="h4">
                      {!!isEdit ? "Edit Courses" : "Add Courses"}
                    </ModalHeader>
                    <ModalBody>
                      <Form
                        onSubmit={e => {
                          e.preventDefault()
                          validation.handleSubmit()
                          return false
                        }}
                      >
                        <Row className="wrapperdiv">
                          <FileInput
                            name="image"
                            src={
                              typeof validation.values?.image === "object" &&
                              validation.values?.image
                                ? URL.createObjectURL(validation.values?.image)
                                : typeof validation.values.image === "string"
                                ? validation.values.image
                                : img
                            }
                            onChange={event => {
                              validation.setFieldValue(
                                "image",
                                event.currentTarget.files[0]
                              )
                            }}
                          />
                          {validation.touched.image &&
                          validation.errors.image ? (
                            <h6>
                              <span className="text-danger" htmlFor={"image"}>
                                {validation.errors.image}
                              </span>
                            </h6>
                          ) : null}
                        </Row>
                        <Row>
                          <Col xs={12}>
                            <div className="mb-3">
                              <Label className="form-label">Title</Label>
                              <Input
                                name="title"
                                label="Title"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.title || ""}
                                invalid={
                                  validation.touched.title &&
                                  validation.errors.title
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.title &&
                              validation.errors.title ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.title}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Description</Label>
                              <Input
                                name="description"
                                label="Description"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.description || ""}
                                invalid={
                                  validation.touched.description &&
                                  validation.errors.description
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.description &&
                              validation.errors.description ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.description}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Hour Count</Label>
                              <Input
                                name="hour_count"
                                label="Hour Count"
                                type="number"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.hour_count || ""}
                                invalid={
                                  validation.touched.hour_count &&
                                  validation.errors.hour_count
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.hour_count &&
                              validation.errors.hour_count ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.hour_count}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Group</Label>
                              <Input
                                name="group_id"
                                className="form-control"
                                type="select"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.group_id || ""}
                                invalid={
                                  validation.touched.group_id &&
                                  validation.errors.group_id
                                    ? true
                                    : false
                                }
                              >
                                <option defaultValue disabled></option>
                                {groups?.map(el => (
                                  <option key={el?.id} value={el.id}>
                                    {el.title}
                                  </option>
                                ))}
                              </Input>
                              {validation.touched.group_id &&
                              validation.errors.group_id ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.group_id}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Mentor</Label>
                              <Input
                                name="mentor_id"
                                className="form-control"
                                type="select"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.mentor_id || ""}
                                invalid={
                                  validation.touched.mentor_id &&
                                  validation.errors.mentor_id
                                    ? true
                                    : false
                                }
                              >
                                <option defaultValue disabled></option>
                                {mentors?.map(el => (
                                  <option key={el?.id} value={el.id}>
                                    {el.name}
                                  </option>
                                ))}
                              </Input>
                              {validation.touched.mentor_id &&
                              validation.errors.mentor_id ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.mentor_id}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">End Date</Label>
                              <Input
                                name="end_date"
                                label="End Date"
                                type="date"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.end_date || ""}
                                invalid={
                                  validation.touched.end_date &&
                                  validation.errors.end_date
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.end_date &&
                              validation.errors.end_date ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.end_date}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Start Date</Label>
                              <Input
                                name="start_date"
                                label="Start Date"
                                type="date"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.start_date || ""}
                                invalid={
                                  validation.touched.start_date &&
                                  validation.errors.start_date
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.start_date &&
                              validation.errors.start_date ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.start_date}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Status</Label>
                              <Input
                                name="status"
                                type="select"
                                className="form-select"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.status || ""}
                                invalid={
                                  validation.touched.status &&
                                  validation.errors.status
                                    ? true
                                    : false
                                }
                              >
                                <option defaultValue disabled></option>
                                <option value={"ongoing"}>Ongoing</option>
                                <option value={"completed"}>Completed</option>
                                <option value={"draft"}>Draft</option>
                              </Input>
                              {validation.touched.status &&
                              validation.errors.status ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.status}
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

export default withRouter(Courses)
