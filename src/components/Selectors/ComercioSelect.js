import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from '@material-ui/core/TextField';
import { fade, makeStyles } from '@material-ui/core/styles';
import { whiteColor } from 'assets/jss/material-dashboard-react';

const useStyles = makeStyles(theme => ({
    label: {
        color: whiteColor,
        "&$focusedLabel": {
          color: whiteColor
        },
        "&$erroredLabel": {
          color: "orange"
        }
      },
      focusedLabel: {},
      erroredLabel: {},
      underline: {
        "&$error:after": {
          borderBottomColor: "orange"
        },
        "&:after": {
          borderBottom: `2px solid cyan`
        }
      }, 
      error: {}
  }));

export default function ComercioSelect(props) {
    const classes = useStyles();
    return (
        <TextField 
            id="comercioID" 
            label={props.label} 
            value={props.value} 
            onChange={props.handleChange}
            InputLabelProps={{
                classes: {
                  root: classes.label,
                  focused:classes.focusedLabel,
                }
              }}
        />
    );
}