import React from 'react';

const MyMarker = props => {
  const initMarker = ref => {};
  return <Marker ref={initMarker} {...props} />;
};

export default MyMarker;
