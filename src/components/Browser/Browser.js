import React ,{ useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import BrowserSimple from "components/Browser/BrowserSimple.js";
import styles from "assets/jss/material-dashboard-react/views/kpisummaryStyle.js";
import styled from "styled-components";
import { media } from "assets/conf/sizes";
import { makeStyles } from "@material-ui/core/styles";

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

/*
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
*/
export default function Browser(props) {
  const classes = useStyles();
 // const tableRef = React.createRef();
  const [selectedRow, setSelectedRow] =React.useState([]);

  const onSelectionChange= (rows)=>{
    setSelectedRow(rows);
    console.log("Seleccion", selectedRow);
  }

  const handleonclick=()=>{
    props.handleClickSelect(selectedRow);
  }

  /*
  useEffect( () => { 
    tableRef.current.onAllSelected(false);
  },[]);

  */

  return (
    <Card>
        <CardHeader  color={props.color} className={classes.cardHeader}   >
            <CardTitle>{props.label}</CardTitle>
        </CardHeader>
        <CardBody>
          <BrowserSimple
            columns={props.columns} 
            title=""
            data={props.data}
            onSelectionChange={onSelectionChange}
          >
          </BrowserSimple>
        </CardBody>
        <CardFooter>
            {(selectedRow.length>0) ?(
                <Button variant="contained"  color="primary" className={classes.button} onClick={handleonclick} >
                    Seleccionar
                </Button>   
            ):(null)}
            <Button variant="contained"  color="default" className={classes.button} onClick={props.handleClickCancel} >
                Cancel
            </Button>   
        </CardFooter>
    </Card>
  );
}
