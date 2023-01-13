import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
import Typography from '@material-ui/core/Typography';
import FilterListIcon from '@material-ui/icons/FilterList';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import YearsSelect from 'components/Selectors/YearsSelect';
import MonthSelect from 'components/Selectors/MonthSelect';
import { whiteColor,successColor } from 'assets/jss/material-dashboard-react';

import { dateNames, years } from 'variables/datemodule.js';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menuButtonOk: {
    marginRight: theme.spacing(2),
    backgroundColor: successColor[0],
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  select: {
    padding: 2,
    color:  whiteColor,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

export default function DshBar(props) {
  const classes = useStyles();
  //const { year , month } = props;
  const [mode, setMode] = React.useState(0);
  const [ year, setYear] = React.useState(props.year);
  const [ month, setMonth] = React.useState(props.month);

  const yearlist=years.getYears(-5);

  console.log("yearlist",yearlist);

  const handleClick = (e, btn) => {
    if (btn=="Ok")
    {
      // ToDo Ok
    } else {
      // ToDo Cancel
    }
    if (mode==0)
    {
      setMode(1);
    } else {
      setMode(0);
    }
  };

  const handleChangeYear = event => {
    setYear(event.target.value);
  };

  const handleChangeMonth = event => {
    console.log(event.target.value);
    setMonth(Number(event.target.value)+1);
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
        { (mode===0) ? (
            <>
              
              <Typography className={classes.title} variant="h6" noWrap>
                {year} - {dateNames.month[month-1]}
              </Typography> 
              <IconButton
                edge="start"
                className={classes.menuButton }
                color="inherit"
                aria-label="open filter"
                onClick={(e) => handleClick( e)}
              >
                <FilterListIcon />
              </IconButton>
            </>
          ) : (
            <>
            <FormControl className={classes.formControl}>
              <YearsSelect
                className={classes.select}
                value={year}
                list={yearlist}
                handleChange={handleChangeYear}
              >
              </YearsSelect>
            </FormControl>
            <FormControl className={classes.formControl}>
              <MonthSelect
                className={classes.select}
                value={ month - 1}
                handleChange={handleChangeMonth}
              >
              </MonthSelect>  
              </FormControl>
              <IconButton
                id="btnOk"
                edge="start"
                className={classes.menuButtonOk}
                color="inherit"
                aria-label="open filter"
                onClick={(e) => handleClick(e,"Ok")}
              >
                <DoneIcon />
              </IconButton>
              <IconButton
                id="btnCancel"
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open filter"
                onClick={(e) => handleClick(e,"Cancel")}
              >
                <CloseIcon />
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
