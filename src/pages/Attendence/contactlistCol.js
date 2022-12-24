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

const Student = (cell) => {
    return cell.value ? cell.value : '';
};
const Answer = (cell) => {
    return cell.value ? cell.value : '';
};



export {
    Student,
    Answer,
};