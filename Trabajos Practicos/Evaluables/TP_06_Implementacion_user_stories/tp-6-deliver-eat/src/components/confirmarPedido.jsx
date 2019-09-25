import React from 'react';
import 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DateFnsUtils from '@date-io/date-fns';
import PropTypes from 'prop-types';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from '@material-ui/pickers';

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
  textField: {
    flexBasis: 200,
  },
  divider: {
    width: '70%',
  },
  dividerGeneral: {
    width: '90%',
  },
  pickers: {
    width: '25%',
  },
  imagenPreview: {
    height: '35vh',
    border: '1px',
  },
  img: {
    height: '35vh',
  },
}));

const ConfirmarPedido = ({
  pedido,
  setEntrega,
  showMessages,
  setShowMessages,
}) => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Typography variant="h4" gutterBottom>Detalles del Pedido</Typography>
      <Divider variant="middle" className={classes.dividerGeneral} />
      <Typography variant="h5" gutterBottom>¿Cúando deseas recibir este pedido?</Typography>
      <Divider variant="middle" className={classes.divider} />
      <FormControlLabel
        control={
          (
            <Switch
              checked={pedido.fechaEntrega.esLoAntesPosible}
              onChange={() => {
                setEntrega({
                  ...pedido,
                  fechaEntrega: {
                    ...pedido.fechaEntrega,
                    esLoAntesPosible: !pedido.fechaEntrega.esLoAntesPosible,
                  },
                });
                setShowMessages(false);
              }}
              value={pedido.fechaEntrega.esLoAntesPosible}
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          )
        }
        label={pedido.fechaEntrega.esLoAntesPosible ? 'Lo antes posible' : 'Fecha y hora'}
      />
      {
        !pedido.fechaEntrega.esLoAntesPosible
        && (
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid
                container
                justify="space-around"
                direction="column"
                alignItems="center"
              >
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  className={classes.pickers}
                  error={showMessages && !pedido.fechaEntrega.fechaEntrega}
                  helperText={showMessages && !pedido.fechaEntrega.fechaEntrega ? 'Campo obligatorio' : ''}
                  disablePast
                  id="date-picker-inline"
                  label="Fecha de Entrega"
                  value={pedido.fechaEntrega.fechaEntrega}
                  onChange={(event) => {
                    setEntrega({
                      ...pedido,
                      fechaEntrega: {
                        ...pedido.fechaEntrega,
                        fechaEntrega: event,
                      },
                    });
                    setShowMessages(false);
                  }}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  className={classes.pickers}
                  error={showMessages && !pedido.fechaEntrega.horaEntrega}
                  helperText={showMessages && !pedido.fechaEntrega.horaEntrega ? 'Campo obligatorio' : ''}
                  label="Hora de Entrega"
                  value={pedido.fechaEntrega.horaEntrega}
                  onChange={(event) => setEntrega({
                    ...pedido,
                    fechaEntrega: {
                      ...pedido.fechaEntrega,
                      horaEntrega: event,
                    },
                  })}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </Grid>
        )
        // TODO: ¿Cuando deseas recibir este pedido?
        // date picker - time picker
      }
      <Typography variant="h5" gutterBottom>Detalles del producto</Typography>
      <Divider variant="middle" className={classes.divider} />
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Typography variant="h6" gutterBottom>Descripción</Typography>
        {
          pedido.producto.descripcion
        }
        {
          pedido.producto.imagenURLPreview
          && (
            <div className={classes.imagenPreview}>
              <img src={pedido.producto.imagenURLPreview} alt="producto" className={classes.img} />
            </div>
          )
        }
      </Grid>
      <Typography variant="h5" gutterBottom>Detalles del comercio</Typography>
      <Divider variant="middle" className={classes.divider} />
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Typography variant="h6" gutterBottom>Calle</Typography>
        {
          pedido.direccionComercio.calle
        }
        <Typography variant="h6" gutterBottom>Número</Typography>
        {
          pedido.direccionComercio.numero
        }
        <Typography variant="h6" gutterBottom>Ciudad</Typography>
        {
          pedido.direccionComercio.ciudad
        }
        <Typography variant="h6" gutterBottom>Referencia extra </Typography>
        {
          pedido.direccionComercio.referencia ? pedido.direccionComercio.referencia : 'No hay referencia extra'
        }
      </Grid>
      <Typography variant="h5" gutterBottom>Detalles de entrega</Typography>
      <Divider variant="middle" className={classes.divider} />
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Typography variant="h6" gutterBottom>Calle</Typography>
        {
          pedido.direccionEntrega.calle
        }
        <Typography variant="h6" gutterBottom>Número</Typography>
        {
          pedido.direccionEntrega.numero
        }
        <Typography variant="h6" gutterBottom>Ciudad</Typography>
        {
          pedido.direccionEntrega.ciudad
        }
        <Typography variant="h6" gutterBottom>Referencia extra </Typography>
        {
          pedido.direccionEntrega.referencia ? pedido.direccionEntrega.referencia : 'No hay referencia extra'
        }
      </Grid>
      <Typography variant="h5" gutterBottom>Detalles de pago</Typography>
      <Divider variant="middle" className={classes.divider} />
      {
        pedido.formaPago.forma === 'Efectivo'
          ? (
            <>
              <Typography variant="h6" gutterBottom>Método de Pago</Typography>
              {pedido.formaPago.forma}
              <Typography variant="h6" gutterBottom>Monto con el que vas a pagar</Typography>
              {pedido.formaPago.monto}
            </>
          )
          : (
            <>
              <Typography variant="h6" gutterBottom>Método de Pago</Typography>
              {'Tarjeta VISA'}
              <Typography variant="h6" gutterBottom>Número de tarjeta</Typography>
              {pedido.formaPago.numeroTarjeta}
              <Typography variant="h6" gutterBottom>Número de tarjeta</Typography>
              {pedido.formaPago.numeroTarjeta}
              <Typography variant="h6" gutterBottom>Número de tarjeta</Typography>
              {pedido.formaPago.numeroTarjeta}
              <Typography variant="h6" gutterBottom>CVC</Typography>
              ***
            </>
          )
      }
    </Grid>
  );
};

ConfirmarPedido.propTypes = {
  pedido: PropTypes.instanceOf(Object).isRequired,
  setEntrega: PropTypes.instanceOf(Object).isRequired,
  showMessages: PropTypes.bool.isRequired,
  setShowMessages: PropTypes.instanceOf(Object).isRequired,
};

export default ConfirmarPedido;
