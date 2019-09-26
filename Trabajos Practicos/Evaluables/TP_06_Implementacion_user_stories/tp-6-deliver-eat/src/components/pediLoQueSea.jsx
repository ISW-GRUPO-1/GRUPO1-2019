import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import SeleccionarProducto from './seleccionarProducto';
import SeleccionarDireccionEntrega from './seleccionarDireccionEntrega';
import SeleccionarFormaPago from './seleccionarFormaPago';
import ConfirmarPedido from './confirmarPedido';
import ProcesarPedido from './procesarPedido';

const PediLoQueSeaStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [showMessages, setShowMessages] = useState(false);
  const [pedido, setPedido] = useState({
    producto: {
      descripcion: '',
      imagen: '',
      imagenURLPreview: '',
    },
    direccionComercio: {
      calle: '',
      numero: '',
      ciudad: '',
      referencia: '',
    },
    direccionEntrega: {
      calle: '',
      numero: '',
      ciudad: '',
      referencia: '',
    },
    formaPago: {
      forma: 'Efectivo',
      monto: 0,
      numeroTarjeta: '',
      nombreTitular: '',
      fechaVencimiento: null, // (MM/AAAA)
      cvc: '',
    },
    fechaEntrega: {
      esLoAntesPosible: true,
      fechaEntrega: null,
      horaEntrega: null,
    },
  });

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }));

  const getSteps = () => [
    '¿Qué y dónde queres comprar?',
    '¿A dónde se va a entregar?',
    '¿Cómo vas a pagar?',
    'Confirmar pedido',
  ];

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <SeleccionarProducto
            setProducto={setPedido}
            pedido={pedido}
            showMessages={showMessages}
            setShowMessages={setShowMessages}
          />
        );
      case 1:
        return (
          <SeleccionarDireccionEntrega
            setDireccionEntrega={setPedido}
            pedido={pedido}
            showMessages={showMessages}
            setShowMessages={setShowMessages}
          />
        );
      case 2:
        return (
          <SeleccionarFormaPago
            setFormaPago={setPedido}
            pedido={pedido}
            showMessages={showMessages}
            setShowMessages={setShowMessages}
          />
        );
      case 3:
        return (
          <ConfirmarPedido
            setEntrega={setPedido}
            pedido={pedido}
            showMessages={showMessages}
            setShowMessages={setShowMessages}
          />
        );
      default:
        return 'Uknown stepIndex';
    }
  };

  const isStepValid = () => {
    switch (activeStep) {
      case 0:
        return pedido.producto.descripcion
          && !!(pedido.direccionComercio.calle
            && pedido.direccionComercio.numero
            && pedido.direccionComercio.ciudad);
      case 1:
        return !!(pedido.direccionEntrega.calle
          && pedido.direccionEntrega.numero
          && pedido.direccionEntrega.ciudad);
      case 2:
        console.log(pedido.formaPago);
        console.log(!!pedido.formaPago.numeroTarjeta);
        console.log(!!pedido.formaPago.nombreTitular);
        console.log(!!pedido.formaPago.fechaVencimiento);
        console.log(!!pedido.formaPago.cvc);
        console.log(/^4[0-9]{12}(?:[0-9]{3})?$/.test(pedido.formaPago.numeroTarjeta));
        console.log(/^[0-9]{3}$/.test(pedido.formaPago.cvc));
        return pedido.formaPago.forma === 'Efectivo'
          ? pedido.formaPago.monto > 0
          : !!(pedido.formaPago.numeroTarjeta
            && pedido.formaPago.nombreTitular
            && pedido.formaPago.fechaVencimiento
            && pedido.formaPago.cvc
            && /^4[0-9]{12}(?:[0-9]{3})?$/.test(pedido.formaPago.numeroTarjeta)
            && /^[0-9]{3}$/.test(pedido.formaPago.cvc));
      case 3:
        return pedido.fechaEntrega.esLoAntesPosible || (
          pedido.fechaEntrega.fechaEntrega
          && pedido.fechaEntrega.horaEntrega
        );
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (isStepValid()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else { setShowMessages(true); }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const classes = useStyles();
  const steps = getSteps();

  return (
    <div className={classes.root}>
      {}
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <ProcesarPedido pedido={pedido} />
          </div>
        ) : (
          <div>
            {getStepContent(activeStep)}
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                {'Atrás'}
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Confirmar Pedido' : 'Siguiente'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PediLoQueSeaStepper;
