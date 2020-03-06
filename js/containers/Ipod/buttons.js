/* eslint-disable no-unused-vars */
import React from 'react';
import { Dimensions, View } from 'react-native';

const { width } = Dimensions.get('window');
export const size = 0.75 * (width - 32);

const BUTTON_SIZE = size / 3;

export const Command = {
  UNDETERMINED: 0,
  CENTER: 1,
  TOP: 2,
  BOTTOM: 3,
  LEFT: 4,
  RIGHT: 5,
};

const TOP = {
  x: BUTTON_SIZE,
  y: 0,
};
const BOTTOM = {
  x: BUTTON_SIZE,
  y: BUTTON_SIZE * 2,
};
const LEFT = {
  x: 0,
  y: BUTTON_SIZE,
};
const CENTER = {
  x: BUTTON_SIZE,
  y: BUTTON_SIZE,
};
const RIGHT = {
  x: BUTTON_SIZE * 2,
  y: BUTTON_SIZE,
};

const Buttons = () => (<View />);

export default Buttons;
