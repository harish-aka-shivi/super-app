import React from 'react';
import { View, StyleSheet, Button } from 'react-native';

const Home = () => (
  <View style={styles.homeRoot}>
    <Button
      title="Go to detail screen"
    />
  </View>
);

const styles = StyleSheet.create({
  homeRoot: {
    flex: 1,
  },
});

export default Home;
