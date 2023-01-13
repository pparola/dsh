import React ,{ useState, useEffect } from 'react';

import MaterialTable from "material-table";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import {ThemeProvider } from "@material-ui/styles";
import styles from "assets/jss/material-dashboard-react/views/kpisummaryStyle.js";
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

export default function BrowserSimple(props) {
  const classes = useStyles();
  const tableRef = React.createRef();
  /*const [selectedRow, setSelectedRow] =React.useState([]);

  const onSelectionChange= (rows)=>{
   
    setSelectedRow(rows);
    console.log("Seleccion", selectedRow);
  }

  const handleonclick=()=>{
    props.handleClickSelect(selectedRow);
  }
*/
  useEffect( () => { 
    tableRef.current.onAllSelected(false);
  },[]);
  
  return (
          <ThemeProvider theme={themeTable}>
              <MaterialTable
                  tableRef={tableRef}
                  columns={props.columns} 
                  title={props.title}
                  data={props.data}
                  options={{
                  headerStyle: {
                      backgroundColor: '#01579b',
                      color: '#FFF'
                  },
                  selection: true,
                  }}
                  onSelectionChange={(rows) => props.onSelectionChange(rows)}
              />
          </ThemeProvider>
  );
}
