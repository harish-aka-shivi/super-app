import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Home';
import Tab1Screen from '../NavPlayground/Tab1Screen';
import Tab2Screen from '../NavPlayground/Tab2Screen';
import RickAndMorty from '../RickAndMorty';
import Ipod from '../Ipod';

const Tab = createBottomTabNavigator();

const ExampleTabNavigation = () => (
  <Tab.Navigator>
    <Tab.Screen name="Tab1Screen" component={Tab1Screen}></Tab.Screen>
    <Tab.Screen name="Tab2Screen" component={Tab2Screen}></Tab.Screen>
  </Tab.Navigator>
);

const Stack = createStackNavigator();

const Nav = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="NavPlayground" component={ExampleTabNavigation} />
      <Stack.Screen name="RickAndMorty" component={RickAndMorty} />
      <Stack.Screen name="Ipod" component={Ipod} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Nav;
