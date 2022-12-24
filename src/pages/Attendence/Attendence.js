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

import { Student } from "./contactlistCol"

//Import Breadcrumb

import { isEmpty } from "lodash"

//redux
import { useDispatch, useSelector } from "react-redux"
import DeleteModal from "components/Common/DeleteModal"
import TableContainer from "components/Common/TableContainer"
import { FileInput } from "components/Form/FileInput"
import Breadcrumbs from "components/Common/Breadcrumb"
import { validationSchema } from "./validationSchema"

import { notify } from "components/Common/notify"
import { getStudents } from "store/admin/student/actions"
import { getGroups } from "store/admin/group/actions"
import { addAttend } from "store/mentor/attendence/actions"

const Attendence = props => {
  //meta course_id

  document.title = "Attendence"

  const dispatch = useDispatch()
  const [contact, setContact] = useState()
  const [checkStd, setCheck] = useState(false)

  // validation
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      course_id: "",
      date: "",
      students: {},
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      let newData = {}
      for (let i in qu) {
        if (qu[i] == true) {
          newData[i] = "attend"
        } else {
          newData[i] = "absent"
        }
      }
      var data = {
        course_id: values?.course_id,
        date: values?.date,
        students: newData,
      }

      dispatch(addAttend(data, notify("success", "Done"), null))

      validation.resetForm()
      toggle()
    },
  })

  const { students } = useSelector(store => store?.students)
  // const { students } = useSelector(store => store?.students)
  const { groups } = useSelector(store => store?.groups)

  const [qu, setQu] = useState({})

  useMemo(() => {
    if (students?.length != 0) {
      students?.forEach(element => {
        if (element.id % 2 == 0) {
          qu[element.id] = false
        } else {
          qu[element.id] = true
        }
      })
    }
  }, [students])

  const useCB = useCallback(
    (cellProps, value) => {
      let obj = {}
      obj[cellProps?.row?.original?.id] = !value

      setQu(prev => {
        // let obj = {}
        Object.keys(prev).map(el => {
          if (el == cellProps?.row?.original?.id) {
            // prev[el] = !qu[el]
            // setIsActive(obj)
            qu[el] = !qu[el]
          }
        })
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
  //   let newStatus = {}
  //   Object.keys(qu).map(el => {
  //     if (el == id) {
  //       newStatus[el] = !qu[el]
  //     } else {
  //       newStatus[el] = qu[el]
  //     }
  //   })
  // }

  const columns = useMemo(
    () => [
      {
        Header: "#",
        id: "index",
        accessor: (_row, i) => i + 1,
      },
      {
        Header: "Student",
        accessor: "name",
        filterable: true,
        Cell: cellProps => {
          return <Student {...cellProps} />
        },
      },
      // {
      //   Header: "Answer",
      //   accessor: "date",
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
              onChange={
                () => useCB(cellProps, qu[cellProps?.row?.original?.id])
                // return useCB(cellProps, e.target.checked)
              }
              checked={qu[cellProps?.row?.original?.id]}
            />
          )
        },
      },
    ],
    []
  )

  useEffect(() => {
    dispatch(getStudents())
    dispatch(getGroups())
  }, [dispatch])
  // useEffect(() => {
  //   if (students && !students.length) {
  //     dispatch(getQuestions())
  //     setIsEdit(false)
  //   }
  // }, [dispatch, students])

  const toggle = () => {
    setModal(!modal)
  }

  // const handleUserClick = arg => {
  //   const student = arg
  //   setContact({
  //     id: student.id,
  //     course_id: student.course_id,
  //     date: student.date,
  //     students: student.students,
  //   })
  //   setIsEdit(true)

  //   toggle()
  // }

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

  const onClickDelete = students => {
    setContact(students)
    setDeleteModal(true)
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
          <Breadcrumbs course_id="Mentors List" breadcrumbItem="All Mentors" />
          <Form
            onSubmit={e => {
              e.preventDefault()
              validation.handleSubmit()
              return false
            }}
          >
            <Row form>
              <div className="mb-3 col-5">
                <Label className="form-label">Course</Label>
                <Input
                  name="course_id"
                  className="form-control"
                  type="select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.course_id || ""}
                  invalid={
                    validation.touched.course_id && validation.errors.course_id
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
                {validation.touched.course_id && validation.errors.course_id ? (
                  <FormFeedback type="invalid">
                    {validation.errors.course_id}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3 col-5">
                <Label className="form-label">Date</Label>
                <Input
                  name="date"
                  label="Answer"
                  type="date"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.date || ""}
                  invalid={
                    validation.touched.date && validation.errors.date
                      ? true
                      : false
                  }
                />
                {validation.touched.date && validation.errors.date ? (
                  <FormFeedback type="invalid">
                    {validation.errors.date}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="col-2 d-flex justify-content-center align-items-center">
                  <button type="submit" className="btn btn-success save-user w-100">
                    Save
                  </button>
                </div>
            </Row>
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <TableContainer
                      columns={columns}
                      data={students}
                      isGlobalFilter={true}
                      // isAddUserList={true}
                      handleUserClick={handleUserClicks}
                      customPageSize={10}
                      className="custom-header-css"
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col>
                
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(Attendence)
