import React, { Children } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import KpiCard from 'components/DashBoard/KpiCard.js';
import styles from "assets/jss/material-dashboard-react/views/kpisummaryStyle.js";
import styled from "styled-components";
import { media } from "assets/conf/sizes";
const useStyles = makeStyles(styles);
const CardTitle = styled.div`
    color: #FFF;
    ${media.phone`
         font-size: 18px;
    `}
    ${media.tablet`
         font-size: 14px;
    `}
    ${media.desktop`
    font-size: 20px;
    `}
`;

const CardSubTitle = styled.div`
    color: #FFF;
    ${media.phone`
         font-size: 14px;
    `}
    ${media.tablet`
         font-size: 14px;
    `}
    ${media.desktop`
    font-size: 16px;
    `}
`;

export default function KpiSummary(props) {
  const classes = useStyles();
  const [headercolor, setHeaderColor] = React.useState(props.headercolor);
  const [chipcolor, setChipColor] = React.useState(props.chipcolor);
  return (
    <>
      <Card>
        <CardHeader color={headercolor}  className={classes.cardHeader} onClick={props.headerOnClick} > 
          <CardTitle>{props.title}</CardTitle>
        </CardHeader>
        <CardBody>
          <GridContainer>
            <GridItem xs={12} sm={6} md={6}>
              <KpiCard
                label={props.labelquantity}
                number={props.quantity}
                numberLastYear={props.quantityLastYear}
                lastYear={props.lastYear}
              >
              </KpiCard>
            </GridItem>
            <GridItem xs={12} sm={6} md={6}>
              <KpiCard
                label={props.labelamount}
                number={props.amount}
                numberLastYear={props.amountLastYear}
                lastYear={props.lastYear}
                style="currency"
                >
              </KpiCard>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              {props.children}
            </GridItem>
          </GridContainer>
          
        </CardBody>
      </Card>
    </>
  );
}
