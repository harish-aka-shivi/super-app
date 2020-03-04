import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Episodes from './episodes';
import Characters from './characters';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql/',
});

const RAndMTabs = createMaterialTopTabNavigator();

const RickAndMortyNav = () => (
  <RAndMTabs.Navigator>
    <RAndMTabs.Screen name="characters" component={Characters}></RAndMTabs.Screen>
    <RAndMTabs.Screen name="episodes" component={Episodes}></RAndMTabs.Screen>
  </RAndMTabs.Navigator>
);

const RickAndMorty = () => (
  <ApolloProvider client={client}>
    <RickAndMortyNav />
  </ApolloProvider>
);

export default RickAndMorty;
