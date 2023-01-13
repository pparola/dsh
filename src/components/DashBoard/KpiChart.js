import React ,{ useState, useEffect} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import {Line} from 'react-chartjs-2';

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CardBody from "components/Card/CardBody.js";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import { TableHead } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import styles from "assets/jss/material-dashboard-react/views/kpicardStyle.js";
import styled from "styled-components";
import { media } from "assets/conf/sizes";
import { dateNames } from "variables/datemodule.js";
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
    font-size: 20px;
    `}
`;

const TableInfoBody = props => {
console.log("body", props);
  return (
      (props.item.data.length>1) ? (
        props.item.data.map( (row,i) => {
          return (
              <TableRow key={i}>
                {
                  row.map( (col,i) => {
                    let val=col;
                    switch (props.columns[i].type)
                    {
                      case "numeric":
                        val=nFormat.fn(col);
                        break;
                      case "currency":
                        val=nFormat.fcurrency(col);
                        break;                          
                    }
                    return(
                      <TableCell key={i} style={{fontSize:"11px"}} align="right">{val}</TableCell>
                    )
                  })
                }
            </TableRow>
          );
        })
      ) : null
  )
}

const TableInfo = props => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
        <Table className={classes.table} size="small" >
          <TableHead  style={{backgroundColor:"#cfd8dc"}}>
            <TableRow>
              <TableCell colSpan={props.columns.length+1} style={{fontSize: "15px", fontWeight:"bold" }}>{props.data.mes}</TableCell>
            </TableRow>
            <TableRow>
                {props.columns.map( (c,i) => {
                    return (
                        <TableCell key={i} align="center"  style={{ fontWeight:"bold" }}>{c.title}</TableCell>
                    );
                })
                } 
            </TableRow>
          </TableHead>
          <TableBody>
              <TableInfoBody item={props.data} columns={props.columns}></TableInfoBody>
          </TableBody>
      </Table>
    </TableContainer>
  );
}

const ITEM_HEIGHT = 48;

const MenuOption = props =>{
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick= (event, index) => {
    console.log("Menu Item Text", index);
    setAnchorEl(null);
    props.handleOnClick(index);
  };

  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        color="inherit"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {props.options.map((option,i) => (
          <MenuItem key={i} selected={i === props.selectedIndex} onClick={ (e) => handleMenuItemClick(e ,i) }>
            {option.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  );

} 


export default function KpiChart(props) {
  const classes = useStyles();
  const menuOptions = props.tableInfoColumns.slice(1);
  const [datag, setDataG]=useState(props.data);

const [datatableinfo, setDataTableInfo] =  useState( getDataset(props.initmonth-1, props.data.datasets));
const [leyenda, setLeyenda]=useState(menuOptions[props.fieldIndex].title);
  console.log ("Graqfico data", datag);

  
  const options={
      ...props.options,
      tooltips: {
        mode: 'index',
        intersect: true,
        callbacks: {
          label: function(tooltipItem, data) {
  
              console.log("tooltips", tooltipItem);
              console.log("data",data);
              return   data.datasets[tooltipItem.datasetIndex].label + ' - ' +  tooltipItem.yLabel;
          }
      }
      },
      onClick:function(e, itg){
       
        try{
        let info=getDataset(itg[0]._index,props.data.datasets);
        console.log("info" ,info);
        setDataTableInfo(info);
        
        } catch (e) {}
      }
  }

  function getDataset(mes, dtsets ) {
    let array=[];
    let maxl=0;
    console.log("getdata",dtsets );
    for (let i=0; i<dtsets.length; i++)
    {
      let v=dtsets[i];
      let sa=[v.label];
      if(mes<v.item.length){
        for (let y=0;y<v.item[mes].length;y++)
        {
            sa.push(v.item[mes][y]);
        }
      }
      if( maxl< sa.length)
      {
        maxl=sa.length;
      }
      for (let j=sa.length;j<maxl; j++) 
      { 
        sa.push(0);
      }
      array.push(sa); 
    }
      return {
          mes : dateNames.month[mes],
          data : array
      };
};


 const handleMenuOnClick = (index) => {
    
    setLeyenda(menuOptions[index].title);
    let d = props.data.datasets;
    for (let i= 0; i<d.length; i++)
    {
      let data=[];
      for (let j=0; j<d[i].item.length; j++)
      {
        data.push(d[i].item[j][index]);
      }
      d[i].data=data;
    }
    console.log("nuevos datos para el grafico", d);
    //setDataG(d);

  }

  return (
    <>
       <Card>
        <CardHeader color={props.headercolor}  className={classes.cardHeader} > 
            <CardTitle>
              {props.title} - {leyenda}
            </CardTitle>
            <MenuOption options={menuOptions} selectedIndex={props.fieldIndex} handleOnClick={handleMenuOnClick} ></MenuOption>
        </CardHeader>
        <CardBody style={{ height: "250px" }}>
            <Line data={datag} options={options} />
        </CardBody>
        <CardFooter stats>
          
              {(datatableinfo.data.length>0) ? (
                <TableInfo 
                  columns={props.tableInfoColumns}
                  data={datatableinfo}
                  >
                </TableInfo>
              ) : null}
          
        </CardFooter>
      </Card>
    </>
  );
}
