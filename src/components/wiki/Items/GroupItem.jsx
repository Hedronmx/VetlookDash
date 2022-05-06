import React from 'react';
import { Card, CardTitle } from 'shards-react';

const GroupItem = ({ item }) => {
  return (
    <Card className='text-center'>
      <div
        style={{
          width: '100%',
          height: '250px',
          overflow: 'hidden',
        }}
      >
        <img
          className='wiki-img'
          src={item.imagen}
          alt={`cover-${item.prodid}`}
        />
      </div>
      <CardTitle className='pt-4 h5'>{item.nombre}</CardTitle>
    </Card>
  );
};

export default GroupItem;
