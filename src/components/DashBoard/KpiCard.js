import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import Chip from '@material-ui/core/Chip'
import Badge from '@material-ui/core/Badge';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import EventIcon from '@material-ui/icons/Event';
import styles from "assets/jss/material-dashboard-react/views/kpicardStyle.js";
import styled from "styled-components";
import { media } from "assets/conf/sizes";

const useStyles = makeStyles(styles);

const CardTitle = styled.div`
    color: #777;
    ${media.phone`
         font-size: 23px;
    `}
    ${media.tablet`
         font-size: 15px;
    `}
    ${media.desktop`
    font-size: 23px;
    `}
`;

const CardSubTitle = styled.div`
    color: #999;
    ${media.phone`
         font-size: 15px;
    `}
    ${media.tablet`
         font-size: 13px;
    `}
    ${media.desktop`
    font-size: 16px;
    `}
`;



export default function KpiCard(props) {
  const classes = useStyles();
  let numberFormated, numberLastYear;
  let n=Number(props.number);
  let nly=Number(props.numberLastYear);
  const indice= new Intl.NumberFormat('es-AR').format((n/nly).toFixed(3));
  if (props.style=='currency')
  {
    numberFormated=new Intl.NumberFormat('es-CO',{style:props.style, currency:'COP'}).format(n);
    numberLastYear=new Intl.NumberFormat('es-CO',{style:props.style, currency:'COP'}).format(nly);
  }else
  {
    numberFormated=new Intl.NumberFormat('es-AR').format(n);
    numberLastYear=new Intl.NumberFormat('es-AR').format(nly);
  }
  
  function IconTrending()
  {
   
    if (n==nly)
    {
        return (
            <CardIcon color="warning">
                <Badge className={classes.badgeNumber} color="error" badgeContent={indice } >
                    <TrendingFlatIcon />
                </Badge>
            </CardIcon>
        )
    }
    else if (n>nly)
    {
        return (
        <CardIcon  color="success">
             <Badge className={classes.badgeNumber} color="default" badgeContent={indice}>
                <TrendingUpIcon />
            </Badge>
        </CardIcon>
        )
    }
    return (
        <CardIcon color="danger">
            <Badge className={classes.badgeNumber} color="error" badgeContent={indice}>
                <TrendingDownIcon />
            </Badge>
        </CardIcon>
    )
  }

  return (
    <>
        <Card className={classes.cardBox}>
            <CardHeader color="warning" stats icon>
            <IconTrending></IconTrending>
                <p className={classes.cardCategory}>{props.label}</p>
                <CardTitle>{ numberFormated }</CardTitle>
            </CardHeader>
            <CardFooter stats>
                        <Chip color="default"  label={props.lastYear}></Chip>
                        <CardSubTitle>{numberLastYear }</CardSubTitle> 
            </CardFooter>
        </Card>
    </>
  );
}
