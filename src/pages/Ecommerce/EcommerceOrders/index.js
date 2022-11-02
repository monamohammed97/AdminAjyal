import React, { useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { isEmpty } from "lodash"
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import TableContainer from "../../../components/Common/TableContainer"
import * as Yup from "yup"
import { useFormik } from "formik"

//import components
import Breadcrumbs from "../../../components/Common/Breadcrumb"
import DeleteModal from "../../../components/Common/DeleteModal"


import { OrderId, Patient, Date, PaymentStatus } from "./EcommerceOrderCol"

//redux
import { useSelector, useDispatch } from "react-redux"
import EcommerceOrdersModal from "./EcommerceOrdersModal"

import {
  Button,
  Col,
  Row,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  FormFeedback,
  Label,
  Card,
  CardBody,
} from "reactstrap"
import { getOrdersData } from "store/doctors/actions"

function EcommerceOrder() {
  //meta title
  document.title = "Orders | ABHA"
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ]

  const [modal, setModal] = useState(false)
  const [modal1, setModal1] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const [orderList, setOrderList] = useState([])
  const [order, setOrder] = useState(null)

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      user_id: (order && order.user_id) || "",
      offer_id: (order && order.offer_id) || "",
      orderdateAt: (order && order.orderdateAt) || "",
      // total: (order && order.total) || "",
      status: (order && order.status) || "Pending",
      // badgeclass: (order && order.badgeclass) || "success",
      // paymentMethod: (order && order.paymentMethod) || 'Mastercard',
    },
    validationSchema: Yup.object({
      user_id: Yup.string().required("Please Enter Your Order Id"),
      offer_id: Yup.string().required("Please Enter Your Patient"),
      orderdateAt: Yup.string().required("Please Enter Your Order Date"),
      // total: Yup.string().required("Offer Amount"),
      status: Yup.string().required("Please Enter Your Payment Status"),
      // badgeclass: Yup.string().required("Please Enter Your Badge Class"),
      // paymentMethod: Yup.string().required("Please Enter Your Payment Method"),
    }),
    onSubmit: values => {
      if (isEdit) {
        const updateOrder = {
          id: order ? order.id : 0,
          user_id: values.user_id,
          offer_id: values.offer_id,
          orderdateAt: values.orderdateAt,
          // total: values.total,
          status: values.status,
          // paymentMethod: values.paymentMethod,
          // badgeclass: values.badgeclass,
        }
        // console.log("updateOrder", updateOrder)
        // update order
        // dispatch(
        //   updateOrder(
        //     updateOrder,
        //     () => {
        //       //  should  be  chnage  the  text  info

        //       notify("success", "Success")
        //     },
        //     () => {
        //       //  should  be  chnage  the  text  info
        //       notify("error", "Failed")
        //     }
        //   )
        // )
        validation.resetForm()
      } else {
        const newOrder = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,
          user_id: values["user_id"],
          offer_id: values["offer_id"],
          orderdateAt: values["orderdateAt"],
          // total: values["total"],
          status: values["status"],
          // paymentMethod: values["paymentMethod"],
          // badgeclass: values["badgeclass"],
        }
        // console.log("newOrder", newOrder)
        // save new order
        // dispatch(onAddNewOrder(newOrder))
        validation.resetForm()
      }
      toggle()
    },
  })

  const toggleViewModal = () => setModal1(!modal1)
  const dispatch = useDispatch()
  const { ordersData } = useSelector(store => store?.doctors)

  useEffect(() => {
    if (ordersData && !ordersData.length) {
      dispatch(getOrdersData())
    }
  }, [dispatch, ordersData])

  useEffect(() => {
    setOrderList(ordersData)
  }, [ordersData])

  useEffect(() => {
    if (!isEmpty(ordersData) && !!isEdit) {
      setOrderList(ordersData)
      setIsEdit(false)
    }
  }, [ordersData])

  const toggle = () => {
    if (modal) {
      setModal(false)
      setOrder(null)
    } else {
      setModal(true)
    }
  }

  const handleOrderClick = arg => {
    const order = arg
    setOrder({
      id: order.id,
      user_id: order.user_id,
      offer_id: order.offer_id,
      orderdateAt: order.orderdateAt,
      // total: order.total,
      status: order.status,
      // paymentMethod: order.paymentMethod,
      // badgeclass: order.badgeclass,
    })

    setIsEdit(true)

    toggle()
  }

  //delete order
  const [deleteModal, setDeleteModal] = useState(false)

  const onClickDelete = order => {
    setOrder(order)
    setDeleteModal(true)
  }

  const handleDeleteOrder = () => {
    if (order.id) {
      dispatch(onDeleteOrder(order))
      setDeleteModal(false)
    }
  }
  const handleOrderClicks = () => {
    setOrderList("")
    setIsEdit(false)
    toggle()
  }

  const columns = useMemo(
    () => [
      {
        Header: "#",
        id: "index",
        accessor: (_row, i) => i + 1,
      },
      {
        Header: "Order Code",
        accessor: "user_id",
        width: "150px",
        style: {
          textAlign: "center",
          width: "10%",
          background: "#0000",
        },
        filterable: true,
        Cell: cellProps => {
          return <OrderId {...cellProps} />
        },
      },
      {
        Header: "Patient Name",
        accessor: "offer_id",
        filterable: true,
        Cell: cellProps => {
          return <Patient {...cellProps} />
        },
      },
      {
        Header: "Order Date",
        accessor: "orderdateAt",
        filterable: true,
        Cell: cellProps => {
          return <Date {...cellProps} />
        },
      },
      {
        Header: "Status",
        accessor: "status",
        filterable: true,
        Cell: cellProps => {
          return <PaymentStatus {...cellProps} />
        },
      },
      {
        Header: "Action",
        accessor: "action",
        disableFilters: true,
        Cell: cellProps => {
          return (
            <div className="d-flex gap-3">
              <Link
                to="#"
                className="text-success"
                onClick={() => {
                  const orderData = cellProps.row.original
                  handleOrderClick(orderData)
                }}
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit
                </UncontrolledTooltip>
              </Link>
            </div>
          )
        },
      },
    ],
    []
  )

  return (
    <React.Fragment>
      <EcommerceOrdersModal isOpen={modal1} toggle={toggleViewModal} />
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteOrder}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Offers" breadcrumbItem="Orders" />
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={ordersData}
                    isGlobalFilter={true}
                    handleOrderClicks={handleOrderClicks}
                    customPageSize={10}
                    className="custom-header-css"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} tag="h4">
              {!!isEdit ? "Edit Order" : "Add Order"}
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
                  <Col className="col-12">
                    {/* <div className="mb-3">
                      <Label className="form-label">Order Id</Label>
                      <Input
                        name="user_id"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.user_id || ""}
                        invalid={
                          validation.touched.user_id &&
                          validation.errors.user_id
                            ? true
                            : false
                        }
                      />
                      {validation.touched.user_id &&
                      validation.errors.user_id ? (
                        <FormFeedback type="invalid">
                          {validation.errors.user_id}
                        </FormFeedback>
                      ) : null}
                    </div> */}
                    {/* <div className="mb-3">
                      <Label className="form-label">Patient</Label>
                      <Input
                        name="offer_id"
                        type="text"
                        validate={{
                          required: { value: true },
                        }}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.offer_id || ""}
                        invalid={
                          validation.touched.offer_id &&
                          validation.errors.offer_id
                            ? true
                            : false
                        }
                      />
                      {validation.touched.offer_id &&
                      validation.errors.offer_id ? (
                        <FormFeedback type="invalid">
                          {validation.errors.offer_id}
                        </FormFeedback>
                      ) : null}
                    </div> */}
                    {/* <div className="mb-3">
                      <Label className="form-label">Offer</Label>
                      <Input
                        name="total"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.total || ""}
                        invalid={
                          validation.touched.total && validation.errors.total
                            ? true
                            : false
                        }
                      />
                      {validation.touched.total && validation.errors.total ? (
                        <FormFeedback type="invalid">
                          {validation.errors.total}
                        </FormFeedback>
                      ) : null}
                    </div> */}
                    {/* <div className="mb-3">
                      <Label className="form-label">Order Date</Label>
                      <Input
                        name="orderdateAt"
                        type="date"
                        // value={orderList.orderdateAt || ""}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.orderdateAt || ""}
                        invalid={
                          validation.touched.orderdateAt &&
                          validation.errors.orderdateAt
                            ? true
                            : false
                        }
                      />
                      {validation.touched.orderdateAt &&
                      validation.errors.orderdateAt ? (
                        <FormFeedback type="invalid">
                          {validation.errors.orderdateAt}
                        </FormFeedback>
                      ) : null}
                    </div> */}

                    <div className="mb-3">
                      <Label className="form-label">Offer</Label>
                      <Input
                        name="status"
                        type="select"
                        className="form-select"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.status || ""}
                      >
                        <option>Pending</option>
                        <option>Scheduling </option>
                        <option>Completed </option>
                        <option>Canceled</option>
                      </Input>
                      {validation.touched.status && validation.errors.status ? (
                        <FormFeedback type="invalid">
                          {validation.errors.status}
                        </FormFeedback>
                      ) : null}
                    </div>
                    {/* <div className="mb-3">
                      <Label className="form-label">Badge Class</Label>
                      <Input
                        name="badgeclass"
                        type="select"
                        className="form-select"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.badgeclass || ""}
                      >
                        <option>success</option>
                        <option>danger</option>
                        <option>warning</option>
                      </Input>
                    </div> */}
                    {/* <div className="mb-3">
                      <Label className="form-label">Payment Method</Label>
                      <Input
                        name="paymentMethod"
                        type="select"
                        className="form-select"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={
                          validation.values.paymentMethod || ""
                        }
                      >
                        <option>Mastercard</option>
                        <option>Visa</option>
                        <option>Paypal</option>
                        <option>COD</option>
                      </Input>
                    </div> */}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="text-end">
                      <button
                        type="submit"
                        className="btn btn-success save-user mx-2"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => setModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
          </Modal>
        </div>
      </div>
    </React.Fragment>
  )
}
EcommerceOrder.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
}

export default EcommerceOrder
