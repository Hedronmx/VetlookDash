import React from 'react';
import { Card, CardHeader } from 'shards-react';
import MapLocation from '../locations/MapLocation';
import { useDispatch, useSelector } from 'react-redux';
import { clientStores } from '../../redux/userDucks';

const Locations = ({ uid }) => {
  const dispatch = useDispatch();
  const locations = useSelector((store) => store.user.clientStores);

  const [stores, setStores] = React.useState([]);

  React.useEffect(() => {
    dispatch(clientStores(uid));
  }, []);

  React.useEffect(() => {
    if (!locations) {
    } else {
      setStores(locations);
    }
  }, [locations]);

  return (
    <Card style={{ maxWidth: '300px' }}>
      <CardHeader>Negocios Registrados</CardHeader>
      <MapLocation location={stores} />
    </Card>
  );
};
export default Locations;
