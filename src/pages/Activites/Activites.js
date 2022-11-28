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
  Date,
  Title,
  Description,
  ProjectId,
  ActivityTypeId,
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
import { getProjects } from "store/admin/project/actions"
import img from "assets/images/img.png"
import {
  getActivities,
  addActivity,
  deleteActivity,
  updateActivity,
} from "store/admin/activity/actions"
import { getActivityType } from "store/admin/activityType/actions"
import { notify } from "components/Common/notify"

const Activites = props => {
  //meta project_id
  const [filename, setFilename] = useState("")

  document.title = "Activites"

  const dispatch = useDispatch()
  const [contact, setContact] = useState()
  // validation
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      project_id: (contact && contact.project_id) || "",
      activity_type_id: (contact && contact.activity_type_id) || "",
      title: (contact && contact.title) || "",
      description: (contact && contact.description) || "",
      date: (contact && contact.date) || "",
      image: (contact && contact.image) || img,
    },
    // validationSchema: validationSchema,
    onSubmit: async values => {
      if (isEdit) {
        var edit = new FormData()
        edit.append("project_id", values?.project_id)
        edit.append("activity_type_id", values?.activity_type_id)
        edit.append("description", values?.description)
        edit.append("title", values?.title)
        edit.append("date", values?.date)
        if (values?.image instanceof File) {
          edit.append("image", values?.image)
        }
        dispatch(
          updateActivity(
            edit,
            contact.id,
            () => {
              notify("success", "Success")
            },
            () => {
              notify("error", "Failed")
            }
          )
        )
        setIsEdit(false)
        validation.resetForm()
        toggle()
      } else {
        var data = new FormData()
        data.append("project_id", values?.project_id)
        data.append("activity_type_id", values?.activity_type_id)
        data.append("description", values?.description)
        data.append("title", values?.title)
        data.append("date", values?.date)
        data.append("image", values?.image)

        dispatch(
          addActivity(
            data,
            () => {
              notify("success", "Success")
            },
            () => {
              notify("error", "Failed")
            }
          )
        )
        validation.resetForm()
        toggle()
      }
    },
  })

  const { activities } = useSelector(store => store?.activities)
  const { activityType } = useSelector(store => store?.activityType)
  const { projects } = useSelector(store => store?.data)

  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const [selectedFiles, setselectedFiles] = useState([])
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
        Header: "Project",
        accessor: "project",
        filterable: true,
        Cell: cellProps => {
          return <ProjectId {...cellProps} />
        },
      },
      {
        Header: "Activity Type",
        accessor: "activity Type",
        filterable: true,
        Cell: cellProps => {
          return <ActivityTypeId {...cellProps} />
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
        Header: "Title",
        accessor: "title",
        filterable: true,
        Cell: cellProps => {
          return <Title {...cellProps} />
        },
      },
      {
        Header: "Date",
        accessor: "date",
        filterable: true,
        Cell: cellProps => {
          return <Date {...cellProps} />
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
                <span className="avatar-project_id rounded-circle">
                  {cellProps.title.charAt(0)}
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
                  // console.log("userData :", userData)
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
    dispatch(getActivities())
    dispatch(getActivityType())
    dispatch(getProjects())
  }, [dispatch])

  useEffect(() => {
    if (activities && !activities.length) {
      dispatch(getActivities())
      setIsEdit(false)
    }
  }, [dispatch, activities])

  useEffect(() => {
    setContact(activities)
    setIsEdit(false)
  }, [activities])

  useEffect(() => {
    if (!isEmpty(activities) && !!isEdit) {
      setContact(activities)
      setIsEdit(false)
    }
  }, [activities])

  const toggle = () => {
    setModal(!modal)
  }

  const handleUserClick = arg => {
    const activity = arg
    setContact({
      id: activity.id,
      project_id: activity.project_id,
      activity_type_id: activity.activity_type_id,
      description: activity.description,
      title: activity.title,
      date: activity.date,
      image: activity.image,
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

  const onClickDelete = activities => {
    setContact(activities)
    setDeleteModal(true)
  }

  const handleDeleteActivity = () => {
    dispatch(
      deleteActivity(
        contact,
        () => {
          notify("success", "Success")
        },
        () => {
          notify("error", "Failed")
        }
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
        onDeleteClick={handleDeleteActivity}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="Activities List"
            breadcrumbItem="All Activities"
          />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={activities}
                    isGlobalFilter={true}
                    isAddUserList={true}
                    handleUserClick={handleUserClicks}
                    customPageSize={10}
                    className="custom-header-css"
                  />

                  <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} tag="h4">
                      {!!isEdit ? "Edit Activity" : "Add Activity"}
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
                              typeof validation.values.image === "object"
                                ? URL.createObjectURL(
                                    validation.values["image"]
                                  )
                                : typeof validation.values.image === "string"
                                ? validation.values["image"]
                                : filename
                                ? validation.values.image
                                : img2
                            }
                            onChange={event => {
                              setFilename(
                                prev => event.target.files[0]?.project_id || ""
                              )

                              validation.setFieldValue(
                                "image",
                                event.currentTarget.files[0]
                              )
                            }}
                          />
                          {/* {filename && (
                            <h6>
                              {filename} <span htmlFor={"avatar"}>Change</span>
                            </h6>
                          )} */}
                        </Row>
                        <Row form>
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
                              <Label className="form-label">Project</Label>
                              <Input
                                name="project_id"
                                className="form-control"
                                type="select"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.project_id || ""}
                                invalid={
                                  validation.touched.project_id &&
                                  validation.errors.project_id
                                    ? true
                                    : false
                                }
                              >
                                <option selected disabled></option>
                                {projects?.map(el => (
                                  <option key={el?.id} value={el.id}>
                                    {el.title}
                                  </option>
                                ))}
                              </Input>
                              {validation.touched.project_id &&
                              validation.errors.project_id ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.project_id}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">
                                Activity Type
                              </Label>
                              <Input
                                name="activity_type_id"
                                className="form-control"
                                type="select"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.activity_type_id || ""}
                                invalid={
                                  validation.touched.activity_type_id &&
                                  validation.errors.activity_type_id
                                    ? true
                                    : false
                                }
                              >
                                <option selected disabled></option>
                                {activityType?.map(el => (
                                  <option key={el?.id} value={el.id}>
                                    {el.name}
                                  </option>
                                ))}
                              </Input>
                              {validation.touched.activity_type_id &&
                              validation.errors.activity_type_id ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.activity_type_id}
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
                              <Label className="form-label">Date</Label>
                              <Input
                                name="date"
                                label="Date"
                                type="date"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.date || ""}
                                invalid={
                                  validation.touched.date &&
                                  validation.errors.date
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.date &&
                              validation.errors.date ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.date}
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

export default withRouter(Activites)
