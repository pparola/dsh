import React, { Component } from "react";

import MaterialTable from "material-table";
import MTableHeader from "material-table/dist/components/m-table-header.js";
import  MTableBody from "material-table/dist/components/m-table-body.js";
// react plugin for creating charts
// @material-ui/core
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import {ThemeProvider } from "@material-ui/styles";
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from 'axios';

import { AddBox, ArrowDownward } from "@material-ui/icons";

// core components
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import FilterBar from 'components/Navbars/FilterBar.js';

import { nFormat } from "variables/numberformatmodule.js";
import { getUri } from "variables/general.js";
import { TableFooter } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginTop:'15px',
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
  let totales={ "CANTIDADADELANTADO":0, "CAPITALADELANTADO":0, "CANTIDADVENCIDO":0,  "CAPITALVENCIDO":0 ,  "CANTIDAD":0 ,"CAPITAL":0 }; 

  console.log("props",props);
 if (props.data.renderData)
 {
      totales=props.data.options.totales;
 }
    return (
      <>
          <TableRow style={{color:'#fff'}}>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}}>Total</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right">{nFormat.fn(totales.CANTIDADADELANTADO)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fcurrency(totales.CAPITALADELANTADO)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}}></TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right">{nFormat.fn(totales.CANTIDADVENCIDO)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fcurrency(totales.CAPITALVENCIDO)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}}></TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fn(totales.CANTIDAD)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right">{nFormat.fcurrency(totales.CAPITAL)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}}></TableCell>

          </TableRow>
      </>
    );
  }

const TableData = (props) =>{
  const classes = useStyles();

  const columns=[
    { title: "Cuota", field: "CANCUO" , width:115 ,type:"numeric"},
    { title: "Cantidad", field: "CANTIDADADELANTADO",type:"numeric", width:115 },
    { title: "Capital", field: "CAPITALADELANTADO" , type:"currency", currencySetting: nFormat.currencySetting, width:115},
    { title: "%S.Cap.", field: "PORCENTUALADELANTADO", type:"numeric" , width:115,
    render: rowData => <div style={{ paddingLeft: "5px"}}>  { nFormat.fn(rowData.PORCENTUALADELANTADO)  } %  </div>
    },
    { title: "Cantidad", field: "CANTIDADVENCIDO",type:"numeric", width:115 },
    { title: "Capital", field: "CAPITALVENCIDO" ,type:"currency", currencySetting: nFormat.currencySetting, width:115},
    { title: "%S.Cap.", field: "PORCENTUALVENCIDO",type:"numeric", width:115 ,
    render: rowData => <div style={{ paddingLeft: "5px"}}>  { nFormat.fn(rowData.PORCENTUALVENCIDO) } %  </div>
    },
    { title: "Cantidad", field: "CANTIDAD", type:"numeric" , width:115},
    { title: "Capital", field: "CAPITAL", type:"currency", currencySetting: nFormat.currencySetting, width:115},
    { title: "%S.Cap.", field: "PORCENTUALCAPITAL", type:"numeric", width:115 ,
    render: rowData => <div style={{ paddingLeft: "5px"}}>  { nFormat.fn(rowData.PORCENTUALCAPITAL) } %  </div>
    },
    
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
                  <TableCell colSpan={3} align="center"  style={{color:'#fff'}}>Cuotas Adelantadas</TableCell>
                  <TableCell colSpan={3} align="center"  style={{color:'#fff'}}>Cuotas Vencidas</TableCell>
                  <TableCell colSpan={3} align="center"  style={{color:'#fff'}}>Total Capital</TableCell>
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
            paging:false,
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
const [totales, setTotales]= React.useState({ "CANTIDADADELANTADO":0, "CAPITALADELANTADO":0, "CANTIDADVENCIDO":0,  "CAPITALVENCIDO":0 ,  "CANTIDAD":0 ,"CAPITAL":0 }); 
const [ showProgress, setshowProgress] = React.useState(false);
const d=new Date();
const title="Venta Por Cuotas";


const CalculaTotales = (data) => {
  let totales={ "CANTIDADADELANTADO":0, "CAPITALADELANTADO":0, "CANTIDADVENCIDO":0,  "CAPITALVENCIDO":0 ,  "CANTIDAD":0 ,"CAPITAL":0 }; 

  for (let i=0; i<data.length;i++)
  {
    data[i].PORCENTUALADELANTADO= (data[i].PORCENTUALADELANTADO==undefined) ? 0 :data[i].PORCENTUALADELANTADO;
    data[i].PORCENTUALVENCIDO= (data[i].PORCENTUALADELANTADO==undefined) ? 0 :data[i].PORCENTUALVENCIDO;
    data[i].PORCENTUALCAPITAL= (data[i].PORCENTUALADELANTADO==undefined) ? 0 :data[i].PORCENTUALCAPITAL;
    totales.CANTIDADADELANTADO += Number(data[i].CANTIDADADELANTADO);
    totales.CAPITALADELANTADO += Number(data[i].CAPITALADELANTADO);
    totales.CANTIDADVENCIDO += Number(data[i].CANTIDADVENCIDO);
    totales.CAPITALVENCIDO += Number(data[i].CAPITALVENCIDO);
    totales.CANTIDAD += Number(data[i].CANTIDAD);
    totales.CAPITAL += Number(data[i].CAPITAL);
  }

  return totales;
}

const putData = (data) => {
  console.table(data);
  const resul= (data.status===undefined) ? data : [];
  setTotales(CalculaTotales(resul));
  setData(resul);
}

const handleOnClickOk = (e,p) => {
  setshowProgress(true);
  axios.get(getUri('VentaPorCuotas'), {
    params: {
      ano: p.year,
      mes:p.month,
      cartera:p.cartera,
      comercio: p.comercio
    }
  })
  .then(res => {
    putData( res.data);
    setshowProgress(false);
  })
  console.log("leyendo server");
}

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <FilterBar 
            year={d.getFullYear()} 
            month={d.getMonth()} 
            handleOnClickOk={handleOnClickOk}
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
