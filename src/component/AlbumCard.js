import React, { useMemo } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { get, last } from 'lodash';

const { width } = Dimensions.get('window');

const SIZE = width * 0.25;

const Suggestion = React.memo(({ album: { name, images }, style, onPress }) => {

  const albumImageURL = useMemo(() => get(images, '[0].url'), []);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.container, style]}
      onPress={onPress}
    >
      <Image
        style={styles.image}
        source={{ uri: albumImageURL }}
        resizeMode="cover"
      />
      <View style={styles.imageOverlay} />
      <Text style={styles.text}>
        {name}
      </Text>
    </TouchableOpacity>
  );
});

Suggestion.defaultProps = {
  album: {
    name: '',
    images: []
  },
  style: {},
  onPress: () => null
}

export default Suggestion;

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderRadius: 5,
    overflow: 'hidden'
  },

  image: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    width: null,
    height: null
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  text: {
    color: "#fff",
    fontSize: 12,
    textAlign: 'center'
  }
})