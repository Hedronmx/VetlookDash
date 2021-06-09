import React from 'react';
import { db } from '../../firebase';
import { Container, Row, Card, CardHeader, CardBody } from 'shards-react';
import PageTitle from '../../components/common/PageTitle';
import SpeciesGallery from '../../components/wiki/SpeciesGallery';
import Loader from '../../components/Loader/Loader';

const WikiVetSpecies = (props) => {
  // console.log('props de species: ', props);
  const {
    match: {
      params: { grupoID },
    },
  } = props;
  // console.log('grupoid: ', grupoID);
  const [loading, setLoading] = React.useState(true);
  const [species, setSpecies] = React.useState([]);

  const getSpecies = async () => {
    await db
      .collection('ESPECIES')
      .where('grupoID', '==', grupoID)
      .get()
      .then((res) => {
        const species = [];
        res.forEach((item) => {
          species.push(item.data());
        });
        setSpecies(species);
      });
    setLoading(!loading);
  };

  React.useEffect(() => {
    getSpecies();
  }, []);

  if (loading) {
    return <Loader />;
  } else {
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
                    <h4>Selecciona una Especie</h4>
                  </div>
                  <div className='col-12 col-lg-6 col-md-6 col-sm-12'>
                    <button className='btn btn-light btn-outline-dark float-right'>
                      Agregar Especie
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <div className='row'>
                  <SpeciesGallery wikiSpecies={species} />
                </div>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    );
  }
};

export default WikiVetSpecies;
