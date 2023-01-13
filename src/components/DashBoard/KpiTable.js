import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styles from "assets/jss/material-dashboard-react/views/kpicardStyle.js";
import styled from "styled-components";
import { media } from "assets/conf/sizes";
import { TableHead } from '@material-ui/core';

const useStyles = makeStyles(styles);

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

export default function KpiTable(props) {
  const classes = useStyles();
  const value= new Intl.NumberFormat('es-AR').format(Number(props.value));
  
  console.log(props.title, props.data);
  return (
    <>
       <Card>
        <CardHeader color={props.headercolor}  className={classes.cardHeader} > 
          <CardTitle>{props.title}</CardTitle>
        </CardHeader>
        <CardBody>
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" >
                <TableHead style={{backgroundColor:"#cfd8dc"}}>
                  <TableRow>
                      {
                          props.columns.map((col,key) => {
                              return(
                                  <TableCell key={key} align='center'>{col}</TableCell>
                              )
                          })
                      }
                  </TableRow>
                </TableHead>
                <TableBody>
                    {
                      props.data.map((row,r ) =>{
                          return(
                          <TableRow key={"r-"+r}>
                          {
                              row.map((col,c) => {
                                  return(
                                      <TableCell 
                                        key={"r-"+r+" c-"+c } 
                                        style={{fontSize:"11px"}}
                                        align={ (props.align) ? props.align[c] : props.aligndefault }
                                        >
                                          {col}
                                      </TableCell>
                                  )
                              })
                          }
                          </TableRow>
                          );
                      })
                  }
                </TableBody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </>
  );
}
