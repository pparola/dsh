import React, { Component, useRef } from "react";
import { withStyles } from '@material-ui/core/styles';
import { green, orange, cyan } from '@material-ui/core/colors';

import Dialog from '@material-ui/core/Dialog';


import CardBasic from "components/Card/CardBasic.js";

import MaterialTable from "material-table";


import  MTableBody from "material-table/dist/components/m-table-body.js";

// react plugin for creating charts
// @material-ui/core
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import {ThemeProvider } from "@material-ui/styles";
import axios from 'axios';

import List from "@material-ui/icons/List";
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import SearchIcon from '@material-ui/icons/Search';
import RedoIcon from '@material-ui/icons/Redo';
import SettingsIcon from '@material-ui/icons/Settings';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import FilterBar from 'components/Navbars/FilterBarFechaComercio.js';
import AvpCard from 'components/AvisosDePagos/AvpCard.js';
import CardViewWeekItem from 'components/AvisosDePagos/CardViewWeekItem.js';
import ArraySelected from 'components/AvisosDePagos/ArraySelected.js';
import Browser from 'components/Browser/Browser.js';
import Button from '@material-ui/core/Button';
import { nFormat } from "variables/numberformatmodule.js";
import { dateNames } from "variables/datemodule.js";

import { getUri } from "variables/general.js";
import { TableFooter } from "@material-ui/core";
import { media } from "assets/conf/sizes";
import styled from "styled-components";


let dataOriginal;

const CardTitle = styled.div`
    color: #fff; 
    ${media.phone`
         font-size: 18px;
    `}
    ${media.tablet`
         font-size: 13px;
    `}
    ${media.desktop`
        font-size: 16px;
    `}
`;

const CardSubTitle = styled.div`
color:#999;
text-align: right;
${media.phone`
     font-size: 23px;
`}
${media.tablet`
     font-size: 15px;
`}
${media.desktop`
font-size: 23px;
`}
`;

