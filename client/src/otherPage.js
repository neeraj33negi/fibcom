import React from 'react';
import { Link } from 'react-router-dom';

const OtherPage = () => {
  return (
    <div> Some other page
      <Link to="/">Go Back</Link>
    </div>
  );
};

export default OtherPage;
