import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { green, orange, cyan } from '@material-ui/core/colors';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import YearsSelect from 'components/Selectors/YearsSelect';
import MonthSelect from 'components/Selectors/MonthSelect';
import CarteraSelect from 'components/Selectors/CarteraSelect';
import ComercioSelect from 'components/Selectors/ComercioSelect';
import { whiteColor, successColor } from 'assets/jss/material-dashboard-react';

import { dateNames, years } from 'variables/datemodule.js';
import { checkPropTypes } from 'prop-types';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2)
 
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    color: whiteColor,
  },
  select: {
    padding: 2,
    color:  whiteColor,
  },
  label: {
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
  const [ year, setYear] = React.useState(Number(props.year));
  const [ month, setMonth] = React.useState(Number(props.month));
  const [ cartera, setCartera] = React.useState("T");
  const [ comercio, setComercio] = React.useState("");


  const yearlist=years.getYears(-5);

  console.log("yearlist",yearlist);

  const viewYear = typeof props.viewYear !== 'undefined' ?  props.viewYear : true;
  const viewMonth = typeof props.viewMonth !== 'undefined' ?  props.viewMonth : true;
  const viewCartera = typeof props.viewCartera !== 'undefined' ?  props.viewCartera : true;
  const viewComercio = typeof props.viewComercio !== 'undefined' ?  props.viewComercio : true;

  const handleChangeYear = event => {
    setYear(event.target.value);
  };

  const handleChangeMonth = event => {
    setMonth(Number(event.target.value));
  };


  const handleChangeCartera = event => {
    setCartera(event.target.value);
  };

  const handleChangeComercio = event => {
    setComercio(event.target.value);
  };
  const setDataReturn= () => {
    return {
      year: year,
      month: month + 1,
      cartera: cartera,
      comercio: comercio
    }
  }


  return (
    <div className={classes.grow}>
      <AppBar position="static" style={{ background: orange[600] }}>
        <Toolbar>
        <GridContainer>
            <GridItem >
                  {(viewYear) ? (
                    <FormControl className={classes.formControl}>
                      <InputLabel id="yearsSelectLabel" className={classes.label}>Año</InputLabel>
                      <YearsSelect
                        labelId="yearsSelectLabel"
                        className={classes.select}
                        value={year}
                        list={yearlist}
                        handleChange={handleChangeYear}
                      >
                      </YearsSelect>
                    </FormControl>
                    ) : ( null )  
                  }
              </GridItem>
              <GridItem >
                  { (viewMonth)  ? (
                    <FormControl className={classes.formControl}>
                    <InputLabel id="monthSelectLabel" className={classes.label}>Mes</InputLabel>
                      <MonthSelect
                        labelId="monthSelectLabel"
                        className={classes.select}
                        value={ month }
                        handleChange={handleChangeMonth}
                      >
                      </MonthSelect> 
                    </FormControl>
                    ) : ( null ) 
                  } 
              </GridItem>
              <GridItem >
                  {(viewCartera) ? (
                    <FormControl className={classes.formControl}>
                      <InputLabel id="carteraSelectLabel" className={classes.label}>Cartera</InputLabel>
                      <CarteraSelect
                        labelId="carteraSelectLabel"
                        className={classes.select}
                        value={cartera}
                        handleChange={handleChangeCartera}
                      >
                      </CarteraSelect>
                    </FormControl>
                    ) : ( null ) 
                  }
              </GridItem>
              <GridItem >
                  {(viewComercio) ? (
                    <FormControl className={classes.formControl}>
                      <ComercioSelect
                        label="Comercio"
                        className={classes.select}
                        value={comercio}
                        handleChange={handleChangeComercio}
                      >
                      </ComercioSelect>
                    </FormControl>
                  ) : ( null )
                  }
              </GridItem>
              <GridItem>
                  <IconButton
                    id="btnOk"
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="open filter"
                    onClick={ (e) => props.handleOnClickOk( e, setDataReturn())}
                  >
                    <DoneIcon />
                  </IconButton>
              </GridItem>
          </GridContainer>
        </Toolbar>
      </AppBar>
     
    </div>
  );
}
