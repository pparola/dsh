import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { dateNames, years } from 'variables/datemodule.js';



export default function MonthSelect(props) {
   console.log("monthselect",props);
    return (
    <Select
        labelid={props.labelId}
        className={props.className}
        value={props.value}
        onChange={props.handleChange}
    >
        {dateNames.month.map(( mm , key ) => {
            return(
            <MenuItem value={key} key={key}>{mm}</MenuItem>
            );
        })}
    </Select>
    );
}