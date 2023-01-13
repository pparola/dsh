import React, { useState, useEffect } from "react";
import {Line} from 'react-chartjs-2';

import MaterialTable from "material-table";
// react plugin for creating charts
// @material-ui/core
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import {ThemeProvider } from "@material-ui/styles";
import axios from 'axios';
import LinearProgress from '@material-ui/core/LinearProgress';


// core components

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CardSimple from "components/Card/CardSimple.js";
import SettingsIcon from '@material-ui/icons/Settings';
import CardBasic from "components/Card/CardBasic.js";

import FilterBar from 'components/Navbars/FilterBar.js';
import Filtros from 'components/Filtros/Filtros.js';


import { nFormat } from "variables/numberformatmodule.js";
import { getUri } from "variables/general.js";
import { dateNames,years, parseDate } from "variables/datemodule.js";

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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

function TableComercios(props)
{
  return(
    <ThemeProvider theme={themeTable}>
      <MaterialTable        
          title="Comercios"
          columns={[
            { title: "Comercio", field: "ComercioCodigo"  },
            { title: "Razón Social", field: "ComercioNombre"  },
            { title: "Capital Actual", field: "ImporteMesActual",type:'currency' , currencySetting: nFormat.currencySetting },
            { title: "Proyectado", field: "ImporteProyectado",type:'currency' , currencySetting: nFormat.currencySetting },
            { title: "Mes Anterior", field: "ImporteMesAnterior",type:'currency' , currencySetting: nFormat.currencySetting },
            { title: "Dif. %", field: "DifMesAnterior",type:'numeric' ,
              render: rowData => <div style={{ paddingLeft: "5px"}}>  { nFormat.fn(rowData.DifMesAnterior) } %  </div> },
            { title: "Mes Año Anterior", field: "ImporteYMesAnterior",type:'currency' , currencySetting: nFormat.currencySetting },
            { title: "Dif. %", field: "DifYMesAnterior",type:'numeric',
             render: rowData => <div style={{ paddingLeft: "5px"}}>  { nFormat.fn(rowData.DifYMesAnterior) } %  </div>  }
            
          ]}
          data={props.data}
          options={{
          headerStyle: {
              maxBodyHeight:"300px",
              position: 'sticky', top: 0,
              backgroundColor: '#01579b',
              color: '#FFF'
          },
          search: false,
          exportButton: true,
          paging: true,
          }}
      />
|||</ThemeProvider>
  );
}


function TableGrupos(props)
{

  return(
    <ThemeProvider theme={themeTable}>
    <MaterialTable        
        title="Grupos"
        columns={[
            { title: "Grupo", field: "GruposNombre"  },
            { title: "Capital Actual", field: "ImporteMesActual",type:'currency' , currencySetting: nFormat.currencySetting },
            { title: "Proyectado", field: "ImporteProyectado",type:'currency' , currencySetting: nFormat.currencySetting },
            { title: "Mes Anterior", field: "ImporteMesAnterior",type:'currency' , currencySetting: nFormat.currencySetting },
            { title: "Dif. %", field: "DifMesAnterior",type:'numeric' ,
              render: rowData => <div style={{ paddingLeft: "5px"}}>  { nFormat.fn((((rowData.ImporteProyectado/rowData.ImporteMesAnterior)-1) *100 ).toFixed(2)) } %  </div> },
            { title: "Mes Año Anterior", field: "ImporteYMesAnterior",type:'currency' , currencySetting: nFormat.currencySetting },
            { title: "Dif. %", field: "DifYMesAnterior",type:'numeric',
             render: rowData => <div style={{ paddingLeft: "5px"}}>  { nFormat.fn((((rowData.ImporteProyectado /rowData.ImporteYMesAnterior) -1) *100 ).toFixed(2)) } %  </div>  }
            
          ]}
        data={props.data}
        options={{
        headerStyle: {
            maxBodyHeight:"300px",
            position: 'sticky', top: 0,
            backgroundColor: '#01579b',
            color: '#FFF'
        },
        search: false,
        exportButton: true,
        paging: true,
        }}
    />
</ThemeProvider>
  );
}


