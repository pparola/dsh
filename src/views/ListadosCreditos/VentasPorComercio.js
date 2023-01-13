import React from "react";
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";

// core components
import MUIDataTable from "mui-datatables";
import {createMuiTheme, MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import classnames from 'classnames';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import FilterBar from 'components/Navbars/FilterBar.js';

const useStyles = makeStyles(theme => ( {
    BusinessAnalystRow: {
      '& td': {backgroundColor: "#FAA"}
    },
    NameCell: {
      fontWeight: 900
    },
  }));


export default function VentasPorCuotas() {
    const classes = useStyles();
   
    const [denseTable ,setdenseTable] =React.useState( false);
    const [stacked, setstacked ] =React.useState( true);
    const getMuiTheme = () => createMuiTheme({
        overrides: {
          MUIDataTable: {
            root: {
              backgroundColor: "#AAF",
            },
            paper: {
              boxShadow: "none",
            }
          },
          MUIDataTableBodyCell: {
            root: {
              backgroundColor: "#FFF"
            }
          }
        }
      });
    
      const toggleDenseTable = (event) => {
        setdenseTable(event.target.checked);
      }
    
      const toggleResponsive = (event) => {
        this.setstacked(event.target.checked ? true : false );
      }

    const columns = [
        {
          name: "Name",
          options: {
            filter: true,
            setCellProps: (value) => {
              return {
                className: classnames(
                  {
                    [classes.NameCell]: value === "Mel Brooks"
                  })
              };
            },
            setCellHeaderProps: (value) => {
              return {
                className: classnames(
                  {
                    [classes.NameCell]: true
                  }),
                  style: {
                    textDecoration: 'underline'
                  }
              };
            }
          }
        },
        {
          name: "Title",
          options: {
            filter: true,
            setCellHeaderProps: (value) => ({style:{textDecoration:'underline'}}),
          }
        },
        {
          name: "Location",
          options: {
            filter: false,
          }
        },
        {
          name: "Age",
          options: {
            filter: true,
          }
        },
        {
          name: "Salary",
          options: {
            filter: true,
            sort: false
          }
        }
      ];
  
      const data = [];
  
      const options = {
        filter: true,
        filterType: 'dropdown',
        responsive: stacked ? 'stacked' : 'scrollMaxHeight',
        fixedHeaderOptions: {
          xAxis: true,
          yAxis: true
        },
        rowHover: false,
        setRowProps: (row) => {
          return {
            className: classnames(
              {
                [classes.BusinessAnalystRow]: row[1] === "Business Analyst"
              }),
            style: {border: '3px solid blue',}
          };
        },
        setTableProps: () => {
          return {
            padding: denseTable ? "none" : "default",
  
            // material ui v4 only
            size: denseTable ? "small" : "medium",
          };
        }
  
      };

  const handleOnQUeryChange = event => {
    
  };

  let d =new Date();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <FilterBar year={d.getFullYear()} month={d.getMonth()} handleOnClickOk={handleOnQUeryChange}></FilterBar>
         </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <MUIDataTable 
            title={"Employee List"} 
            data={data} 
            columns={columns} 
            options={options} 
          />
        </GridItem>
      </GridContainer>
    </div>
  );
}
