import React, { Component } from "react";

import MaterialTable from "material-table";
import MTableHeader from "material-table/dist/components/m-table-header.js";
import  MTableBody from "material-table/dist/components/m-table-body.js";
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// react plugin for creating charts
// @material-ui/core
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import {ThemeProvider } from "@material-ui/styles";
import axios from 'axios';
import LinearProgress from '@material-ui/core/LinearProgress';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import FilterBar from 'components/Navbars/FilterBar.js';

import { nFormat } from "variables/numberformatmodule.js";
import { getUri } from "variables/general.js";

import { TableFooter } from "@material-ui/core";

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
  let subtotales={ registros:0, importe:0, recargo:0, total:0}; 
  let totales={ registros:0, importe:0, recargo:0, total:0}; 

  console.log("props",props);
 if (props.data.renderData)
 {
   let data=props.data.renderData;

        for (let i=0; i<data.length;i++)
      {
        subtotales.registros += Number(data[i].REGISTROS);
        subtotales.importe += Number(data[i].IMPORTE);
        subtotales.recargo += Number(data[i].RECARGO);
        subtotales.total += Number(data[i].TOTAL);
      }
      totales=props.data.options.totales;
 }
    return (
      <>
       
          <TableRow style={{color:'#fff'}}>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}}>SubTotal</TableCell>
              <TableCell colSpan={2} style={{ backgroundColor: '#01579b',color:'#fff'}}></TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right">{nFormat.fn(subtotales.registros)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fcurrency(subtotales.importe)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fcurrency(subtotales.recargo)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fcurrency(subtotales.total)}</TableCell>
          </TableRow>
          <TableRow style={{color:'#fff'}}>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}}>Total</TableCell>
              <TableCell colSpan={2} style={{ backgroundColor: '#01579b',color:'#fff'}}></TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right">{nFormat.fn(totales.registros)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fcurrency(totales.importe)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fcurrency(totales.recargo)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fcurrency(totales.total)}</TableCell>
          </TableRow>
      </>
    );
  }


  const TableData = (props) => {
    console.log('tabledata',props);
    const columns=[
      { title: "Comercio", field: "COMERCIO" },
      { title: "Nombre",   field: "NOMBRE", width:200 },
      { title: "Fecha", field: "FECHA" },
      { title: "Cantidad", field: "REGISTROS",type:'numeric' },
      { title: "Importe", field: "IMPORTE",type:'currency',currencySetting: nFormat.currencySetting   },
      { title: "Recargo", field: "RECARGO" ,type:'currency', currencySetting: nFormat.currencySetting  },
      { title: "Total", field: "TOTAL",type:'currency',currencySetting: nFormat.currencySetting  }
    ];
    
    const components = {
      Body: props => (
          <>
              <MTableBody {...props} />
              <TableFooter>
                  <TableTotales  data={props} />
              </TableFooter>
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
export default function CobranzasDiarias() {
const classes = useStyles();
const [data, setData] = React.useState([]);
const [totales, setTotales]= React.useState({ registros:0, importe:0, recargo:0, total:0});
const [ showProgress, setshowProgress] = React.useState(false);
const d=new Date();
const title="Cobranza  Diarias";


const CalculaTotales = (data) => {
  let totales={ registros:0, importe:0, recargo:0, total:0}; 

  for (let i=0; i<data.length;i++)
  {
    totales.registros += Number(data[i].REGISTROS);
    totales.importe += Number(data[i].IMPORTE);
    totales.recargo += Number(data[i].RECARGO);
    totales.total += Number(data[i].TOTAL);
  }

  return totales;
}

const putData = (data) => {
  setTotales(CalculaTotales(data));
  setData(data);
}

let uri= getUri('CobranzasDiarias') ;
const handleOnClickOk = (e , p) => {
  setshowProgress(true);
  axios.get( uri, {
    params: {
      year: p.year,
      month: p.month
    
    }
  })
  .then(res => {
    putData( res.data)
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
            viewCartera={false}
            viewComercio={false}
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
