import React from 'react';
import 'moment/locale/es-mx';
import '../assets/scss/Styles.scss';
import EditIcon from '../assets/images/icons/edit.png';
import TrashIcon from '../assets/images/icons/trash.png';
import EnterIcon from '../assets/images/icons/user-enter.png';
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  FormSelect,
} from 'shards-react';
import { MDBDataTable } from 'mdbreact';

import PageTitle from '../components/common/PageTitle';

import { useSelector } from 'react-redux';

const BusinessTable = (props) => {
  const vets = useSelector((store) => store.user.stores.vets);
  const estet = useSelector((store) => store.user.stores.estet);
  const others = useSelector((store) => store.user.stores.others);
  // console.log('vets: ', vets);
  // console.log('estet: ', estet);
  // console.log('others: ', others);

  const [activeItem, setActiveItem] = React.useState('vet');

  const vetsRows = [];
  const estetRows = [];
  const othersRows = [];

  const getRows = (array, rows) => {
    array.map((store) => {
      rows.push({
        name: (
          <div
            className='cickable'
            onClick={() =>
              props.history.push({
                pathname: '/admin/business/business-profile/',
                store: store,
              })
            }
          >
            {store.nombre}
          </div>
        ),
        responsible: store.responsibleDoctor,
        phone: store.telefono,
        address: store.direccion,
        actions: (
          <div>
            <input
              className='action-icon'
              type='image'
              src={EnterIcon}
              alt='open-user'
              onClick={() =>
                props.history.push({
                  pathname: '/admin/business/business-profile/',
                  store: store,
                })
              }
            />
            <input
              className='action-icon mx-2'
              type='image'
              src={EditIcon}
              alt='edit-user'
              onClick={() =>
                props.history.push({
                  pathname: '/admin/business/business-profile/',
                  store: store,
                })
              }
            />
            <input
              className='action-icon'
              type='image'
              src={TrashIcon}
              alt='delete-user'
            />
          </div>
        ),
      });
    });
  };

  getRows(vets, vetsRows);
  getRows(estet, estetRows);
  getRows(others, othersRows);

  const getData = () => {
    switch (activeItem) {
      case 'esthet':
        return estetRows;
      case 'other':
        return othersRows;
      default:
        return vetsRows;
    }
  };

  const data = {
    columns: [
      {
        label: 'Nombre',
        field: 'name',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Responsable',
        field: 'responsible',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Teléfono',
        field: 'phone',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Dirección',
        field: 'address',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Acciones',
        field: 'actions',
        sort: 'asc',
        width: 150,
      },
    ],
    rows: getData(),
  };

  return (
    <Container fluid className='main-content-container px-4'>
      <Row noGutters className='page-header py-4'>
        <PageTitle
          sm='4'
          title='Resumen de Negocios'
          subtitle='Administrador Vetlook'
          className='text-sm-left'
        />
      </Row>
      <Row>
        <Col>
          <Card small className='mb-4'>
            <CardHeader className='border-bottom'>
              <h6 className='m-0'>Selecciona el tipo de negocio</h6>
            </CardHeader>
            <CardBody className='container'>
              <FormSelect
                size='lg'
                onChange={(e) => setActiveItem(e.target.value)}
              >
                <option value='vet'>Clínicas Veterinarias</option>
                <option value='esthet'>Estéticas</option>
                <option value='other'>Otros Negocios</option>
              </FormSelect>
              {activeItem === 'vet' ? (
                <MDBDataTable
                  className='container business-table my-3'
                  responsive
                  hover
                  data={data}
                />
              ) : activeItem === 'esthet' ? (
                <MDBDataTable
                  className='container business-table my-3'
                  responsive
                  hover
                  data={data}
                />
              ) : (
                activeItem === 'other' && (
                  <MDBDataTable
                    className='container business-table my-3'
                    responsive
                    hover
                    data={data}
                  />
                )
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BusinessTable;
