import React, { Component } from "react";

import MaterialTable from "material-table";
import MTableHeader from "material-table/dist/components/m-table-header.js";
import  MTableBody from "material-table/dist/components/m-table-body.js";
// react plugin for creating charts
// @material-ui/core
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import {ThemeProvider } from "@material-ui/styles";
import axios from 'axios';
import LinearProgress from '@material-ui/core/LinearProgress';
import { AddBox, ArrowDownward } from "@material-ui/icons";

// core components
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TableFooter } from "@material-ui/core";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import FilterBar from 'components/Navbars/FilterBar.js';

import { nFormat } from "variables/numberformatmodule.js";
import { getUri } from "variables/general.js";
const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  row: {
    fontSize:"11px",
  },
  header:{
    backgroundColor: '#01579b',
  },
  headertitle:{
    color:"#fff",
  },
  cellremark: {
    fontSize:"11px",
    backgroundColor:"#f5f5f5",
  },
  footer : {
    fontSize:"13px",
    fontWeight:"bold",
    backgroundColor:"#cfd8dc",
  }
});


const themeTable = createMuiTheme({
  overrides: {
    MuiTableRow: {
      root: {
        "&:hover": {
          backgroundColor: "rgba(33, 150, 243, 0.5)"
        }
      }
    },
    MuiTableCell: {
      root: {
        fontSize: 11,
        padding: "6px 24px 6px 16px", 
      }
    }
  }
});

const TableTotales = (props) => {
  let subtotales={ 
    "CANTIDADADELANTADO":0, "CAPITALADELANTADO":0 ,"INTERESADELANTADO" :0 ,
    "CANTIDADVENCIDO":0, "CAPITALVENCIDO" :0, "INTERESVENCIDO" :0, 
    "CANTIDADREFINANCIADO":0, "CAPITALREFINANCIADO":0, "INTERESREFINANCIADO":0, 
     "CANTIDAD": 0, "CAPITAL" :0,  "INTERES":0 };
  let totales={ 
    "CANTIDADADELANTADO":0, "CAPITALADELANTADO":0 ,"INTERESADELANTADO" :0 ,
    "CANTIDADVENCIDO":0, "CAPITALVENCIDO" :0, "INTERESVENCIDO" :0, 
    "CANTIDADREFINANCIADO":0, "CAPITALREFINANCIADO":0, "INTERESREFINANCIADO":0, 
     "CANTIDAD": 0, "CAPITAL" :0,  "INTERES":0 };

  console.log("props",props);
  if (props.data.renderData)
 {
   let data=props.data.renderData;

        for (let i=0; i<data.length;i++)
      {
        subtotales.CANTIDADADELANTADO += Number(data[i].CANTIDADADELANTADO);
        subtotales.CAPITALADELANTADO += Number(data[i].CAPITALADELANTADO);
        subtotales.INTERESADELANTADO += Number(data[i].INTERESADELANTADO);
        subtotales.CANTIDADVENCIDO += Number(data[i].CANTIDADVENCIDO);
        subtotales.CAPITALVENCIDO += Number(data[i].CAPITALVENCIDO);
        subtotales.INTERESVENCIDO += Number(data[i].INTERESVENCIDO);
        subtotales.CANTIDADREFINANCIADO += Number(data[i].CANTIDADREFINANCIADO);
        subtotales.CAPITALREFINANCIADO += Number(data[i].CAPITALREFINANCIADO);
        subtotales.INTERESREFINANCIADO += Number(data[i].INTERESREFINANCIADO);
        subtotales.CANTIDAD += Number(data[i].CANTIDAD);
        subtotales.CAPITAL += Number(data[i].CAPITAL);
        subtotales.INTERES += Number(data[i].INTERES);
        
        
      }
      totales=props.data.options.totales;
 }
    return (
      <>
       <TableRow style={{color:'#fff'}}>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}}>SubTotal</TableCell>
              <TableCell  colspan={2} style={{ backgroundColor: '#01579b',color:'#fff'}}></TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right">{nFormat.fn(subtotales.CANTIDADADELANTADO)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fcurrency(subtotales.CAPITALADELANTADO)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fcurrency(subtotales.INTERESADELANTADO)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right">{nFormat.fn(subtotales.CANTIDADVENCIDO)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fcurrency(subtotales.CAPITALVENCIDO)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fcurrency(subtotales.INTERESVENCIDO)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right">{nFormat.fn(subtotales.CANTIDADREFINANCIADO)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fcurrency(subtotales.CAPITALREFINANCIADO)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fcurrency(subtotales.INTERESREFINANCIADO)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fn(subtotales.CANTIDAD)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right">{nFormat.fcurrency(subtotales.CAPITAL)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right">{nFormat.fcurrency(subtotales.INTERES)}</TableCell>

          </TableRow>
          <TableRow style={{color:'#fff'}}>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}}>Total</TableCell>
              <TableCell  colspan={2} style={{ backgroundColor: '#01579b',color:'#fff'}}></TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right">{nFormat.fn(totales.CANTIDADADELANTADO)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fcurrency(totales.CAPITALADELANTADO)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fcurrency(totales.INTERESADELANTADO)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right">{nFormat.fn(totales.CANTIDADVENCIDO)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fcurrency(totales.CAPITALVENCIDO)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fcurrency(totales.INTERESVENCIDO)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right">{nFormat.fn(totales.CANTIDADREFINANCIADO)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fcurrency(totales.CAPITALREFINANCIADO)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fcurrency(totales.INTERESREFINANCIADO)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fn(totales.CANTIDAD)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right">{nFormat.fcurrency(totales.CAPITAL)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right">{nFormat.fcurrency(totales.INTERES)}</TableCell>

          </TableRow>
      </>
    );
  }

