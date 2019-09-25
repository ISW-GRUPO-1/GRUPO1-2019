import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import PropTypes from 'prop-types';

const ModalMap = ({
  pedido,
  setProducto,
  google,
}) => (
  <Map
    google={google}
    zoom={16}
    initialCenter={{
      lat: -31.442449,
      lng: -64.192560,
    }}

    onClose={() => {
      setProducto({
        ...pedido,
      });
    }}
  >
    <Marker
      onClick={() => {
        setProducto({ ...pedido });
      }}
    />
  </Map>
);

ModalMap.propTypes = {
  pedido: PropTypes.instanceOf(Object).isRequired,
  setProducto: PropTypes.instanceOf(Object).isRequired,
  google: PropTypes.instanceOf(Object).isRequired,
};


export default GoogleApiWrapper({
  apiKey: 'AIzaSyDwyS9NsT7y1xPJl-E-uU1LwHAuwxsMDNM',
})(ModalMap);
