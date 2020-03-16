import React from 'react';
import PropTypes from 'prop-types';
import { HomeItems } from './Data/index';
import List from './List';


const Home = ({ route }) => {
  const { alpha, command } = route.params;
  return (
    <List alpha={alpha} command={command} items={HomeItems} />
  );
};

Home.propTypes = {
  route: PropTypes.shape(
    { params: { alpha: PropTypes.shape({}), command: PropTypes.shape({}) } },
  ).isRequired,
  navigation: PropTypes.shape({}).isRequired,
};


export default Home;
