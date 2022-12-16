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

import { Name, Description, LinkPartner } from "./contactlistCol"

//Import Breadcrumb

import { isEmpty } from "lodash"

//redux
import { useDispatch, useSelector } from "react-redux"
import DeleteModal from "components/Common/DeleteModal"
import TableContainer from "components/Common/TableContainer"
import { FileInput } from "components/Form/FileInput"
import Breadcrumbs from "components/Common/Breadcrumb"
import { getValidationSchema } from "./validationSchema"
import {
  getPartenrs,
  addPartner,
  deletePartner,
  updatePartner,
} from "store/admin/partenr/actions"
import { notify } from "components/Common/notify"
import img from "assets/images/img.png"

const partners = props => {
  //meta title
  document.title = "partners"

  const dispatch = useDispatch()
  const [contact, setContact] = useState()
  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  // validation
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: (contact && contact.name) || "",
      description: (contact && contact.description) || "",
      link: (contact && contact.link) || "",
      logo: (contact && contact?.logo) || null,
    },
    validationSchema: getValidationSchema(isEdit),
    onSubmit: async values => {
      if (isEdit) {
        var edit = new FormData()

        edit.append("name", values?.name)
        edit.append("description", values?.description)
        if (values?.link) edit.append("link", values?.link)
        edit.append("_method", "put")

        if (values?.logo instanceof File) {
          edit.append("logo", values?.logo)
        }

        dispatch(
          updatePartner(
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
        data.append("name", values?.name)
        data.append("description", values?.description)
        if (values?.link) data.append("link", values?.link)
        data.append("logo", values?.logo)

        dispatch(
          addPartner(
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

  const { partners } = useSelector(store => store?.partners)

  const columns = useMemo(
    () => [
      {
        Header: "#",
        id: "index",
        accessor: (_row, i) => i + 1,
      },
      {
        Header: "Name",
        accessor: "name",
        filterable: true,
        Cell: cellProps => {
          return <Name {...cellProps} />
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
        Header: "Link",
        accessor: "link",
        filterable: true,
        Cell: cellProps => {
          return <LinkPartner {...cellProps} />
        },
      },
      {
        Header: "Logo",
        accessor: "logo",
        disableFilters: true,
        filterable: true,
        accessor: cellProps => (
          <>
            {!cellProps.logo ? (
              <div className="avatar-xs">
                <span className="avatar-title rounded-circle">
                  {/* {cellProps.name.charAt(0)} */}
                </span>
              </div>
            ) : (
              <div>
                <img
                  className="rounded-circle avatar-xs"
                  src={cellProps.logo}
                  alt="not found"
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
    dispatch(getPartenrs())
  }, [dispatch])

  useEffect(() => {
    if (partners && !partners.length) {
      dispatch(getPartenrs())
      setIsEdit(false)
    }
  }, [dispatch, partners])

  useEffect(() => {
    setContact(partners)
    setIsEdit(false)
  }, [partners])

  useEffect(() => {
    if (!isEmpty(partners) && !!isEdit) {
      setContact(partners)
      setIsEdit(false)
    }
  }, [partners])

  const toggle = () => {
    setModal(!modal)
  }

  const handleUserClick = arg => {
    const partenr = arg
    setContact({
      id: partenr.id,
      name: partenr.name,
      description: partenr.description,
      link: partenr.link,
      logo: partenr.logo,
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

  const onClickDelete = partners => {
    setContact(partners)
    setDeleteModal(true)
  }

  const handleDeletePartner = () => {
    dispatch(
      deletePartner(
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
        onDeleteClick={handleDeletePartner}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="partners List" breadcrumbItem="All partners" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={partners}
                    isGlobalFilter={true}
                    isAddUserList={true}
                    handleUserClick={handleUserClicks}
                    customPageSize={10}
                    className="custom-header-css"
                  />

                  <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} tag="h4">
                      {!!isEdit ? "Edit Partner" : "Add Partner"}
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
                            name="logo"
                            src={
                              typeof validation.values?.logo === "object" &&
                              validation.values?.logo
                                ? URL.createObjectURL(validation.values?.logo)
                                : typeof validation.values.logo === "string"
                                ? validation.values.logo
                                : img
                            }
                            onChange={event => {
                              validation.setFieldValue(
                                "logo",
                                event.currentTarget.files[0]
                              )
                            }}
                          />
                          {validation.touched.logo && validation.errors.logo ? (
                            <h6>
                              <span className="text-danger" htmlFor={"logo"}>
                                {validation.errors.logo}
                              </span>
                            </h6>
                          ) : null}
                        </Row>
                        <Row>
                          <Col xs={12}>
                            <div className="mb-3">
                              <Label className="form-label">Name</Label>
                              <Input
                                name="name"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.name || ""}
                                invalid={
                                  validation.touched.name &&
                                  validation.errors.name
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.name &&
                              validation.errors.name ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.name}
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
                              <Label className="form-label">Link</Label>
                              <Input
                                name="link"
                                label="Link"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.link || ""}
                                invalid={
                                  validation.touched.link &&
                                  validation.errors.link
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.link &&
                              validation.errors.link ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.link}
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

export default withRouter(partners)
