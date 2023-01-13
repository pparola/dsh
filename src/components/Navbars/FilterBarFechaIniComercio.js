import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { green, orange, cyan } from '@material-ui/core/colors';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import ComercioSelect from 'components/Selectors/ComercioSelect';
import { whiteColor, successColor } from 'assets/jss/material-dashboard-react';

import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles(theme => ({
  root: {
    color: whiteColor
  },
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

export default function FilterBarFechaIniComercio(props) {
  const classes = useStyles();
  //const { year , month } = props;
 
  const [fechaDesde, setFechaDesde] = React.useState(props.fechaDesde);
  const [ comercioDesde, setComercioDesde] = React.useState("00000");
  const [ comercioHasta, setComercioHasta] = React.useState("ZZZZZ");
 // const [ openerror, setOpenError] = React.useState(false);

  const handleFechaDesdeChange = (date) => {
    setFechaDesde(date);
  };


  const handleChangeComercioDesde = event => {
    setComercioDesde(event.target.value);
  };
  
  const handleChangeComercioHasta = event => {
    setComercioHasta(event.target.value);
  };

  const setDataReturn= () => {
    return {
      fechaDesde: fechaDesde,
      comercioDesde: comercioDesde ,
      comercioHasta: comercioHasta
    }
  }


  return (
    <div className={classes.grow}>
      <Snackbar 
            open={props.openError} 
            autoHideDuration={6000} 
            anchorOrigin={{ vertical: 'top', horizontal: 'right'  }}
            message="No se puede leer datos desde el servidor."
      > </Snackbar>
      <AppBar position="static" style={{ background: orange[600] }}>
        <Toolbar >
        <GridContainer>
             <MuiPickersUtilsProvider utils={DateFnsUtils}  className={classes.select}>
             <GridItem >
                  <FormControl className={classes.formControl}>
                    <KeyboardDatePicker
                        disableToolbar
                        className={classes.select}
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="FechaDesde"
                        label="Fecha Desde"
                        value={fechaDesde}
                        autoOk={true}
                        ///maxDate={fechaHasta}
                        //maxDateMessage="Error en rango de fecha"
                        onChange={handleFechaDesdeChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                  </FormControl>
                  </GridItem>
                 
              </MuiPickersUtilsProvider>
               <GridItem >
                  <FormControl className={classes.formControl}>
                    <ComercioSelect
                      label="Comercio"
                      className={classes.select}
                      value={comercioDesde}
                      handleChange={handleChangeComercioDesde}
                    >
                    </ComercioSelect>
                  </FormControl>
              </GridItem>
              <GridItem >
                <FormControl className={classes.formControl}>
                    <ComercioSelect
                      label="Comercio"
                      className={classes.select}
                      value={comercioHasta}
                      handleChange={handleChangeComercioHasta}
                    >
                    </ComercioSelect>
              </FormControl>
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
