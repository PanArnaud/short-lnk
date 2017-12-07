import React from 'react';
import PropTypes from 'prop-types';

// Components
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinksList from './LinksList';
import LinksListFilters from './LinksListFilters';

export default () => {
  return (
    <div>
      <PrivateHeader title="Your Links"/>
      <LinksListFilters/>
      <AddLink/>
      <LinksList/>
    </div>
  );
};