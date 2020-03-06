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
import { RED } from '../../styles';


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
  return (
    <View style={styles.stackContainer}>
      {descriptors[state.routes[state.index].key].render()}
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
    height: heightPercentageToDP('50%'),
    width: widthPercentageToDP('100%'),
    backgroundColor: RED,
  },
});

export default createNavigatorFactory(IpodCustomNavigator);
