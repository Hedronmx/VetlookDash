import React from 'react';
import moment from 'moment';
import 'moment/locale/es-mx';
import '../assets/scss/Styles.scss';
import EditIcon from '../assets/images/icons/edit.png';
import TrashIcon from '../assets/images/icons/trash.png';
import EnterIcon from '../assets/images/icons/user-enter.png';
import { Container, Row, Col, Card, CardHeader, CardBody } from 'shards-react';
import { MDBDataTable } from 'mdbreact';

import PageTitle from '../components/common/PageTitle';

import { useSelector } from 'react-redux';

const UsersTable = (props) => {
  const users = useSelector((store) => store.user.users.users);
  const userRows = [];

  const getUserRows = () => {
    users.map((user, key) => {
      let status = '';
      if (user.membership) {
        status = <div className='circle bg-success'></div>;
      } else if (user.pending) {
        status = <div className='circle bg-warning'></div>;
      } else {
        status = <div className='circle bg-danger'></div>;
      }
      userRows.push({
        status: (
          <div
            style={{
              textAlign: '-webkit-center',
              verticalAlign: 'middle',
            }}
          >
            {status}
          </div>
        ),
        name: (
          <div
            className='cickable'
            onClick={() =>
              props.history.push({
                pathname: '/admin/user-profile',
                user: user,
              })
            }
          >
            {user.name}
          </div>
        ),
        lastName: user.lastName,
        email: user.email,
        phone: user.phoneNumber,
        createdAt: moment(user.createdAt, 'YYYYMMDDHHmmss').format('L'),
        actions: (
          <div>
            <input
              className='action-icon'
              type='image'
              src={EnterIcon}
              alt='open-user'
              onClick={() =>
                props.history.push({
                  pathname: '/admin/user-profile',
                  user: user,
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
                  pathname: '/admin/user-profile',
                  user: user,
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
    console.log(userRows);
  };

  getUserRows();

  const data = {
    columns: [
      {
        label: 'Estado',
        field: 'status',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Nombre(s)',
        field: 'name',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Apellido(s)',
        field: 'lastName',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Correo',
        field: 'email',
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
        label: 'Creado',
        field: 'createdAt',
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
    rows: userRows,
  };

  return (
    <Container fluid className='main-content-container px-4'>
      {/* Page Header */}
      <Row noGutters className='page-header py-4'>
        <PageTitle
          sm='4'
          title='Resumen de Usuarios'
          subtitle='Administrador Vetlook'
          className='text-sm-left'
        />
      </Row>

      {/* Default Light Table */}
      <Row>
        <Col>
          <Card small className='mb-4'>
            <CardHeader className='border-bottom'>
              <h6 className='m-0'>Resumen de Clientes Vetlook</h6>
            </CardHeader>
            <CardBody className='pb-3'>
              <MDBDataTable
                className='users-table my-3'
                responsive
                hover
                data={data}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UsersTable;
