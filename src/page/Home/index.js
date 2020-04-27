import React, { useState, Fragment } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';

/* context */
import FA from 'react-native-vector-icons/FontAwesome';
import { useSuggestions } from '../../context/Suggestions';
import { ArtistsProvider, useArtistsList, useSearchInput } from '../../context/Artists';

/* components */
import Suggestion from '../../component/Suggestion';
import ArtistCard from '../../component/ArtistCard';

/* config */
import { colors } from '../../config/const';

const SearchInput = React.memo(() => {
  const { value, onChange } = useSearchInput();

  return (
    <TextInput
      style={styles.searchInput}
      value={value}

      placeholder="Search by name"
      underlineColorAndroid="transparent"
      onChangeText={onChange}
    />
  );
});

const SuggestionsList = React.memo(() => {
  const [suggestions] = useSuggestions();
  const { onSuggestionSearch } = useSearchInput()

  return (
    <View style={{ alignItems: 'flex-start', paddingBottom: 8, paddingTop: 8 }}>
      <View style={{ flexDirection: "row", flexWrap: 'wrap' }}>
        {
          suggestions.map(
            (suggestion, index) => {
              return (
                <Suggestion
                  style={{ marginRight: 8 }}
                  key={`suggestion-${index}`}
                  onPress={() => onSuggestionSearch(suggestion)}
                >
                  {suggestion}
                </Suggestion>
              );
            }
          )
        }
      </View>
    </View>
  );
});

const Suggestions = React.memo(() => {
  const [visible, setVisible] = useState(true);

  const [suggestions] = useSuggestions();

  if (!suggestions.length) {
    return null;
  }

  return (
    <Fragment>
      {
        visible && (
          <SuggestionsList />
        )
      }
      <TouchableOpacity
        onPress={() => setVisible(!visible)}
      >
        <FA
          style={{ alignSelf: 'center' }}
          name={visible ? "caret-up" : "caret-down"}
          size={18}
          color="#fff"
        />
      </TouchableOpacity>
    </Fragment>
  );
});

const HomePage = React.memo(({ navigation: { push } }) => {
  const { response: { data }, onPaginate } = useArtistsList();

  const renderItem = ({ item: artist }) => (
    <ArtistCard
      artist={artist}
      onPress={() => push("Artist", { artist })}
    />
  );

  return (
    <View style={styles.container} >
      <View style={styles.searchContainer}>
        <SearchInput />
        <View style={{ paddingTop: 8 }}>
          <Suggestions />
        </View>
      </View>
      <FlatList
        data={data}
        keyExtractor={({ id }) => id}
        renderItem={renderItem}
        onEndReachedThreshold={0.5}
        onEndReached={onPaginate}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
      />
    </View>
  )
});

const WrappedHomePage = React.memo((props) => {
  return (
    <ArtistsProvider >
      <HomePage {...props} />
    </ArtistsProvider>
  );
});

export default WrappedHomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  searchContainer: {
    backgroundColor: colors.primaryLighten,
    padding: 16,
    paddingBottom: 8,
    margin: 16,
    borderRadius: 25,
    marginBottom: 24,
  },
  searchInput: {
    padding: 0,
    paddingVertical: 4,
    paddingHorizontal: 12,
    margin: 0,
    borderRadius: 5,
    height: null,
    backgroundColor: "#fff",
  }
})