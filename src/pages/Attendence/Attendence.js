import { useFormik } from "formik"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Link, withRouter } from "react-router-dom"
import Switch from "react-switch"

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
import { FileInput } from "components/Form/FileInput"
import Breadcrumbs from "components/Common/Breadcrumb"
import { validationSchema } from "./validationSchema"
import { addCourse } from "store/admin/course/actions"
import {
  getQuestions,
  addQuestion,
  deleteQuestion,
  updateQuestion,
} from "store/admin/question/actions"
import { notify } from "components/Common/notify"

const Attendence = props => {
  //meta question

  document.title = "Attendence"

  const dispatch = useDispatch()
  const [contact, setContact] = useState()
  const [checkStd, setCheck] = useState(false)

  // validation
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      question: (contact && contact.question) || "",
      answer: (contact && contact.answer) || "",
    },
    // validationSchema: validationSchema,
    onSubmit: async values => {
      if (isEdit) {
        var edit = new FormData()
        edit.append("question", values?.question)
        edit.append("answer", values?.answer)
        edit.append("_method", "put")
        // contact.question !== values.question &&
        //   edit.append("question", values?.question)
        // contact.answer !== values.answer &&
        //   edit.append("answer", values?.answer)
        //   edit.append("_method", "put")
        dispatch(
          updateQuestion(
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
        data.append("question", values?.question)
        data.append("answer", values?.answer)

        dispatch(
          addQuestion(
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

  const { questions } = useSelector(store => store?.questions)
  const [qu, setQu] = useState({})

  useMemo(() => {
    if (questions?.length != 0) {
      questions?.forEach(element => {
        if (element.id % 2 == 0) {
          qu[element.id] = false
        } else {
          qu[element.id] = true
        }
      })
    }
  }, [questions])

  const useCB = useCallback(
    (cellProps, value) => {
      // console.log("cell //",cellProps,"value", value);
      let obj = {}
      obj[cellProps?.row?.original?.id] = !value
      // console.log(obj, value)

      setQu(prev => {
        // let obj = {}
        Object.keys(prev).map(el => {
          if (el == cellProps?.row?.original?.id) {
            // prev[el] = !qu[el]
            // setIsActive(obj)
            qu[el] = !qu[el]
            // console.log("obj[el]",obj[el]);
          }
        })
        // console.log("{ ...prev, ...obj }",{ ...obj });
        return { ...prev, ...obj }
      })
    },
    [qu]
  )
  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isActive, setIsActive] = useState(false)

  // let newStatus = {}
  // const handleChangeCheck = id => {
  //   // console.log("cellProps?.row? id=qu", qu[id])
  //   let newStatus = {}
  //   Object.keys(qu).map(el => {
  //     if (el == id) {
  //       newStatus[el] = !qu[el]
  //     } else {
  //       newStatus[el] = qu[el]
  //     }
  //   })
  //   console.log(newStatus)
  // }

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
      // {
      //   Header: "Answer",
      //   accessor: "answer",
      //   filterable: true,
      //   Cell: cellProps => {
      //     return <Answer {...cellProps} />
      //   },
      // },
      {
        Header: "Action",
        Cell: cellProps => {
          return (
            <Switch
            type="checkbox"
              className="me-1"
              onColor="#800000"
              onChange={() => useCB(cellProps, qu[cellProps?.row?.original?.id])
                // console.log("onChange",value);
                // return useCB(cellProps, e.target.checked)
                // console.log(value);
                // console.log(
                //   cellProps?.row?.original?.id,
                //   Object.keys(isActive)
                //   )
              }
              checked= {qu[cellProps?.row?.original?.id]}
            />
          )
        },
      },
    ],
    []
  )
  console.log("newArr", qu)

  // console.log("//obj", Object.keys(isActive), isActive)
  useEffect(() => {
    // console.log("3", questions)

    dispatch(getQuestions())
  }, [dispatch])
  // useEffect(() => {
  //   if (questions && !questions.length) {
  //     dispatch(getQuestions())
  //     setIsEdit(false)
  //   }
  // }, [dispatch, questions])

  const toggle = () => {
    setModal(!modal)
  }

  const handleUserClick = arg => {
    const student = arg
    setContact({
      id: student.id,
      question: student.question,
      answer: student.answer,
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
                    // isAddUserList={true}
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
                        <Row form>
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

export default withRouter(Attendence)