const TableData = (props) =>{
  const classes = useStyles();

  const columns=[
    { title: "Comercio", field: "COMERCIO",width:80 },
    { 
      title: "Nombre", 
      field: "NOMBRE" ,
      //render: rowData => <div style={{ width:  "200px", paddingLeft: "5px"}}>  {rowData.NOMBRE}  </div>
      width:200
    },
    { title: "Fecha", field: "FECHA" ,width:115},
    { title: "Cantidad", field: "CANTIDADADELANTADO",type:'numeric'  ,width:115},
    { title: "Capital", field: "CAPITALADELANTADO" ,type:'currency',currencySetting: nFormat.currencySetting , width:115},
    { title: "Interes", field: "INTERESADELANTADO",type:'currency',  currencySetting: nFormat.currencySetting ,width:115},
    { title: "Cantidad", field: "CANTIDADVENCIDO",type:'numeric'  , width:115},
    { title: "Capital", field: "CAPITALVENCIDO",type:'currency', currencySetting: nFormat.currencySetting ,width:115},
    { title: "Interes", field: "INTERESVENCIDO",type:'currency', currencySetting: nFormat.currencySetting  ,width:115},
    { title: "Cantidad", field: "CANTIDADREFINANCIADO" ,type:'numeric' ,width:115},
    { title: "Capital", field: "CAPITALREFINANCIADO",type:'currency', currencySetting: nFormat.currencySetting  ,width:115},
    { title: "Interes", field: "INTERESREFINANCIADO",type:'currency', currencySetting: nFormat.currencySetting  ,width:115},
    { title: "Cantidad", field: "CANTIDAD",type:'numeric'  ,width:115},
    { title: "Capital", field: "CAPITAL" ,type:'currency', currencySetting: nFormat.currencySetting ,width:115},
    { title: "Interes", field: "INTERES" ,type:'currency', currencySetting: nFormat.currencySetting ,width:115}
  ];
  
  const components = {
    Body: props => (
        <>
            <MTableBody {...props} />
            <TableFooter>
                  <TableTotales  data={props} />
              </TableFooter>
           
       </>
    ),
    Header: props => (
        <>
           <TableHead className={classes.header}> 
              <TableRow>
                  <TableCell></TableCell>
                  <TableCell style={{ width:  "200px", paddingLeft: "5px"}} ></TableCell>
                  <TableCell></TableCell>
                  <TableCell  className={classes.headertitle} colSpan={3} align="center">Adelantadas</TableCell> 
                  <TableCell  className={classes.headertitle} colSpan={3} align="center">Vencidas</TableCell>   
                  <TableCell  className={classes.headertitle} colSpan={3} align="center">Refinanciado</TableCell>
                  <TableCell  className={classes.headertitle} colSpan={3} align="center">Normal</TableCell>
              </TableRow>
            </TableHead>
            <MTableHeader {...props} />
        </>
    )
  };

  return (
    <>
         <ThemeProvider theme={themeTable}>
        <MaterialTable        
          title={props.title}
          columns={columns}
          data={props.data}
          options={{
            headerStyle: {
              backgroundColor: '#01579b',
              color: '#FFF'
            },
            search: true,
            exportButton: true,
            pageSize:15,
            pageSizeOptions: [0, 5,15, 20, 50, 100] ,
            totales:props.totales
          }}
          components={components}
        />
      </ThemeProvider>
    </>
  );
}