const useStyles = makeStyles((theme) => ({
  root: {
    //width: '100%',
    width: 'fit-content',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    '& svg': {
      margin: theme.spacing(1.5),
    },
    '& hr': {
      margin: theme.spacing(0, 0.5),
    },
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
}));

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const CyanCheckbox = withStyles({
  root: {
    color: cyan[400],
    '&$checked': {
      color: cyan[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const OrangeCheckbox = withStyles({
  root: {
    color: orange[400],
    '&$checked': {
      color: orange[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);
 
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
  let totales={"AvisosDePago" :{Cantidad:0,  Capital:0 ,  Retenidas:0 ,Comision:0, IvaCom:0,Anticipo:0, Total:0},
                "Cobranza" :{ANticipos:0, CuotasAdelantadas:0, Importe:0,Recargo:0, Total:0} }; 
  let avisosTotal=0;
  //console.log("TableResumenTotales",props);
 if (props.data)
 {
      totales=(props.data.options.totales) ? props.data.options.totales : totales;
      ////console.log("Totales",totales);
      for (let i=0 ; i<props.data.renderData.length; i++)
      {
         if (props.data.renderData[i].Tipo=='Avisos de Pago')
         {
          avisosTotal=props.data.renderData[i].Total;
         }
      }
      
 }
 let neto= avisosTotal - totales.Cobranza.Total;
 let bg ={ backgroundColor: cyan[400] ,color:'#fff'};
 if (neto<0)
 {
    bg={ backgroundColor: green[400] ,color:'#fff'};
 }else if (neto>0)
 {
  bg={ backgroundColor: orange[400] ,color:'#fff'};
 }
 let netoproyectado= totales.AvisosDePago.Total - totales.Cobranza.Total;
 let bgp ={ backgroundColor: cyan[400] ,color:'#fff'};
 if (netoproyectado<0)
 {
    bgp={ backgroundColor: green[400] ,color:'#fff'};
 }else if (netoproyectado>0)
 {
  bgp={ backgroundColor: orange[400] ,color:'#fff'};
 }

    return (
      <>
          <TableRow>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}}>Total</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fn(totales.AvisosDePago.Cantidad)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right">{nFormat.fcurrency(totales.AvisosDePago.Capital)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fcurrency(totales.AvisosDePago.Retenidas)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fcurrency(totales.AvisosDePago.Comision)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fcurrency(totales.AvisosDePago.IvaCom)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fcurrency(totales.AvisosDePago.Anticipo)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right">{nFormat.fcurrency(totales.AvisosDePago.Total)}</TableCell>
          </TableRow>
          <TableRow>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}}>Cobranza</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >Anticipos</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right">Adelantadas</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >Importe</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >Recargo</TableCell>
              <TableCell colSpan={3} style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >Total</TableCell>
          </TableRow>
          <TableRow>
              <TableCell ></TableCell>
              <TableCell  align="right" >{nFormat.fcurrency(totales.Cobranza.Anticipos)}</TableCell>
              <TableCell  align="right">{nFormat.fcurrency(totales.Cobranza.CuotasAdelantadas)}</TableCell>
              <TableCell align="right" >{nFormat.fcurrency(totales.Cobranza.Importe)}</TableCell>
              <TableCell  align="right" >{nFormat.fcurrency(totales.Cobranza.Recargo)}</TableCell>
              <TableCell colSpan={3}  align="right" >{nFormat.fcurrency(totales.Cobranza.Total)}</TableCell>
          </TableRow>
          <TableRow>
              <TableCell  colSpan={5}  style={bg}></TableCell>
              <TableCell   style={bg} >Neto</TableCell>
              <TableCell colSpan={2} style={bg} align="right" >{nFormat.fcurrency(neto)}</TableCell>
          </TableRow>
          <TableRow>
              <TableCell  colSpan={5}  style={bgp}></TableCell>
              <TableCell   style={bgp} >Neto Proyectado</TableCell>
              <TableCell colSpan={2} style={bgp} align="right" >{nFormat.fcurrency(netoproyectado)}</TableCell>
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
              options={{
                headerStyle: {
                  backgroundColor: '#01579b',
                  color: '#FFF'
                },
                search: false,
                exportButton: false,
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

const CardWeekView = (props) => {
  const classes = useStyles();
  const [fechaInicial, setFechaInicial] = React.useState(props.fechaInicial);
const [state, setState] = React.useState({
  checkedAPagar: true,
  checkedSinMovimiento: true,
  checkedACobrar: true,
  checkedProyectado:false
});
const [viewCompo,setviewCompo]=React.useState(false);
const [modoweek,setModoWeek]=React.useState(true);
const [semanaSelect, setSemanaSelect]=React.useState({});

  var fecha=props.fechaInicial;
  var semanas=[];
  var opcFechas=[];
  //console.log("data en week",props.avisosdepago);
  
  const TotalizeAvisosSemana = () =>{
    ////console.log("Semanas",semanas);
    if(props.avisosdepago!=null)
    {
        for(var i=0; i<props.avisosdepago.length; i++)
        {
            var item=props.avisosdepago[i];
            SumaAvisosEnSemana(item);
        }
    }
  };
  
  const SumaAvisosEnSemana= (item) => {
    
    for(var i=0; i<semanas.length;i++)
    {
      var fecpago=new Date( Number(item.Fecpago.substr(0, 4)), Number(item.Fecpago.substr(5, 2))-1, Number(item.Fecpago.substr(8, 2)) );
      ////console.log('Fecha de Pagp',fecpago)
      if(fecpago>= semanas[i].desde && fecpago<=semanas[i].hasta )
      {
        var obj;
        var ic=0;
        if(semanas[i].ComercioKeys[item.Comercio]==undefined){
          semanas[i].ComercioResumen.push({"Comercio":item.Comercio,"Nombre":item.ComercioNombre, "AvisosDePago":0, "Pendientes":0,"EnProceso":0, "Cobranza":0 , "Neto":0, "items":[]});
          ic=semanas[i].ComercioResumen.length-1;
          semanas[i].ComercioKeys[item.Comercio]=ic;
        }else{
            ic=semanas[i].ComercioKeys[item.Comercio];
        }
        var comerciogroup= semanas[i].ComercioResumen[ic];
        if (item.Tipo=='AvisosDePago'){
            obj=semanas[i].AvisosDePago;
            semanas[i].Neto= semanas[i].AvisosDePago.Total + item.Total - semanas[i].Cobranza.Total;
            comerciogroup.AvisosDePago+=item.Total;
            comerciogroup.Neto+=item.Total;
        }else if (item.Tipo=='Pendientes')
        {
          obj=semanas[i].Pendientes; comerciogroup.Pendientes+=item.Total;
        }else {
          obj=semanas[i].EnProcesos; comerciogroup.EnProcesos+=item.Total;
        } 
        comerciogroup.items.push(item);
        obj.Cantidad+=item.Cantidad;
        obj.Capital+=item.Capital;
        obj.Retenidas+=item.Retenidas;
        obj.Comision+=item.Comision;
        obj.IvaCom+=item.IvaCom;
        obj.Anticipo+=item.Anticipo;
        obj.Total+=item.Total;
        semanas[i].AvisosDetalle.push(item);
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


  const TotalizeCobranzaSemana = () =>{
    //console.log("Semanas",semanas);
    if(props.cobranzas!=null)
    {
        for(var i=0; i<props.cobranzas.length; i++)
        {
            var item=props.cobranzas[i];
            SumaCobranzaEnSemana(item);
        }
    }
  };
  const SumaCobranzaEnSemana= (item) => {
    
    for(var i=0; i<semanas.length;i++)
    {
      let obj=semanas[i];
      ///Se toma la cobranza de la semana anterior
      var fecpago=new Date( Number(item.Fecha.substr(0, 4)), Number(item.Fecha.substr(5, 2))-1, Number(item.Fecha.substr(8, 2) ) );
      fecpago.setDate(fecpago.getDate() + 7);
      //////console.log('Fecha de Pagp cobranza',fecpago)
      if(fecpago>= obj.desde && fecpago<=obj.hasta )
      {
        var ic=0;
        if(semanas[i].ComercioKeys[item.Comercio]==undefined){
          semanas[i].ComercioResumen.push({"Comercio":item.Comercio,"Nombre":item.ComercioNombre,"AvisosDePago":0, "Pendientes":0,"EnProceso":0, "Cobranza":0,"Neto":0, "items":[]});
          ic=semanas[i].ComercioResumen.length-1;
          semanas[i].ComercioKeys[item.Comercio]=ic;
        }else{
            ic=semanas[i].ComercioKeys[item.Comercio];
        }
        var comerciogroup= semanas[i].ComercioResumen[ic];
        obj.Cobranza.Importe+=item.Importe;
        obj.Cobranza.Recargo+=item.Recargo;
        obj.Cobranza.CuotasAdelantadas+=item.CuotasAdelantadas;
        obj.Cobranza.Anticipos+=item.Anticipos;
        obj.Cobranza.Total+=item.Total;
        comerciogroup.Neto-=item.Total;
        obj.Neto= obj.AvisosDePago.Total - obj.Cobranza.Total;
        obj.CobranzaDetalle.push(item);

        comerciogroup.Cobranza+=item.Total;
        comerciogroup.items.push(item);
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
        "Neto":0,
        "ComercioKeys":[],
        "ComercioResumen":[],
        "AvisosDetalle":[],
        "CobranzaDetalle":[],
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
                  },
        "Cobranza" : {
                    "Importe": 0,
                    "Recargo": 0,
                    "CuotasAdelantadas":0,
                    "Anticipos": 0,
                    "Total": 0,
                  }
      })
      fecha=new Date(hasta.getFullYear(),hasta.getMonth(),hasta.getDate()+1);
    }while (fecha<=props.fechaFinal)
  };

  
  if(fecha!=null)
  {
    fillSemanas(fechaInicial);
    TotalizeAvisosSemana();
    TotalizeCobranzaSemana();
    
  }


  const WeekDetalleSubTable = rowData => {
    ////console.log("WeekDetalleSubTable--------", rowData);
    const items=rowData.items;
    let data=[
      {Tipo:"Avisos de Pago", Cantidad:0, Capital:0, Retenidas:0, Comision:0, IvaCom:0, Anticipo:0, Total:0},
      {Tipo:"En Proceso", Cantidad:0, Capital:0, Retenidas:0, Comision:0, IvaCom:0, Anticipo:0, Total:0},
      {Tipo:"Pendientes", Cantidad:0, Capital:0, Retenidas:0, Comision:0, IvaCom:0, Anticipo:0, Total:0},
    ];
    let AvisosTotalizados={ Cantidad:0, Capital:0, Retenidas:0, Comision:0, IvaCom:0, Anticipo:0, Total:0};
    let cobranza={ Importe:0, Recargo:0, CuotasAdelantadas:0, Anticipos:0, Total:0};
    let  totalAvisosDePago=0;
    let totalCobranza=0;
    for (let i=0; i<items.length; i++)
    {
      let item=items[i];
      if (item.Tipo=='Cobranza') {
        cobranza.Importe+=item.Importe;
        cobranza.Recargo+=item.Recargo;
        cobranza.CuotasAdelantadas+=item.CuotasAdelantadas;
        cobranza.Anticipos+=item.Anticipos;
        cobranza.Total+=item.Total;
        totalCobranza+= item.Total;
      }else{
        var k=0;
        if(item.Tipo=='AvisosDePago'){
          totalAvisosDePago+=item.Total;
        }else if(item.Tipo=='EnProceso')
        {
            k=1;
        } else if(item.Tipo=='EnProceso')
        {
          k=2;
        }
        let obj=data[k];
        obj.Cantidad+=item.Cantidad;
        obj.Capital+=item.Capital;
        obj.Retenidas+=item.Retenidas;
        obj.Comision+=item.Comision;
        obj.IvaCom+=item.IvaCom;
        obj.Anticipo+=item.Anticipo;
        obj.Total+=item.Total;
        AvisosTotalizados.Cantidad+=item.Cantidad;
        AvisosTotalizados.Capital+=item.Capital;
        AvisosTotalizados.Retenidas+=item.Retenidas;
        AvisosTotalizados.Comision+=item.Comision;
        AvisosTotalizados.IvaCom+=item.IvaCom;
        AvisosTotalizados.Anticipo+=item.Anticipo;
        AvisosTotalizados.Total+=item.Total;

      }
    }
  return (
    <div style={{ maxWidth: "100%" }}>
      <TableDataResumen
        data={data} 
        totales={{"AvisosDePago":AvisosTotalizados, "Cobranza":cobranza}} 
        title={"Detalle Comercio - " + rowData.Nombre }
        >
      </TableDataResumen>

    </div>
  );
};

const WeekDetalleAvisosDePagoSubTable = rowData => {
  ////console.log("WeekDetalleSubTable--------", rowData);
  const items=rowData.items.filter( item => item.Tipo!="Cobranza");
return (
  <div style={{ maxWidth: "100%" }}>
     <ThemeProvider theme={themeTable}>
          <MaterialTable
            title="Avisos de Pago"
            data={items}
            columns={[
              { title: 'Tipo', field: 'Tipo' },
              { title: 'Ord.Pago', field: 'Ordpago' },
              { title: 'Fecha', field: 'Fecpago' },
              { title: 'Creditos', field: 'Cantidad',  type:"numeric" },
              { title: 'Capital', field: 'Capital',  type:"currency",currencySetting: nFormat.currencySetting },
              { title: 'Retenidas', field: 'Retenidas',  type:"currency",currencySetting: nFormat.currencySetting },
              { title: 'Comisión', field: 'Comision',  type:"currency",currencySetting: nFormat.currencySetting },
              { title: 'Iva.Com', field: 'IvaCom',  type:"currency",currencySetting: nFormat.currencySetting},
              { title: 'Anticipo', field: 'Anticipo',  type:"currency",currencySetting: nFormat.currencySetting},
              { title: 'Total', field: 'Total',  type:"currency",currencySetting: nFormat.currencySetting}
            ]}
            options={{
              headerStyle: {
                backgroundColor: '#01579b',
                color: '#FFF'
              },
              search: false,
              exportButton: false,
            }}
          />
      </ThemeProvider>
  </div>
);
};

const WeekDetalleCobranzaSubTable = rowData => {
  ////console.log("WeekDetalleSubTable--------", rowData);
  const items=rowData.items.filter( item => item.Tipo=="Cobranza");
return (
  <div style={{ maxWidth: "100%" }}>
     <ThemeProvider theme={themeTable}>
          <MaterialTable
            title="Detalle de Cobranzas"
            data={items}
            columns={[
              { title: 'Fecha', field: 'Fecha' },
              { title: 'Anticipos', field: 'Anticipo',  type:"currency",currencySetting: nFormat.currencySetting },
              { title: 'Adelantadas', field: 'CuotasAdelantadas',  type:"currency",currencySetting: nFormat.currencySetting },
              { title: 'Importe', field: 'Importe',  type:"currency",currencySetting: nFormat.currencySetting },
              { title: 'Recargo', field: 'Recargo',  type:"currency",currencySetting: nFormat.currencySetting},
              { title: 'Total', field: 'Total',  type:"currency",currencySetting: nFormat.currencySetting}
            ]}
            options={{
              headerStyle: {
                backgroundColor: '#01579b',
                color: '#FFF'
              },
              search: false,
              exportButton: false,
            }}
          />
      </ThemeProvider>
  </div>
);
};

  const WeekDetalleComercios= (props) => {
    const classes = useStyles();
    return (
      <ThemeProvider theme={themeTable}>
          <MaterialTable
            title="Distribución Por Comercio"
            columns={[
              { title: 'Código', field: 'Comercio' },
              { title: 'Comercio', field: 'Nombre' },
              { title: 'Pendientes', field: 'Pendientes',  type:"currency",currencySetting: nFormat.currencySetting },
              { title: 'En Proceso', field: 'EnProceso',  type:"currency",currencySetting: nFormat.currencySetting },
              { title: 'Avisos de Pago', field: 'AvisosDePago',  type:"currency",currencySetting: nFormat.currencySetting },
              { title: 'Cobranzas', field: 'Cobranza',  type:"currency",currencySetting: nFormat.currencySetting },
              { title: 'Neto', field: 'Neto',  type:"currency",currencySetting: nFormat.currencySetting}
            ]}
            data={props.data}
            detailPanel={[
              {
                icon:  () => <span><List></List></span>,
                tooltip: 'Ver Detalle',
                render: WeekDetalleSubTable
              },
              {
                icon: () =>  <span><BusinessCenterIcon></BusinessCenterIcon></span>,
                tooltip: 'Ver Avisos de Pagos',
                render: WeekDetalleAvisosDePagoSubTable
              },
              {
                icon:  () => <span><AttachMoneyIcon></AttachMoneyIcon></span> ,
                tooltip: 'Ver Detalle de Cobranza',
                render: WeekDetalleCobranzaSubTable
              },
            ]}
            options={{
              headerStyle: {
                backgroundColor: '#01579b',
                color: '#FFF'
              },
              search: false,
              exportButton: false,
            }}
          />
      </ThemeProvider>
    )
  }

  const WeekItem =(props) => {
   
    const semana=props.semana;
    const desde=  dateNames.day[semana.desde.getDay()] + " " + semana.desde.getDate()+"-"+ dateNames.monthMin[semana.desde.getMonth()] ; 
    const hasta = dateNames.day[semana.hasta.getDay()] + " " + semana.hasta.getDate()+"-"+ dateNames.monthMin[semana.hasta.getMonth()];
    const label = desde + ' al ' + hasta;
    //const neto= semana.AvisosDePago.Total - semana.Cobranza.Total;
    console.log("semana  ", semana);
    let neto;
    let color='info';
    let datos=[0,0,0];
    if (state.checkedProyectado)
    {
      neto=semana.Total.Total -  semana.Cobranza.Total;
      datos=[semana.Total.Total, semana.Cobranza.Total, neto]
    }else{
      neto=semana.Neto;
      datos=[semana.AvisosDePago.Total, semana.Cobranza.Total, neto];
    }
    console.log("Semana Neto----", neto);
    if (neto>0){  color="warning"; }else if(neto<0){ color="success"; }
    return(
      <>
      { ( (neto>0 && state.checkedAPagar) || (neto<0 && state.checkedACobrar) || (neto==0 && state.checkedSinMovimiento) ) ? (
        <>
            <CardViewWeekItem
              color={color}
              label={label}
              number={neto}
              viewCompo={viewCompo}
              headerOnClick={(e) => handleOnClickItem( e,props.index)}
              columnas={[{label:'Avisos De Pago', type:'currency'} , {label:'Cobranza', type:'currency'}, {label:'Neto', type:'currency'}]}
              datos={datos}
            >
            </CardViewWeekItem>
        </>
        ) : null }
      </>
    );
  }


  const WeekDetalle= (props) => {
    return (
      <>
           <TableDataResumen
              data={[{Tipo:"Avisos de Pago",...props.semana.AvisosDePago},{Tipo:"En Proceso",... props.semana.EnProcesos} , {Tipo:"Pendientes",...props.semana.Pendientes}]} 
              totales={{"AvisosDePago":props.semana.Total, "Cobranza": props.semana.Cobranza}} 
              title="Detalle"
              >
           </TableDataResumen>
           <WeekDetalleComercios
            data={ props.semana.ComercioResumen}
           >
           </WeekDetalleComercios>
      </>
    )
  }


  const handleChangeSelect = (event) => {
    //console.log("Seleccion fecha",event.target.value);
    setFechaInicial(event.target.value);
  };

  const handleClickButton = (event) =>
{
  fillSemanas(fechaInicial);
  TotalizeAvisosSemana();
  TotalizeCobranzaSemana();
}

const handleChangeTipos = (event) => {
  setState({ ...state, [event.target.name]: event.target.checked });
  
};

const handleChangeCompo = (event) => {
  setviewCompo(event.target.checked );
  
};

const handleOnClickItem= (event, semanaIndex) => {
  //console.log("click en semana", semanaIndex);
  setSemanaSelect(semanas[semanaIndex]);
  setModoWeek(!modoweek);
}

return(
    <>
      <GridContainer>
        { (props.viewtools) ? (
        <GridItem   xs={12} sm={12} md={12} className={classes.root} >
          <FormGroup row  style={{marginLeft:'10px' }}> 
              <FormControlLabel
                    control={
                      <Grid component="label" container alignItems="center" spacing={1}>
                        <Grid item> <Paper style={{padding:'8px' }} elevation={ ((state.checkedProyectado) ?8 : 1)}> Vista Según Neto </Paper></Grid>
                        <Grid item>
                          <Switch checked={state.checkedProyectado} onChange={handleChangeTipos} name="checkedProyectado" />
                        </Grid>
                        <Grid item> <Paper Según style={{padding:'8px' }}  elevation={ ((state.checkedProyectado) ? 1 : 8)}>Según Proyectado </Paper></Grid>
                      </Grid>
                    }
                    label="  "
                  />
              <FormControlLabel
                control={<Switch checked={viewCompo} onChange={handleChangeCompo} name="viewCompo" />}
                label="Ver Composición"
              />
              <FormControlLabel
                control={<OrangeCheckbox checked={state.checkedAPagar} onChange={handleChangeTipos} name="checkedAPagar" />}
                label="Neto a Pagar"
              />
                <FormControlLabel
                control={<GreenCheckbox checked={state.checkedACobrar} onChange={handleChangeTipos} name="checkedACobrar" />}
                label="Neto a Cobrar"
              />
              <FormControlLabel
                control={<CyanCheckbox checked={state.checkedSinMovimiento} onChange={handleChangeTipos} name="checkedSinMovimiento" />}
                label="Sin Movimiento"
              />
            
          </FormGroup>
        </GridItem>
        ) : (null)}
        {(modoweek) ? ( 
          <> 
            {semanas.map((semana, key) =>{
                const myKey='item-' + key;
                return (
                  <GridItem  key={myKey} xs={12} sm={6} md={4} >
                    <WeekItem
                      index={key}
                      semana={semana}
                    ></WeekItem>
                  </GridItem>
                )
            })}
          </> ) :
          (
            <>
                <GridItem   xs={12} sm={12} md={12} >
                  <WeekItem
                    key={9999}
                    index={0}
                    semana={semanaSelect}
                  ></WeekItem>
                </GridItem>
                <GridItem   xs={12} sm={12} md={12} >
                  <WeekDetalle
                    semana={semanaSelect}
                  ></WeekDetalle>
                </GridItem>
            </>
          )
           
          }
       </GridContainer>
      <br/>
    </>
  )
};



export default function AvisosDePagosSemanal() {
const classes = useStyles();
const [modo, setModo]=React.useState(0);
const [totalAvisosDePago,setTotalAvisosDePagos]= React.useState(0);
const [totalCobranza, setTotalCobranza]=React.useState(0);
const [neto, setNeto]=React.useState(0);
const [cobranzaDetalle,setCobranzaDetalle]=React.useState([]);
const [cobranzaTotal,setCobranzaTotal]=React.useState({
  "Importe": 0,
  "Recargo": 0,
  "CuotasAdelantadas":0,
  "Anticipos": 0,
  "Total": 0});
const [dataResumen, setDataResumen] = React.useState([]);
const [totalResumen, setTotalResumen]= React.useState({Cantidad:0,  Capital:0 ,  Retenidas:0 ,Comision:0, IvaCom:0,Anticipo:0, Total:0});
//const [totalesAvisosDePagos, setTotalesAvisosDePagos]= React.useState({ Comercio:0, Plan: 0, Creditos:0, Capital:0 , Comision:0, Retenidas:0 , Total:0});
const [totalesAvisosDePagos, setTotalesAvisosDePagos]= React.useState([]);
const [totalesPendientes, setTotalesPendientes]= React.useState([]);
const [totalesEnProcesos, setTotalesEnProcesos]= React.useState([]);
const [soloTotales,setSoloTotales]=React.useState([0,0,0]);
const [dataDetalle, setDataDetalle]= React.useState([]);
const [dataListaComercios, setDataListaComercios]= React.useState([]);
const [ showProgress, setshowProgress] = React.useState(false);
const [ viewtools, setviewTools] = React.useState(true);
const [comercioSelect, setComercioSelect]=React.useState([]);
const [ fechaInicial, setFechaInicial]= React.useState(null);
const [ fechaFinal, setFechaFinal]= React.useState(null);
const [state, setState] = React.useState({
  checkedA: false,
  checkedB: false,
});
const [openBrowserComercios, setOpenBrowserComercios]=React.useState(false);


const fechaCalendario=new Date();

const title="Avisos de Pago Semanal - Totales";


const columns = [
  { title: "Comercio", field: "Comercio" , width:20},
  { title: "Nombre", field: "ComercioNombre" , width:300},
 
  { title: "Capital", field: "Capital", type:"currency",currencySetting: nFormat.currencySetting},
  { title: "Retenidas", field: "Retenidas" , type:"currency",currencySetting: nFormat.currencySetting },
  { title: "Comisión", field: "Comisión", type:"currency",currencySetting: nFormat.currencySetting },
  { title: "Iva.Com", field: "Ivacom", type:"currency",currencySetting: nFormat.currencySetting },
  { title: "Anticipo", field: "Anticipo", type:"currency",currencySetting: nFormat.currencySetting },
  { title: "Neto", field: "Total",type:"currency", currencySetting: nFormat.currencySetting  }
];


const handleOnClickOk = (e, p) => {
  setshowProgress(true);
  setModo(0);
  axios.get(getUri('AvisosDePagosSemanal'), {
        params: {
          fechadesde: p.fechaDesde,
          fechahasta:p.fechaHasta,
          comerciodesde: p.comercioDesde,
          comerciohasta: p.comercioHasta
        }
      })
  .then(res => {
    dataOriginal=res.data;
    putData( res.data);
    setshowProgress(false);
    setModo(1);
  })

}


const putData = (data) => {

  let t={Cantidad:0,  Capital:0 ,  Retenidas:0 ,Comision:0, IvaCom:0,Anticipo:0, Total:0};
  let n=0;
  let st=[0,0,0]
  console.log("putData", data);
  for(let i=0; i<data.TotalesPorEstado.length; i++)
  {
    let v=data.TotalesPorEstado[i];
    if (v.Tipo=='Avisos de Pago'){
      setTotalesAvisosDePagos(v);
      setTotalAvisosDePagos(v.Total);
      st[0]=v.Total;
      n+=v.Total;
    }else if (v.Tipo=="Pendientes de Aprobación"){
      setTotalesPendientes(v);
      st[1]=v.Total;
    }else{
      setTotalesEnProcesos(v);
      st[2]=v.Total;
    }
    t.Cantidad+= v.Cantidad;
    t.Capital+= v.Capital;
    t.Retenidas+= v.Retenidas;
    t.Comision+= v.Comision;
    t.IvaCom+= v.IvaCom;
    t.Anticipo+= v.Anticipo;
    t.Total+= v.Total;
  }

  if(data.CobranzaTotal!=undefined)
  {
    n-=data.CobranzaTotal.Total;
    setTotalCobranza(data.CobranzaTotal.Total);
  }
  setNeto(n);
  setSoloTotales(st);
  setDataDetalle(data.Detallado);
  setDataResumen(data.TotalesPorEstado);
  setCobranzaDetalle(data.CobranzaDetallada);
  setCobranzaTotal(data.CobranzaTotal);
  setTotalResumen(t);
  setDataListaComercios(data.Comercios)
let fi=new Date(data.Rango.Inicio);
let ff=new Date(data.Rango.Fin+'T23:59:59');
  setFechaInicial(fi);
  setFechaFinal(ff);
}

const filterData= (filtroarray) => {
  //console.log("filterData putdata-Data",dataOriginal);
  let CobranzaDetallada=dataOriginal.CobranzaDetallada.filter(item =>filtroarray.includes(item.Comercio));
  let Detallado=dataOriginal.Detallado.filter(item =>filtroarray.includes(item.Comercio));
  let TotalesPorEstado=[
    {Tipo:"Avisos de Pago", Cantidad:0, Capital:0, Retenidas:0, Comision:0, IvaCom:0, Anticipo:0, Total:0},
    {Tipo:"En Proceso", Cantidad:0, Capital:0, Retenidas:0, Comision:0, IvaCom:0, Anticipo:0, Total:0},
    {Tipo:"Pendientes", Cantidad:0, Capital:0, Retenidas:0, Comision:0, IvaCom:0, Anticipo:0, Total:0},
  ];
  let AvisosTotalizados={ Cantidad:0, Capital:0, Retenidas:0, Comision:0, IvaCom:0, Anticipo:0, Total:0};
  let cobranza={ Importe:0, Recargo:0, CuotasAdelantadas:0, Anticipos:0, Total:0};
  let  totalAvisosDePago=0;
  let totalCobranza=0;
  setModo(0);
  for (let i=0; i<CobranzaDetallada.length; i++)
  {
    let item=CobranzaDetallada[i];
   
      cobranza.Importe+=item.Importe;
      cobranza.Recargo+=item.Recargo;
      cobranza.CuotasAdelantadas+=item.CuotasAdelantadas;
      cobranza.Anticipos+=item.Anticipos;
      cobranza.Total+=item.Total;
      totalCobranza+= item.Total;
   
  }

  for (let i=0; i<Detallado.length; i++)
  {
    let item=Detallado[i];
  
      var k=0;
      if(item.Tipo=='AvisosDePago'){
        totalAvisosDePago+=item.Total;
      }else if(item.Tipo=='EnProceso')
      {
          k=1;
      } else if(item.Tipo=='EnProceso')
      {
        k=2;
      }
      let obj=TotalesPorEstado[k];
      obj.Cantidad+=item.Cantidad;
      obj.Capital+=item.Capital;
      obj.Retenidas+=item.Retenidas;
      obj.Comision+=item.Comision;
      obj.IvaCom+=item.IvaCom;
      obj.Anticipo+=item.Anticipo;
      obj.Total+=item.Total;
      AvisosTotalizados.Cantidad+=item.Cantidad;
      AvisosTotalizados.Capital+=item.Capital;
      AvisosTotalizados.Retenidas+=item.Retenidas;
      AvisosTotalizados.Comision+=item.Comision;
      AvisosTotalizados.IvaCom+=item.IvaCom;
      AvisosTotalizados.Anticipo+=item.Anticipo;
      AvisosTotalizados.Total+=item.Total;
    
  }
let data={
  CobranzaDetallada:CobranzaDetallada,
  Detallado:Detallado,
  TotalesPorEstado:TotalesPorEstado,
  CobranzaTotal:cobranza,
  Comercios:dataOriginal.Comercios,
  Rango:dataOriginal.Rango,
  RangoCobranza:dataOriginal.RangoCobranza
}

putData(data);

setModo(1);

}

const handleOnClickEvent = (e, row)=> {
  //console.log("on click Event" , row);
  setModo(4);
}

const handleChange = (event) => {
  setState({ ...state, [event.target.name]: event.target.checked });
};


const handleClickOpen = () => {
  setOpenBrowserComercios(true);
};

const handleCloseCancel = () => {
  setOpenBrowserComercios(false);
};


const handleCloseSelect = (rows) => {
  
  filterData( rows.map((ele)=> ele.Comercio));
  setComercioSelect(rows);
  
  setOpenBrowserComercios(false);
};

const handleClickQuitarFiltro= () => {
  putData(dataOriginal);
  setComercioSelect([]);
}

const handleDeleteArrayComercio=(rows)=>
{
  let c=comercioSelect.filter(item=> item.Comercio!=rows.Comercio);
  if (c.length>0)
  {
    filterData( c.map((ele)=> ele.Comercio));
  }else {
    putData(dataOriginal);
  }
  
  setComercioSelect(c);
}
  return (

    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <FilterBar 
                  fechaDesde={ new Date(fechaCalendario.getFullYear(), fechaCalendario.getMonth(), 1)}
                  fechaHasta={fechaCalendario}
                  handleOnClickOk={handleOnClickOk}
                  viewComercio={false}
          ></FilterBar>
          { showProgress && <LinearProgress   color="secondary" />   }
         </GridItem>
         <GridItem xs={12} sm={12} md={12}>
             <CardBasic
              title={title}
              headercolor="info"
              icon={<SettingsIcon/>}
              onClick={()=>{setviewTools(!viewtools)}}
              >
                  <GridContainer>
                    { (comercioSelect.length>0) ? ( 
                        <GridItem xs={12} sm={12} md={12} >
                          <ArraySelected
                            data={comercioSelect}
                            handleDelete={handleDeleteArrayComercio}
                            >
                            </ArraySelected>
                        </GridItem>
                    ) : (null)
                    }
                        
                  { (dataResumen.length>0 && viewtools ) ? (
                    <GridItem   xs={12} sm={12} md={12} >
                   
                        <FormGroup row> 
                                <FormControlLabel
                                  control={<Switch checked={state.checkedA} onChange={handleChange} name="checkedA" />}
                                  label="Ver Composición"
                                />
                                <FormControlLabel
                                  control={<Switch checked={state.checkedB} onChange={handleChange} name="checkedB"/>}
                                  label="Ver Detalle"
                                />
                           
                                <FormControlLabel
                                  control={
                                            <Button variant="contained"  color="default" className={classes.button} onClick={handleClickOpen} >
                                              <SearchIcon />
                                              Filtrar Comercios
                                              </Button>
                                  }
                                 >
                                  </FormControlLabel>
                                  { (comercioSelect.length>0) ? (
                                    <FormControlLabel
                                    control={
                                              <Button variant="contained"  color="default" className={classes.button} onClick={handleClickQuitarFiltro} >
                                                <RedoIcon />
                                              </Button>
                                    }
                                    >
                                  </FormControlLabel>
                                  ):(null)}
                        </FormGroup>
                      
                      </GridItem>
                      ): (null)}
                      <br/><br/>
                      <GridItem xs={12} sm={12} md={4}>
                          <AvpCard
                            key={1}
                            label="Avisos de Pagos"
                            number={totalAvisosDePago}
                            color="warning"
                            viewCompo={state.checkedA}
                            columnas={[{label:'Avisos de Pago', type:'currency'}, {label:'Pendientes', type:'currency'}, {label:'En Proceso', type:'currency'}]}
                            datos={soloTotales}
                          >
                          </AvpCard>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                          <AvpCard
                            key={2}
                            label="Cobranza"
                            number={totalCobranza}
                            color="success"
                            viewCompo={state.checkedA}
                            columnas={[{label:'Importe', type:'currency'} , {label:'Recargo', type:'currency'}, {label:'Adelantadas', type:'currency'},{label:'Anticipos', type:'currency'}]}
                            datos={[cobranzaTotal.Importe, cobranzaTotal.Recargo, cobranzaTotal.CuotasAdelantadas,cobranzaTotal.Anticipos ]}
                          >
                          </AvpCard>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                          <AvpCard
                            key={3}
                            label="Neto"
                            number={neto}
                            color={((neto>0) ? "warning" : (neto<0) ? "success" : "info")}
                            viewCompo={state.checkedA}
                            columnas={[{label:'Avisos de Pago', type:'currency'}, {label:'Cobranzas', type:'currency'}, {label:'Total', type:'currency'}]}
                            datos={[totalAvisosDePago, totalCobranza , neto]}
                          >
                          </AvpCard>
                      </GridItem>
                      <br/><br/><br/>
                      <GridItem xs={12} sm={12} md={4}>
                          <AvpCard
                            key={1}
                            label="No Procesados"
                            number={totalResumen.Total}
                            color="warning"
                            viewCompo={state.checkedA}
                            columnas={[{label:'Avisos de Pago', type:'currency'}, {label:'Pendientes', type:'currency'}, {label:'En Proceso', type:'currency'}]}
                            datos={soloTotales}
                          >
                          </AvpCard>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                          <AvpCard
                            key={2}
                            label="Cobranza"
                            number={totalCobranza}
                            color="success"
                            viewCompo={state.checkedA}
                            columnas={[{label:'Importe', type:'currency'} , {label:'Recargo', type:'currency'}, {label:'Adelantadas', type:'currency'},{label:'Anticipos', type:'currency'}]}
                            datos={[cobranzaTotal.Importe, cobranzaTotal.Recargo, cobranzaTotal.CuotasAdelantadas,cobranzaTotal.Anticipos ]}
                          >
                          </AvpCard>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                          <AvpCard
                            key={3}
                            label="Neto Proyectado"
                            number={totalResumen.Total - totalCobranza }
                            color={((totalResumen.Total - totalCobranza>0) ? "warning" : (neto<0) ? "success" : "info")}
                            viewCompo={state.checkedA}
                            columnas={[{label:'Avisos de Pago', type:'currency'}, {label:'Cobranzas', type:'currency'}, {label:'Total', type:'currency'}]}
                            datos={[totalResumen.Total, totalCobranza , totalResumen.Total - totalCobranza ]}
                          >
                          </AvpCard>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        {(state.checkedB) ? (
                          <TableDataResumen
                              data={dataResumen} 
                              totales={{"AvisosDePago":totalResumen, "Cobranza": cobranzaTotal}}
                              title="Detalle"
                           
                              >
                          </TableDataResumen>
                        ) : (null)}

                      </GridItem>
                  </GridContainer>
                 
              </CardBasic>
               
          </GridItem>
         
         <GridItem xs={12} sm={12} md={12}>
         {{
              1:
               (
                 <>
                    <CardBasic
                    title="Distribución Semanal"
                    headercolor="info"
                    icon={<SettingsIcon/>}
                    onClick={()=>{setviewTools(!viewtools)}}
                    >
                        <CardWeekView
                          fechaInicial={fechaInicial}
                          fechaFinal={fechaFinal}
                          avisosdepago={dataDetalle}
                          cobranzas={cobranzaDetalle}
                          viewtools={viewtools}
                        >
                        </CardWeekView>
                    </CardBasic>
                </>
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
        

        <Dialog fullScreen open={openBrowserComercios} onClose={handleCloseCancel} >
          
                <Browser
                  color={"info"}
                  label="Seleccione su Opción"
                  open={openBrowserComercios}
                  columns={[
                    { title: 'Comercio', field: 'Comercio' },
                    { title: 'Nombre', field: 'Nombre' },
                  ]}
                  data={dataListaComercios}
                  handleClickSelect={handleCloseSelect}
                  handleClickCancel={handleCloseCancel}
                >
                </Browser>
            </Dialog> 
    </div>
  );
}
