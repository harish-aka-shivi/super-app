import React from 'react';
import {
  View, StyleSheet, processColor,
} from 'react-native';
import Animated from 'react-native-reanimated';
import PropTypes from 'prop-types';
import { between } from 'react-native-redash';
import { CONTENT_HEIGHT } from '../ipodCustomNavigator';
import { WHITE, CENTER_WHEEL_COLOR } from '../../../styles';
import { Command, useOnPress } from '../ClickWheel/buttons';

const LIST_ITEM_HEIGHT = 50;

const {
  cond, diffClamp, Value, lessThan, diff, useCode, block, not, set, multiply, add, sub,
} = Animated;

const gray = processColor(CENTER_WHEEL_COLOR);
const white = processColor(WHITE);

const ListItem = ({
  active, name, onPress, command,
}) => {
  const backgroundColor = cond(active, gray, white);
  const textColor = cond(active, white, gray);
  useOnPress({
    active, target: Command.CENTER, command, onPress,
  });
  return (
    <Animated.View style={[styles.listItemContainer, { backgroundColor }]}>
      <Animated.Text style={{ color: textColor }}>
        {name}
      </Animated.Text>
    </Animated.View>
  );
};

const isInViewPort = (y, translateY) => between(
  y, translateY, add(translateY, CONTENT_HEIGHT),
);

const List = ({
  alpha, command, items,
}) => {
  const y = diffClamp(Animated.interpolate(alpha, {
    inputRange: [0, 2 * Math.PI],
    outputRange: [0, CONTENT_HEIGHT],
  }), 0, LIST_ITEM_HEIGHT * items.length);
  // console.log(y);
  useOnPress({
    active: true, command, target: Command.TOP, onPress: (navigation) => navigation.goBack(),
  });
  const translateY = new Value(0);
  const isGoingUp = lessThan(diff(y), 0);
  useCode(() => block([
    cond(
      not(isInViewPort(y, multiply(translateY, -1))),
      set(
        translateY,
        cond(
          isGoingUp,
          add(translateY, LIST_ITEM_HEIGHT),
          sub(translateY, LIST_ITEM_HEIGHT),
        ),
      ),
    ),
  ]), [translateY, y, isGoingUp]);
  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {
          items.map((item, index) => (
            <ListItem
              key={item.id}
              name={item.name}
              command={command}
              onPress={(navigation) => {
                if (item.screenName) {
                  navigation.navigate(item.screenName);
                }
              }}
              active={
                between(y, LIST_ITEM_HEIGHT * index, LIST_ITEM_HEIGHT * index + LIST_ITEM_HEIGHT)
              }
            />
          ))
        }
      </Animated.View>
    </View>
  );
};

List.propTypes = {
  alpha: PropTypes.shape({}).isRequired,
  command: PropTypes.shape({}).isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

ListItem.propTypes = {
  name: PropTypes.string.isRequired,
  active: PropTypes.shape({}).isRequired,
  onPress: PropTypes.func.isRequired,
  command: PropTypes.shape({}).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItemContainer: {
    height: LIST_ITEM_HEIGHT,
    justifyContent: 'center',
    paddingLeft: 16,
  },
});

export default List;
