import React, { useMemo } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

/* packages */
import { last, get } from 'lodash';

/* config */
import { colors } from '../config/const';

const ArtistCard = React.memo(({ artist, onPress }) => {
  const { name, images, genres } = artist;

  const uri = useMemo(() => get(last(images), 'url'), [images]);

  const genresString = useMemo(() => genres.filter(Boolean).join(', '), [genres]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      <Image
        style={styles.image}
        source={{ uri }}
      />
      <View>
        <Text style={{ color: "#fff" }}>
          {name}
        </Text>
        {
          !!genresString && (
            <Text style={styles.genresText}>
              {genresString}
            </Text>
          )
        }
      </View>
    </TouchableOpacity>
  );
});

ArtistCard.defaultProps = {
  artist: {
    id: '',
    name: '',
    images: [],
    genres: []
  },
  onPress: () => null
}

export default ArtistCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16
  },
  image: {
    backgroundColor: "#fff",
    width: 40,
    height: 40,
    borderRadius: 5,
    marginRight: 12
  },
  genresText: {
    fontSize: 12,
    color: colors.secondary
  }
})