import React, { Component } from "react";

// react plugin for creating charts
// @material-ui/core
import axios from 'axios';
import LinearProgress from '@material-ui/core/LinearProgress';

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import FilterBar from 'components/Navbars/FilterBar.js';
import TotalTable from 'components/RankingTop20/TotalTable.js';
import ImportesTable from 'components/RankingTop20/ImportesTable.js';
import CantidadesTable from 'components/RankingTop20/CantidadesTable.js';

import { getUri } from "variables/general.js";



export default function RankingTop20() {
  const [data, setData] = React.useState([]);
  const [ showProgress, setshowProgress] = React.useState(false);
  const d=new Date();
  const title="Ranking";
 
 
  const putData = (data) => {
    setData(data);
    console.log("data", data);
  };


  
  const handleOnClickOk = (e , p) => {
    setshowProgress(true);
    axios.get( getUri('RankingTop20') , {
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

  

  const dataForTypeCapital = (tipo) => {
    let total=0;
    let pSobreMuestra=0;
    let pSobreTotal=0;
    
    if (tipo=='Dirigido')
    {
      
      if (data.Totales)
      {
          total=data.Totales.CapitalDirigido;
          let i= (data.VentaCantidadCapitalTotal[0].Cartera=='D') ? 0 : 1;
          if(data.VentaCantidadCapitalTotal[i]){
            pSobreMuestra= total *100 / Number(data.VentaCantidadCapitalTotal[i].SumaCapital)
            pSobreTotal= total *100 / data.Totales.TotalesCalculados.CantidadCapital.SumaCapital;
          }
      }
      return { 
                valores:data.VentaCapitalTopDirigido ,  
                tipo: "Dirigido",
                total:total,
                pSobreMuestra:pSobreMuestra,
                pSobreTotal:pSobreTotal
            };
    }
    else {
      let total=0;
      if (data.Totales)
      {
          total=data.Totales.CapitalEfectivo;
          let i= (data.VentaCantidadCapitalTotal[0].Cartera=='E') ? 0 : 1;
          if(data.VentaCantidadCapitalTotal[i]){
            pSobreMuestra= total *100 / Number(data.VentaCantidadCapitalTotal[i].SumaCapital)
            pSobreTotal= total *100 / data.Totales.TotalesCalculados.CantidadCapital.SumaCapital;
          }
      }
      return { 
                valores:data.VentaCapitalTopEfectivo ,  
                tipo: "Efectivo",
                total: total,
                pSobreMuestra:pSobreMuestra,
                pSobreTotal:pSobreTotal
            };
    }
  }


  const dataForTypeCantidad = (tipo) => {
    let total=0;
    let pSobreMuestra=0;
    let pSobreTotal=0
    if (tipo=='Dirigido')
    {
     
      if (data.Totales)
      {
          total=data.Totales.CantidadDirigido;
          let i= (data.VentaCantidadCapitalTotal[0].Cartera=='D') ? 0 : 1;
          if(data.VentaCantidadCapitalTotal[i]){
           pSobreMuestra= total *100 / Number(data.VentaCantidadCapitalTotal[i].SumaCantidad)
            pSobreTotal= total *100 / data.Totales.TotalesCalculados.CantidadCapital.SumaCantidad;
          }
      }
      return { 
                valores:data.VentaCantidadTopDirigido ,  
                tipo: "Dirigido",
                total:total,
                pSobreMuestra:pSobreMuestra,
                pSobreTotal:pSobreTotal
            };
    }
    else {
      let total=0;
      if (data.Totales)
      {
          total=data.Totales.CantidadEfectivo;
          let i= (data.VentaCantidadCapitalTotal[0].Cartera=='E') ? 0 : 1;
          if(data.VentaCantidadCapitalTotal[i]){
           pSobreMuestra= total *100 / Number(data.VentaCantidadCapitalTotal[i].SumaCantidad)
           pSobreTotal= total *100 / data.Totales.TotalesCalculados.CantidadCapital.SumaCantidad;
          }
      }
      return { 
                valores:data.VentaCantidadTopEfectivo ,  
                tipo: "Efectivo",
                total: total,
                total:total,
                pSobreMuestra:pSobreMuestra,
                pSobreTotal:pSobreTotal
            };
    }
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
            <h5>{title}</h5>
            <TotalTable
              title="Totales"
              headercolor="info"
              data={ data.VentaCantidadCapitalTotal}
            >
            </TotalTable>
        </GridItem>
        <GridItem xs={12} sm={6} md={6}>
          <ImportesTable
            title='Importe Dirigido'
            headercolor="info"
            data={dataForTypeCapital('Dirigido')}
          >
          </ImportesTable>
        </GridItem>
        <GridItem xs={12} sm={6} md={6}>
          <ImportesTable
            title='Importe Efectivo'
            headercolor="info"
            data={dataForTypeCapital('Efectivo')}
          >
          </ImportesTable>
        </GridItem>
        <GridItem xs={12} sm={6} md={6}>
          <CantidadesTable
            title='Cantidad Dirigido'
            headercolor="info"
            data={dataForTypeCantidad('Dirigido')}
          >
          </CantidadesTable>
        </GridItem>
        <GridItem xs={12} sm={6} md={6}>
          <CantidadesTable
            title='Cantidad Efectivo'
            tipo='Efectivo'
            headercolor="info"
            data={ dataForTypeCantidad('Efectivo') }
          >
          </CantidadesTable>
        </GridItem>
      </GridContainer>
      
    </div>
  );
}
