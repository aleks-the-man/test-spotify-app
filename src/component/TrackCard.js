import React, { useEffect, useState, useRef } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

/* packages */
import FA from 'react-native-vector-icons/FontAwesome';

import { get, last } from 'lodash';
import { Player } from '@react-native-community/audio-toolkit';

/* config */
import { colors } from '../config/const';

//! @todo - Stop all other songs if one is playing

const TrackCard = React.memo(({ track, index }) => {
  const { name, preview_url } = track;

  // * Current player status
  const [status, setStatus] = useState({ ready: false, playing: false, loading: false });

  const uri = get(last(get(track, 'album.images', [])), 'url');

  // * track player instance
  const playerRef = useRef();

  const onPlay = () => {
    if (status.loading) {
      return;
    }

    // * Initialize player instance
    if (!playerRef.current) {
      playerRef.current = (
        new Player(preview_url)
          .on('ended', () => {
            playerRef.current.seek(0);

            return setStatus({ playing: false });
          })
      );
    }

    // * Wait for sample to be fetched my the module
    if (!status.ready) {
      setStatus({ loading: true });

      return playerRef.current.play(() => setStatus({ playing: true, ready: true, loading: false }));
    }

    // * Play pause teh video
    if (status.playing) {
      return playerRef.current.pause(() => setStatus({ playing: false }));
    }

    return playerRef.current.play(() => setStatus({ playing: true }));
  }

  //! Destroy player instance on un-mount to clear cache
  useEffect(() => {
    return () => {
      if (!playerRef.current) {
        return
      }

      return playerRef.current.destroy();
    }
  }, [])

  return (
    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}
    >
      <Text style={{ color: "#fff", marginRight: 8 }}>
        {`#${index + 1}`}
      </Text>
      <Image
        style={{
          backgroundColor: "#fff",
          width: 40,
          height: 40,
          borderRadius: 5,
          marginRight: 12
        }}
        source={{ uri }}
      />
      <View style={{ flex: 1 }}>
        <Text style={{ color: "#fff" }}>
          {name}
        </Text>
        <Text style={{ fontSize: 10, color: colors.secondary }}>
          {get(track, 'album.name', '')}
        </Text>
      </View>
      {
        !!preview_url && (

          <TouchableOpacity
            onPress={onPlay}
          >
            <FA
              style={{ padding: 8 }}
              name={status.playing ? "pause-circle" : "play-circle"}
              color="#fff"
              size={24}
            />
          </TouchableOpacity>
        )
      }
    </TouchableOpacity>
  );
});

export default TrackCard;

const styles = StyleSheet.create({

});