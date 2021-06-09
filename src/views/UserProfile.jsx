import React from 'react';
import { Container, Row, Col } from 'shards-react';

import PageTitle from '../components/common/PageTitle';
import UserDetails from '../components/profile/UserDetails';
import UserForm from '../components/profile/UserForm';
import DefaultBackground from '../assets/images/default-background.jpg';
import Locations from '../components/profile/Locations';

const UserProfileLite = ({ location: { user } }) => {
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
          <PageTitle
            title={`${user.typeUser}`}
            subtitle='Perfil de Usuario'
            md='12'
            className='text-capitalize ml-sm-auto mr-sm-auto'
          />
        </Row>
        <Row>
          <Col lg='4'>
            <UserDetails user={user} />
          </Col>
          <Col lg='8'>
            <UserForm user={user} />
          </Col>
        </Row>
        {user.typeUser === 'negocio' ? (
          <Row>
            <Col lg='8'></Col>
            <Col lg='4'>
              <Locations uid={user.uid} />
            </Col>
          </Row>
        ) : (
          <Row>
            <Col lg='8'></Col>
            <Col lg='4'></Col>
          </Row>
        )}
        <Row></Row>
      </Container>
    </>
  );
};

export default UserProfileLite;
