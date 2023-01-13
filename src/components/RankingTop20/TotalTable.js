import React from 'react';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import MaterialTable from "material-table";
import MTableHeader from "material-table/dist/components/m-table-header.js";
import MTableBody from "material-table/dist/components/m-table-body.js";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/kpicardStyle.js";
import styled from "styled-components";
import { media } from "assets/conf/sizes";

import {ThemeProvider } from "@material-ui/styles";
import { nFormat } from "variables/numberformatmodule.js";
import { TableFooter } from "@material-ui/core";
const useStyles = makeStyles(styles);

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
        fontSize: 13,
        padding: "6px 24px 6px 16px", 
      }
    }
  }
});

const CardTitle = styled.div`
    color: #fff;
    ${media.phone`
         font-size: 18px;
    `}
    ${media.tablet`
         font-size: 13px;
    `}
    ${media.desktop`
    font-size: 20px;
    `}
`;

const TableTotales = (props) => {
console.log("footer",props);
let cantidad, capital, intereses,total;

if(props.data!=undefined)
{
  cantidad=nFormat.fn( props.data.SumaCantidad);
  capital= nFormat.fcurrency( props.data.SumaCapital);
  intereses= nFormat.fcurrency(props.data.SumaIntereses);
  total= nFormat.fcurrency(props.data.SumaImporteTotal);
}
  return (
    <>
      <TableFooter>
        <TableRow>
          <TableCell  style={{ backgroundColor: '#01579b',color:'#fff'}} align="left">Totales</TableCell>
          <TableCell  style={{ backgroundColor: '#01579b',color:'#fff'}} align="right">{cantidad}</TableCell>
          <TableCell  style={{ backgroundColor: '#01579b',color:'#fff'}} align="right">{capital}</TableCell>
          <TableCell  style={{ backgroundColor: '#01579b',color:'#fff'}} align="right">{intereses}</TableCell>
          <TableCell  style={{ backgroundColor: '#01579b',color:'#fff'}} align="right">{total}</TableCell>
          <TableCell  style={{ backgroundColor: '#01579b',color:'#fff'}} align="right"></TableCell>
          <TableCell  style={{ backgroundColor: '#01579b',color:'#fff'}} align="right"></TableCell>
        </TableRow>
      </TableFooter>
    </>
  );
}

export default function TotalTable(props) {
  const classes = useStyles();
  
  console.log(props.title, props.data);
  
  

  const calculos = (data) => {
    let d=[{
      SumaCantidad:0,
      SumaCapital:0,
      SumaIntereses:0,
      SumaImporteTotal:0
    },
    {
      SumaCantidad:0,
      SumaCapital:0,
      SumaIntereses:0,
      SumaImporteTotal:0
    }
  ]
    if (data!=undefined)
    {
      for ( let i=0; i<data.length; i++)
      {
        d[i].SumaCantidad= Number(data[i].SumaCantidad);
        d[i].SumaCapital= Number(data[i].SumaCapital);
        d[i].SumaIntereses= Number(data[i].SumaIntereses);
        d[i].SumaImporteTotal= Number(data[i].SumaImporteTotal);
      }
      let ret= {
        SumaCantidad: d[0].SumaCantidad + d[1].SumaCantidad,
        SumaCapital: d[0].SumaCapital + d[1].SumaCapital,
        SumaIntereses: d[0].SumaIntereses + d[1].SumaIntereses,
        SumaImporteTotal:  d[0].SumaImporteTotal + d[1].SumaImporteTotal,
        };
        
        if( d[0].SumaCapital >0)
        {
          data[0].Indice = nFormat.fn((d[0].SumaImporteTotal /  d[0].SumaCapital ).toFixed(3));
        }
        if( d[1].SumaCapital >0)
        {
          data[1].Indice = nFormat.fn((d[1].SumaImporteTotal / d[1].SumaCapital).toFixed(3));
        }

        if(ret.SumaImporteTotal>0)
        {
          if(data[0]!=undefined)
          {
            data[0].Porcentaje= nFormat.fn(( d[0].SumaImporteTotal / ret.SumaImporteTotal *100).toFixed(2)) + "%";
          }
          if(data[1]!=undefined)
          {
            data[1].Porcentaje= nFormat.fn(( d[1].SumaImporteTotal / ret.SumaImporteTotal *100).toFixed(2)) + "%";
          }
        }
        
     return ret;
    }else{
      return undefined;
    }
  }

  let totales=calculos(props.data);

const components = {
  Body: props => (
      <>
          <MTableBody {...props} />
          <TableTotales
              data={props.options.totales}
          ></TableTotales>
     </>
  )
};
  return (
    <>
     <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color={props.headercolor}  className={classes.cardHeader} > 
              <CardTitle>{props.title}</CardTitle>
            </CardHeader>
            <CardBody>
              <ThemeProvider theme={themeTable}>
                <MaterialTable
                  columns={[
                    { title: "Cartera", field: "Cartera" ,
                      render: rowData => <div>  {(rowData.Cartera=='D') ? 'Dirigido' : 'Efectivo' }  </div>
                    },
                    { title: "Cantidad", field: "SumaCantidad", type:'numeric' },
                    { title: "Capital", field: "SumaCapital",type:'currency' , currencySetting: nFormat.currencySetting },
                    { title: "Interes", field: "SumaIntereses",type:'currency' , currencySetting: nFormat.currencySetting },
                    { title: "Total", field: "SumaImporteTotal",type:'currency' , currencySetting: nFormat.currencySetting },
                    { title: "Indice", field: "Indice", type:'numeric' },
                    { title: "Porc.", field: "Porcentaje", type:'numeric' },
                  ]}
                  title=" "
                  data={props.data}
                  totales={totales}
                  options={{
                    headerStyle: {
                      backgroundColor: '#01579b',
                      color: '#FFF'
                    },
                    toolbar:true,
                    exportButton: true,
                    paging: false,
                    totales:totales
                  }}
                  components={components}
                />
                </ThemeProvider>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6}>
          
        </GridItem>
      </GridContainer>
    </>
  );
}
