import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {
  onGestureEvent, useValues, useDiff, canvas2Polar,
} from 'react-native-redash';
import PropTypes from 'prop-types';
import { CENTER_WHEEL_COLOR, BLACK } from '../../../styles';
import Buttons, { size } from './buttons';
import Stickers from './stickers';

const {
  sub, cond, greaterThan, abs, useCode, block, add, set, max, eq,
} = Animated;

const { PI } = Math;

const hole = size * 0.39;
const center = {
  x: size / 2,
  y: size / 2,
};

const delta = (a0, a) => {
  const da = sub(a0, a);
  return cond(
    greaterThan(abs(da), PI),
    cond(greaterThan(a0, 0), sub(2 * PI, da), sub(-2 * PI, da)),
    da,
  );
};

const ClickWheel = ({ alpha, command }) => {
  const [x, y, state] = useValues([0, 0, State.UNDETERMINED], []);
  const gestureHandler = onGestureEvent({ x, y, state });

  const dx = useDiff(x, []);
  const dy = useDiff(y, []);
  const x0 = cond(eq(state, State.ACTIVE), sub(x, dx), x);
  const y0 = cond(eq(state, State.ACTIVE), sub(y, dy), y);
  const a0 = canvas2Polar({ x: x0, y: y0 }, center).theta;
  const a = canvas2Polar({ x, y }, center).theta;
  const da = delta(a0, a);

  useCode(
    () => block([set(alpha, max(add(alpha, da), 0))]),
    [alpha, da],
  );
  return (
    <View style={styles.container}>
      <View style={styles.center} />
      <Buttons command={command}>
        <PanGestureHandler
          onGestureEvent={gestureHandler.onGestureEvent}
          onHandlerStateChange={gestureHandler.onHandlerStateChange}
        >
          <Animated.View style={{
            ...StyleSheet.absoluteFill,
          }}
          />
        </PanGestureHandler>
      </Buttons>
      <Stickers />
    </View>
  );
};

ClickWheel.propTypes = {
  alpha: PropTypes.shape({}).isRequired,
  command: PropTypes.shape({}).isRequired,
};

const styles = StyleSheet.create({
  container: {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: CENTER_WHEEL_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    width: hole,
    height: hole,
    borderRadius: hole / 2,
    backgroundColor: BLACK,
  },
});

export default ClickWheel;
