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

const Title = (cell) => {
    return cell.value ? cell.value : '';
};

const Description = (cell) => {
    return cell.value ? cell.value.substring(0,30)+"..." : '';
};

const Price = (cell) => {
    return cell.value ? cell.value.toLocaleString('en-US') +" SAR" : '';
};

const Expier = (cell) => {
    return cell.value ? cell.value : '';
};

const Clinic = (cell) => {
    return cell.value ? cell.value : '';
};



export {
    Title,
    Description,
    Price,
    Clinic,
    Expier,
};