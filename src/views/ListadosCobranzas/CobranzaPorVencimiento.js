import React, { Component } from "react";

import MaterialTable from "material-table";
import MTableHeader from "material-table/dist/components/m-table-header.js";
import  MTableBody from "material-table/dist/components/m-table-body.js";
// react plugin for creating charts
// @material-ui/core
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import {ThemeProvider } from "@material-ui/styles";
import axios from 'axios';

import { AddBox, ArrowDownward } from "@material-ui/icons";

// core components
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import LinearProgress from '@material-ui/core/LinearProgress';

import FilterBar from 'components/Navbars/FilterBar.js';

import { nFormat } from "variables/numberformatmodule.js";
import { dateNames } from "variables/datemodule.js";
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
  let totales={ REG_NOR:0,REG_REF:0, REGISTROS:0, CAPITAL_NOR:0, CAPITAL_REF:0, IMPORTE:0, RECARGO_NOR:0, RECARGO_REF:0, RECARGO:0 , TOTAL:0}; 

  console.log("props",props);
 if (props.data.options)
 {
      totales=props.data.options.totales;
 }
    return (
      <>
       
          <TableRow>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}}>Total</TableCell>
              <TableCell colSpan={3} style={{ backgroundColor: '#01579b',color:'#fff'}}></TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right">{nFormat.fn(totales.REG_NOR)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fn(totales.REG_REF)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fn(totales.REGISTROS)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right">{nFormat.fcurrency(totales.CAPITAL_NOR)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fcurrency(totales.CAPITAL_REF)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fcurrency(totales.IMPORTE)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right">{nFormat.fcurrency(totales.RECARGO_NOR)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fcurrency(totales.RECARGO_REF)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fcurrency(totales.RECARGO)}</TableCell>
              <TableCell style={{ backgroundColor: '#01579b',color:'#fff'}} align="right" >{nFormat.fcurrency(totales.TOTAL)}</TableCell>
          </TableRow>
      </>
    );
  }
const TableData = (props) =>{
  const classes = useStyles();
  const columns=[
    { title: "Id", field: "Id" , type:"numeric"},
    { title: "Año", field: "ANO" , type:"numeric"},
    { title: "Mes", field: "MES",type:"numeric", width:80 },
    { title: "Normal", field: "REG_NOR" , type:"numeric", width:80},
    { title: "Ref.", field: "REG_REF", type:"numeric" , width:80},
    { title: "Total", field: "REGISTROS",type:"numeric", width:80,
    cellStyle: {
      backgroundColor: '#b3e5fc',
      color: '#000'
    } },
    { title: "Normal", field: "CAPITAL_NOR" , type:"currency",currencySetting: nFormat.currencySetting , width:80},
    { title: "Ref.", field: "CAPITAL_REF", type:"currency" ,currencySetting: nFormat.currencySetting , width:80},
    { title: "Total", field: "IMPORTE",type:"currency", currencySetting: nFormat.currencySetting , cellStyle: {
      backgroundColor: '#b3e5fc',
      color: '#000'
    } },
    { title: "Normal", field: "RECARGO_NOR" , type:"currency",currencySetting: nFormat.currencySetting , width:80},
    { title: "Ref.", field: "RECARGO_REF", type:"currency" ,currencySetting: nFormat.currencySetting , width:80},
    { title: "Total", field: "RECARGO",type:"currency", currencySetting: nFormat.currencySetting , cellStyle: {
      backgroundColor: '#b3e5fc',
      color: '#000'
    } },
    {title: "General", field: "TOTAL",type:"currency", cellStyle: {
      backgroundColor: '#29b6f6',
      color: '#000'
    } },
    
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
                  <TableCell></TableCell>
                  <TableCell></TableCell> <TableCell></TableCell>
                  <TableCell colSpan={3} align="center" style={{color:'#fff'}}>Cantidades</TableCell>
                  <TableCell colSpan={3} align="center"  style={{color:'#fff'}}>Importes</TableCell>
                  <TableCell colSpan={3} align="center"  style={{color:'#fff'}}>Punitorios</TableCell>
                  <TableCell align="right">Total</TableCell>
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
              //pageSize:5,
              //pageSizeOptions: [0, 5,15, 20, 50, 100] ,
              totales:props.totales
            }}
            components={components}
            parentChildData={(row, rows) => rows.find(a => a.Id === row.parentId)}
          />
        </ThemeProvider>
  </>
)

}


