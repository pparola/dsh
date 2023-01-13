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
import SettingsIcon from '@material-ui/icons/Settings';
import CardBasic from "components/Card/CardBasic.js";
import FilterBar from 'components/Navbars/FilterBar.js';
import Filtros from 'components/Filtros/Filtros.js';

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

let flag=false;

const TableTotales = (props) =>
{
  let totales={Cantidad:0, Importe:0, Recargo:0, Total:0}; 

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
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fcurrency(totales.Importe)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fcurrency(totales.Recargo)}</TableCell>
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
      field: "ComercioNombre" ,
      //render: rowData => <div style={{ width:  "200px", paddingLeft: "5px"}}>  {rowData.NOMBRE}  </div>
      width:200
    },
    { title: "Dia", field: "Dia"},
    { title: "Cantidad", field: "Cantidad",type:'numeric'  ,width:115},
    { title: "Importe", field: "Importe" ,type:'currency',currencySetting: nFormat.currencySetting ,width:115},
    { title: "Recargo", field: "Recargo",type:'currency',currencySetting: nFormat.currencySetting  ,width:115},
    { title: "Total", field: "Total",type:'currency', currencySetting: nFormat.currencySetting  ,width:115},
   
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
           title=""
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

export default function CobranzaOperacionesDiarias() {
  const classes = useStyles();
const [data, setData] = React.useState([]);
const[dataInicial, setDataInicial] =  React.useState([]);
const [totales, setTotales]= React.useState({Cantidad:0, Importe:0, Recargo:0, Total:0});
const [ showProgress, setshowProgress] = React.useState(false);
const [openBrowser, setOpenBrowser]=React.useState(false);
const [dataFiltros, setDataFiltros]=React.useState( { Acreedor:[], Grupos:[], Comercios:[],  Rubros:[], Cartera:[] }); 

const d=new Date();
const title="Cobranza Operaciones Diarias";
const putData = (data) => {
  setDataInicial(data);
  let resul=totaliza(data,true);
  console.log("Resultado",resul);
  setTotales(resul.total);
  setData(resul.detalle);
 
};

let filtros={ Acreedor:[], Grupos:[], Comercios:[],  Rubros:[], Cartera:[] };

const totaliza = (data, generoListas) =>
{
  let newreg=[];
  if (data.length>0)
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
    let tgCantidad=0;
    let tgImporte=0;
    let tgRecargo=0;
    let tgTotal=0;
    let i=0;
    while (i<data.length )
    {
      let key=data[i].Dia;
      let tCantidad=0;
      let tImporte=0;
      let tRecargo=0;
      let tTotal=0;
      newreg.push({Id:key,Comercio:"", ComercioNombre:"",Dia:key, Cantidad:0, Importe:0, Recargo:0, Total:0});
      let j=newreg.length -1;
      while  (i<data.length && key==data[i].Dia)
      {
        if (generoListas)
        {
          var o=data[i];
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
        tCantidad += Number(data[i].Cantidad);
        tImporte+= Number(data[i].SumaImporte);
        tRecargo+= Number(data[i].SumaRecargo);
        tTotal+= Number(data[i].Total);
        //data[i].parentId=kdia;
        newreg.push({
          Id: key*10000 + Number(data[i].ComercioCodigo),
          Comercio:data[i].ComercioCodigo,
          ComercioNombre:data[i].ComercioNombre,
          Dia:data[i].Dia,
          Cantidad: (data[i].Cantidad),
          Importe: (data[i].SumaImporte),
          Recargo: (data[i].SumaRecargo),
          Total:(data[i].Total),
          parentId:key
        });
        newreg[j].Cantidad = tCantidad;
        newreg[j].Importe= tImporte.toFixed(2);
        newreg[j].Recargo= tRecargo.toFixed(2);
        newreg[j].Total= tTotal.toFixed(2);
        i++;
      }
      tgCantidad+= tCantidad;
      tgImporte+= tImporte;
      tgRecargo+= tRecargo;
      tgTotal+= tTotal;
    }
    if(generoListas)
    {
      let ret={ Acreedor:lacreedores, Grupos:lgrupos, Comercios:lcomercios, Productos:lproductos, Rubros:lrubros, 
        Cartera:[{Codigo:'D', Nombre:'Dirigido'}, {Codigo:'E', Nombre:'Efectivo'}] };
        console.log("ret - datos filtros" ,ret);
        setDataFiltros(ret);
    }
    console.log("reg",newreg);
    return { detalle: newreg ,total:{
      Cantidad:tgCantidad, 
      Importe:tgImporte, 
      Recargo:tgRecargo, 
      Total:tgTotal}

    };
  }


};



const handleOnClickOk = (e , p) => {
  setshowProgress(true);
  axios.get(getUri("CobranzaOperacionesDiaria") , {
    params: {
      year: p.year,
      month: p.month,
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
    field: "Nombre" ,
    //render: rowData => <div style={{ width:  "200px", paddingLeft: "5px"}}>  {rowData.NOMBRE}  </div>
    width:200
  },
  { title: "Dia", field: "Dia"},
  { title: "Cantidad", field: "Cantidad",type:'numeric'  ,width:115},
  { title: "Importe", field: "Importe" ,type:'currency',currencySetting: nFormat.currencySetting ,width:115},
  { title: "Recargo", field: "Recargo",type:'currency',currencySetting: nFormat.currencySetting  ,width:115},
  { title: "Total", field: "Total",type:'currency', currencySetting: nFormat.currencySetting  ,width:115},
 
];

const handleCloseCancel = () => {
  setOpenBrowser(false);
  
};

const handleCloseSelect = (pfiltros) => {
  setOpenBrowser(false);
  //setFiltros(pfiltros);
  filtros=pfiltros;
  let detalle=dataInicial;
  let filtrados=detalle.filter(checkComerciosData);
  let resul=totaliza(filtrados,0);
  setTotales(resul.total);
  setData(resul.detalle);
};

const checkComerciosData = (comercio) =>
{
  return ((filtros.Acreedor.length==0 || filtros.Acreedor.findIndex(ele => ele==comercio.AcreedorCodigo)>-1) && 
          (filtros.Grupos.length==0 || filtros.Grupos.findIndex(ele => ele==comercio.GruposCodigo)>-1)  &&
          (filtros.Rubros.length==0 || filtros.Rubros.findIndex(ele => ele==comercio.RubroCodigo)>-1)  &&
          (filtros.Cartera.length==0 || filtros.Cartera.findIndex(ele => ele==comercio.ComercioCartera)>-1)) &&
          (filtros.Comercios.length==0 || filtros.Comercios.findIndex(ele => ele==comercio.ComercioCodigo)>-1);
          
}


const handleCloseQuitar = (rows) => {
  setOpenBrowser(false);
  let resul=totaliza(dataInicial,0);
  setTotales(resul.total);
  setData(resul.detalle);
 
};


  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <FilterBar 
            year={d.getFullYear()} 
            month={d.getMonth()} 
            handleOnClickOk={handleOnClickOk}
            viewComercio={false}
            >
            </FilterBar>
            { showProgress && <LinearProgress   color="secondary" />   }
         </GridItem>
         <GridItem xs={12} sm={12} md={12}>
          <CardBasic
                    title={title}
                    headercolor="info"
                    icon={<SettingsIcon/>}
                    onClick={()=>{setOpenBrowser(!openBrowser)}}
                    >
              <TableData 
                  data={data} 
                  totales={totales} 
                  title={title}>
              </TableData>
              </CardBasic>
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
