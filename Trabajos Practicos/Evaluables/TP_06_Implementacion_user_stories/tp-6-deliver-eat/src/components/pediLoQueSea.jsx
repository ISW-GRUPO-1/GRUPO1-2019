import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
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
      descripcion: 'Quiero una coca', // obligatorio
      imagen: '', // opcional - jpg - max 5mb
      imagenURLPreview: '',
    },
    direccionComercio: {
      calle: 'Bv San Juan',
      numero: '757',
      ciudad: 'Cordoba',
      referencia: '',
      loQueNecesitoParaMaps: null, // google maps integracion
    },
    direccionEntrega: {
      calle: 'San Juan',
      numero: '757 9noB',
      ciudad: 'Córdoba',
      referencia: '',
    },
    formaPago: {
      forma: 'Efectivo',
      monto: 50,
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
        return pedido.formaPago.forma === 'Efectivo'
          ? pedido.formaPago.monto > 0
          : !!(pedido.formaPago.numeroTarjeta
            && pedido.formaPago.nombreTitular
            && pedido.formaPago.fechaVencimiento
            && pedido.formaPago.cvc
            && /^3[47][0-9]{13}$/.test(pedido.formaPago.numeroTarjeta)
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

  const handleReset = () => {
    setActiveStep(0);
  };

  const classes = useStyles();
  const steps = getSteps();

  return (
    <div className={classes.root}>
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
            <ProcesarPedido />
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
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
