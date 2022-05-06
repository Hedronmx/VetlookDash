import React from 'react';
import { MapPin } from 'react-feather';
import { Link } from 'react-router-dom';
const LocationPin = (props) => {
  // console.log('pros del pin: ', props);
  // const [url, setUrl] = React.useState(null);
  const location = props.location;
  // send admin to the business profile
  const url = '/' + location.businessType + 's/' + location.prodid;
  // React.useEffect(() => {
  //   if (props.website) {
  //     setUrl(props.website);
  //   } else {
  //     setUrl({
  //       pathname: '/admin/business/business-profile/',
  //       store: location,
  //     });
  //   }
  // }, [props.website]);
  // console.log('este es el url: ', url);
  return (
    <div>
      <Link
        to={{
          pathname: '/admin/business/business-profile/',
          store: location,
        }}
      >
        <MapPin />
      </Link>
    </div>
  );
};
export default LocationPin;
