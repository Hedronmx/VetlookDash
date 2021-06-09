import React from 'react';
import { Container, Row, Card, CardHeader, CardBody } from 'shards-react';
import PageTitle from '../../components/common/PageTitle';
import BreedGallery from '../../components/wiki/BreedGallery';
import Loader from '../../components/Loader/Loader';
import { db } from '../../firebase';

const WikiVetBreed = ({
  match: {
    params: { grupoID, breed },
  },
}) => {
  const [loading, setLoading] = React.useState(true);
  const [breeds, setBreeds] = React.useState([]);

  const getBreeds = async () => {
    await db
      .collection('RAZAS')
      .where('especieID', '==', breed)
      .get()
      .then((res) => {
        const breeds = [];
        res.forEach((item) => {
          breeds.push(item.data());
        });
        setBreeds(breeds);
      });
    setLoading(!loading);
  };

  React.useEffect(() => {
    getBreeds();
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
                    <h4>Selecciona una Raza</h4>
                  </div>
                  <div className='col-12 col-lg-6 col-md-6 col-sm-12'>
                    <button className='btn btn-light btn-outline-dark float-right'>
                      Agregar Raza
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <div className='row'>
                  <BreedGallery wikiBreeds={breeds} grupoID={grupoID} />
                </div>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    );
  }
};

export default WikiVetBreed;
