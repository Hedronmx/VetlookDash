import React from 'react';
import { Link } from 'react-router-dom';
import BreedItem from './Items/BreedItem';

const BreedGallery = (props) => {
  const { wikiBreeds, grupoID } = props;
  // console.log('props de razas galeria: ', props);
  // console.log('galeria de razas: ', wikiBreeds);

  return (
    <div className='row'>
      {wikiBreeds.map((item, key) => {
        const id = item.id;
        return (
          <div key={key} className='col-12 col-lg-3 col-md-4 col-sm-12 my-3'>
            <Link to={`/admin/vetlook-wiki/${grupoID}/${item.especieID}/${id}`}>
              <BreedItem item={item} />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default BreedGallery;
