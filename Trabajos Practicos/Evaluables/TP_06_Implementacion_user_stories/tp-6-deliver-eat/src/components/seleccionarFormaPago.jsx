import React from 'react';
import 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import DateFnsUtils from '@date-io/date-fns';
import PropTypes from 'prop-types';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import FormHelperText from '@material-ui/core/FormHelperText';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    width: '50%',
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    flexBasis: 200,
  },
  dividers: {
    width: '70%',
  },
  generalFields: {
    width: '50%',
  },
}));

const SeleccionarFormaPago = ({
  pedido, setFormaPago, showMessages, setShowMessages,
}) => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Typography variant="h5" gutterBottom>Detalles del Pago</Typography>
      <Divider variant="middle" className={classes.dividers} />
      <FormControlLabel
        control={
          (
            <Switch
              checked={pedido.formaPago.forma === 'Efectivo'}
              onChange={() => setFormaPago({
                ...pedido,
                formaPago: {
                  ...pedido.formaPago,
                  forma: pedido.formaPago.forma === 'Efectivo' ? 'Tarjeta' : 'Efectivo',
                },
              })}
              value={pedido.formaPago.forma === 'Efectivo'}
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          )
        }
        label={pedido.formaPago.forma === 'Efectivo' ? 'Contado' : 'Tarjeta Visa'}
      />


      {
        pedido.formaPago.forma === 'Efectivo'
          ? (
            <FormControl
              fullWidth
              className={classes.formControl}
              error={showMessages && !pedido.formaPago.monto}
            >
              <InputLabel htmlFor="adornment-amount">Monto con el que vas a abonar *</InputLabel>
              <Input
                id="adornment-amount"
                value={pedido.formaPago.monto}
                onChange={(event) => {
                  setFormaPago({
                    ...pedido,
                    formaPago: {
                      ...pedido.formaPago,
                      monto: event.target.value,
                    },
                  });
                  setShowMessages(false);
                }}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
              />
              <FormHelperText
                error={showMessages && !pedido.formaPago.monto}
              >
                {showMessages && !pedido.formaPago.monto ? 'Campo obligatorio' : ''}
              </FormHelperText>
            </FormControl>
          )
          : (
            <>
              <TextField
                id="standard-name"
                className={classes.generalFields}
                label="Número de tarjeta *"
                error={showMessages && (!pedido.formaPago.numeroTarjeta || !/^4[0-9]{12}(?:[0-9]{3})?$/.test(pedido.formaPago.numeroTarjeta))}
                helperText={showMessages && (!pedido.formaPago.numeroTarjeta
                  ? 'Campo obligatorio'
                  : !/^4[0-9]{12}(?:[0-9]{3})?$/.test(pedido.formaPago.numeroTarjeta) && 'La tarjeta tiene que ser VISA')}
                value={pedido.formaPago.numeroTarjeta}
                onChange={(event) => {
                  setFormaPago({
                    ...pedido,
                    formaPago: {
                      ...pedido.formaPago,
                      numeroTarjeta: event.target.value,
                    },
                  });
                  setShowMessages(false);
                }}
                margin="normal"
              />
              <TextField
                id="standard-name"
                className={classes.generalFields}
                label="Titular de la tarjeta *"
                error={showMessages && !pedido.formaPago.nombreTitular}
                helperText={showMessages && !pedido.formaPago.nombreTitular ? 'Campo obligatorio' : ''}
                value={pedido.formaPago.nombreTitular}
                onChange={(event) => {
                  setFormaPago({
                    ...pedido,
                    formaPago: {
                      ...pedido.formaPago,
                      nombreTitular: event.target.value,
                    },
                  });
                  setShowMessages(false);
                }}
                margin="normal"
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  {
                    // TODO: PASAR A TEXTFIELD CON FORMATO mm/yyyy
                  }
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/yyyy"
                    margin="normal"
                    className={classes.generalFields}
                    disablePast
                    id="date-picker-inline"
                    label="Fecha de vencimiento"
                    value={pedido.formaPago.fechaVencimiento}
                    onChange={(event) => setFormaPago({
                      ...pedido,
                      formaPago: {
                        ...pedido.formaPago,
                        fechaVencimiento: event,
                      },
                    })}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
              <TextField
                id="standard-name"
                className={classes.generalFields}
                label="cvc *"
                value={pedido.formaPago.cvc}
                step="1"
                min="1"
                error={showMessages && (!pedido.formaPago.cvc || !/^[0-9]{3}$/.test(pedido.formaPago.cvc))}
                helperText={showMessages && (!pedido.formaPago.cvc
                  ? 'Campo obligatorio' : !/^[0-9]{3}$/.test(pedido.formaPago.cvc) && 'el cvc tiene formato incorrecto')}
                onChange={(event) => {
                  setFormaPago({
                    ...pedido,
                    formaPago: {
                      ...pedido.formaPago,
                      cvc: event.target.value,
                    },
                  });
                  setShowMessages(false);
                }}
                margin="normal"
              />
            </>
          )
      }
    </Grid>
  );
};


SeleccionarFormaPago.propTypes = {
  pedido: PropTypes.instanceOf(Object).isRequired,
  setFormaPago: PropTypes.instanceOf(Object).isRequired,
  showMessages: PropTypes.bool.isRequired,
  setShowMessages: PropTypes.instanceOf(Object).isRequired,
};

export default SeleccionarFormaPago;