export default function DiarioVentaComercio() {
  const classes = useStyles();
const [data, setData] = React.useState([]);

const [totales, setTotales]= React.useState({ 
  "CANTIDADADELANTADO":0, "CAPITALADELANTADO":0 ,"INTERESADELANTADO" :0 ,
  "CANTIDADVENCIDO":0, "CAPITALVENCIDO" :0, "INTERESVENCIDO" :0, 
  "CANTIDADREFINANCIADO":0, "CAPITALREFINANCIADO":0, "INTERESREFINANCIADO":0, 
   "CANTIDAD": 0, "CAPITAL" :0,  "INTERES":0 }) ;
const [ showProgress, setshowProgress] = React.useState(false);

const d=new Date();
const title="Diario de Venta Por Comercio";


const CalculaTotales = (data) => {
  let totales={ 
    "CANTIDADADELANTADO":0, "CAPITALADELANTADO":0 ,"INTERESADELANTADO" :0 ,
    "CANTIDADVENCIDO":0, "CAPITALVENCIDO" :0, "INTERESVENCIDO" :0, 
    "CANTIDADREFINANCIADO":0, "CAPITALREFINANCIADO":0, "INTERESREFINANCIADO":0, 
     "CANTIDAD": 0, "CAPITAL" :0,  "INTERES":0 };

  for (let i=0; i<data.length;i++)
  {
    totales.CANTIDADADELANTADO += Number(data[i].CANTIDADADELANTADO);
    totales.CAPITALADELANTADO += Number(data[i].CAPITALADELANTADO);
    totales.INTERESADELANTADO += Number(data[i].INTERESADELANTADO);
    totales.CANTIDADVENCIDO += Number(data[i].CANTIDADVENCIDO);
    totales.CAPITALVENCIDO += Number(data[i].CAPITALVENCIDO);
    totales.INTERESVENCIDO += Number(data[i].INTERESVENCIDO);
    totales.CANTIDADREFINANCIADO += Number(data[i].CANTIDADREFINANCIADO);
    totales.CAPITALREFINANCIADO += Number(data[i].CAPITALREFINANCIADO);
    totales.INTERESREFINANCIADO += Number(data[i].INTERESREFINANCIADO);
    totales.CANTIDAD += Number(data[i].CANTIDAD);
    totales.CAPITAL += Number(data[i].CAPITAL);
    totales.INTERES += Number(data[i].INTERES);
  }

  return totales;
}

const putData = (data) => {
  setTotales(CalculaTotales(data));
  setData(data);
}


const handleOnClickOk = (e , p) => {
  let uri= getUri('DiarioVentaComercio') ;
  setshowProgress(true);
  axios.get( uri, {
    params: {
      year: p.year,
      month: p.month
    
    }
  })
  .then(res => {
    putData( res.data);
    setshowProgress(false);
  })
}


  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <FilterBar 
            year={d.getFullYear()} 
            month={d.getMonth()} 
            handleOnClickOk={handleOnClickOk}
            viewCartera={false}
            viewComercio={false}
            >
            </FilterBar>
          { showProgress && <LinearProgress   color="secondary" />   }
         </GridItem>
       </GridContainer>
     
          <TableData 
              data={data} 
              totales={totales} 
              title={title}>
          </TableData>
      
    </div>
  );
}
