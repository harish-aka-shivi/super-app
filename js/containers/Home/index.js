import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import PropTypes from 'prop-types';

const Home = ({ navigation: { navigate } }) => (
  <View style={styles.homeRoot}>
    <View style={styles.buttonContainer}>
      <Button
        style={styles.button}
        title="Navigation playground"
        onPress={() => {
          navigate('NavPlayground');
        }}
      />
    </View>
  </View>
);

Home.propTypes = {
  navigation: PropTypes.objectOf({}).isRequired,
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
