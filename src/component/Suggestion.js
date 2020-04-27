import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { colors } from '../config/const';

const Suggestion = React.memo(({ children, style, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.container, style]}
      onPress={onPress}
    >
      <Text style={styles.text}>
        {children}
      </Text>
    </TouchableOpacity>
  );
});

Suggestion.defaultProps = {
  children: '',
  style: {},
  onPress: () => null
}

export default Suggestion;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: colors.secondary,
    borderRadius: 5
  },
  text: {
    color: "#fff",
    fontSize: 14
  }
})