import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles();

export default function GridRow(props) {
  const classes = useStyles();
  return (
      <Grid container> 
        {props.data.map((prop, key) => {
          return (
            <Grid item xs={props.xs} key={key}>
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <Typography variant="h6" color="textSecondary">
                            {prop.label}
                        </Typography>
                        <Typography>
                            {prop.text}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
          )
        })}
      </Grid>
    
  );
}
