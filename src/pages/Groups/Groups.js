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
  Status,
  EndDate,
  HourCount,
  ParticipantsCount,
  Category,
  Project,
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
import { getProjects } from "store/fetchData/actions"
import { getCategory } from "store/admin/category/actions"
import { notify } from "components/Common/notify"
import {
  getGroups,
  updateGroup,
  addGroup,
  deleteGroup,
} from "store/admin/group/actions"
import img from "assets/images/img.png"

const Projects = props => {
  //meta budget
  const [filename, setFilename] = useState("")

  document.title = "Groups"

  const dispatch = useDispatch()
  const [contact, setContact] = useState()
  // validation
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      // budget: (contact && contact.budget) || "",
      project_id: (contact && contact.project_id) || "",
      category_id: (contact && contact.category_id) || "",
      end_date: (contact && contact.end_date) || "",
      title: (contact && contact.title) || "",
      description: (contact && contact.description) || "",
      start_date: (contact && contact.start_date) || "",
      hour_count: (contact && contact.hour_count) || "",
      participants_count: (contact && contact.participants_count) || "",
      status: (contact && contact.status) || "",
      image: (contact && contact.image) || img,
    },
    // validationSchema: validationSchema,
    onSubmit: async values => {
      if (isEdit) {
        var edit = new FormData()
        // edit.append("budget", values?.budget)
        edit.append("end_date", values?.end_date)
        edit.append("description", values?.description)
        edit.append("title", values?.title)
        edit.append("start_date", values?.start_date)
        edit.append("hour_count", values?.hour_count)
        edit.append("category_id", values?.category_id)
        edit.append("project_id", values?.project_id)
        edit.append("status", values?.status)
        edit.append("participants_count", values?.participants_count)
        if (values?.image instanceof File) {
          edit.append("image", values?.image)
        }
        edit.append("_method", "put")
        // contact.budget !== values.budget &&
        //   edit.append("budget", values?.budget)
        // contact.end_date !== values.end_date &&
        //   edit.append("end_date", values?.end_date)
        // contact.description !== values.description &&
        //   edit.append("description", values?.description)
        // contact.title !== values.title && edit.append("title", values?.title)
        // contact.start_date !== values.start_date &&
        //   edit.append("start_date", values?.start_date)
        // contact.hour_count !== values.hour_count &&
        //   edit.append("hour_count", values?.hour_count)
        // contact.category !== values.category &&
        //   edit.append("category", values?.category)
        // contact.project !== values.project &&
        //   edit.append("project", values?.project)
        // contact.participants_count !== values.participants_count &&
        //   edit.append("participants_count", values?.participants_count)
        // typeof values.image === "object" && edit.append("image", values?.image)
        dispatch(
          updateGroup(
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
        // data.append("budget", values?.budget)
        data.append("end_date", values?.end_date)
        data.append("description", values?.description)
        data.append("title", values?.title)
        data.append("start_date", values?.start_date)
        data.append("hour_count", values?.hour_count)
        data.append("category_id", values?.category_id)
        data.append("status", values?.status)
        data.append("project_id", values?.project_id)
        data.append("participants_count", values?.participants_count)
        data.append("image", values?.image)

        dispatch(
          addGroup(
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

  const { groups } = useSelector(store => store?.groups)
  const { projects } = useSelector(store => store?.data)
  const { category } = useSelector(store => store?.category)

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
      // {
      //   Header: "Budget",
      //   accessor: "budget",
      //   filterable: true,
      //   Cell: cellProps => {
      //     return <Budget {...cellProps} />
      //   },
      // },
      {
        Header: "Category",
        accessor: "category",
        filterable: true,
        Cell: cellProps => {
          return <Category {...cellProps} />
        },
      },
      {
        Header: "Project",
        accessor: "project",
        filterable: true,
        Cell: cellProps => {
          return <Project {...cellProps} />
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
        Header: "Hour Count",
        accessor: "hour_count",
        filterable: true,
        Cell: cellProps => {
          return <HourCount {...cellProps} />
        },
      },
      {
        Header: "ParticipantsCount",
        accessor: "participants_count",
        filterable: true,
        Cell: cellProps => {
          return <ParticipantsCount {...cellProps} />
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
                <span className="avatar-title rounded-circle">
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
    dispatch(getGroups())
    dispatch(getCategory())
    dispatch(getProjects())
  }, [dispatch])

  useEffect(() => {
    if (groups && !groups.length) {
      dispatch(getGroups())
      setIsEdit(false)
    }
  }, [dispatch, groups])

  useEffect(() => {
    setContact(groups)
    setIsEdit(false)
  }, [groups])

  useEffect(() => {
    if (!isEmpty(groups) && !!isEdit) {
      setContact(groups)
      setIsEdit(false)
    }
  }, [groups])

  const toggle = () => {
    setModal(!modal)
  }

  const handleUserClick = arg => {
    const group = arg
    setContact({
      id: group.id,
      // budget: group.budget,
      end_date: group.end_date,
      description: group.description,
      title: group.title,
      start_date: group.start_date,
      hour_count: group.hour_count,
      participants_count: group.participants_count,
      project_id: group.project_id,
      category_id: group.category_id,
      status: group.status,
      image: group.image,
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

  const onClickDelete = groups => {
    setContact(groups)
    setDeleteModal(true)
  }

  const handleDeleteGroup = () => {
    dispatch(
      deleteGroup(
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


  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteGroup}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Groups List" breadcrumbItem="All Groups" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={groups}
                    isGlobalFilter={true}
                    isAddUserList={true}
                    handleUserClick={handleUserClicks}
                    customPageSize={10}
                    className="custom-header-css"
                  />

                  <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} tag="h4">
                      {!!isEdit ? "Edit Group" : "Add Group"}
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
                                : ""
                            }
                            onChange={event => {
                              setFilename(
                                prev => event.target.files[0]?.title || ""
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
                                <option defaultValue disabled></option>
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
                              <Label className="form-label">Category</Label>
                              <Input
                                name="category_id"
                                className="form-control"
                                type="select"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.category_id || ""}
                                invalid={
                                  validation.touched.category_id &&
                                  validation.errors.category_id
                                    ? true
                                    : false
                                }
                              >
                                <option defaultValue disabled></option>
                                {category?.map(el => (
                                  <option key={el?.id} value={el.id}>
                                    {el.title}
                                  </option>
                                ))}
                              </Input>
                              {validation.touched.category_id &&
                              validation.errors.category_id ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.category_id}
                                </FormFeedback>
                              ) : null}
                            </div>
                            {/* <div className="mb-3">
                              <Label className="form-label">Budget</Label>
                              <Input
                                name="budget"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.budget || ""}
                                invalid={
                                  validation.touched.budget &&
                                  validation.errors.budget
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.budget &&
                              validation.errors.budget ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.budget}
                                </FormFeedback>
                              ) : null}
                            </div> */}
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
                              <Label className="form-label">
                                Participants Count
                              </Label>
                              <Input
                                name="participants_count"
                                label="Participants Count"
                                type="number"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={
                                  validation.values.participants_count || ""
                                }
                                invalid={
                                  validation.touched.participants_count &&
                                  validation.errors.participants_count
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.participants_count &&
                              validation.errors.participants_count ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.participants_count}
                                </FormFeedback>
                              ) : null}
                            </div>

                            <div className="mb-3">
                              <Label className="form-label">Status</Label>
                              <Input
                                name="status"
                                label="status"
                                type="select"
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
                                <option value={"ongoing"}>ongoing</option>
                                <option value={"completed"}>completed</option>
                                <option value={"draft"}>draft</option>
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

export default withRouter(Projects)
