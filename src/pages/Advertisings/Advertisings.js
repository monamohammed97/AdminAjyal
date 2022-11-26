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
  Name,
  Details,
  Notes,
  Attachment,
  Deadline,
  Title,
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
import { getAds, addAds, deleteAds, updateAds } from "store/admin/advertisings/actions"
import { notify } from "components/Common/notify"
import img from "assets/images/img.png"

const Advertisings = props => {
  //meta title
  const [filename, setFilename] = useState("")

  document.title = "Advertisings"

  const dispatch = useDispatch()
  const [contact, setContact] = useState()
  // validation
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      title: (contact && contact.title) || "",
      details: (contact && contact.details) || "",
      notes: (contact && contact.notes) || "",
      attachment: (contact && contact.attachment) || "",
      status: (contact && contact.status) || "",
      deadline: (contact && contact.deadline) || "",
      image: (contact && contact.image) || img,
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      if (isEdit) {
        var edit = new FormData()
        edit.append("title", values?.title)
        edit.append("details", values?.details)
        // edit.append("attachment", values?.attachment)
        if (values?.attachment instanceof File) {
          edit.append("attachment", values?.attachment)
        }
        edit.append("notes", values?.notes)
        edit.append("deadline", values?.deadline)
        edit.append("status", values?.status)
        edit.append("_method", "put")
        if (values?.image instanceof File) {
          edit.append("image", values?.image)
        }
        console.log("values :=>",values);
        dispatch(
          updateAds(
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
        data.append("title", values?.title)
        data.append("details", values?.details)
        data.append("attachment", values?.attachment)
        data.append("notes", values?.notes)
        data.append("deadline", values?.deadline)
        data.append("status", values?.status)
        data.append("image", values?.image)

        dispatch(
          addAds(
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

  const { ads } = useSelector(store => store?.advertisings)

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
        Header: "Details",
        accessor: "details",
        filterable: true,
        Cell: cellProps => {
          return <Details {...cellProps} />
        },
      },
      {
        Header: "Attachment",
        accessor: "attachment",
        filterable: true,
        Cell: cellProps => {
          return <Attachment {...cellProps} />
        },
      },
      {
        Header: "Notes",
        accessor: "notes",
        filterable: true,
        Cell: cellProps => {
          return <Notes {...cellProps} />
        },
      },
      {
        Header: "Deadline",
        accessor: "deadline",
        filterable: true,
        Cell: cellProps => {
          return <Deadline {...cellProps} />
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
    dispatch(getAds())
  }, [dispatch])

  useEffect(() => {
    if (ads && !ads.length) {
      dispatch(getAds())
      setIsEdit(false)
    }
  }, [dispatch, ads])

  useEffect(() => {
    setContact(ads)
    setIsEdit(false)
  }, [ads])

  useEffect(() => {
    if (!isEmpty(ads) && !!isEdit) {
      setContact(ads)
      setIsEdit(false)
    }
  }, [ads])

  const toggle = () => {
    setModal(!modal)
  }

  const handleUserClick = arg => {
    const ads = arg
    setContact({
      id: ads.id,
      title: ads.title,
      details: ads.details,
      attachment: ads.attachment,
      notes: ads.notes,
      deadline: ads.deadline,
      status: ads.status,
      image: ads.image,
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

  const onClickDelete = ads => {
    setContact(ads)
    setDeleteModal(true)
  }

  const handleDeleteAds = () => {
    dispatch(
      deleteAds(
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
        onDeleteClick={handleDeleteAds}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="Advertisings List"
            breadcrumbItem="All Advertisings"
          />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={ads}
                    isGlobalFilter={true}
                    isAddUserList={true}
                    handleUserClick={handleUserClicks}
                    customPageSize={10}
                    className="custom-header-css"
                  />

                  <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} tag="h4">
                      {!!isEdit ? "Edit Ads" : "Add Ads"}
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
                                : img
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
                        <Row form>
                          <Col xs={12}>
                            <div className="mb-3">
                              <Label className="form-label">Title</Label>
                              <Input
                                name="title"
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
                              <Label className="form-label">Details</Label>
                              <Input
                                name="details"
                                label="Details"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.details || ""}
                                invalid={
                                  validation.touched.details &&
                                  validation.errors.details
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.details &&
                              validation.errors.details ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.details}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Attachment</Label>
                              <Input
                                name="attachment"
                                label="Attachment"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.attachment || ""}
                                invalid={
                                  validation.touched.attachment &&
                                  validation.errors.attachment
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.attachment &&
                              validation.errors.attachment ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.attachment}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Notes</Label>
                              <Input
                                name="notes"
                                label="Notes"
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
                              <Label className="form-label">Dead Line</Label>
                              <Input
                                name="deadline"
                                label="Deadline"
                                type="date"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.deadline || ""}
                                invalid={
                                  validation.touched.deadline &&
                                  validation.errors.deadline
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.deadline &&
                              validation.errors.deadline ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.deadline}
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
                                <option selected disabled></option>
                                <option value={"published"}>Published </option>
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

export default withRouter(Advertisings)
