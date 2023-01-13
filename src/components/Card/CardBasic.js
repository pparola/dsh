import React from 'react';


import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import IconButton from '@material-ui/core/IconButton';
import styles from "assets/jss/material-dashboard-react/views/kpicardStyle.js";
import { makeStyles } from "@material-ui/core/styles";
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
export default function CardBasic(props) {
    const classes = useStyles();
    
    return (
      <>
            <Card>
              <CardHeader color={props.headercolor}  className={classes.cardHeader} > 
                <CardTitle>{props.title}</CardTitle>
                {(props.icon!=null) ? (
                  <IconButton
                      aria-label="more"
                      aria-controls="long-menu"
                      aria-haspopup="true"
                      color="inherit"
                      onClick={props.onClick}
                    >
                    {props.icon}
                    </IconButton>
                ) : (null)}
              </CardHeader>
              <CardBody>
                  {props.children}
              </CardBody>
            </Card>
      </>
    );
  }
  