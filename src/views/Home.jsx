import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  FormSelect,
} from 'shards-react';

import PageTitle from '../components/common/PageTitle';
import MapLocation from '../components/locations/MapLocation';

import CardStats from '../components/common/CardStats';

import { useSelector } from 'react-redux';
import CustomModal from '../components/common/CustomModal';

const Home = () => {
  const users = useSelector((store) => store.user.users);
  const stores = useSelector((store) => store.user.stores);
  console.log('usuarios desde Redux en home: ', users);
  console.log('Stores desde redux en home: ', stores);
  const [open, setOpen] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState('all');

  const allStores = stores.vets.concat(stores.estet, stores.others);
  console.log('all stores: ', allStores);

  const showLocations = () => {
    switch (activeItem) {
      case 'vet':
        return stores.vets;
      case 'esthet':
        return stores.estet;
      case 'other':
        return stores.others;
      default:
        return allStores;
    }
  };
  return (
    <Container fluid className='main-content-container px-4'>
      {/* Page Header */}
      <Row noGutters className='page-header py-4'>
        <PageTitle
          title='Resumen de Usuarios'
          subtitle='Administrador Vetlook'
          className='text-sm-left mb-3'
        />
      </Row>
      {/* Numero usuarios */}
      <Row>
        {/* Número total de usuarios */}
        <Col lg='3' md='3' sm='12' className='mb-5'>
          <CardStats title='Todos los Usuarios' number={users.numbers.all} />
        </Col>

        {/* Veterinarias */}
        <Col lg='3' md='3' sm='12' className='mb-5'>
          <CardStats title='Veterinarias' number={users.numbers.vets} />
        </Col>

        {/* Estéticas */}
        <Col lg='2' md='2' sm='12' className='mb-5'>
          <CardStats title='Estéticas' number={users.numbers.estet} />
        </Col>

        {/* Otros */}
        <Col lg='2' md='2' sm='12' className='mb-5'>
          <CardStats title='Otros' number={users.numbers.others} />
        </Col>

        {/* Usuarios */}
        <Col lg='2' md='2' sm='12' className='mb-5'>
          <CardStats title='Usuarios' number={users.numbers.users} />
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <CardHeader>
              <div className='form-group row'>
                <span className='my-4'>Mapa de ubicaciones</span>
                <FormSelect
                  size='sm'
                  id='select-business'
                  onChange={(e) => setActiveItem(e.target.value)}
                >
                  <option value='all'>Todos los negocios</option>
                  <option value='vet'>Clínicas Veterinarias</option>
                  <option value='esthet'>Estéticas</option>
                  <option value='other'>Otros Negocios</option>
                </FormSelect>
              </div>
            </CardHeader>
            <MapLocation location={showLocations} />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
