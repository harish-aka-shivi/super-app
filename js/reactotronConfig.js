// eslint-disable-next-line import/no-extraneous-dependencies
import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-community/async-storage';

Reactotron
  // eslint-disable-next-line max-len
  .setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure() // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!

console.log = Reactotron.log;
