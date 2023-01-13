import React, { useState, useEffect } from "react";
import {Line} from 'react-chartjs-2';

import MaterialTable from "material-table";
// react plugin for creating charts
// @material-ui/core
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/ExpansionPanel';
import AccordionSummary from '@material-ui/core/ExpansionPanelSummary';
import AccordionDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography'; 
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Browser from "components/Browser/BrowserSimple.js";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));


export default function Filtros(props) {
  const classes = useStyles();
    const [expanded, setExpanded] = React.useState('');
  
    //const [dataFiltros, setDataFiltros]=React.useState( props.data); 
    const [filtros, setFiltros] =  React.useState( { Acreedor:[], Grupos:[], Comercios:[], Rubros:[], Cartera:[]  }); 

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };
      /* control de cada browser list */
    const getElements=(rows) => {
        let a=[];
        rows.forEach(ele => {
        a.push(ele.Codigo);
        })
        return a;
    }
  
    const checkComercios = (comercio) =>
    {
      return ((filtros.Acreedor.length==0 || filtros.Acreedor.findIndex(ele => ele==comercio.AcreedorCodigo)>-1) && 
              (filtros.Grupos.length==0 || filtros.Grupos.findIndex(ele => ele==comercio.GruposCodigo)>-1)  &&
              (filtros.Rubros.length==0 || filtros.Rubros.findIndex(ele => ele==comercio.RubroCodigo)>-1))  &&
              (filtros.Cartera.length==0 || filtros.Cartera.findIndex(ele => ele==comercio.ComercioCartera)>-1);
    }


    const onSelectionChange= ( tipo, elements)=>{
      //setSelectedRow(rows);
      //console.log(tipo,elements );
      setFiltros({...filtros, [tipo]: elements})
     
      console.log('Filtros', filtros);
    
    
    }
    

    const handleCloseSelect= () => {
      props.handleCloseSelect(filtros);
      setFiltros({ Acreedor:[], Grupos:[], Comercios:[], Rubros:[], Cartera:[]  });
    }

    return(
        <Dialog  open={props.openBrowser}  onClose={props.handleCloseCancel} >
        <DialogTitle id="responsive-dialog-title">{"Filtrar datos"}</DialogTitle>
        <DialogContent>
        <Accordion expanded={expanded === 'panel0'} onChange={handleChange('panel0')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel0bh-content"
                id="panel0bh-header"
              >
                <Typography className={classes.heading}>Cartera</Typography>
              </AccordionSummary>
              <AccordionDetails>
                        <Browser
                          color={"info"}
                          title=""
                          columns={[
                            { title: 'Codigo', field: 'Codigo' },
                            { title: 'Nombre', field: 'Nombre' },
                          ]}
                          data={props.data.Cartera}
                          onSelectionChange={(rows) => onSelectionChange('Cartera',getElements(rows))}
                        />      
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography className={classes.heading}>Acreedores</Typography>
              </AccordionSummary>
              <AccordionDetails>
                        <Browser
                          color={"info"}
                          title=""
                          columns={[
                            { title: 'Codigo', field: 'Codigo' },
                            { title: 'Nombre', field: 'Nombre' },
                          ]}
                          data={props.data.Acreedor}
                          onSelectionChange={(rows) => onSelectionChange('Acreedor',getElements(rows))}
                        />      
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2bh-content"
                  id="panel2bh-header"
                >
                  <Typography className={classes.heading}>Grupos</Typography>
                </AccordionSummary>
                <AccordionDetails>
                      <Browser
                        color={"info"}
                        title=""
                        columns={[
                          { title: 'Codigo', field: 'Codigo' },
                          { title: 'Nombre', field: 'Nombre' },
                        ]}
                        data={props.data.Grupos}
                        onSelectionChange={(rows) => onSelectionChange('Grupos',getElements(rows))}
                      />  
                 </AccordionDetails>
              </Accordion>
             
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>

                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3bh-content"
                  id="panel3bh-header"
                >
                  <Typography className={classes.heading}>Rubros</Typography>
                </AccordionSummary>
                <AccordionDetails>      
                      <Browser
                        color={"info"}
                        title=""
                        columns={[
                          { title: 'Codigo', field: 'Codigo' },
                          { title: 'Nombre', field: 'Nombre' },
                        ]}
                        data={props.data.Rubros}
                        onSelectionChange={(rows) => onSelectionChange('Rubros',getElements(rows)) }
                      />  
                </AccordionDetails>
            </Accordion>     
            
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                  >
                    <Typography className={classes.heading}>Comercios</Typography>
                  </AccordionSummary>
                  <AccordionDetails>    
                      <Browser
                        color={"info"}
                        title=""
                        columns={[
                          { title: 'Codigo', field: 'Codigo' },
                          { title: 'Nombre', field: 'Nombre' },
                        ]}
                        data={props.data.Comercios}
                        onSelectionChange={(rows) => onSelectionChange('Comercios',getElements(rows)) }
                      />  
              </AccordionDetails>
            </Accordion>              
        </DialogContent>
        <DialogActions>
              <Button onClick={handleCloseSelect} variant="contained" color="primary">
                Aplicar filtros
              </Button>
              <Button onClick={props.handleCloseQuitar} variant="contained" color="secondary">
                Quitar filtros
              </Button>
              <Button onClick={props.handleCloseCancel} variant="contained"color="default">
                Cancelar
              </Button>
        </DialogActions>
      </Dialog>
    )
}