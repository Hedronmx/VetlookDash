import React from 'react';
import { Alert } from 'shards-react';

const Alerts = ({ open, close = () => {}, message, theme }) => {
  return (
    <div>
      <Alert className='mb-3' dismissible={close} open={open} theme={theme}>
        {message}
      </Alert>
    </div>
  );
};

export default Alerts;
