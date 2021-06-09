import React, { useState } from 'react';
import {
  Container,
  Row,
  Card,
  CardHeader,
  CardBody,
  Modal,
  ModalBody,
  ModalHeader,
} from 'shards-react';
import PageTitle from '../../components/common/PageTitle';
import { useSelector } from 'react-redux';
import GroupsGallery from '../../components/wiki/GroupsGallery';
import WikiModal from '../../components/common/WikiModal';

const WikiVetGroups = () => {
  const wikiGroups = useSelector((store) => store.wiki.groups);

  const [open, setOpen] = React.useState(false);

  return (
    <Container fluid className='main-content-container px-4'>
      <Row noGutters className='page-header py-4'>
        <PageTitle
          title='Wiki de Vetlook'
          subtitle='Administrador Vetlook'
          className='text-sm-left mb-3'
        />
      </Row>
      <Row>
        <div className='col'>
          <Card>
            <CardHeader>
              <div className='row'>
                <div className='col-12 col-lg-6 col-md-6 col-sm-12'>
                  <h4>Selecciona un grupo</h4>
                </div>
                <div className='col-12 col-lg-6 col-md-6 col-sm-12'>
                  <button
                    className='btn btn-light btn-outline-dark float-right'
                    onClick={() => setOpen(!open)}
                  >
                    Agregar Grupo
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <GroupsGallery wikiGroups={wikiGroups} />
            </CardBody>
          </Card>
        </div>
      </Row>
      <WikiModal
        title={<h4>Agregar nuevo grupo</h4>}
        view='group'
        open={open}
        close={() => {
          setOpen(!open);
        }}
      />
    </Container>
  );
};

export default WikiVetGroups;
