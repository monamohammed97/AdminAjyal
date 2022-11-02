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

const Title = (cell) => {
    return cell.value ? cell.value : '';
};
const Details = (cell) => {
    return cell.value ? cell.value : '';
};
const Notes = (cell) => {
    return cell.value ? cell.value : '';
};
const Attachment = (cell) => {
    return cell.value ? cell.value : '';
};
const Deadline = (cell) => {
    return cell.value ? cell.value : '';
};
const Status = (cell) => {
    return cell.value ? cell.value : '';
};


export {
    Title,
    Details,
    Notes,
    Attachment,
    Deadline,
    Status
};