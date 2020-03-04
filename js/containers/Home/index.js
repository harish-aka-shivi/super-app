import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import PropTypes from 'prop-types';

const ScreenNavigatorButton = ({ onPress, title }) => (
  <View style={styles.buttonContainer}>
    <Button
      style={styles.button}
      title={title}
      onPress={onPress}
    />
  </View>
);

ScreenNavigatorButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

const Home = ({ navigation: { navigate } }) => (
  <View style={styles.homeRoot}>
    <ScreenNavigatorButton
      title="Navigation Playground"
      onPress={() => {
        navigate('NavPlayground');
      }}
    />
    <ScreenNavigatorButton
      title="Rick and Morty"
      onPress={() => {
        navigate('RickAndMorty');
      }}
    />
  </View>
);

Home.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired }).isRequired,
};

const styles = StyleSheet.create({
  homeRoot: {
    flex: 1,
    margin: 16,
  },
  button: {
  },
  buttonContainer: {
    marginTop: 8,
    marginBottom: 8,
  },
});

export default Home;
