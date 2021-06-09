import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/es-mx';
import { Card, CardHeader, ListGroup, ListGroupItem } from 'shards-react';

import '../../assets/scss/Styles.scss';

import userLogo from '../../assets/images/user-profile/user-default.png';
import EmailIcon from '../../assets/images/icons/email-icon.png';
import FacebookIcon from '../../assets/images/icons/facebook-icon.png';
import GoogleIcon from '../../assets/images/icons/google-icon.png';

const UserDetails = ({ user }) => {
  const [photo, setPhoto] = React.useState('');
  const [providerIcon, setProviderIcon] = React.useState('');

  React.useEffect(() => {
    const profilePicture = () => {
      if (
        user.photoURL === undefined ||
        user.photoURL === false ||
        user.photoURL === null ||
        user.photoURL === '/assets/placeholder.jpg'
      ) {
        setPhoto(userLogo);
      } else {
        setPhoto(user.photoURL);
      }
    };
    profilePicture();
    const provider = () => {
      if (user.providerData === 'google.com') {
        setProviderIcon(GoogleIcon);
      } else if (user.providerData === 'facebook.com') {
        setProviderIcon(FacebookIcon);
      } else {
        setProviderIcon(EmailIcon);
      }
    };
    provider();
  }, [photo, user]);
  return (
    <Card small className='mb-4 pt-3'>
      <CardHeader className='border-bottom text-center'>
        <div className='mb-3 mx-auto'>
          <img
            className='rounded-circle user-img'
            src={photo}
            alt='user profile'
          />
          <div className='providerContainer'>
            <img className='providerIcon' src={providerIcon} alt='provider' />
          </div>
        </div>
        <h4 className='mb-0'>{`${user.name} ${user.lastName}`}</h4>
        <span className='text-muted d-block mb-2 text-capitalize'>
          {user.businessType}
        </span>
      </CardHeader>
      <ListGroup flush>
        <ListGroupItem>
          <div className='text-center'>
            <strong className='d-block mb-2'>
              {user.freeMonth ? (
                <p>
                  Cuenta con un <span className='text-success'>mes gratis</span>{' '}
                  hasta el{' '}
                  {moment(user.freeMonthExpiration).format(
                    'dddd DD [de] MMMM [del] YYYY'
                  )}
                </p>
              ) : user.pending ? (
                <span className='text-warning'>Procesando membresía</span>
              ) : user.membership ? (
                <p>
                  Cuenta con <span className='text-success'>Membresía</span>{' '}
                  hasta el{' '}
                  {moment(user.expiration_date).format(
                    'dddd DD [de] MMMM [del] YYYY'
                  )}
                  .
                </p>
              ) : (
                <p className='text-danger'>No cuenta con membresía.</p>
              )}
              Usuario Vetlook desde:{' '}
              {moment(user.createdAt, 'YYYYMMDDHHmmss').fromNow()}.
            </strong>
          </div>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
};

UserDetails.propTypes = {
  /**
   * The user details object.
   */
  user: PropTypes.object,
};

UserDetails.defaultProps = {
  user: {
    name: 'Sierra Brooks',
    avatar: require('./../../assets/images/avatars/0.jpg'),
    jobTitle: 'Project Manager',
    performanceReportTitle: 'Workload',
    performanceReportValue: 74,
    metaTitle: 'Description',
    metaValue:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?',
  },
};

export default UserDetails;
