import React from "react"
import * as moment from "moment"
import { size, map } from "lodash"

const formateDate = (date, format) => {
  const dateFormat = format ? format : "DD MMM Y"
  const date1 = moment(new Date(date)).format(dateFormat)
  return date1
}
const toLowerCase1 = str => {
  return str === "" || str === undefined ? "" : str.toLowerCase()
}

const Name = cell => {
  return cell.value ? cell.value : ""
}
const Email = cell => {
  return cell.value ? cell.value : ""
}
const Address = cell => {
  return cell.value ? cell.value : ""
}
const Phone = cell => {
  return cell.value ? cell.value : ""
}
const Rate = cell => {
  return cell.value ? cell.value : ""
}
const Transport = cell => {
  return cell.value ? cell.value : ""
}
const Status = cell => {
  return cell.value ? cell.value : ""
}
const TotalIncome = cell => {
  return cell.value ? cell.value : ""
}
const TotalJobs = cell => {
  return cell.value ? cell.value : ""
}
const Group = cell => {
  return cell.title ? cell.title + ", " : ""
}

export {
  Name,
  Email,
  Address,
  Phone,
  Rate,
  Transport,
  Status,
  TotalIncome,
  TotalJobs,
  Group,
}
