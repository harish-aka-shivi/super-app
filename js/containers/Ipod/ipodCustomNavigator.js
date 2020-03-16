import React from 'react';
import {
  useNavigationBuilder,
  createNavigatorFactory,
  StackRouter,
} from '@react-navigation/native';
import {
  View, StyleSheet,
} from 'react-native';
import PropTypes, { any } from 'prop-types';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { useValues } from 'react-native-redash';
import ClickWheel from './ClickWheel/clickWheel';
import { Command } from './ClickWheel/buttons';
import { WHITE } from '../../styles';

export const CONTENT_HEIGHT = heightPercentageToDP('45%');

const IpodCustomNavigator = ({
  initialRouteName,
  children,
  screenOptions,
}) => {
  const { state, descriptors } = useNavigationBuilder(StackRouter, {
    children,
    screenOptions,
    initialRouteName,
    // headerMode: 'none',
  });
  const [alpha, command] = useValues([0, Command.UNDETERMINED], []);

  const currentRoute = state.routes[state.index];

  // add params to each route
  currentRoute.params = currentRoute
    ? { ...currentRoute.params, alpha, command } : { alpha, command };

  return (
    <View style={styles.root}>
      <View style={styles.stackContainer}>
        {descriptors[state.routes[state.index].key].render()}
      </View>
      <ClickWheel alpha={alpha} command={command} />
    </View>
  );
};

IpodCustomNavigator.defaultProps = {
  screenOptions: {},
  initialRouteName: '',
};

IpodCustomNavigator.propTypes = {
  initialRouteName: PropTypes.string,
  children: PropTypes.arrayOf(any).isRequired,
  screenOptions: PropTypes.shape({}),
};

const styles = StyleSheet.create({
  stackContainer: {
    height: CONTENT_HEIGHT,
    maxHeight: CONTENT_HEIGHT,
    width: widthPercentageToDP('95%'),
    backgroundColor: WHITE,
    marginTop: 8,
    borderRadius: 8,
    padding: 4,
    overflow: 'hidden',

  },
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default createNavigatorFactory(IpodCustomNavigator);