export default function CobranzaPorVencimiento() {
  const classes = useStyles();
  const totalesVacios ={ REG_NOR:0,REG_REF:0, REGISTROS:0, CAPITAL_NOR:0, CAPITAL_REF:0, IMPORTE:0, RECARGO_NOR:0, RECARGO_REF:0, RECARGO:0 , TOTAL:0};
const [data, setData] = React.useState([]);
const [totales, setTotales]= React.useState(totalesVacios);
const [ showProgress, setshowProgress] = React.useState(false);
const d=new Date();
const title="Cobranza Por Vencimiento";
const tableRef = React.createRef();
const putData = (data) => {
  const datos= (data.status===undefined) ? data : [];
  let resul=totaliza(datos);
  console.log("putData",resul);
  if(resul){
    setTotales(resul.total);
    setData(resul.detalle);
  }else{
    setTotales(totalesVacios);
    setData([]);
  }
}


const totaliza = (data) =>{
  console.log("data",data);
    let newreg=[];
    if (data.length>0){
      let tgREG_NOR=0;
      let tgREG_REF=0;
      let tgREGISTROS=0;
      let tgCAPITAL_NOR=0;
      let tgCAPITAL_REF=0;
      let tgIMPORTE=0;
      let tgRECARGO_NOR=0;
      let tgRECARGO_REF=0;
      let tgRECARGO=0;
      let tgTOTAL=0;
      let i=0;
      while (i<data.length )
      {
        let key=data[i].ANO;
        let tREG_NOR=0;
        let tREG_REF=0;
        let tREGISTROS=0;
        let tCAPITAL_NOR=0;
        let tCAPITAL_REF=0;
        let tIMPORTE=0;
        let tRECARGO_NOR=0;
        let tRECARGO_REF=0;
        let tRECARGO=0;
        let tTOTAL=0;
        newreg.push({ Id:key,ANO:"", Mes:"", 
                    REG_NOR:0,REG_REF:0, REGISTROS:0, 
                    CAPITAL_NOR:0, CAPITAL_REF:0, IMPORTE:0, 
                    RECARGO_NOR:0, RECARGO_REF:0, RECARGO:0 , TOTAL:0});
        let j=newreg.length -1;
        while  (i<data.length && key==data[i].ANO)
        {
            tREG_NOR+= data[i].REG_NOR;
            tREG_REF+= (data[i].REG_REF);
            tREGISTROS+= (data[i].REGISTROS);
            tCAPITAL_NOR+= (data[i].CAPITAL_NOR);
            tCAPITAL_REF+=(data[i].CAPITAL_REF);
            tIMPORTE+= data[i].IMPORTE;
            tRECARGO_NOR+= data[i].RECARGO_NOR;
            tRECARGO_REF+= data[i].RECARGO_REF;
            tRECARGO+=data[i].RECARGO;
            tTOTAL+= data[i].TOTAL;
          //data[i].parentId=kdia;
          newreg.push({
            Id: key*100 + Number(data[i].MES),
            ANO:data[i].ANO,
            MES:dateNames.monthMin[data[i].MES-1],
            REG_NOR: data[i].REG_NOR,
            REG_REF: (data[i].REG_REF),
            REGISTROS: (data[i].REGISTROS),
            CAPITAL_NOR: (data[i].CAPITAL_NOR),
            CAPITAL_REF:(data[i].CAPITAL_REF),
            IMPORTE: data[i].IMPORTE,
            RECARGO_NOR: data[i].RECARGO_NOR,
            RECARGO_REF: data[i].RECARGO_REF,
            RECARGO:data[i].RECARGO,
            TOTAL: data[i].TOTAL,
            parentId:key
          });
          newreg[j].REG_NOR = tREG_NOR;
          newreg[j].REG_REF=  tREG_REF; 
          newreg[j].REGISTROS=  tREGISTROS; 
          newreg[j].CAPITAL_NOR= tCAPITAL_NOR; 
          newreg[j].CAPITAL_REF= tCAPITAL_REF; 
          newreg[j].IMPORTE= tIMPORTE; 
          newreg[j].RECARGO_NOR= tRECARGO_NOR; 
          newreg[j].RECARGO_REF= tRECARGO_REF; 
          newreg[j].RECARGO= tRECARGO; 
          newreg[j].TOTAL= tTOTAL;
          i++;
        }

        tgREG_NOR += tREG_NOR;
        tgREG_REF +=  tREG_REF; 
        tgREGISTROS +=  tREGISTROS; 
        tgCAPITAL_NOR+= tCAPITAL_NOR; 
        tgCAPITAL_REF+= tCAPITAL_REF; 
        tgIMPORTE+= tIMPORTE; 
        tgRECARGO_NOR+= tRECARGO_NOR; 
        tgRECARGO_REF+= tRECARGO_REF; 
        tgRECARGO_REF+= tRECARGO_REF; 
        tgRECARGO+= tRECARGO; 
        tgTOTAL+= tTOTAL;
      }
      return { detalle:newreg, total:{ 
        REG_NOR:tgREG_NOR,
        REG_REF:tgREG_REF, 
        REGISTROS: tgREGISTROS, 
        CAPITAL_NOR: tgCAPITAL_NOR, 
        CAPITAL_REF: tgCAPITAL_REF, 
        IMPORTE: tgIMPORTE, 
        RECARGO_NOR: tgRECARGO_NOR, 
        RECARGO_REF: tgRECARGO_REF, 
        RECARGO:tgRECARGO , 
        TOTAL:tgTOTAL 
      }};
    }
}
const handleOnClickOk = (e, p) => {
  setshowProgress(true);
    axios.get(getUri('CobranzaPorVencimiento'), {
        params: {
          ano: p.year,
          mes:p.month,
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
          <FilterBar year={d.getFullYear()} month={d.getMonth()} handleOnClickOk={handleOnClickOk}></FilterBar>
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
