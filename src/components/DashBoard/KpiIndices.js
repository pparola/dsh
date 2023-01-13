import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import GridItem from "components/Grid/GridItem.js";
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import styles from "assets/jss/material-dashboard-react/views/kpicardStyle.js";
import styled from "styled-components";
import { media } from "assets/conf/sizes";
import { whiteColor } from 'assets/jss/material-dashboard-react';

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

const CardSubTitle = styled.div`
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

export default function KpiMastertDetail(props) {
  const classes = useStyles();
  const value= new Intl.NumberFormat('es-AR').format(Number(props.value));
  
  
  return (
    <>
       <Card>
        <CardHeader color={props.headerColor}  className={classes.cardHeader} > 
          <CardTitle>{props.title}</CardTitle>
        </CardHeader>
        <CardBody>
        <GridItem xs={12} sm={6} md={6}>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" >
                    <TableBody>
                        <TableRow>
                            <TableCell align='center'>Importe Cuotas</TableCell>
                            <TableCell rowSpan={2}  justify = "center">
                            <Button variant="outlined" size="large" color="primary" className={classes.margin}>
                                    1.233
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='center' >Importe Capital Neto</TableCell>  
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            </GridItem>
            <GridItem xs={12} sm={6} md={6}>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" >
                    <TableBody style={{background:"#f5f5f5"}} >
                        <TableRow>
                            <TableCell  align='center'>Importe Total Cobranza</TableCell>
                            
                            <TableCell rowSpan={2} align='center' >
                                <Button variant="outlined" size="large" color="primary" className={classes.margin}>
                                    1.233
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='center' >Importe Capital Neto</TableCell>  
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            </GridItem>
        </CardBody>
      </Card>
    </>
  );
}
