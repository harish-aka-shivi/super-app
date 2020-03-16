import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { BLACK, WHITE } from '../../../styles';

const Screen2 = () => (
  <View style={styles.root}>
    <Text style={styles.text}>
      Screen 2
    </Text>
  </View>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    color: BLACK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: WHITE,
  },
});

export default Screen2;
