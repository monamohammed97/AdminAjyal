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

const Budget = (cell) => {
    return cell.value ? cell.value : '';
};
const StartDate = (cell) => {
    return cell.value ? cell.value : '';
};
const Title = (cell) => {
    return cell.value ? cell.value : '';
};
const Description = (cell) => {
    return cell.value.length >= 50 ? cell.value.substring(0, 50) + " ...": cell.value;
};
const EndDate = (cell) => {
    return cell.value ? cell.value : '';
};
const Status = (cell) => {
    return cell.value ? cell.value : '';
};
const Partner = (cell) => {
    return cell.name ? cell.name : '';
};


export {
    Budget,
    StartDate,
    Title,
    Description,
    EndDate,
    Status,
    Partner
};