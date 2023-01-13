import React, { useState, useEffect } from "react";
import {Line} from 'react-chartjs-2';
import { chartOption, chartColors} from "variables/chartmodule.js";

import MaterialTable from "material-table";
// react plugin for creating charts
// @material-ui/core
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import {ThemeProvider } from "@material-ui/styles";
import axios from 'axios';


// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CardBasic from "components/Card/CardBasic.js";
import FilterBar from 'components/Navbars/FilterBar.js';
import LinearProgress from '@material-ui/core/LinearProgress';

import { nFormat } from "variables/numberformatmodule.js";
import { getUri } from "variables/general.js";
import { dateNames,years } from "variables/datemodule.js";

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




export default function RankingTop20() {
  const [data, setData] = React.useState([]);
  const [dataChart, setDataChart] =  React.useState( {
    labels:[],
    datasets: []
  }); 
  const d = new Date();
  const [ showProgress, setshowProgress] = React.useState(false);
 

  const fecha=new Date();
 

 const chartOptions={
    ...chartOption,
    title: {
      display: true,
      text: 'Líneas Punteada Ventas - Líneas Normales Cobranza'
  },
    tooltips: {
      mode: 'index',
      intersect: true,
      callbacks: {
        label: function(tooltipItem, data) {

            console.log("tooltips", tooltipItem);
            console.log("data",data);
            return   data.datasets[tooltipItem.datasetIndex].label + '-' +  nFormat.fcurrency(tooltipItem.yLabel).replace(',00','');
        }
    }
    },
    hover: {
      mode: 'index',
      intersect: true
    },
    scales: {
      xAxes: [{
        display: true,
      }],
      yAxes: [{
        display: true,
        type: 'linear', // 'logarithmic',
        ticks: {
          autoSkip: true,
          min: 0,
          max: 200000000
          ,
          callback: function (value, index, values) {
            if (index%3==0) return nFormat.fcurrency(value).replace(',00','');
          }
      },
      scaleLabel: {
          display: true,
          labelString: 'Importes'
      }
      }]
    }
 };

 

  const putData = (data, p) => {
    console.log ("data", data);
    let ma, ya;
    let mm = p.month;
    let yy = p.year;
    ma = mm - 1;
    ya = yy;
    if (ma == 0)
    {
      ma = 12;
      ya = yy - 1;
    }
    

    // mes actual
    let keym=`${yy}-${mm}`;
        setData(data[keym]);
        let _dataset=[];
        let c=0;
        let d=[];  let e=[];  let f=[]; 
        let dc=[];  let ec=[];  let fc=[]; 
        //let td=0;  let te=0;  let tf=0; // totales
        let dias=[];
        let dmax=data[keym].length-1;
        
        for (let i=0; i<data[keym].length;i++)
        {
          d.push(data[keym][i].VentaActual);
          dc.push(data[keym][i].CobranzaActual);
        }
        d.push(data[keym][dmax].VentaEstimada); // ultimo rgistro
        dc.push(data[keym][dmax].CobranzaEstimada);
        _dataset.push({
          label:`${yy}-${dateNames.monthMin[mm-1]} (Vta)`,
          data:d, 
          fill: false,
          borderDash: [5, 5],
          backgroundColor:chartColors[c].up,
          borderColor: chartColors[c].up,
          borderWidth: 3,
          hoverBackgroundColor: chartColors[c].down,
          hoverBorderColor: chartColors[c].down,
        });
        _dataset.push({
          label:`${yy}-${dateNames.monthMin[mm-1]} (Cob)`,
          data:dc, 
          fill: false,
          backgroundColor:chartColors[c].up,
          borderColor: chartColors[c].up,
          borderWidth: 3,
          hoverBackgroundColor: chartColors[c].down,
          hoverBorderColor: chartColors[c].down,
        });
        c++;
        //Mes Anterior
        keym=`${ya}-${ma}`;
        for (let i=0; i<dmax+1;i++)
        {
          e.push(data[keym][i].VentaActual);
          ec.push(data[keym][i].CobranzaActual);
        }
        e.push(data[keym][data[keym].length-1].VentaActual);
        ec.push(data[keym][data[keym].length-1].CobranzaActual);
        _dataset.push({
          label: `${ya}-${dateNames.monthMin[ma-1]} (Vta)`,
          data:e, 
          fill: false,
          borderDash: [5, 5],
          backgroundColor:chartColors[c].up,
          borderColor: chartColors[c].up,
          borderWidth: 3,
          hoverBackgroundColor: chartColors[c].down,
          hoverBorderColor: chartColors[c].down,
        });
        _dataset.push({
          label: `${ya}-${dateNames.monthMin[ma-1]} (Cob)`,
          data:ec, 
          fill: false,
          backgroundColor:chartColors[c].up,
          borderColor: chartColors[c].up,
          borderWidth: 3,
          hoverBackgroundColor: chartColors[c].down,
          hoverBorderColor: chartColors[c].down,
        });
        c++;
        //Mismo mes año anterior
        keym=`${yy-1}-${mm}`;
        for (let i=0; i<dmax+1;i++)
        {
          f.push(data[keym][i].VentaActual);
          fc.push(data[keym][i].CobranzaActual);
        }
        f.push(data[keym][data[keym].length-1].VentaActual)
        fc.push(data[keym][data[keym].length-1].CobranzaActual)

        _dataset.push({
          label: `${yy-1}-${dateNames.monthMin[mm-1]} (Vta)`, 
          data:f, 
          fill: false,
          borderDash: [5, 5],
          backgroundColor:chartColors[c].up,
          borderColor: chartColors[c].up,
          borderWidth: 3,
          hoverBackgroundColor: chartColors[c].down,
          hoverBorderColor: chartColors[c].down,
        });
        _dataset.push({
          label: `${yy-1}-${dateNames.monthMin[mm-1]} (Cob)`, 
          data:fc, 
          fill: false,
          backgroundColor:chartColors[c].up,
          borderColor: chartColors[c].up,
          borderWidth: 3,
          hoverBackgroundColor: chartColors[c].down,
          hoverBorderColor: chartColors[c].down,
        });
      
          for(let i=1;i<= dmax+1;i++)
        {
          //d.push(NaN); e.push(NaN); f.push(NaN); 
          dias.push("Día "+ i);
        }
        dias.push("Total");
        
        console.log("dataset", _dataset);
        console.log("dias", dias);
        setDataChart({
          labels:dias,
          datasets: _dataset
        });
  };


  /*    
      const getData = () => {
        axios.get( getUri('Proyeccion') , {
          params: {
          }
        })
        .then(res => {
          putData( res.data)
        })
        console.log("leyendo server");
      }

  
  useEffect( () => { 
    getData();
  },[]);
*/
  const handleOnClickOk = (e , p) => {
    setshowProgress(true);
    axios.get( getUri('Proyeccion') , {
      params: {
        year: p.year,
        month: p.month
      }
    })
    .then(res => {
      putData( res.data, p);
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
            handleOnClickOk={handleOnClickOk}
            viewComercio={false}
            viewCartera={false}
            >
            </FilterBar>
            { showProgress && <LinearProgress   color="secondary" />   }
         </GridItem>
        <GridItem xs={12} sm={12} md={12}>
            <ThemeProvider theme={themeTable}>
                <MaterialTable        
                    title="Proyeccion"
                    columns={[
                        { title: "Fecha", field: "Fecha"  },
                        { title: "Venta", field: "VentaActual",type:'currency' , currencySetting: nFormat.currencySetting },
                        { title: "Vta.Estimada", field: "VentaEstimada",type:'currency' , currencySetting: nFormat.currencySetting },
                        { title: "Cobranza", field: "CobranzaActual",type:'currency' , currencySetting: nFormat.currencySetting },
                        { title: "Cob.Estimada", field: "CobranzaEstimada",type:'currency' , currencySetting: nFormat.currencySetting },
                        { title: "Cantidad Dias", field: "DiaCantidad",type:'numeric'  },
                        { title: "Dias Habiles", field: "DiaComercialUltimo",type:'numeric'  },
                        { title: "Dias Del Mes", field: "DiaComercialesDelMes",type:'numeric'  }
                        
                      ]}
                    data={data}
                    options={{
                    headerStyle: {
                        maxBodyHeight:"300px",
                        position: 'sticky', top: 0,
                        backgroundColor: '#01579b',
                        color: '#FFF'
                    },
                    search: false,
                    exportButton: true,
                    paging: false,
                    }}
                />
            </ThemeProvider>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
            <CardBasic
              title="Comparativo"
              headercolor="info"
              >
                  <div  style={{ height: "650px" }} >
                      <Line data={dataChart} options={chartOptions} />
                 </div>
            </CardBasic>
        </GridItem>
      </GridContainer>
      
    </div>
  );
}
