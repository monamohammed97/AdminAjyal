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

import { Question, Answer } from "./contactlistCol"

//Import Breadcrumb

import { isEmpty } from "lodash"

//redux
import { useDispatch, useSelector } from "react-redux"
import DeleteModal from "components/Common/DeleteModal"
import TableContainer from "components/Common/TableContainer"
import Breadcrumbs from "components/Common/Breadcrumb"
import { validationSchema } from "./validationSchema"
import {
  getQuestions,
  addQuestion,
  deleteQuestion,
  updateQuestion,
} from "store/admin/question/actions"
import { notify } from "components/Common/notify"

const Questions = props => {
  //meta question

  document.title = "Questions"

  const dispatch = useDispatch()
  const [contact, setContact] = useState()
  // validation
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      question: (contact && contact.question) || "",
      answer: (contact && contact.answer) || "",
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      if (isEdit) {
        var edit = new FormData()
        edit.append("question", values?.question)
        edit.append("answer", values?.answer)
        edit.append("_method", "put")
        dispatch(
          updateQuestion(
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
        data.append("question", values?.question)
        data.append("answer", values?.answer)
        dispatch(
          addQuestion(
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

  const { questions } = useSelector(store => store?.questions)

  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const columns = useMemo(
    () => [
      {
        Header: "#",
        id: "index",
        accessor: (_row, i) => i + 1,
      },
      {
        Header: "Question",
        accessor: "question",
        filterable: true,
        Cell: cellProps => {
          return <Question {...cellProps} />
        },
      },
      {
        Header: "Answer",
        accessor: "answer",
        filterable: true,
        Cell: cellProps => {
          return <Answer {...cellProps} />
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
    dispatch(getQuestions())
  }, [dispatch])

  useEffect(() => {
    if (questions && !questions.length) {
      dispatch(getQuestions())
      setIsEdit(false)
    }
  }, [dispatch, questions])

  useEffect(() => {
    setContact(questions)
    setIsEdit(false)
  }, [questions])

  useEffect(() => {
    if (!isEmpty(questions) && !!isEdit) {
      setContact(questions)
      setIsEdit(false)
    }
  }, [questions])

  const toggle = () => {
    setModal(!modal)
  }

  const handleUserClick = arg => {
    const doctor = arg
    setContact({
      id: doctor.id,
      question: doctor.question,
      answer: doctor.answer,
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

  const onClickDelete = questions => {
    setContact(questions)
    setDeleteModal(true)
  }

  const handleDeleteQuestion = () => {
    dispatch(
      deleteQuestion(
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
        onDeleteClick={handleDeleteQuestion}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs question="Mentors List" breadcrumbItem="All Mentors" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={questions}
                    isGlobalFilter={true}
                    isAddUserList={true}
                    handleUserClick={handleUserClicks}
                    customPageSize={10}
                    className="custom-header-css"
                  />

                  <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} tag="h4">
                      {!!isEdit ? "Edit Doctor" : "Add Doctor"}
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
                              <Label className="form-label">Question</Label>
                              <Input
                                name="question"
                                type="text"
                                label="Question"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.question || ""}
                                invalid={
                                  validation.touched.question &&
                                  validation.errors.question
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.question &&
                              validation.errors.question ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.question}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Answer</Label>
                              <Input
                                name="answer"
                                label="Answer"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.answer || ""}
                                invalid={
                                  validation.touched.answer &&
                                  validation.errors.answer
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.answer &&
                              validation.errors.answer ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.answer}
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

export default withRouter(Questions)
