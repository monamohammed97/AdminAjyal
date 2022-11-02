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

const GroupID = (cell) => {
    return cell.value ? cell.value : '';
};
const StartDate = (cell) => {
    return cell.value ? cell.value : '';
};
const Title = (cell) => {
    return cell.value ? cell.value : '';
};
const Description = (cell) => {
    return cell.value ? cell.value : '';
};
const EndDate = (cell) => {
    return cell.value ? cell.value : '';
};
const Status = (cell) => {
    return cell.value ? cell.value : '';
};
const HourCount = (cell) => {
    return cell.value ? cell.value : '';
};
const MentorID = (cell) => {
    return cell.value ? cell.value : '';
};



export {
    GroupID,
    StartDate,
    Title,
    Description,
    EndDate,
    Status,
    MentorID,
    HourCount
};