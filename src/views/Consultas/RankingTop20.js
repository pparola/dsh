import React, { Component } from "react";

import MaterialTable from "material-table";
// react plugin for creating charts
// @material-ui/core
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import {ThemeProvider } from "@material-ui/styles";
import axios from 'axios';


// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import FilterBar from 'components/Navbars/FilterBar.js';
import TotalTable from 'components/RankingTop20/TotalTable.js';

import { nFormat } from "variables/numberformatmodule.js";
import { getUri } from "variables/general.js";





export default function RankingTop20() {
  const [data, setData] = React.useState([]);
  const d=new Date();
  const title="Ranking top 20";
 
 
  const putData = (data) => {
    setData(data);
  };


  
  const handleOnClickOk = (e , p) => {
    axios.get( getUri('RankingTop20') , {
      params: {
        year: p.year,
        month: p.month,
      }
    })
    .then(res => {
      putData( res.data)
    })
    console.log("leyendo server");
  }

    return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <FilterBar 
            year={d.getFullYear()} 
            month={d.getMonth()+1} 
            handleOnClickOk={handleOnClickOk}
            viewComercio={false}
            >
            </FilterBar>
        </GridItem>
        <GridItem xs={12} sm={6} md={6}>
            <h5>{title}</h5>
            <TotalTable
              title="Totales"
              headercolor="success"
              data={data.VentaCantidadCapitalTotal}
            >
            </TotalTable>
        </GridItem>

      </GridContainer>
      
    </div>
  );
}
