import React from 'react';
import { Link } from 'react-router-dom';
import * as moment from "moment";
import { Badge } from 'reactstrap';

const formateDate = (date, format) => {
    const dateFormat = format ? format : "DD MMM Y";
    const date1 = moment(new Date(date)).format(dateFormat);
    return date1;
};
const toLowerCase1 = str => {
    return (
      str === "" || str === undefined ? "" : str.toLowerCase()
    );
  };

const OrderId = (cell) => {
    return (
        <Link to="#" className="text-body fw-bold">{cell.value ? cell.value : ''}</Link>
    );
};

const Patient = (cell) => {
    return cell.value ? cell.value : '';
};

const Date = (cell) => {
    return cell.value ? cell.value : '';
};

const Offer = (cell) => {
    return cell.value ? cell.value : '';
};

const PaymentStatus = (cell) => {
    return (
        <Badge
          className={"font-size-12 badge-soft-" + 
          (cell.value === "Paid" ? "success" : "danger" && cell.value === "Refund" ? "warning" : "danger")}
          pill
        >
          {cell.value}
        </Badge>
    )
};

export {
    OrderId,
    Patient,
    Date,
    Offer,
    PaymentStatus,
};