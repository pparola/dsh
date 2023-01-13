import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import styles from "assets/jss/material-dashboard-react/views/kpicardStyle.js";
import styled from "styled-components";
import { media } from "assets/conf/sizes";

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
          <CardSubTitle>{value}</CardSubTitle>
        </CardHeader>
        <CardBody>
          
          
        </CardBody>
      </Card>
    </>
  );
}
