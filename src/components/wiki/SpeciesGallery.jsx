import React from 'react';
import { Link } from 'react-router-dom';
import SpecieItem from './Items/SpecieItem';

const SpeciesGallery = (props) => {
  const { wikiSpecies } = props;

  console.log('galeria de especies: ', wikiSpecies);

  return (
    <div className='row'>
      {wikiSpecies.map((item, key) => {
        return (
          <div key={key} className='col-12 col-lg-3 col-md-4 col-sm-12 my-3'>
            <Link to={`/admin/vetlook-wiki/${item.grupoID}/${item.id}`}>
              <SpecieItem item={item} />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default SpeciesGallery;
