import React from 'react';

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Chip from '@material-ui/core/Chip'

import MaterialTable from "material-table";
import MTableHeader from "material-table/dist/components/m-table-header.js";
import MTableBody from "material-table/dist/components/m-table-body.js";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { TableFooter } from "@material-ui/core";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/kpicardStyle.js";
import styled from "styled-components";
import { media } from "assets/conf/sizes";

import {ThemeProvider } from "@material-ui/styles";
import { nFormat } from "variables/numberformatmodule.js";

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
        fontSize: 11,
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
  let total;
  
  if(props.data!=undefined)
  {
    total= nFormat.fcurrency(props.data);
  }
    return (
      <>
        <TableFooter>
          <TableRow>
            <TableCell  style={{ backgroundColor: '#01579b',color:'#fff'}} align="left">Totales</TableCell>
            <TableCell  style={{ backgroundColor: '#01579b',color:'#fff'}} align="right"></TableCell>
            <TableCell  style={{ backgroundColor: '#01579b',color:'#fff'}} align="right">{total}</TableCell>
            <TableCell  style={{ backgroundColor: '#01579b',color:'#fff'}} align="right"></TableCell>
           
          </TableRow>
        </TableFooter>
      </>
    );
  }

export default function ImportesTable(props) {
  const classes = useStyles();
  
  console.log(props.title, props.data);
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
          <Card>
            <CardHeader color={props.headercolor}  className={classes.cardHeader} > 
              <CardTitle>{props.title}</CardTitle>
            </CardHeader>
            <CardBody>
            <GridContainer>
                  <GridItem xs={12} sm={4} md={4}>
                      Total &nbsp;&nbsp;
                      <Chip color="primary"  label={ nFormat.fcurrency((props.data.total.toFixed(2)))}>Total</Chip> 
                  </GridItem>
                  <GridItem xs={12} sm={4} md={4}>
                      % Sobre {props.data.tipo} &nbsp;&nbsp;
                      <Chip color="primary"  label={nFormat.fn(props.data.pSobreMuestra.toFixed(2)) +'%'}></Chip> 
                  </GridItem>
                  <GridItem xs={12} sm={4} md={4}>
                      % Sobre el Total &nbsp;&nbsp;
                      <Chip color="primary"  label={nFormat.fn(props.data.pSobreTotal.toFixed(2))+'%' }>Total</Chip> 
                  </GridItem>
              </GridContainer>
              <br/>
              <ThemeProvider theme={themeTable}>
                <MaterialTable
                  columns={[
                    { title: "Comercio", field: "Comercio" , width:115,
                     // render: rowData => <div>  {(rowData.Cartera=='D') ? 'Dirigido' : 'Efectivo' }  </div>
                    },
                    { title: "Nombre", field: "Nombre" },
                    { title: "Capital", field: "SumaCapital",width:115 ,type:'currency' , currencySetting: nFormat.currencySetting },
                    { title: "Porc.", field: "Porcentaje",width:115 ,
                      render: rowData => <div style={{ paddingLeft: "5px"}}>  {nFormat.fn(rowData.Porcentaje.toFixed(2))} %  </div>
                  }
                    
                  ]}
                  title=" "
                  data={props.data.valores}
                  options={{
                    headerStyle: {
                      backgroundColor: '#01579b',
                      color: '#FFF',
                      
                    },
                    toolbar:true,
                    exportButton: true,
                    paging: false,
                    totales:props.data.total
                  }}
                  components={components}
                />
                </ThemeProvider>
            </CardBody>
          </Card>
    </>
  );
}
