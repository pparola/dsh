import React, { Component, useRef } from "react";

import CardBasic from "components/Card/CardBasic.js";

import MaterialTable from "material-table";
import MTableHeader from "material-table/dist/components/m-table-header.js";
import  MTableBody from "material-table/dist/components/m-table-body.js";

// react plugin for creating charts
// @material-ui/core
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import {ThemeProvider } from "@material-ui/styles";
import axios from 'axios';

import List from "@material-ui/icons/List";
import Event from "@material-ui/icons/Event";

// core components
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import FilterBar from 'components/Navbars/FilterBarFechaComercio.js';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { nFormat } from "variables/numberformatmodule.js";
import { dateNames, dayOfYear } from "variables/datemodule.js";

import { getUri } from "variables/general.js";
import { TableFooter } from "@material-ui/core";

import Filtros from 'components/Filtros/Filtros.js';
import SettingsIcon from '@material-ui/icons/Settings';

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


/*
Tabla Resumen
*/
const TableResumenTotales = (props) => {
  let totales={Cantidad:0,  Capital:0 ,  Retenidas:0 ,Comision:0, IvaCom:0,Anticipo:0, Total:0}; 

  console.log("props",props);
 if (props.data)
 {
      totales=(props.data.options.totales) ? props.data.options.totales : totales;
      console.log("Totales",totales);
 }
    return (
      <>
       
          <TableRow>
              <TableCell colSpan={2} style={{ backgroundColor: '#01579b',color:'#fff'}}>Total</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fn(totales.Cantidad)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right">{nFormat.fcurrency(totales.Capital.toFixed(0))}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fcurrency(totales.Retenidas.toFixed(0))}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fcurrency(totales.Comision.toFixed(0))}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fcurrency(totales.IvaCom.toFixed(0))}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fcurrency(totales.Anticipo.toFixed(0))}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right">{nFormat.fcurrency(totales.Total.toFixed(0))}</TableCell>
          </TableRow>
      </>
    );
  }

  const TableDataResumen = (props) =>{
    const classes = useStyles();
    const columns=[
      { title: "Estado", field: "Tipo" , width:200},
      { title: "Créditos", field: "Cantidad" ,  type:"numeric"},
      { title: "Capital", field: "Capital", type:"currency",currencySetting: nFormat.currencySetting},
      { title: "Retenidas", field: "Retenidas" , type:"currency",currencySetting: nFormat.currencySetting },
      { title: "Comisión", field: "Comision", type:"currency",currencySetting: nFormat.currencySetting },
      { title: "Iva.Com.", field: "IvaCom", type:"currency",currencySetting: nFormat.currencySetting },
      { title: "Anticipos", field: "Anticipo",type:"currency", currencySetting: nFormat.currencySetting  },
      { title: "Total", field: "Total",type:"currency", currencySetting: nFormat.currencySetting  }
    ];
    
    console.log("TableDataResumen", props);
    const components = {
      Body: props => (
          <>
              <MTableBody {...props} />
              <TableFooter>
                    <TableResumenTotales  data={props} />
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
              actions={[ 
              //  rowData => ({
               //   icon: () =>  <span><Event></Event></span>,
                //  tooltip: 'Ver Fechas',
                 // onClick: (event, rowData) => props.handleOnClickEvent(event,rowData),
                  //isFreeAction:true
                //}),
                rowData => ({
                  icon: () =>  <span><List></List></span>,
                  tooltip: 'Ver Detalle',
                  onClick: (event, rowData) => props.handleOnClickList(event,rowData),
                  isFreeAction:true
                }),
              ]}
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
  )
  
  }

  /*Fin Tabla Resumen */


const TableTotales = (props) => {
  let totales={ Comercio:0, Plan: 0, Ordpago:0 , Cantidad:0, Capital:0 , Comision:0,IvaCom:0, Anticipos:0, Retenidas:0 , Total:0}; 

  console.log("props",props);
 if (props.data)
 {
      totales=(props.data.options.totales) ? props.data.options.totales : totales;
      console.log("TableTotales",totales);
 }
    return (
      <>
       
          <TableRow>
              <TableCell colSpan={2} style={{ backgroundColor: '#01579b',color:'#fff'}}>Total</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="left">{nFormat.fn(totales.Comercio)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fn(totales.Ordpago)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" ></TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fn(totales.Plan)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fn(totales.Cantidad)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right">{nFormat.fcurrency(totales.Capital.toFixed(0))}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fcurrency(totales.Retenidas.toFixed(0))}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fcurrency(totales.Comision.toFixed(0))}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fcurrency(totales.IvaCom.toFixed(0))}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fcurrency(totales.Anticipo.toFixed(0))}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right">{nFormat.fcurrency(totales.Total.toFixed(0))}</TableCell>
          </TableRow>
      </>
    );
  }

