import React from 'react';
import { Link } from 'react-router-dom';
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

const Clinic = (cell) => {
    return cell.value ? cell.value : '';
};

const Description = (cell) => {
    return cell.value ? cell.value : '';
};

const Code = (cell) => {
    return cell.value ? cell.value : '';
};

const Specialization = (cell) => {
    return cell.value ? cell.value : '';
};


export {
    Name,
    Clinic,
    Description,
    Code,
    Specialization,
};