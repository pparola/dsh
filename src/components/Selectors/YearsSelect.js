import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';



export default function YearsSelect(props) {
    return (
    <Select
        labelid={props.labelId}
        className={props.className}
        value={props.value}
        onChange={props.handleChange}
    >
        {props.list.map(( year, key ) => {
            return(
            <MenuItem value={year} key={key}>{year}</MenuItem>
            );
        })}
    </Select>
    );
}