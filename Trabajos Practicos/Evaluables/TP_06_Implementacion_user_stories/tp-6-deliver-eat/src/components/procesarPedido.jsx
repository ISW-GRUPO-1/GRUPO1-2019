import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import { formatDate, formatTime } from '../utils/date';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },

}));

const ProcesarPedido = ({ pedido }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Typography variant="h2" gutterBottom>¡Felicitaciones!</Typography>
      <Divider variant="middle" className={classes.dividers} />

      {
        pedido.fechaEntrega.esLoAntesPosible
          ? <Typography variant="h5" gutterBottom>Su pedido será entregado lo antes posible</Typography>
          : <Typography variant="h5" gutterBottom>{`Su pedido será entregado el ${formatDate(pedido.fechaEntrega.fechaEntrega)} a las ${formatTime(pedido.fechaEntrega.horaEntrega)}`}</Typography>
      }
    </Grid>
  );
};

ProcesarPedido.propTypes = {
  pedido: PropTypes.instanceOf(Object).isRequired,
};

export default ProcesarPedido;
