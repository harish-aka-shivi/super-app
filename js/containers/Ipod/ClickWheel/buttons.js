/* eslint-disable no-unused-vars */
import React from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {
  onGestureEvent, useValues, useDiff, canvas2Polar, toDeg,
} from 'react-native-redash';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
export const size = 0.75 * (width - 32);

const BUTTON_SIZE = size / 3;

const {
  useCode, and, greaterOrEq, lessOrEq, block, cond, eq, set, debug, call,
} = Animated;

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

const isInRegion = (x, y, region) => and(
  and(
    greaterOrEq(x, region.x), lessOrEq(x, region.x + BUTTON_SIZE),
  ),
  and(
    greaterOrEq(y, region.y), lessOrEq(y, region.y + BUTTON_SIZE),
  ),
);

export const useOnPress = ({
  active, onPress, target, command,
}) => {
  const navigation = useNavigation();
  useCode(() => cond(and(active, eq(command, target)), [
    call([], () => onPress(navigation)),
    set(command, Command.UNDETERMINED),
  ]), [active, onPress, target, command]);
};

const Buttons = ({ children, command }) => {
  const [x, y, state] = useValues([0, 0, State.UNDETERMINED], []);
  const gestureHandler = onGestureEvent({ x, y, state });
  useCode(() => block([
    cond(
      eq(state, State.END),
      cond(
        isInRegion(x, y, CENTER),
        set(command, Command.CENTER),
        cond(
          isInRegion(x, y, TOP),
          set(command, Command.TOP),
          cond(
            isInRegion(x, y, BOTTOM),
            set(command, Command.BOTTOM),
            cond(
              isInRegion(x, y, LEFT),
              set(command, Command.LEFT),
              cond(
                isInRegion(x, y, RIGHT),
                set(command, Command.RIGHT),
                set(command, Command.UNDETERMINED),
              ),
            ),
          ),
        ),
      ),
    ),
    debug('command', command),
  ]));
  return (
    <TapGestureHandler
      onGestureEvent={gestureHandler.onGestureEvent}
      onHandlerStateChange={gestureHandler.onHandlerStateChange}
    >
      <Animated.View style={StyleSheet.absoluteFill}>
        {children}
      </Animated.View>
    </TapGestureHandler>
  );
};

Buttons.propTypes = {
  children: PropTypes.shape({}).isRequired,
  command: PropTypes.shape({}).isRequired,
};

const styles = StyleSheet.create({
});

export default Buttons;
