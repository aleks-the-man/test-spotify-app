import React, { useMemo, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  StyleSheet,
  FlatList,
} from 'react-native';

/* packages */
import { get } from 'lodash';
import { useRoute } from '@react-navigation/native';

/* components */
import AlbumCard from '../../component/AlbumCard';
import TrackCard from '../../component/TrackCard';

import api from '../../lib/api';
import { useSafeSetState } from '../../lib/hooks';

/* config */
import { colors } from '../../config/const';

const { height } = Dimensions.get('window');

const ArtistAlbums = React.memo(() => {
  const { params: { artist: { id } } } = useRoute();

  const [response, setResponse] = useSafeSetState({ loading: true, error: null, data: [] });

  // ? Get latest 20 albums, would need pagination here as well
  useEffect(() => {
    function getResults() {
      const config = {
        method: 'GET',
        url: `/artists/${id}/albums`,
        params: {
          limit: 20,
          offset: 0,
          include_groups: ['album'].join(',')
        }
      };

      return api(config)
        .then(({ data: { items: data } }) => setResponse({ loading: false, data }))
        .catch((error) => setResponse({ loading: false, error }))
    };

    getResults();
  }, []);

  const renderItemSeparator = () => <View style={{ marginRight: 16 }} />;

  const renderItem = ({ item: album }) => {
    return (
      <AlbumCard
        album={album}
        onPress={() => null} //! @todo Lead to album preview at later stage
      />
    );
  };

  return (
    <View style={{ flexDirection: 'row', paddingRight: 16, marginBottom: 24 }}>
      <Text style={styles.sectionTitle}>
        {'Album'}
      </Text>
      <FlatList
        horizontal
        data={response.data}
        renderItem={renderItem}
        ItemSeparatorComponent={renderItemSeparator}
        showsHorizontalScrollIndicator={false}
        keyExtractor={({ id }) => id}
      />
    </View>
  );
});

const ArtistSongs = React.memo(() => {
  const { params: { artist: { id } } } = useRoute();

  const [response, setResponse] = useSafeSetState({ loading: true, error: null, data: [] });

  // ? Get top 10 tracks of the
  useEffect(() => {
    function getResults() {
      const config = {
        method: 'GET',
        url: `/artists/${id}/top-tracks`,
        params: {
          country: 'us' //! @todo user preferred country, for now default US
        }
      };

      return api(config)
        .then(({ data: { tracks: data } }) => setResponse({ loading: false, data }))
        .catch((error) => setResponse({ loading: false, error }))
    };

    getResults();
  }, []);

  return (
    <View style={{ flexDirection: 'row', paddingRight: 16, paddingBottom: 16 }}>
      <Text style={styles.sectionTitle}>
        {'Songs'}
      </Text>
      <View style={{ flex: 1 }}>
        {
          response.data.map((track, index) => {
            return (
              <TrackCard
                key={track.id}
                track={track}
                index={index}
              />
            )
          })
        }
      </View>
    </View>
  );
})

const ArtistPage = React.memo(({ route: { params: { id, artist } } }) => {
  const imageURL = useMemo(() => get(artist, 'images[0].url', ''), [artist]);

  return (
    <ScrollView
      style={{ backgroundColor: colors.primary, flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageURL }}
          style={styles.image}
          resizeMode="cover" //! Contain would be preferred but need some pretty bg behind it
        />
        <View style={styles.imageOverlay} />
      </View>
      <ArtistAlbums />
      <ArtistSongs />
    </ScrollView>
  );
});

export default ArtistPage;

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: colors.primaryLighten,
    height: height * .4,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    overflow: 'hidden',
    marginBottom: 24
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    width: null,
    height: null,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)'
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 19,
    transform: [{ rotate: '-90deg' }],
    alignSelf: 'flex-start',
    marginTop: 21,
    lineHeight: 18
  }
})