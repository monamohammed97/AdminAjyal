import React from 'react';
import * as moment from "moment";
import { size, map } from "lodash";


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

const Name = (cell) => {
    return cell.value ? cell.value : '';
};
const Email = (cell) => {
    return cell.value ? cell.value : '';
};
const Phone = (cell) => {
    return cell.value ? cell.value : '';
};
const Message = (cell) => {
    return cell.value.length >= 50 ? cell.value.substring(0, 50) + " ...": cell.value;
};



export {
    Name,
    Email,
    Phone,
    Message
};