import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function ArraySelected(props) {
  const classes = useStyles();
 

  const handleDelete = (chipToDelete) => () => {
    props.handleDelete(chipToDelete);
  };

  return (
    <Paper component="ul" className={classes.root}>
      {props.data.map((data) => {
          console.log("inchip",data);
        let key="c-"+data.Comercio;
        return (
          <li key={data.Comercio}>
            <Chip
               key={key}
              label={data.Nombre}
              onDelete={handleDelete(data)}
              className={classes.chip}
              variant="outlined"
            />
          </li>
        );
      })}
    </Paper>
  );
}
