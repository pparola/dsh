import React, { useState, useEffect } from "react";

import axios from 'axios';

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";

// core components
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';

import KpiChart from 'components/DashBoard/KpiChart.js'

import KpiSummary from 'components/DashBoard/KpiSummary.js';
import KpiTable from 'components/DashBoard/KpiTable.js';
import FilterBar from 'components/Navbars/FilterBar.js';

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import { datainit,top20RestoChart } from "variables/dashboard.js";
import { dateNames,years } from "variables/datemodule.js";
import { chartOption, chartColors} from "variables/chartmodule.js";
import { nFormat } from "variables/numberformatmodule.js";
import { getUri } from "variables/general.js";


import logoload from "assets/img/logo.gif";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const dt=new Date();
 const [year,setYear] = React.useState(dt.getFullYear());
 const [month,setMonth] = React.useState(dt.getMonth()+1);
  const [data, setData] = React.useState(datainit);

  const [modedetail, setModeDetail] = React.useState(false);
  const [datachartventa, setDataChartVenta] =  React.useState({
    labels: dateNames.monthMin,
    datasets: []
  });
  const [datachartcobranza, setDataChartCobranza] =  React.useState( {
    labels: dateNames.monthMin,
    datasets: []
  }); 

const [ showProgress, setshowProgress] = React.useState(false);
const [isLoad, setisLoad] = React.useState(false);
const [isLoadChart, setisLoadChart] = React.useState(false);
const [ openerror, setOpenError] = React.useState(false);

let count=0;
let datagraph=[];

const putDataInChart = () =>{
  let data=datagraph;
  let _datasetVenta=[];
        let i=0;
        let c=0;
        while( i< data.VentaComparativaAnual.length)
        {
          let year=data.VentaComparativaAnual[i].Ano;
          let d=[];
          let item=[];
          while (i< data.VentaComparativaAnual.length && year==data.VentaComparativaAnual[i].Ano)
          {
            let o=data.VentaComparativaAnual[i];
            d.push(o.SumaCapital);
            item.push([
                o.CantidadRegistros,
                o.SumaCapital, 
                o.SumaComision,
                o.SumaImporteCuotas,
                o.Interes
              ]);
            i++;
          }
          _datasetVenta.push({
              label: year, 
              data:d, 
              item:item,
              fill: false,
              backgroundColor:chartColors[c].up,
              borderColor: chartColors[c].up,
              borderWidth: 3,
              hoverBackgroundColor: chartColors[c].down,
              hoverBorderColor: chartColors[c].down,
            });
          c++;
        }
        
        let _datasetCobranza=[]; i=0;; c=0;
        while ( i< data.CobranzaComparativaAnual.length)
        {
          let year=data.CobranzaComparativaAnual[i].Ano;
          let d=[];
          let item=[];
          while (i< data.CobranzaComparativaAnual.length && year==data.CobranzaComparativaAnual[i].Ano)
          {
            let o=data.CobranzaComparativaAnual[i];
            d.push(o.SumaImporte);
            item.push([
              o.CantidadRegistros,
              o.SumaImporte, 
              o.SumaRecargo,
              o.SumaCuotasAdelantadas,
              o.SumaAnticipos
            ]);
            i++;
          }
          _datasetCobranza.push({
                label: year, 
                data:d, 
                item:item ,
                fill: false,
                backgroundColor:chartColors[c].up,
                borderColor: chartColors[c].up,
                borderWidth: 3,
                hoverBackgroundColor: chartColors[c].down,
                hoverBorderColor: chartColors[c].down,
              });
          c++;
        }
        setDataChartVenta({
          labels:dateNames.monthMin,
          
          datasets: _datasetVenta
        });
        setDataChartCobranza({
          labels:dateNames.monthMin,
          datasets: _datasetCobranza
        });

}

  const putData = (tipo, data) => {
    /* Tablas de detalle*/
    //["Año","Mes","Cantidad","Capital","Comisión","Neto","Interes","Total","Coef.","P.Cap","P.Cta"]
    if (tipo=='total'){
        /* Graficos */
        datagraph=data;
        putDataInChart();
        
       
    }else{
      data.VentasResumenFormat= data.VentasResumen.map( (v,i) => 
      {
        return (
          [
            v.Ano, 
            nFormat.fn(v.CantidadRegistros),
            nFormat.fcurrency(v.SumaCapital),
            nFormat.fcurrency(v.SumaComision),
            nFormat.fcurrency(v.SumaCapital -v.SumaComision),
            nFormat.fcurrency(v.Interes), 
            nFormat.fcurrency(v.SumaImporteCuotas ), 
            v.Coeficiente.toFixed(2),
            nFormat.fcurrency(v.PromedioCapital),
            nFormat.fn(v.CantidadRegistros),
          ])
      }
    );
    data.CobranzasResumenFormat= data.CobranzasResumen.map( (v,i) => 
        {
          return (
            [
              v.Ano, 
              nFormat.fn(v.CantidadRegistros),
              nFormat.fcurrency(v.SumaImporte),
              nFormat.fcurrency(v.SumaRecargo),
              nFormat.fcurrency(v.SumaCuotasAdelantadas),
              nFormat.fcurrency(v.SumaAnticipos), 
              nFormat.fcurrency(v.Total)
            ])
        }
      );
      data.RefinanciacionesResumenFormat= data.RefinanciacionesResumen.map( (v,i) => 
        {
          return (
            [
              v.Ano, 
              nFormat.fn(v.CantidadRegistros),
              nFormat.fcurrency(v.SumaCapital),
              nFormat.fcurrency(v.SumaRecargo),
              nFormat.fcurrency(v.SumaCapital),
              nFormat.fcurrency(v.PromedioCapital), 
            ])
        }
      );
      setData( data);
      //setModeDetail(true);
      
    }
    count++;
    if (count >= 2)
    {
      setisLoad(true);
      setisLoadChart(true);
    }
  }

  const getData = (y, m) =>  {
    setshowProgress(true);
    axios.get(getUri('Dashboard'), {
      params: {
        year: y,
        month: m
      }
    })
    .then(res => {
      putData('resumen', res.data)
      //getData2(y, m);
    })
    .catch((error) => {
        setOpenError(true);
        console.log(error.config);
    });
    console.log("leyendo server");
  };

  const getData2 = (y, m) =>  {
    
    axios.get(getUri('Dashboardtotales'), {
      params: {
        year: y,
        month: m
      }
    })
    .then(res => {
      putData('total', res.data)
      setshowProgress(false);
    })
    console.log("leyendo server");
  };

  useEffect( () => { 
    //getData(year, month);
  },[]);

  const handleOnClickOk = (e ,p) => {
    count=0;
    setisLoad(false);
    setisLoadChart(false);
    getData(p.year, p.month);
    getData2(p.year, p.month);
    setYear(p.year);
    setMonth(p.month);
  }


  const handleHeaderClick = () => {setModeDetail(!modedetail);}
  
  
