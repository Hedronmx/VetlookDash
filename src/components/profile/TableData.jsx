import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
} from 'shards-react';

const TableData = ({ array, title }) => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    setData(array);
  }, []);
  console.log('array: ', data);
  return (
    <Card small>
      <CardHeader className='border-bottom'>
        <h6 className='m-0'>{title}</h6>
        <div className='block-handle' />
      </CardHeader>
      <CardBody className='p-0'>
        <ListGroup small flush className='list-group-small'>
          {data.map((item, idx) => (
            <ListGroupItem key={idx} className='d-flex px-3'>
              <span className='text-semibold text-fiord-blue'>{item.dia}</span>
              <span className='ml-auto text-right text-semibold text-reagent-gray'>
                {item.horario}
              </span>
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
    </Card>
  );
};

export default TableData;
