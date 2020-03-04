import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Error = () => (
  <View style={styles.error}>
    <Text>Error</Text>
  </View>
);

const styles = StyleSheet.create({
  error: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Error;
