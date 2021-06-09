import React from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody } from 'shards-react';
import PageTitle from '../components/common/PageTitle';
import MapLocation from '../components/locations/MapLocation';
import TableData from '../components/profile/TableData';
import { getDomain } from '../utils/functions';
import DefaultBackground from '../assets/images/default-background.jpg';
import CustomModal from '../components/common/CustomModal';
import EditIcon from '../assets/images/icons/edit.png';
import TrashIcon from '../assets/images/icons/trash.png';

const BusinessProfile = ({ location: { store } }) => {
  // console.log('horario: ', store.schedule);
  const [website, setWebsite] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const horario = [];

  React.useEffect(() => {
    getDomain(store.sitio_web, (res) => {
      setWebsite(res.value);
    });
  }, []);

  React.useEffect(() => {
    for (let item in store.schedule) {
      horario.push(
        Object.assign({
          dia: store.schedule[item].dia,
          horario: store.schedule[item].horario,
        })
      );
    }
  }, []);

  return (
    <>
      <img
        src={DefaultBackground}
        class='img-fluid'
        alt='location-background'
        style={{ width: '100%', marginTop: '-5rem' }}
      />
      <Container fluid className='main-content-container px-4 mb-4'>
        <Row
          noGutters
          className='page-header py-4'
          style={{ marginTop: '-20rem' }}
        >
          <Col lg='10'>
            <PageTitle
              title='Información General'
              subtitle='Perfil de Negocio'
              md='12'
              className='text-capitalize ml-sm-auto mr-sm-auto'
            />
          </Col>
          <Col lg='2'>
            <button
              className='btn btn-primary'
              type='button'
              onClick={() => setOpen(!open)}
            >
              Editar
            </button>
            <CustomModal
              data={[{ value: 'valor 1', key: 'key 2 jajaja' }]}
              open={open}
              close={() => {
                setOpen(!open);
              }}
            />
          </Col>
        </Row>
        <Row className='mb-4'>
          <Col>
            <Card>
              <CardBody>
                <Row className='mb-4'>
                  <Col>
                    <span className='h5'>
                      <i className='material-icons'>storefront</i>{' '}
                      {store.nombre}
                    </span>
                  </Col>
                  <Col>
                    <span className='h5'>
                      <i className='material-icons'>account_circle</i>{' '}
                      {store.responsibleDoctor === '' ? (
                        <span className='text-warning'>
                          No se registró persona responsable
                        </span>
                      ) : (
                        store.responsibleDoctor
                      )}
                    </span>
                  </Col>
                  <Col>
                    <span className='h5'>
                      <i className='material-icons'>call</i> {store.telefono}
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col lg='6'>
                    <table class='table table-borderless table-sm table-responsive'>
                      <tbody>
                        <tr>
                          <th className='material-icons'>info</th>
                          <td>{store.descripcion}</td>
                        </tr>
                        <tr>
                          <th scope='row' className='material-icons'>
                            place
                          </th>
                          <td>{store.direccion}</td>
                        </tr>
                        {website !== '' && (
                          <tr>
                            <th scope='row' className='material-icons'>
                              language
                            </th>
                            <td>
                              <a
                                href={website}
                                target='_blank'
                                rel='nofollow noopener noreferrer'
                              >
                                {website}
                              </a>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg='3'>
            <Card>
              <CardHeader>Productos / Servicios</CardHeader>
              <CardBody>
                <table className='table table-borderless table-responsive table-sm'>
                  <tbody>
                    <tr>
                      <span>
                        <i className='material-icons'>done</i> Paseo de mascotas
                      </span>
                    </tr>
                    <tr>
                      <span>
                        <i className='material-icons'>done</i> Pañales
                      </span>
                    </tr>
                    <tr>
                      <span>
                        <i className='material-icons'>done</i> Guardería diurna
                      </span>
                    </tr>
                    <tr>
                      <span>
                        <i className='material-icons'>done</i> Alimento para
                        perros
                      </span>
                      {/* <td style={{ verticalAlign: 'middle' }}>
                        <input
                          className='action-icon'
                          type='image'
                          src={EditIcon}
                          alt='edit-user'
                        />
                        <input
                          className='action-icon'
                          type='image'
                          src={TrashIcon}
                          alt='delete-user'
                        />
                      </td> */}
                    </tr>
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <TableData array={horario} title='Horario' />
          </Col>
          <Col lg='6'>
            <Card>
              <MapLocation location={store} website={website} />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BusinessProfile;
