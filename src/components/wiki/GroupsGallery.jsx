import React from 'react';
import { Link } from 'react-router-dom';
import GroupItem from './Items/GroupItem';

const GroupsGallery = (props) => {
  const { wikiGroups } = props;

  console.log('galeria de grupos: ', wikiGroups);

  return (
    <div className='row'>
      {wikiGroups.map((item, key) => {
        return (
          <div key={key} className='col-12 col-lg-3 col-md-4 col-sm-12 my-3'>
            <Link to={`/admin/vetlook-wiki/${item.prodid}`}>
              <GroupItem item={item} />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default GroupsGallery;
