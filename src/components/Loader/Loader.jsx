import React from 'react';
import logo from '../../assets/images/logo-vetlook.png';

const Loader = () => {
  return (
    <div className='container vh-100'>
      <div className='row align-items-center h-100'>
        <div className='col-6 mx-auto'>
          <img
            className='img-fluid rounded mx-auto d-block'
            src={logo}
            alt='Logo Vetlook'
            style={{ width: '20rem' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
