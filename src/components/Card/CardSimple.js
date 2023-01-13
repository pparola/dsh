import React from 'react';


import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip'
import styles from "assets/jss/material-dashboard-react/views/kpicardStyle.js";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { media } from "assets/conf/sizes";
import { nFormat } from "variables/numberformatmodule.js";

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

export default function CardSimple(props) {
    const classes = useStyles();
    let numberFormated=  (props.style=='currency') ? nFormat.fcurrency(Number(props.number)) :nFormat.fn(Number(props.number));
    let numberSecundary=  (props.style=='currency') ? nFormat.fcurrency(Number(props.numberSecundary)) :nFormat.fn(Number(props.numberSecundary));
    return (
      <>
            <Card>
              <CardHeader stats icon>
                  <p className={classes.cardCategory}>{props.label}</p>
                  <CardTitle>{ numberFormated }</CardTitle>
              </CardHeader>
              <CardFooter stats>
                {(props.viewFooter) ? (
                  <>
                    <Chip color="default"  label={props.labelSecundary}></Chip>
                    <CardSubTitle>{numberSecundary }</CardSubTitle> 
                  </>
                ) : ( null)}
              </CardFooter>
            </Card>
      </>
    );
  }
  