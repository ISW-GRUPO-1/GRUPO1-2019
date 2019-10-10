import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import ModalMap from './modalMap';

const getModalStyle = () => ({
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});

const useStyles = makeStyles((theme) => ({
  dividers: {
    width: '70%',
  },
  generalFields: {
    width: '50%',
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
  imagenPreview: {
    height: '35vh',
    border: '1px',
    margin: '5px 15px',
  },
  img: {
    height: '35vh',
  },
  paper: {
    position: 'absolute',
    width: '50vw',
    height: '50vh',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
  },
}));

const SeleccionarProductoYComercio = ({
  pedido, setProducto, showMessages, setShowMessages,
}) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [openModal, setOpenModal] = useState(false);
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Typography variant="h5" gutterBottom>Detalles del Producto</Typography>
      <Divider variant="middle" className={classes.dividers} />
      <TextField
        id="standard-name"
        className={classes.generalFields}
        label="¿Qué quieres pedir? *"
        error={showMessages && !pedido.producto.descripcion}
        helperText={showMessages && !pedido.producto.descripcion ? 'Campo obligatorio' : ''}
        value={pedido.producto.descripcion}
        onChange={(event) => {
          setProducto({
            ...pedido,
            producto: {
              ...pedido.producto,
              descripcion: event.target.value,
            },
          });
          setShowMessages(false);
        }}
        margin="normal"
      />
      <input
        accept="image/jpg"
        id="text-button-file"
        className={classes.input}
        type="file"
        onChange={(event) => {
          event.preventDefault();
          const reader = new FileReader();
          const file = event.target.files[0];
          reader.onloadend = () => {
            setProducto({
              ...pedido,
              producto: {
                ...pedido.producto,
                imagen: file,
                imagenURLPreview: reader.result,
              },
            });
          };
          reader.readAsDataURL(file);
        }}
      />
      <label htmlFor="text-button-file">
        <Button variant="outlined" component="span" className={classes.button}>
          {'Subir imagen'}
        </Button>
      </label>
      {
        pedido.producto.imagenURLPreview
        && (
          <div className={classes.imagenPreview}>
            <img src={pedido.producto.imagenURLPreview} alt="producto" className={classes.img} />
          </div>
        )
      }
      <Typography variant="h5" gutterBottom>Detalle del comercio</Typography>
      <Divider variant="middle" className={classes.dividers} />

      <Button variant="outlined" component="span" onClick={() => setOpenModal(true)}>Seleccionar desde Mapa</Button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <ModalMap pedido={pedido} setProducto={setProducto} />
        </div>
      </Modal>

      <TextField
        id="standard-name"
        className={classes.generalFields}
        label="Calle *"
        value={pedido.direccionComercio.calle}
        error={showMessages && !pedido.direccionComercio.calle}
        helperText={showMessages && !pedido.direccionComercio.calle ? 'Campo obligatorio' : ''}
        onChange={(event) => {
          setProducto({
            ...pedido,
            direccionComercio: {
              ...pedido.direccionComercio,
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
        value={pedido.direccionComercio.numero}
        error={showMessages && !pedido.direccionComercio.numero}
        helperText={showMessages && !pedido.direccionComercio.numero ? 'Campo obligatorio' : ''}
        onChange={(event) => {
          setProducto({
            ...pedido,
            direccionComercio: {
              ...pedido.direccionComercio,
              numero: event.target.value,
            },
          });
          setShowMessages(false);
        }}
        margin="normal"
      />
      <TextField
        id="standard-name"
        className={classes.generalFields}
        label="Ciudad *"
        value={pedido.direccionComercio.ciudad}
        error={showMessages && !pedido.direccionComercio.ciudad}
        helperText={showMessages && !pedido.direccionComercio.ciudad ? 'Campo obligatorio' : ''}
        onChange={(event) => {
          setProducto({
            ...pedido,
            direccionComercio: {
              ...pedido.direccionComercio,
              ciudad: event.target.value,
            },
          });
          setShowMessages(false);
        }}
        margin="normal"
      />
      <TextField
        id="standard-name"
        className={classes.generalFields}
        label="Referencia"
        value={pedido.direccionComercio.referencia}
        onChange={(event) => setProducto({
          ...pedido,
          direccionComercio: {
            ...pedido.direccionComercio,
            referencia: event.target.value,
          },
        })}
        margin="normal"
      />
    </Grid>
  );
};

SeleccionarProductoYComercio.propTypes = {
  pedido: PropTypes.instanceOf(Object).isRequired,
  setProducto: PropTypes.instanceOf(Object).isRequired,
  showMessages: PropTypes.bool.isRequired,
  setShowMessages: PropTypes.instanceOf(Object).isRequired,
};

export default SeleccionarProductoYComercio;
