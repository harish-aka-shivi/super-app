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
import { RED } from '../../styles';
import ClickWheel from './clickWheel';
import { Command } from './buttons';


const IpodCustomNavigator = ({
  initialRouteName,
  children,
  screenOptions,
}) => {
  const { state, descriptors } = useNavigationBuilder(StackRouter, {
    children,
    screenOptions,
    initialRouteName,
    headerMode: 'none',
  });
  const [alpha, command] = useValues([0, Command.UNDETERMINED], []);
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
    height: heightPercentageToDP('45%'),
    width: widthPercentageToDP('100%'),
    backgroundColor: RED,
  },
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default createNavigatorFactory(IpodCustomNavigator);
