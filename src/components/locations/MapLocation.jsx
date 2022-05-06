import GoogleMapReact from 'google-map-react';
import React, { Fragment } from 'react';
import MapLocationPin from './MapLocationPin';
import googleMapsKey from '../../googleAPI';

const MapLocation = ({ location, website }) => {
  const [store, setStore] = React.useState(null);
  const [locationPins, setLocationPins] = React.useState([]);

  React.useEffect(() => {
    setStore(location);
  }, [location]);

  // console.log('tiendas en state: ', store);

  const center = { lat: 32.5284588, lng: -117.0174273 };
  const zoom = 12;

  React.useEffect(() => {
    if (!store) {
      // console.log('Aun no cargan las tiendas...');
    } else if (Array.isArray(store)) {
      const pins = store.map((store,key) => {
        const coordinates = store.coordenadas.split(',');
        const lat = coordinates[0];
        const long = coordinates[1];
        // console.log(`lat: ${lat} - long: ${long}`);
        return (
          <MapLocationPin
            lat={lat}
            lng={long}
            key={key}
            location={store}
          />
        );
      });
      setLocationPins(pins);
    } else {
      const pins = () => {
        const coordinates = store.coordenadas.split(',');
        const lat = coordinates[0];
        const long = coordinates[1];
        // console.log(`lat: ${lat} - long: ${long}`);
        return (
          <MapLocationPin
            lat={lat}
            lng={long}
            key={store.uid}
            website={website}
            location={store}
          />
        );
      };
      setLocationPins(pins());
    }
  }, [store]);

  return (
    <Fragment>
      <div className='google-map' style={{ height: 350, width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: googleMapsKey,
            language: 'es',
          }}
          defaultCenter={center}
          center={center}
          defaultZoom={zoom}
        >
          {locationPins}
        </GoogleMapReact>
      </div>
    </Fragment>
  );
};
export default MapLocation;