export default function ProyeccionCapital() {
  const classes = useStyles();
  const [ viewtools, setviewTools] = React.useState(true);
  const[dataInicial, setDataInicial] =  React.useState([]);
  const [data, setData] = React.useState({
        FechaDesde:null, FechaHasta:null,
        DiasComerciales:0, DiasTranscurridos:0, 
        Capital:0, Proyeccion:0,CapitalMesAnterior:0, DifMesAnterior:0, CapitalYMesAnterior:0, DifYMesAnterior:0, DetalleComercios:[], DetalleGrupos:[] });
  const [dataFiltros, setDataFiltros]=React.useState( { Acreedor:[], Grupos:[], Comercios:[],  Rubros:[], Cartera:[] }); 
  //const [filtros, setFiltros] =  React.useState( { Acreedor:[], Grupos:[], Comercios:[], Rubros:[], Cartera:[]  }); 
  const [totalGrales,setTotalesGrales] = React.useState( {
    Capital:0, 
    Proyeccion:0, 
    DifMesAnterior:0,
    DifYMesAnterior:0,
  });
  const [ showProgress, setshowProgress] = React.useState(false);
  const [openBrowser, setOpenBrowser]=React.useState(false);
 
  const d=new Date();
  const fecha=new Date();
let filtros={ Acreedor:[], Grupos:[], Comercios:[],  Rubros:[], Cartera:[] };

  const handleOnClickOk = (e , p) => {
    setshowProgress(true);
    axios.get( getUri('ProyeccionCapital') , {
      params: {
        year: p.year,
        month: p.month,
      }
    })
    .then(res => {
      putData( res.data);
      setshowProgress(false);
    })
    console.log("leyendo server");
  }

  const putData = (pData) => {
    let calc=fnCalcular(pData);
    setDataInicial(pData);
    //fnGeneraListas(pData);
    setData(calc);
    setDataFiltros(fnGeneraListas(pData));
    setTotalesGrales( {
      Capital:calc.Capital, 
      Proyeccion:calc.Proyeccion, 
      DifMesAnterior: calc.DifMesAnterior,
      DifYMesAnterior:calc.DifYMesAnterior,
    });
   // console.log("put data" ,data);
    //console.log('put data inicial', dataInicial);
  };

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
    for (let i=0; i< pData.Detalle.length; i++)
    {
      let o=pData.Detalle[i];
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
/*
Calculos por comercios y grupos segun filtro
*/
  const fnCalcular=(pData) => {
    console.log("fnCalcular", pData);
    let diasComerciales=pData.DiasDelMes;
    let diasTranscurridos=fnDiasTranscurridos(pData.Fechas.MesActualDesde, pData.Fechas.MesActualHasta);
    let tCapital=0;
    let tProyectado=0;
    let tMesAnterior=0;
    let tMesYAnterior=0
    let detalle=[];
    let grupoIndex=[];
    let grupos=[];
    let ikg;
    for (let i=0; i< pData.Detalle.length; i++)
    {
      let o=pData.Detalle[i];
      
      let capitalProyectado= (o.ImporteMesActual / diasTranscurridos * diasComerciales )
      
      if(grupoIndex[o.GruposCodigo]===undefined)
      {
        grupos.push({ 
          GruposCodigo:o.GruposCodigo,
          GruposNombre: o.GruposNombre, 
          ImporteMesActual:0, 
          ImporteProyectado:0, 
          ImporteMesAnterior:0,
          ImporteYMesAnterior:0,
        })
        ikg=grupos.length -1;
        grupoIndex[o.GruposCodigo]=ikg;
      }else{
        ikg=grupoIndex[o.GruposCodigo];
      }
      let difMesAnterior=(o.ImporteMesAnterior===0) ? 0 : (((capitalProyectado / o.ImporteMesAnterior)-1) *100).toFixed(2);
      let difYMesAnterior= (o.ImporteMesYAnterior===0) ? 0 : (((capitalProyectado / o.ImporteMesYAnterior)-1) *100).toFixed(2);
      detalle.push({
        ComercioCodigo:o.ComercioCodigo,
        ComercioNombre: o.ComercioNombre,
        ImporteMesActual:o.ImporteMesActual,
        ImporteProyectado:capitalProyectado,
        ImporteMesAnterior:o.ImporteMesAnterior,
        DifMesAnterior: difMesAnterior,
        ImporteYMesAnterior: o.ImporteMesYAnterior,
        DifYMesAnterior: difYMesAnterior,
      })

      let g=grupos[ikg];
      g.ImporteMesActual+=o.ImporteMesActual;
      g.ImporteProyectado+=capitalProyectado;
      g.ImporteMesAnterior+=o.ImporteMesAnterior;
      g.ImporteYMesAnterior+= o.ImporteMesYAnterior;

      tCapital+=o.ImporteMesActual;
      tProyectado+=capitalProyectado;
      tMesAnterior+=o.ImporteMesAnterior;
      tMesYAnterior+= o.ImporteMesYAnterior;

    }
    let t0= {
      FechaDesde:pData.Fechas.MesActualDesde,
      FechaHasta:pData.Fechas.MesActualHasta,
      DiasComerciales: diasComerciales,
      DiasTranscurridos: diasTranscurridos,
      Capital:tCapital, 
      Proyeccion: tProyectado, 
      CapitalMesAnterior:tMesAnterior,
      DifMesAnterior: (tMesAnterior===0) ? 0 : (((tProyectado / tMesAnterior) -1) *100).toFixed(2),
      CapitalYMesAnterior:tMesYAnterior,
      DifYMesAnterior:(tMesYAnterior===0) ? 0 : (((tProyectado / tMesYAnterior) -1) *100).toFixed(2),
      DetalleComercios:detalle, 
      DetalleGrupos:grupos
    };
    console.log("salida fnCalcular", t0);
    return t0;
  }


  const fnDiasTranscurridos= (desde, hasta) =>
  {
    console.log("Fechas para", [desde,hasta]);
    let fd=parseDate(desde);
    let fh=parseDate(hasta);
    let d=0;
    console.log("Fechas", [fd,fh]);
    while(fd<=fh)
    {
      if (fd.getDay()>0)  d++;
      fd.setDate(fd.getDate() + 1);
    }
    return d;
  }

 

  
const handleCloseCancel = () => {
  setOpenBrowser(false);
  
};

const handleCloseSelect = (pfiltros) => {
  setOpenBrowser(false);
  //setFiltros(pfiltros);
  filtros=pfiltros;
  let detalle=dataInicial.Detalle;
  let filtrados=detalle.filter(checkComerciosData);
  let calc=fnCalcular({...dataInicial,Detalle: filtrados});
  setData(calc);
};


const handleCloseQuitar = (rows) => {
  setOpenBrowser(false);
  setData(fnCalcular(dataInicial));
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

const TitleCard= (props) => 
{
  return (
    <>
        {(props.data.DiasComerciales>0) ? 
        (
          <span>
            {props.title}  &nbsp; &nbsp; Periodo: {props.data.FechaDesde} - {props.data.FechaHasta}  &nbsp; &nbsp; Dias:{props.data.DiasTranscurridos}/{props.data.DiasComerciales}
          </span>
        )
        : (props.title)

        }
        
    </>
  );
}
    return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <FilterBar 
            year={d.getFullYear()} 
            month={d.getMonth()} 
            handleOnClickOk={handleOnClickOk}
            viewComercio={false}
            viewCartera={false}
            >
            </FilterBar>
            { showProgress && <LinearProgress   color="secondary" />   }
        </GridItem>
         <GridItem xs={12} sm={12} md={12}>
          <CardBasic
                title={<TitleCard title="Proyección" data={data}/>}
                headercolor="info"
                icon={<SettingsIcon/>}
                onClick={()=>{setOpenBrowser(!openBrowser)}}
                >
                  <GridContainer>
                      <GridItem xs={12} sm={12} md={3}>
                          <CardSimple
                            label="Capital"
                            style='currency'
                            number={data.Capital}
                            labelSecundary='Total'
                            viewFooter={checkExistFiltros()}
                            numberSecundary={totalGrales.Capital}
                            >
                          </CardSimple>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                          <CardSimple
                            label="Proyección"
                            style='currency'
                            number={data.Proyeccion}
                            labelSecundary='Total'
                            viewFooter={checkExistFiltros()}
                            numberSecundary={totalGrales.Proyeccion}
                            >
                              
                          </CardSimple>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                          <CardSimple
                            label="Dif. Mes Anterior"
                            style='number'
                            number={data.DifMesAnterior}
                            labelSecundary='Total'
                            viewFooter={checkExistFiltros()}
                            numberSecundary={totalGrales.DifMesAnterior}
                            >
                          </CardSimple>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                          <CardSimple
                            label="Dif. Mes Año Anterior"
                            style='number'
                            number={data.DifYMesAnterior}
                            labelSecundary='Total'
                            viewFooter={checkExistFiltros()}
                            numberSecundary={totalGrales.DifYMesAnterior}
                            >
                          </CardSimple>
                      </GridItem>
                  </GridContainer>
          </CardBasic>
        </GridItem>
       
        <GridItem xs={12} sm={12} md={12}>
           <TableComercios
              data={data.DetalleComercios}
           >            
           </TableComercios>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
           <TableGrupos
              data={data.DetalleGrupos}
           >            
           </TableGrupos>
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
