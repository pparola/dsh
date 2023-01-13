import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export default function CarteraSelect(props) {
    return (
        <Select
            labelid={props.labelId}
            className={props.className}
            value={props.value}
            onChange={props.handleChange}
        >
            <MenuItem value="T" >Todo</MenuItem>
            <MenuItem value="D" >Dirigido</MenuItem>
            <MenuItem value="E" >Efectivo</MenuItem>
        </Select>
    );
}