import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Box from '@material-ui/core/Box';

import { nFormat } from "variables/numberformatmodule.js";
import styles from "assets/jss/material-dashboard-react/views/kpicardStyle.js";
import styled from "styled-components";
import { media } from "assets/conf/sizes";


const useStyles = makeStyles(styles);

const CardTitle = styled.div`
    color: #FFF;
    text-align: right;
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
    color: #FFF;
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



export default function AvpCard(props) {
  const classes = useStyles();
  let numberFormated=nFormat.fcurrency(Number(props.number));
  let columnas=[];
  let datos=[];
  //console.log("AvpCarg",props);

  if (props.columnas!=undefined)
  {
      columnas=props.columnas;
  }
  if( props.datos!=undefined)
  {
      datos=props.datos;
  }

  return (
    <>
        <Card className={classes.cardBox}>
            <CardHeader color={props.color} className={classes.cardHeader} >
                <CardSubTitle>{props.label}</CardSubTitle>
                <CardTitle>{ numberFormated }</CardTitle>
            </CardHeader>
            { (props.viewCompo) ? ( 
                <CardBody>
                <Box display="flex" justifyContent="center" flexWrap="wrap" style={{ width: '100%' }}>
                {datos.map((d, i) => {
                    let v;
                    const myKey='avp-' + i;
                    if (columnas[i].type=='currency')
                    {
                        v=nFormat.fcurrency(d);
                    }
                    else if(columnas[i].type=='number')
                    {
                        v=nFormat.fn(d);
                    }
                    else
                    {
                        v=d;
                    }
                    return (
                                <Box key={myKey} justifyContent="right" m={1} p={1} >
                                    <div style={{ width:'100%' , textAlign:'right'}} >{columnas[i].label}</div>
                                    <hr></hr>
                                    <div style={{ width:'100%' , textAlign:'right'}} >{v}</div>
                                </Box>
                    )
                }
                )}
                </Box>
                </CardBody>
            ) : ( null )}
        </Card>
    </>
  );
}
