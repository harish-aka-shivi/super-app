import React from 'react';
import PropTypes from 'prop-types';
import createIpodNavigator from './ipodCustomNavigator';
import Home from './home';
import { Artist, Songs } from './Data';
import List from './List';

const IpodNav = createIpodNavigator();

const Artists = ({ route, navigation }) => {
  const { alpha, command } = route.params;
  return (
    <List alpha={alpha} command={command} items={Artist} navigation={navigation} />
  );
};

const SongsScreen = ({ route, navigation }) => {
  const { alpha, command } = route.params;
  return (
    <List alpha={alpha} command={command} items={Songs} navigation={navigation} />
  );
};

Artists.propTypes = {
  route: PropTypes.shape(
    { params: { alpha: PropTypes.shape({}), command: PropTypes.shape({}) } },
  ).isRequired,
  navigation: PropTypes.shape({}).isRequired,
};

SongsScreen.propTypes = {
  route: PropTypes.shape(
    { params: { alpha: PropTypes.shape({}), command: PropTypes.shape({}) } },
  ).isRequired,
  navigation: PropTypes.shape({}).isRequired,
};

const Ipod = () => (
  <IpodNav.Navigator>
    <IpodNav.Screen name="Home" component={Home}></IpodNav.Screen>
    <IpodNav.Screen name="Artist" component={Artists}></IpodNav.Screen>
    <IpodNav.Screen name="Songs" component={SongsScreen}></IpodNav.Screen>
  </IpodNav.Navigator>
);


export default Ipod;