const CardItemView = (props) => {
  
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


    console.log("CardItemView", props);
  return (
    <>
       <CardBasic
           title={props.title}
           headercolor="info"
           >
          <ThemeProvider theme={themeTable}>
              <MaterialTable        
                title=' '
                columns={props.columns}
                data={props.data}
                options={{
                  headerStyle: {
                    backgroundColor: '#01579b',
                    color: '#FFF'
                  },
                  search: true,
                  exportButton: true,
                  paging:false,
                  pageSize:10,
                  pageSizeOptions: [0, 5,15, 20, 50, 100] ,
                  totales:props.totales
                }}
                components={components}
                parentChildData={(row, rows) => rows.find(a => a.Id === row.ParentId)}
              />
          </ThemeProvider>
      </CardBasic>
    </>
  );

}

const CardWeekView = (props) => {
  const classes = useStyles();
  const [fechaInicial, setFechaInicial] = React.useState(props.fechaInicial);
  const columns=[
    { id: 'Semana', label: 'Semanas', minWidth: 100 },
    { id: 'Estado', label: 'Estado ', minWidth: 170 },
    { id: 'Cantidad', label: 'Cantidad', minWidth: 170, align:'right' },
    { id: 'Capital', label: 'Capital ', minWidth: 170 , align:'right', format: (value) => value.toLocaleString('es-CO') },
    { id: 'Retenidas', label: 'Retenidas ', minWidth: 170, align:'right', format: (value) => value.toLocaleString('es-CO') },
    { id: 'Comision', label: 'Comisión ', minWidth: 170 , align:'right', format: (value) => value.toLocaleString('es-CO') },
    { id: 'IvaCom', label: 'Iva.Com ', minWidth: 170 , align:'right', format: (value) => value.toLocaleString('es-CO') },
    { id: 'Anticipo', label: 'Anticipos ', minWidth: 170 , align:'right', format: (value) => value.toLocaleString('es-CO') },
    { id: 'Total', label: 'Total ', minWidth: 170 , align:'right', format: (value) => value.toLocaleString('es-CO') }

  ];
  var fecha=props.fechaInicial;
  var semanas=[];
  var opcFechas=[];
  console.log("FechaInicial",fecha);
  const TotalizeSemana = () =>{
    if(props.data!=null)
    {
        for(var i=0; i<props.data.length; i++)
        {
            var item=props.data[i];
            SumaEnSemana(item);
        }
    }
  };

  const SumaEnSemana= (item) => {
    for(var i=0; i<semanas.length;i++)
    {
      var fecpago=new Date( Number(item.Fecpago.substr(0, 4)), Number(item.Fecpago.substr(5, 2))-1, Number(item.Fecpago.substr(8, 2)) );
      if(fecpago>= semanas[i].desde && fecpago<=semanas[i].hasta )
      {
        var obj;
        if (item.Tipo=='AvisosDePago'){
            obj=semanas[i].AvisosDePago;
        }else if (item.Tipo=='Pendientes')
        {
          obj=semanas[i].Pendientes;
        }else {
          obj=semanas[i].EnProcesos;
        } 
      
        obj.Cantidad+=item.Cantidad;
        obj.Capital+=item.Capital;
        obj.Retenidas+=item.Retenidas;
        obj.Comision+=item.Comision;
        obj.IvaCom+=item.IvaCom;
        obj.Anticipo+=item.Anticipo;
        obj.Total+=item.Total;
        semanas[i].Total.Cantidad+=item.Cantidad;
        semanas[i].Total.Capital+=item.Capital;
        semanas[i].Total.Retenidas+=item.Retenidas;
        semanas[i].Total.Comision+=item.Comision;
        semanas[i].Total.IvaCom+=item.IvaCom;
        semanas[i].Total.Anticipo+=item.Anticipo;
        semanas[i].Total.Total+=item.Total;
        break;
      }
    }
  };

  const fillSemanas = (fecha) =>{
    do{
      var hasta=new Date(fecha.getFullYear(),fecha.getMonth(),fecha.getDate() + 6);
      if (hasta>props.fechaFinal)
      {
        hasta=props.fechaFinal;
      }
      semanas.push({
        "desde":fecha,
        "hasta":hasta,
        "AvisosDePago": {
                          "Cantidad": 0,
                          "Capital": 0,
                          "Retenidas":0,
                          "Comision": 0,
                          "IvaCom":0,
                          "Anticipo":0,
                          "Total": 0,
                        },
        "Pendientes": {
                        "Cantidad": 0,
                        "Capital": 0,
                        "Retenidas":0,
                        "Comision": 0,
                        "IvaCom":0,
                        "Anticipo":0,
                        "Total": 0,
                      },
        "EnProcesos": {
                        "Cantidad": 0,
                        "Capital": 0,
                        "Retenidas":0,
                        "Comision": 0,
                        "IvaCom":0,
                        "Anticipo":0,
                        "Total": 0,
                      },
        "Total" : {
                    "Cantidad": 0,
                    "Capital": 0,
                    "Retenidas":0,
                    "Comision": 0,
                    "IvaCom":0,
                    "Anticipo":0,
                    "Total": 0,
                  }
      })
      fecha=new Date(hasta.getFullYear(),hasta.getMonth(),hasta.getDate()+1);
    }while (fecha<=props.fechaFinal)
  };

  const fillSelectAjuste = () =>
  {
    var fecha=props.fechaInicial;
    while(fecha<=props.fechaFinal)
    {
        opcFechas.push(fecha);
        fecha=new Date(fecha.getFullYear(),fecha.getMonth(),fecha.getDate()+1) ;
    }
    console.log("Fechas Posibles ", opcFechas);
  }
  if(fecha!=null)
  {
    fillSelectAjuste();
    fillSemanas(fechaInicial);
    TotalizeSemana();
    
    console.log("SEMANAS", semanas); 
  }

  const handleChangeSelect = (event) => {
    console.log("Seleccion fecha",event.target.value);
    setFechaInicial(event.target.value);
  };
const handleClickButton = (event) =>
{
  fillSemanas(fechaInicial);
  TotalizeSemana();
}
  
return(
    <>
      <GridContainer>
          <GridItem>
            <InputLabel id="select-fecha-label">Ajustar Inicio</InputLabel>
            <Select
              labelid="select-fecha-label"
              id="select-fecha"
              value={fechaInicial}
              onChange={handleChangeSelect}
            >
            { 
                opcFechas.map((d, k)=>{
                  var dn=dateNames.day[d.getDay()];
                  var title=  dn + " " + d.getDate() + "-" + dateNames.monthMin[d.getMonth()];
                  return (
                    <MenuItem key={k} value={d}>{title}</MenuItem>
                  );
                })
            }
            </Select>
          </GridItem>
      </GridContainer>
      <br/>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell 
                  key={column.id}
                  align={column.align}
                  style={{ backgroundColor: '#01579b',color:'#fff',  minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {semanas.map( (row,key) =>{
              return(
                 <RowWeekView key={key}
                    data={row}
                 >
                 </RowWeekView>
              );
            }
            )}
          </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  )
};

const RowWeekView = (props) => {
  const classes = useStyles();
  const row=props.data;
 
  return(
    <>
    <TableRow key={1} style={{ fontSize:'10px' }}>
        <TableCell rowSpan={4} align="center" style={{ backgroundColor: '#01579b',color:'#fff'}}> 
          <TitleRowWeekView
            desde={row.desde}
            hasta={row.hasta}
          >
          </TitleRowWeekView>
        </TableCell>
        <TableCell>Avisos de Pagos</TableCell>
        <TableCell align="right">{nFormat.fn(row.AvisosDePago.Cantidad)}</TableCell>
        <TableCell align="right">{nFormat.fcurrency(row.AvisosDePago.Capital)}</TableCell>
        <TableCell align="right">{nFormat.fcurrency(row.AvisosDePago.Retenidas)}</TableCell>
        <TableCell align="right">{nFormat.fcurrency(row.AvisosDePago.Comision)}</TableCell>
        <TableCell align="right">{nFormat.fcurrency(row.AvisosDePago.IvaCom)}</TableCell>
        <TableCell align="right">{nFormat.fcurrency(row.AvisosDePago.Anticipo)}</TableCell>
        <TableCell align="right">{nFormat.fcurrency(row.AvisosDePago.Total)}</TableCell>
    </TableRow>
    <TableRow  key={2}>
        <TableCell>Pendientes</TableCell>
        <TableCell align="right">{nFormat.fn(row.Pendientes.Cantidad)}</TableCell>
        <TableCell align="right">{nFormat.fcurrency(row.Pendientes.Capital)}</TableCell>
        <TableCell align="right">{nFormat.fcurrency(row.Pendientes.Retenidas)}</TableCell>
        <TableCell align="right">{nFormat.fcurrency(row.Pendientes.Comision)}</TableCell>
        <TableCell align="right">{nFormat.fcurrency(row.Pendientes.IvaCom)}</TableCell>
        <TableCell align="right">{nFormat.fcurrency(row.Pendientes.Anticipo)}</TableCell>
        <TableCell align="right">{nFormat.fcurrency(row.Pendientes.Total)}</TableCell>
    </TableRow>
    <TableRow  key={3}>
        <TableCell>En Proceso</TableCell>
        <TableCell align="right">{nFormat.fn(row.EnProcesos.Cantidad)}</TableCell>
        <TableCell align="right">{nFormat.fcurrency(row.EnProcesos.Capital)}</TableCell>
        <TableCell align="right">{nFormat.fcurrency(row.EnProcesos.Retenidas)}</TableCell>
        <TableCell align="right">{nFormat.fcurrency(row.EnProcesos.Comision)}</TableCell>
        <TableCell align="right">{nFormat.fcurrency(row.EnProcesos.IvaCom)}</TableCell>
        <TableCell align="right">{nFormat.fcurrency(row.EnProcesos.Anticipo)}</TableCell>
        <TableCell align="right">{nFormat.fcurrency(row.EnProcesos.Total)}</TableCell>
    </TableRow>
    <TableRow  key={4}>
        <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} >Total</TableCell>
        <TableCell style={{ backgroundColor: '#01579b',color:'#fff' }}  align="right">{nFormat.fn(row.Total.Cantidad)}</TableCell>
        <TableCell style={{ backgroundColor: '#01579b',color:'#fff' }}  align="right">{nFormat.fcurrency(row.Total.Capital)}</TableCell>
        <TableCell style={{ backgroundColor: '#01579b',color:'#fff'  }}  align="right">{nFormat.fcurrency(row.Total.Retenidas)}</TableCell>
        <TableCell style={{ backgroundColor: '#01579b',color:'#fff' }}  align="right">{nFormat.fcurrency(row.Total.Comision)}</TableCell>
        <TableCell style={{ backgroundColor: '#01579b',color:'#fff'  }}  align="right">{nFormat.fcurrency(row.Total.IvaCom)}</TableCell>
        <TableCell style={{ backgroundColor: '#01579b',color:'#fff'  }}  align="right">{nFormat.fcurrency(row.Total.Anticipo)}</TableCell>
        <TableCell style={{ backgroundColor: '#01579b',color:'#fff'  }}  align="right"> {nFormat.fcurrency(row.Total.Total)}</TableCell>
    </TableRow>
  </>
  );
} 

const TitleRowWeekView = (props) =>{
  const desde=  dateNames.day[props.desde.getDay()] + " " + props.desde.getDate()+"-"+ dateNames.monthMin[props.desde.getMonth()] ; 
  const hasta = dateNames.day[props.hasta.getDay()] + " " + props.hasta.getDate()+"-"+ dateNames.monthMin[props.hasta.getMonth()];
  return (
    <>
      <p>{desde}</p>
      <p>al</p>
      <p>{hasta}</p>
    </>
  )
}



export default function AvisosDepagos() {
const classes = useStyles();
const [modo, setModo]=React.useState(0);


const [dataResumen, setDataResumen] = React.useState([]);
const [totalResumen, setTotalResumen]= React.useState({Cantidad:0,  Capital:0 ,  Retenidas:0 ,Comision:0, IvaCom:0,Anticipo:0, Total:0});

const [dataAvisosDePagos, setDataAvisosDePagos]= React.useState([]);
const [totalesAvisosDePagos, setTotalesAvisosDePagos]= React.useState({ Comercio:0, Plan: 0, Creditos:0, Capital:0 , Comision:0, Retenidas:0 , Total:0});

const [dataPendientes, setDataPendientes]= React.useState([]);
const [totalesPendientes, setTotalesPendientes]= React.useState([]);

const [dataEnProcesos, setDataEnProcesos]= React.useState([]);
const [totalesEnProcesos, setTotalesEnProcesos]= React.useState([]);
const [dataDetalle, setDataDetalle]= React.useState([]);
const [dataListaComercios, setDataListaComercios]= React.useState([]);
const [ showProgress, setshowProgress] = React.useState(false);

const [ fechaInicial, setFechaInicial]= React.useState(null);
const [ fechaFinal, setFechaFinal]= React.useState(null);

const[dataInicial, setDataInicial] =  React.useState([]);
const [dataFiltros, setDataFiltros]=React.useState( { Acreedor:[], Grupos:[], Comercios:[],  Rubros:[], Cartera:[] }); 
const [openBrowser, setOpenBrowser]=React.useState(false);
let filtros={ Acreedor:[], Grupos:[], Comercios:[],  Rubros:[], Cartera:[] };

const fechaCalendario=new Date();

const title="Avisos de Pago";


const columns = [
  { title: "Comercio", field: "Comercio" , width:20},
  { title: "Nombre", field: "ComercioNombre" , width:300},
  { title: "Ord.Pago", field: "Ordpago", width:20 },
  { title: "Fec.Pago", field: "Fecpago", width:20 },
  { title: "Plan", field: "Plan", width:20 },
  { title: "Créditos", field: "Cantidad" ,  type:"numeric"},
  { title: "Capital", field: "Capital", type:"currency",currencySetting: nFormat.currencySetting},
  { title: "Retenidas", field: "Retenidas" , type:"currency",currencySetting: nFormat.currencySetting },
  { title: "Comisión", field: "Comisión", type:"currency",currencySetting: nFormat.currencySetting },
  { title: "Iva.Com", field: "Ivacom", type:"currency",currencySetting: nFormat.currencySetting },
  { title: "Anticipo", field: "Anticipo", type:"currency",currencySetting: nFormat.currencySetting },
  { title: "Neto", field: "Total",type:"currency", currencySetting: nFormat.currencySetting  }
];

const putData = (pdata) => {
  console.log("putdata-Data",pdata);
  setDataInicial(pdata);
  fnSetData(fnCalcular(pdata));
  setDataFiltros(fnGeneraListas(pdata));
}

const fnSetData= (data) =>
{
  setDataDetalle(data.Detallado);
  setDataListaComercios(data.ListaComercios);
  setTotalResumen(data.TotalGeneral);
  setDataResumen(data.TotalesPorEstado);
  for (let i=0; i< data.TotalesPorEstado.length; i++)
  {
    if (data.TotalesPorEstado[i].key=='A')
    {
      setTotalesAvisosDePagos(data.TotalesPorEstado[i]);
    }else  if (data.TotalesPorEstado[i].key=='B')
    {
      setTotalesPendientes(data.TotalesPorEstado[i]);
    }else {
      setTotalesEnProcesos(data.TotalesPorEstado[i]);
    }
  }
  setDataAvisosDePagos(data.AvisosDePago);
  setDataPendientes(data.PendientesDeAprobacion);
  setDataEnProcesos(data.NoProcesados);
}

const fnGeneraListas = (pData) =>
  {
    let lacreedores=[]
    let acreedoresIndex=[];
    let lgrupos=[]
    let gruposIndex=[];
    let lcomercios=[]
    let comerciosIndex=[];
    let lrubros=[]
    let rubrosIndex=[];
    let lproductos=[{Codigo:'C', Nombre:'Crédito Comercios'},{Codigo:'D', Nombre:'Crédito Dirigido'}]
    for (let i=0; i< pData.length; i++)
    {
      let o=pData[i];
      if(acreedoresIndex[o.AcreedorCodigo]==undefined)
      { 
          lacreedores.push({Codigo:o.AcreedorCodigo, Nombre: o.AcreedorNombre}); acreedoresIndex[o.AcreedorCodigo]=1;
      }
      if(gruposIndex[o.GruposCodigo]==undefined)
      {
            lgrupos.push({Codigo:o.GruposCodigo, Nombre: o.GruposNombre}); gruposIndex[o.GruposCodigo]=1;
      }
      if(comerciosIndex[o.ComercioCodigo]==undefined)
      {
            lcomercios.push({Codigo:o.ComercioCodigo, Nombre: o.ComercioNombre,AcreedorCodigo:o.AcreedorCodigo ,GruposCodigo:o.GruposCodigo,RubroCodigo:o.RubroCodigo }); comerciosIndex[o.ComercioCodigo]=1;
      }
      if(rubrosIndex[o.RubroCodigo]==undefined)
      {
            lrubros.push({Codigo:o.RubroCodigo, Nombre: o.RubroNombre}); rubrosIndex[o.RubroCodigo]=1;
      }
    }
    let ret={ Acreedor:lacreedores, Grupos:lgrupos, Comercios:lcomercios, Productos:lproductos, Rubros:lrubros, 
      Cartera:[{Codigo:'D', Nombre:'Dirigido'}, {Codigo:'E', Nombre:'Efectivo'}] };
   
    return ret;
  }


const fnCalcular=(p) => {
  console.log("fnCalcular", p);
  let r={
        TotalGeneral: {Cantidad: 0,Capital:0, Retenidas:0, Comision:0, IvaCom:0, Anticipo:0, Total:0 },
        TotalesPorEstado:[],
        'AvisosDePago':[],
        'PendientesDeAprobacion':[],
        'NoProcesados':[],
        Detallado:[]
        }
  let i=0;
  while (i<p.length)
  {
    //Corte por tipo
    let keyTipo=p[i].Tipo;
    let tComercio=0;
    let tOrdPago=0;
    let tPlan=0;
    let tCantidad=0;
    let tCapital=0;
    let tRetenidas=0;
    let tComision=0;
    let tIvaCom=0;
    let tAnticipo=0;
    let tTotal=0;
   
    while (i<p.length && keyTipo==p[i].Tipo ) 
    {
      // Corte por Tipo+Comercio
      let keyComercio=p[i].Comercio;
      let keyComercioNombre=p[i].ComercioNombre;
      let tcOrdPago=0;
      let tcPlan=0;
      let tcCantidad=0;
      let tcCapital=0;
      let tcRetenidas=0;
      let tcComision=0;
      let tcIvaCom=0;
      let tcAnticipo=0;
      let tcTotal=0;
      let dta=[];
      let idc=p[i].Tipo + p[i].Comercio;
      while (i<p.length && keyTipo==p[i].Tipo  && keyComercio==p[i].Comercio)
      {
        //Corte Tipo+Comercio+OrdPago
        let keyOrdPago=p[i].Ordpago;
        let keyFecPago=p[i].Fecpago;
        let tcoPlan=0;
        let tcoCantidad=0;
        let tcoCapital=0;
        let tcoRetenidas=0;
        let tcoComision=0;
        let tcoIvaCom=0;
        let tcoAnticipo=0;
        let tcoTotal=0;
        let idco=p[i].Tipo +p[i].Comercio +p[i].Ordpago;
        while (i<p.length && keyTipo==p[i].Tipo  && keyComercio==p[i].Comercio && keyOrdPago==p[i].Ordpago)
        {
          let capital=Number(p[i].Capital); 
          let comision=Number(p[i].Comision);
          let retenidas=Number(p[i].Retenidas);
          let anticipo=Number(p[i].Anticipo);
          let ivacom=Number(p[i].Ivacom);
          let cantidad=Number(p[i].Cantidad);
          let t=(capital - comision - retenidas + anticipo);
          r[keyTipo].push({
                    'Id':idco + i, 
                    'Comercio':'',
                    'ComercioNombre':'', 
                    'Ordpago':'', 
                    'Fecpago':'',
                    'Plan':p[i].Plan,
                    'Cantidad': cantidad,	// cantidad de creditos por plan													
                    'Capital': capital,
                    'Retenidas': retenidas,
                    'Comision': comision,
                    'Total':t,
                    'ParentId':idco
                  });
          tcoCantidad+=cantidad;
          tcoPlan++;
          tcoCapital+=capital;
          tcoRetenidas+=retenidas;
          tcoComision+=comision;
          tcoIvaCom+=ivacom
          tcoAnticipo+=anticipo;
          tcoTotal+=capital  - retenidas - comision - ivacom + anticipo;
          i++;
        }
        r[keyTipo].push( { 
          'Id':idco , 
          'Comercio':'',
          'ComercioNombre':'', 
          'Ordpago':keyOrdPago, 
          'Fecpago':keyFecPago,
          'Plan':tcoPlan, 
          'Cantidad':tcoCantidad,														
          'Capital':tcoCapital,
          'Retenidas':tcoRetenidas,
          'Comision':tcoComision,
          'IvaCom':tcoIvaCom,
          'Anticipo':tcoAnticipo,
          'Total':tcoTotal,
          'ParentId':idc
        });
         
        r.Detallado.push({ 
          'Id':idco , 
          'Tipo':keyTipo,
          'Comercio':keyComercio,
          'ComercioNombre':keyComercioNombre,
          'Ordpago':keyOrdPago, 
          'Fecpago':keyFecPago,
          'Plan':tcoPlan, 
          'Cantidad':tcoCantidad,														
          'Capital':tcoCapital,
          'Retenidas':tcoRetenidas,
          'Comision':tcoComision,
          'IvaCom':tcoIvaCom,
          'Anticipo':tcoAnticipo,
          'Total':tcoTotal,
          'ParentId':idc
        });
        tcOrdPago++;
        tcPlan+= tcoPlan;
        tcCantidad+=tcoCantidad;
        tcCapital+=tcoCapital;
        tcRetenidas+=tcoRetenidas;
        tcComision+=tcoComision;
        tcIvaCom+=tcoIvaCom;
        tcAnticipo+=tcoAnticipo;
        tcTotal+=tcoTotal;

      }
      r[keyTipo].push({ 
        'Id':idc , 
        'Comercio':keyComercio,
        'ComercioNombre':keyComercioNombre, 
        'Ordpago':tcOrdPago, 
        'FecPago':'',
        'Plan':tcPlan, 
        'Cantidad':tcCantidad,														
        'Capital':tcCapital,
        'Retenidas':tcRetenidas,
        'Comision':tcComision,
        'IvaCom':tcIvaCom,
        'Anticipo':tcAnticipo,
        'Total':tcTotal
      });
      tComercio++;
      tOrdPago+=tcOrdPago;
      tPlan+=tcPlan;
      tCantidad+=tcCantidad;
      tCapital+=tcCapital;
      tRetenidas+=tcRetenidas;
      tComision+=tcComision;
      tIvaCom+=tcIvaCom;
      tAnticipo+=tcAnticipo;
      tTotal+=tcTotal;
    }
    if (keyTipo=='AvisosDePago')
    {
      r.TotalesPorEstado.push({
              'key':'A',
              'Tipo':'Avisos de Pago', 
              'Comercio':tComercio,
              'Ordpago':tOrdPago,
              'Plan':tPlan,
              'Cantidad':tCantidad,														
              'Capital':tCapital,
              'Retenidas':tRetenidas,
              'Comision':tComision,
              'IvaCom':tIvaCom,
              'Anticipo':tAnticipo,
              'Total':tTotal
      });
    }
    else if (keyTipo=='PendientesDeAprobacion')
    {
      r.TotalesPorEstado.push({
            'key':'B',
            'Tipo':'Pendientes de Aprobación', 
            'Comercio':tComercio,
            'Ordpago':tOrdPago,
            'Plan':tPlan,
            'Cantidad':tCantidad,														
            'Capital':tCapital,
            'Retenidas':tRetenidas,
            'Comision':tComision,
            'IvaCom':tIvaCom,
            'Anticipo':tAnticipo,
            'Total':tTotal
      });
    }
    else 
    {
      r.TotalesPorEstado.push({
            'key':'C',
            'Tipo':'No Procesados', 
            'Comercio':tComercio,
            'Ordpago':tOrdPago,
            'Plan':tPlan,
            'Cantidad':tCantidad,														
            'Capital':tCapital,
            'Retenidas':tRetenidas,
            'Comision':tComision,
            'IvaCom':tIvaCom,
            'Anticipo':tAnticipo,
            'Total':tTotal
      });
    }
    r.TotalGeneral.Cantidad+=tCantidad;
    r.TotalGeneral.Capital+=tCapital;
    r.TotalGeneral.Retenidas+=tRetenidas;
    r.TotalGeneral.Comision+=tComision;
    r.TotalGeneral.IvaCom+=tIvaCom;
    r.TotalGeneral.Anticipo+=tAnticipo;
    r.TotalGeneral.Total+=tTotal;
  }

  console.log("fnCalcular result",r);   
  return r; 

}

const handleOnClickOk = (e, p) => {
  setshowProgress(true);
  setModo(0);
  setFechaInicial(p.fechaDesde);
  setFechaFinal(p.fechaHasta);
  axios.get(getUri('AvisosDePagos'), {
        params: {
          fechadesde: p.fechaDesde,
          fechahasta: p.fechaHasta,
          comerciodesde: p.comercioDesde,
          comerciohasta: p.comercioHasta
        }
      })
  .then(res => {
    putData( res.data);
    setshowProgress(false);
  })

  console.log("leyendo server");
}

const handleOnClickEvent = (e, row)=> {
  console.log("on click Event" , row);
  setModo(4);
}

const handleOnClickList = (e, row)=> {
  console.log("on click List" , row);
  setModo(99);
  if (row.Tipo == "Avisos de Pago" ) { setModo(1); }
  else if (row.Tipo == "Pendientes de Aprobación" ) { setModo(2); }
  else { setModo(3);}
  
}


const handleCloseCancel = () => {
  setOpenBrowser(false);
  
};

const handleCloseSelect = (pfiltros) => {
  setOpenBrowser(false);
  //setFiltros(pfiltros);
  filtros=pfiltros;
  let detalle=dataInicial;
  let filtrados=detalle.filter(checkComerciosData);
  fnSetData(fnCalcular(filtrados));
};


const handleCloseQuitar = (rows) => {
  setOpenBrowser(false);
  fnSetData(fnCalcular(dataInicial));
};

const checkComerciosData = (comercio) =>
{
  return ((filtros.Acreedor.length==0 || filtros.Acreedor.findIndex(ele => ele==comercio.AcreedorCodigo)>-1) && 
          (filtros.Grupos.length==0 || filtros.Grupos.findIndex(ele => ele==comercio.GruposCodigo)>-1)  &&
          (filtros.Rubros.length==0 || filtros.Rubros.findIndex(ele => ele==comercio.RubroCodigo)>-1)  &&
          (filtros.Cartera.length==0 || filtros.Cartera.findIndex(ele => ele==comercio.ComercioCartera)>-1)) &&
          (filtros.Comercios.length==0 || filtros.Comercios.findIndex(ele => ele==comercio.ComercioCodigo)>-1);
          
}
const checkExistFiltros = () =>
{
  let ret= ( filtros.Acreedor.length>0 || filtros.Grupos.length>0 || filtros.Rubros.length>0 || filtros.Comercios.length>0);
  return ret;
}

  return (

    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <FilterBar 
                  fechaDesde={ new Date(fechaCalendario.getFullYear(), fechaCalendario.getMonth(), 1)}
                  fechaHasta={fechaCalendario}
                  viewComercio={false}
                  viewCartera={false}
                  handleOnClickOk={handleOnClickOk}
          ></FilterBar>
          { showProgress && <LinearProgress   color="secondary" />   }
         </GridItem>
         <GridItem xs={12} sm={12} md={12}>
             <CardBasic
              title=" Avisos de Pagos - Totales"
              headercolor="info"
              icon={<SettingsIcon/>}
              onClick={()=>{setOpenBrowser(!openBrowser)}}
              >
                  <TableDataResumen
                      data={dataResumen} 
                      totales={totalResumen} 
                      title=" "
                      handleOnClickEvent={handleOnClickEvent}
                      handleOnClickList={handleOnClickList}
                      >
                  </TableDataResumen>
                  <br/>
                  { 
                    (dataPendientes.length > 0 && modo!=4) ? (
                      <ButtonGroup color="primary" aria-label="primary button group">
                        <Button  onClick={ (e) => setModo(4) } >Ver Distribución Semanal</Button>
                      </ButtonGroup>
                    ) : ( null )
                  }
              </CardBasic>
               
          </GridItem>
         
         <GridItem xs={12} sm={12} md={12}>
         {{
              1:
                (
                <CardItemView
                  title = 'Avisos de Pago'
                  data = {dataAvisosDePagos}
                  totales= {totalesAvisosDePagos}
                  columns = {columns}
                  ></CardItemView>
                  ),
              2:
              (
                <CardItemView
                  title = 'Pedientes de Aprobación'
                  data = {dataPendientes}
                  totales= {totalesPendientes}
                  columns = {columns}
                  ></CardItemView>
                  ),
              3:
              (
                <CardItemView
                  title = 'No Procesados'
                  data = {dataEnProcesos}
                  totales= {totalesEnProcesos}
                  columns = {columns}
                  ></CardItemView>
                  ),
               4:
               (
                <CardBasic
                title="Distribución Semanal"
                headercolor="info"
                >
                    <CardWeekView
                      fechaInicial={fechaInicial}
                      fechaFinal={fechaFinal}
                      listaComercios={dataListaComercios}
                      data={dataDetalle}
                    >
                    </CardWeekView>
                </CardBasic>
               ),
                99:
                (
                  <CircularProgress/>
                ),
              default: ( null )
                }[modo]
          }
         </GridItem>

       </GridContainer>
       <Filtros 
        data={dataFiltros}
        openBrowser={openBrowser}
        handleCloseCancel={handleCloseCancel}
        handleCloseSelect={handleCloseSelect}
        handleCloseQuitar={handleCloseQuitar}
        >
      </Filtros>
    </div>
  );
}
