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
  Row,
} from "reactstrap"

import { Student } from "./contactlistCol"

//Import Breadcrumb

//redux
import { useDispatch, useSelector } from "react-redux"
import TableContainer from "components/Common/TableContainer"
import Breadcrumbs from "components/Common/Breadcrumb"
import { validationSchema } from "./validationSchema"

import { notify } from "components/Common/notify"
import { getStudents } from "store/admin/student/actions"
import { getCourses } from "store/admin/course/actions"
import { addAttend, getStudentsG } from "store/mentor/attendence/actions"

const Attendence = props => {
  //meta course_id

  document.title = "Attendence"
  const MENTOR_ID = localStorage.getItem("ID")
  const { students } = useSelector(store => store?.students)
  const { students_attendence } = useSelector(store => store?.attendence)
  // const { students_g } = useSelector(store => store?.attendence)
  const { courses } = useSelector(store => store?.courses)
  const filterCourses = courses?.filter(el => el?.mentor_id == MENTOR_ID)
  const [qu, setQu] = useState({})
  var curr = new Date()
  curr.setDate(curr.getDate())
  var date = curr.toISOString().substring(0, 10)
  const [id, setId] = useState(0)
  const [newDate, setNewDate] = useState(date)
  // validation
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      course_id: id,
      date: newDate,
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
    },
  })

  const dispatch = useDispatch()
  const [contact, setContact] = useState()
  const handleChangeID = id => {
    setId(id)
    setQu({})
  }
  const handleChangeDate = date => {
    setNewDate(date)
  }
  const currentCourse = filterCourses.filter(el => el?.id == id)

  const studentsOfCourse = []
  students.filter(el => {
    el.groups.map(group => {
      if (group.id == currentCourse[0]?.group_id) studentsOfCourse.push(el)
    })
  })

  useMemo(() => {
    if (studentsOfCourse?.length != 0) {
      studentsOfCourse?.forEach(element => {
        if (students_attendence?.length == 0) {
          qu[element?.id] = false
        } else {
          students_attendence?.map(el => {
            if (el.student_id == element?.id) {
              qu[element.id] = el?.status == "attend" ? true : false
            }
          })
        }
      })
    }
  }, [id, newDate, students_attendence?.length])

  console.log("students_attendence", qu)
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
    dispatch(getCourses())
    setId(filterCourses[0]?.id)
  }, [dispatch, filterCourses[0]?.id])

  useEffect(() => {
    dispatch(getStudentsG(id, newDate))
  }, [id, newDate])
  // useEffect(() => {
  //   if (students && !students.length) {
  //     dispatch(getQuestions())
  //     setIsEdit(false)
  //   }
  // }, [dispatch, students])

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
                  onChange={e => {
                    handleChangeID(e.target.value)
                  }}
                  onBlur={validation.handleBlur}
                  value={id || ""}
                  invalid={
                    validation.touched.course_id && validation.errors.course_id
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
                  onChange={e => {
                    handleChangeDate(e.target.value)
                  }}
                  onBlur={validation.handleBlur}
                  value={newDate || ""}
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
                <button
                  type="submit"
                  className="btn btn-success save-user w-100"
                >
                  Save
                </button>
              </div>
            </Row>
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    {studentsOfCourse ? (
                      <TableContainer
                        columns={columns}
                        data={studentsOfCourse}
                        isGlobalFilter={true}
                        // isAddUserList={true}
                        handleUserClick={handleUserClicks}
                        customPageSize={10}
                        className="custom-header-css"
                      />
                    ) : null}
                  </CardBody>
                </Card>
              </Col>
            </Row>

            {/* <Row>
              <Col></Col>
            </Row> */}
          </Form>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(Attendence)