const KpiIndices = (props) => {
  const [mode, setMode] = React.useState(true);
  const value1 = nFormat.fcurrency(props.value1);
  const value2 = nFormat.fcurrency(props.value2);
  const indice= nFormat.fn((props.value1/props.value2).toFixed(3));
  const handleOnClickOk = event => {
    setMode(!mode);
  };
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" >
          <TableBody>
              <TableRow>
                  <TableCell align='right'>
                    {(mode) ? props.label1 : value1 }
                  </TableCell>
                  <TableCell rowSpan={2}  justify = "center">
                  <Button 
                    variant="outlined" 
                    size="large" 
                    color="primary" 
                    className={classes.margin}
                    onClick={handleOnClickOk}
                    >
                      {indice}
                  </Button>
                  </TableCell>
              </TableRow>
              <TableRow>
                  <TableCell align='right' >
                    {(mode) ? props.label2 : value2}
                  </TableCell>  
              </TableRow>
          </TableBody>
      </Table>
    </TableContainer>
  );
}



  return (
    <div>
       
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
           <FilterBar 
              year={year} 
              month={month - 1 } 
              handleOnClickOk={handleOnClickOk}
              viewCartera={false}
              viewComercio={false}
              showProgress={true}
              openError={false}
              ></FilterBar>
              { showProgress && <LinearProgress   color="secondary" />   }
         </GridItem>
        <GridItem xs={12} sm={6} md={3}>
        
        {(isLoad) ? ( 
          <Fade in={isLoad}>
                <KpiIndices 
                  label1="Importe Cuotas"
                  label2="Capital Neto"
                  value1={data.CobranzasResumen[1].SumaImporte}
                  value2={data.VentasResumen[1].SumaCapital}
                ></KpiIndices>
          </Fade>
        ) : null }
          
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
       
        {(isLoad) ? ( 
           <Fade in={isLoad}>
            <KpiIndices 
                label1="Importe Cobranzas"
                label2="Capital Neto"
                value1={data.CobranzasResumen[1].Total}
                value2={data.VentasResumen[1].SumaCapital}
              ></KpiIndices>
          </Fade>
          
        )  : null }
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
        {(isLoad) ? ( 
            <Fade in={isLoad}>
              <KpiSummary
                headercolor="info"
                headerOnClick={(e) => handleHeaderClick()}
                title="Venta"
                subtitle="Importe Cuotas/Capital Neto"
                indice="1.146"
                chipcolor="primary"
                labelquantity='Cant. Créditos'
                quantity={data.VentasResumen[1].CantidadRegistros}
                labelamount="Importe Capital"
                amount={data.VentasResumen[1].SumaCapital}
                lastYear={year-1}
                quantityLastYear={data.VentasResumen[0].CantidadRegistros}
                amountLastYear={data.VentasResumen[0].SumaCapital}>
              </KpiSummary>
          </Fade>
            
        ) : null }
        </GridItem>
          {(modedetail) ? (
            <GridItem xs={12} sm={12} md={8}>
              <KpiTable
                headercolor="info"
                title="Composición Venta"
                columns={["Año","Cantidad","Capital","Comisión","Neto","Interes","Total","Coef.","P.Cap","P.Cta"]}
                aligndefault={"right"}
                data={data.VentasResumenFormat}
                >
              </KpiTable>
            </GridItem> ) : null
          }
        <GridItem xs={12} sm={12} md={4}>
        {(isLoad) ? ( 
          <Fade in={isLoad}>
            <KpiSummary
              headercolor="success"
              headerOnClick={(e) => handleHeaderClick()}
              title="Cobranzas"
              subtitle="Total Cobranza/Capital Neto"
              indice="1.249"
              chipcolor="success"
              labelquantity='Cant. Cuotas'
              quantity={data.CobranzasResumen[1].CantidadRegistros}
              labelamount="Importe Cuotas"
              amount={data.CobranzasResumen[1].SumaImporte}
              lastYear={year-1}
              quantityLastYear={data.CobranzasResumen[0].CantidadRegistros}
              amountLastYear={data.CobranzasResumen[0].SumaImporte}>
            </KpiSummary>
          </Fade>
         ) : null }
        </GridItem>
        {(modedetail) ? (
            <GridItem xs={12} sm={12} md={8}>
              <KpiTable
                headercolor="success"
                title="Composición Cobranza"
                columns={["Año","Cantidad","Importe","Punitorio","Adelantadas","Anticipos","Total"]}
                aligndefault={"right"}
                data={data.CobranzasResumenFormat}
                >
              </KpiTable>
            </GridItem> ) : null
          }
        <GridItem xs={12} sm={12} md={4}>
        {(isLoad) ? ( 
          <Fade in={isLoad}>
            <KpiSummary
              headercolor="warning"
              headerOnClick={(e) => handleHeaderClick()}
              title="Refinanciaciones"
              subtitle="Total Cobranza/Capital Neto"
              indice="1.249"
              chipcolor="success"
              labelquantity='Cant.Cuotas'
              quantity={data.RefinanciacionesResumen[1].CantidadRegistros}
              labelamount="Importe Capital"
              amount={data.RefinanciacionesResumen[1].SumaCapital}
              lastYear={year-1}
              quantityLastYear={data.RefinanciacionesResumen[0].CantidadRegistros}
              amountLastYear={data.RefinanciacionesResumen[0].SumaCapital}>
            </KpiSummary>
          </Fade>
          
        ) : null }
        </GridItem>
        {(modedetail) ? (
            <GridItem xs={12} sm={12} md={8}>
              <KpiTable
                headercolor="warning"
                title="Composición Refinanciaciones"
                columns={["Año","Cantidad","Capital","Interes","Importe","Pormedio"]}
                aligndefault={"right"}
                data={data.RefinanciacionesResumenFormat}
                >
              </KpiTable>
            </GridItem> ) : null
          }
        <GridItem xs={12} sm={12} md={6}>
            {(isLoadChart) ? ( 
                <Fade in={isLoadChart}>
                  <KpiChart
                    headercolor="info"
                    title="Comparativa Anual de Ventas"
                    data={datachartventa}
                    options={chartOption}
                    initmonth={month}
                    fieldIndex={1} // se omite la columna 1
                    tableInfoColumns={[
                                        {title:"Año"},
                                        {title:"Cantidad", type:'numeric'},
                                        {title:"Capital", type:'currency'},
                                        {title:"Comisión", type:'currency'},
                                        {title:"Imp.Cuotas" , type:'currency'},
                                        {title:"Interes", type:'currency'}]
                                      }
                  >
                  </KpiChart>
              </Fade>
            ) : 
                null
            }
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
        {(isLoadChart) ? ( 
          <Fade in={isLoadChart}>
            <KpiChart
                headercolor="success"
                title="Comparativa Anual de Cobranzas"
                data={datachartcobranza}
                options={chartOption}
                initmonth={month}
                fieldIndex={1}
                tableInfoColumns={[
                                    {title:"Año"},
                                    { title:"Cantidad" ,  type:'numeric'},
                                    { title:"Importe", type:'currency'},
                                    {title:"Recargo", type:'currency'},
                                    {title: "Ctas.Adel.", type:'currency'},
                                    {title:"Anticipos", type:'currency'}]
                                  }
              >
              </KpiChart>
          </Fade>
         ) : null }
        </GridItem>
      </GridContainer>
    </div>
  );
}
