import React, { Component } from "react";

import MaterialTable from "material-table";
import  MTableBody from "material-table/dist/components/m-table-body.js";
// react plugin for creating charts
// @material-ui/core
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import {ThemeProvider } from "@material-ui/styles";
import axios from 'axios';


// core components
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TableFooter } from "@material-ui/core";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import LinearProgress from '@material-ui/core/LinearProgress';

import FilterBar from 'components/Navbars/FilterBar.js';

import { nFormat } from "variables/numberformatmodule.js";
import { dateNames } from "variables/datemodule.js";
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
  let totales={Cantidad:0, Capital:0, Interes:0, Total:0}; 

  console.log("props",props);
 if (props.data.options)
 {
      totales=props.data.options.totales;
 }
    return (
      <>
       
          <TableRow>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}}>Total</TableCell>
              <TableCell colSpan={4} style={{ backgroundColor: '#01579b',color:'#fff'}}></TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right">{nFormat.fn(totales.Cantidad)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fcurrency(totales.Capital)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fcurrency(totales.Interes)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fcurrency(totales.Total)}</TableCell>
             
          </TableRow>
      </>
    );
  }

const TableData = (props) =>{
  const classes = useStyles();
  
  const columns=[
    { title: "Id", field: "Id" },
    { title: "Comercio", field: "Comercio"},
    { 
      title: "Nombre", 
      field: "Nombre"
    },
    { title: "Mes", field: "Mes"},
    { title: "Cantidad", field: "Cantidad",width:115,type:"numeric"},
    { title: "Capital", field: "Capital"  ,width:115 , type:"currency", currencySetting: nFormat.currencySetting},
    { title: "Interes", field: "Interes"  ,width:115,type:"currency", currencySetting: nFormat.currencySetting},
    { title: "Total", field: "Total"  ,width:115 ,type:"currency", currencySetting: nFormat.currencySetting},
   
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
              paging:false,
              //pageSize:15,
              //pageSizeOptions: [0, 5,15, 20, 50, 100] 
              totales:props.totales
            }}
            components={components}
            parentChildData={(row, rows) => rows.find(a => a.Id === row.parentId)}
          />
      </ThemeProvider>
  </>
);
}

export default function VentaOperacionesDiarias() {
const classes = useStyles();
const [data, setData] = React.useState([]);
const [totales, setTotales]= React.useState({Cantidad:0, Capital:0, Interes:0, Total:0});

const [ showProgress, setshowProgress] = React.useState(false);
const d=new Date();
const title="Venta Operaciones Mensuales";

const putData = (data) => {
  let resul=totalPorDia(data);
  console.log(resul);
  setTotales(resul.total);
  setData(resul.detalle);
};


const totalPorDia = (data) =>{
  let newreg=[];
  if (data.length>0){
    let tgCantidad=0;
    let tgCapital=0;
    let tgInteres=0;
    let tgTotal=0;
    let i=0;
    while (i<data.length )
    {
      let key=data[i].Mes;
      let tCantidad=0;
      let tCapital=0;
      let tInteres=0;
      let tTotal=0;
      newreg.push({Id:key,Comercio:"", Nombre:"",Mes:dateNames.monthMin[key-1], Cantidad:0, Capital:0, Interes:0, Total:0});
      let j=newreg.length -1;
      while  (i<data.length && key==data[i].Mes)
      {
        tCantidad += Number(data[i].Cantidad);
        tCapital+= Number(data[i].Capital);
        tInteres+= Number(data[i].Interes);
        tTotal+= Number(data[i].Total);
        //data[i].parentId=kdia;
        newreg.push({
            Id: key*10000 + Number(data[i].Comercio),
            Comercio:data[i].Comercio,
            Nombre:data[i].Nombre,
            Mes: dateNames.monthMin[data[i].Mes-1],
            Cantidad:  nFormat.fn(data[i].Cantidad),
            Capital:  (data[i].Capital),
            Interes:  (data[i].Interes),
            Total:  (data[i].Total),
            parentId:key
        });
        newreg[j].Cantidad =  nFormat.fn(tCantidad);
        newreg[j].Capital=  (tCapital.toFixed(2));
        newreg[j].Interes=  (tInteres.toFixed(2));
        newreg[j].Total=  (tTotal.toFixed(2));
       
        i++;
      }
      tgCantidad+= tCantidad;
      tgCapital+= tCapital;
      tgInteres+= tInteres;
      tgTotal+= tTotal;
      
    }
    return { detalle: newreg ,total:{
      Cantidad:tgCantidad, 
      Capital:tgCapital, 
      Interes:tgInteres, 
      Total:tgTotal}

    };
  }


};
const handleOnClickOk = (e, p ) => {
  setshowProgress(true);
  axios.get( getUri('VentaOperacionesMensuales') , {
    params: {
      year: p.year,
      cartera: p.cartera
    }
  })
  .then(res => {
    putData( res.data);
    setshowProgress(false);
  })
  console.log("leyendo server");
}

const columns=[
  { title: "Id", field: "Id" },
  { title: "Comercio", field: "Comercio"},
  { 
    title: "Nombre", 
    field: "Nombre"
  },
  { title: "Mes", field: "Mes"},
  { title: "Cantidad", field: "Cantidad",width:115,type:"numeric"},
  { title: "Capital", field: "Capital"  ,width:115 , type:"currency", currencySetting: nFormat.currencySetting},
  { title: "Interes", field: "Interes"  ,width:115,type:"currency", currencySetting: nFormat.currencySetting},
  { title: "Total", field: "Total"  ,width:115 ,type:"currency", currencySetting: nFormat.currencySetting},
 
];


  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <FilterBar 
            year={d.getFullYear()} 
            month={d.getMonth()+1} 
            handleOnClickOk={handleOnClickOk}
            viewMonth={false}
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
