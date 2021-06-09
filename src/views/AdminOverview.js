import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'shards-react';

import PageTitle from '../components/common/PageTitle';
import NewDraft from '../components/blog/NewDraft';
import Discussions from '../components/blog/Discussions';
import TopReferrals from '../components/components-overview/TopReferrals';

import CardStats from '../components/common/CardStats';

import { useSelector } from 'react-redux';

const AdminOverview = (props) => {
  console.log('props en admin overview: ', props);
  const users = useSelector((store) => store.user.users);
  console.log('usuarios: ', users);
  return (
    <Container fluid className='main-content-container px-4'>
      {/* Page Header */}
      <Row noGutters className='page-header py-4'>
        <PageTitle
          title='Resumen Vetlook'
          subtitle='Admin Dashboard'
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
          <CardStats title='Estéticas' number={users.numbers.esteticas} />
        </Col>

        {/* Otros */}
        <Col lg='2' md='2' sm='12' className='mb-5'>
          <CardStats title='Otros' number={users.numbers.otros} />
        </Col>

        {/* Usuarios */}
        <Col lg='2' md='2' sm='12' className='mb-5'>
          <CardStats title='Usuarios' number={users.numbers.usuarios} />
        </Col>
      </Row>

      <Row>
        {/* New Draft */}
        <Col lg='4' md='6' sm='12' className='mb-4'>
          <NewDraft />
        </Col>

        {/* Discussions */}
        <Col lg='5' md='12' sm='12' className='mb-4'>
          <Discussions />
        </Col>

        {/* Top Referrals */}
        <Col lg='3' md='12' sm='12' className='mb-4'>
          <TopReferrals />
        </Col>
      </Row>
    </Container>
  );
};

AdminOverview.propTypes = {
  cardNumbers: PropTypes.array,
};

AdminOverview.defaultProps = {
  cardNumbers: [
    {
      label: 'Usuarios',
      value: '2,390',
      percentage: '4.7%',
      increase: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: '6', sm: '6' },
      datasets: [
        {
          label: 'Today',
          fill: 'start',
          borderWidth: 1.5,
          backgroundColor: 'rgba(0, 184, 216, 0.1)',
          borderColor: 'rgb(0, 184, 216)',
          data: [1, 2, 1, 3, 5, 4, 7],
        },
      ],
    },
    {
      label: 'Pages',
      value: '182',
      percentage: '12.4',
      increase: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: '6', sm: '6' },
      datasets: [
        {
          label: 'Today',
          fill: 'start',
          borderWidth: 1.5,
          backgroundColor: 'rgba(23,198,113,0.1)',
          borderColor: 'rgb(23,198,113)',
          data: [1, 2, 3, 3, 3, 4, 4],
        },
      ],
    },
    {
      label: 'Comments',
      value: '8,147',
      percentage: '3.8%',
      increase: false,
      decrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: '4', sm: '6' },
      datasets: [
        {
          label: 'Today',
          fill: 'start',
          borderWidth: 1.5,
          backgroundColor: 'rgba(255,180,0,0.1)',
          borderColor: 'rgb(255,180,0)',
          data: [2, 3, 3, 3, 4, 3, 3],
        },
      ],
    },
    {
      label: 'New Customers',
      value: '29',
      percentage: '2.71%',
      increase: false,
      decrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: '4', sm: '6' },
      datasets: [
        {
          label: 'Today',
          fill: 'start',
          borderWidth: 1.5,
          backgroundColor: 'rgba(255,65,105,0.1)',
          borderColor: 'rgb(255,65,105)',
          data: [1, 7, 1, 3, 1, 4, 8],
        },
      ],
    },
    {
      label: 'Subscribers',
      value: '17,281',
      percentage: '2.4%',
      increase: false,
      decrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: '4', sm: '6' },
      datasets: [
        {
          label: 'Today',
          fill: 'start',
          borderWidth: 1.5,
          backgroundColor: 'rgb(0,123,255,0.1)',
          borderColor: 'rgb(0,123,255)',
          data: [3, 2, 3, 2, 4, 5, 4],
        },
      ],
    },
  ],
};

export default AdminOverview;
