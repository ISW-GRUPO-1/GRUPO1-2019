import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import PropTypes from 'prop-types';
import ciudades from '../utils/cities';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
    width: '50%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  dividers: {
    width: '70%',
  },
  generalFields: {
    width: '50%',
  },
}));

const SeleccionarDireccionEntrega = (
  {
    pedido, setDireccionEntrega, showMessages, setShowMessages,
  },
) => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Typography variant="h5" gutterBottom>Detalle de entrega</Typography>
      <Divider variant="middle" className={classes.dividers} />
      <TextField
        id="standard-name"
        className={classes.generalFields}
        label="Calle *"
        error={showMessages && !pedido.direccionEntrega.calle}
        helperText={showMessages && !pedido.direccionEntrega.calle ? 'Campo obligatorio' : ''}
        value={pedido.direccionEntrega.calle}
        onChange={(event) => {
          setDireccionEntrega({
            ...pedido,
            direccionEntrega: {
              ...pedido.direccionEntrega,
              calle: event.target.value,
            },
          });
          setShowMessages(false);
        }}
        margin="normal"
      />
      <TextField
        id="standard-name"
        className={classes.generalFields}
        label="Número *"
        error={showMessages && !pedido.direccionEntrega.numero}
        helperText={showMessages && !pedido.direccionEntrega.numero ? 'Campo obligatorio' : ''}
        value={pedido.direccionEntrega.numero}
        onChange={(event) => {
          setDireccionEntrega({
            ...pedido,
            direccionEntrega: {
              ...pedido.direccionEntrega,
              numero: event.target.value,
            },
          });
          setShowMessages(false);
        }}
        margin="normal"
      />
      <FormControl
        className={classes.formControl}
        error={showMessages && !pedido.direccionEntrega.ciudad}
      >
        <InputLabel htmlFor="city">Ciudad *</InputLabel>
        <Select
          value={pedido.direccionEntrega.ciudad}
          onChange={(event) => {
            setDireccionEntrega({
              ...pedido,
              direccionEntrega: {
                ...pedido.direccionEntrega,
                ciudad: event.target.value,
              },
            });
            setShowMessages(false);
          }}
          inputProps={{
            name: 'ciudad',
            id: 'ciudad',
          }}
        >
          {ciudades.map((ciudad) => <MenuItem key={ciudad} value={ciudad}>{ciudad}</MenuItem>)}
        </Select>
        <FormHelperText
          error={showMessages && !pedido.direccionEntrega.ciudad}
        >
          {showMessages && !pedido.direccionEntrega.ciudad ? 'Campo obligatorio' : ''}
        </FormHelperText>
      </FormControl>
      <TextField
        id="standard-name"
        className={classes.generalFields}
        label="Referencia"
        value={pedido.direccionEntrega.referencia}
        onChange={(event) => setDireccionEntrega({
          ...pedido,
          direccionEntrega: {
            ...pedido.direccionEntrega,
            referencia: event.target.value,
          },
        })}
        margin="normal"
      />
    </Grid>
  );
};

SeleccionarDireccionEntrega.propTypes = {
  pedido: PropTypes.instanceOf(Object).isRequired,
  setDireccionEntrega: PropTypes.instanceOf(Object).isRequired,
  showMessages: PropTypes.bool.isRequired,
  setShowMessages: PropTypes.instanceOf(Object).isRequired,
};


export default SeleccionarDireccionEntrega;
