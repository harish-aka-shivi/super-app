import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { WHITE, BLACK } from '../../styles/index';

const Screen1 = () => (
  <View style={styles.root}>
    <Text style={styles.text}>
      Screen 1
    </Text>
  </View>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    color: WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: BLACK,
  },
});

export default Screen1;
