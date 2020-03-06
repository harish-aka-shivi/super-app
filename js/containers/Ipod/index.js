import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import createIpodNavigator from './ipodCustomNavigator';

const IpodNav = createIpodNavigator();

const A = () => (
  <View style={styles.A}>
    <Text> This is A screen</Text>
  </View>
);

const B = () => (
  <View style={styles.A}>
    <Text> This is B screen</Text>
  </View>
);

const Ipod = () => (
  <IpodNav.Navigator>
    <IpodNav.Screen name="A" component={A}></IpodNav.Screen>
    <IpodNav.Screen name="B" component={B}></IpodNav.Screen>
  </IpodNav.Navigator>
);

const styles = StyleSheet.create({
  A: {
    flex: 1,
  },
});

export default Ipod;
