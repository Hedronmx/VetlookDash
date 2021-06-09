import React from 'react';
import { Container, Row, Col } from 'shards-react';
import PageTitle from '../../components/common/PageTitle';
import DefaultBackground from '../../assets/images/default-background.jpg';
import WikiDetails from '../../components/profile/WikiDetails';
import { db } from '../../firebase';
import WikiForm from '../../components/profile/WikiForm';

const WikiProfile = ({
  match: {
    params: { breed, grupoID, item },
  },
}) => {
  console.log(`breed: ${breed} - grupoID: ${grupoID} - item: ${item}`);

  const [loading, setLoading] = React.useState(true);
  const [singleAnimal, setSingleAnimal] = React.useState({});

  const id = item.replace('-', ' ');
  const getSingleAnimal = async () => {
    await db
      .collection('RAZAS')
      .doc(id)
      .get()
      .then((res) => {
        setSingleAnimal(res.data());
      });
    setLoading(!loading);
  };

  React.useEffect(() => {
    getSingleAnimal();
  }, []);

  console.log('resultado firebase animal solito: ', singleAnimal);
  return (
    <>
      <img
        src={DefaultBackground}
        className='img-fluid'
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
            title={`${singleAnimal.nombre}`}
            subtitle='Perfil de Usuario'
            md='12'
            className='text-capitalize ml-sm-auto mr-sm-auto'
          />
        </Row>
        <Row>
          <div className='col-12'>
            <WikiDetails item={singleAnimal} />
          </div>
        </Row>
        <Row>
          <div className='col-12'>
            <WikiForm item={singleAnimal} />
          </div>
        </Row>
        <Row></Row>
      </Container>
    </>
  );
};

export default WikiProfile;
