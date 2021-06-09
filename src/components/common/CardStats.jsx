import React from 'react';
import { Card, CardBody, CardTitle, CardSubtitle } from 'shards-react';

export default function CardStats({ title = 'Usuarios', number = 'Vetlook' }) {
  return (
    <Card className='text-center'>
      <CardBody>
        <CardSubtitle className='pt-4 h5'>{title}</CardSubtitle>
        <CardTitle className='pt-2 h2'>{number}</CardTitle>
      </CardBody>
    </Card>
  );
}
