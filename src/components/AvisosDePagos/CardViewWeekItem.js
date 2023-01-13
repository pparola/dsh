import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import styles from "assets/jss/material-dashboard-react/views/kpisummaryStyle.js";
import styled from "styled-components";
import { media } from "assets/conf/sizes";
import { nFormat } from "variables/numberformatmodule.js";


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
        font-size: 16px;
    `}
`;

const CardSubTitle = styled.div`
color:#999;
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


export default function CardViewWeekItem(props) {
  const classes = useStyles();
  let numberFormated=nFormat.fcurrency(Number(props.number));
  let columnas=[];
  let datos=[];
  console.log("CardViewWeekItem",props);

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
        <Card>
            <CardHeader  color={props.color} className={classes.cardHeader}  onClick={props.headerOnClick} >
                <CardTitle>{props.label}</CardTitle>
                <div>
                    <CardTitle>{ numberFormated }</CardTitle>
                </div>
                
            </CardHeader>
            { (props.viewCompo) ? (            
                <CardBody>
                     <Box display="flex" justifyContent="center" flexWrap="wrap" style={{ width: '100%' }}>
                     {datos.map((d, i) => {
                            const myKey='cvwi-' + i;
                            let v;
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
                                <Box  key={myKey} justifyContent="right" m={1} p={1} >
                                    <div style={{ width:'100%' , textAlign:'right'}} >{columnas[i].label}</div>
                                    <hr></hr>
                                    <div style={{ width:'100%' , textAlign:'right'}} >{v}</div>
                                </Box>
                            )
                        }
                        )}
                     </Box>
                </CardBody>
            ) : (null) }
        </Card>
    </>
  );
}
