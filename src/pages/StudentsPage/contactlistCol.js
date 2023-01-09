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

const Platform = (cell) => {
    return cell.value ? cell.value : '';
};
const Student = (cell) => {
    return cell.value ? cell.value : '';
};
const Group = (cell) => {
    return cell.value ? cell.value : '';
};
const Title = (cell) => {
    return cell.value ? cell.value : '';
};
const Salary = (cell) => {
    return cell.value ? cell.value : '';
};
const Description = (cell) => {
    return cell.value ? cell.value : '';
};
const Status = (cell) => {
    return cell.value ? cell.value : '';
};
const JobLink = (cell) => {
    return cell.value ? cell.value : '';
};
const Note = (cell) => {
    return cell.value ? cell.value : '';
};
const Feedback = (cell) => {
    return cell.value ? cell.value : '';
};



export {
    Platform,
    Student,
    Group,
    Title,
    Salary,
    Description,
    Status,
    JobLink,
    Note,
    Feedback
};