import React, { useContext, useEffect, useState } from 'react';

/* packages */
import useDebounce from 'react-use/lib/useDebounce';
import useSetState from 'react-use/lib/useSetState';
import useUpdateEffect from 'react-use/lib/useUpdateEffect';

/* context */
import { useSuggestions } from './Suggestions';

/* lib */
import api from '../lib/api';

let ArtistsContext;

const { Provider } = ArtistsContext = React.createContext();

const initialResponse = {
  data: [],

  page: 0,

  total: 0,
  limit: 10,

  error: null,
  loading: false,
  refreshing: false
};

export const useArtistsList = () => {
  const { response, onPaginate } = useContext(ArtistsContext);

  return {
    response,
    onPaginate
  };
}

export const useSearchInput = () => {
  const { search: value, onChangeSearch: onChange, onSuggestionSearch } = useContext(ArtistsContext);

  return { value, onChange, onSuggestionSearch };
}

export const ArtistsProvider = React.memo((props) => {
  const [, saveSuggestion] = useSuggestions();

  const [value, setValue] = useState('');

  const [typing, setTyping] = useState(false);
  const [debounceValue, setDebounceValue] = useState('');

  function onChangeSearch(value) {
    if (!typing) {
      setTyping(true);
    }

    return setValue(value);
  }

  const [, cancelDebounce] = useDebounce(
    () => {
      if (value === debounceValue) {
        return;
      }

      setTyping(false);
      setDebounceValue(value);
    },
    500,
    [value]
  );

  const [response, setResponse] = useSetState(initialResponse);

  useEffect(() => {
    function getResults() {
      const params = {
        'type': 'artist',
        'limit': 10,
        'offset': 0,
        'q': debounceValue
      };

      setResponse({ loading: true });

      return api.get('https://api.spotify.com/v1/search', { params })
        .then(({ data: { artists: { items: data, total } } }) => {

          // ? Add suggestions ony if it has results, else its nto useful
          if (!!data.length) {
            saveSuggestion(debounceValue);
          }

          return setResponse({ loading: false, data, total });
        })
        .catch((error) => setResponse({ loading: false, error }))
    }

    getResults();

  }, [debounceValue]);

  useUpdateEffect(() => {
    function getMoreResults() {
      const { page, limit } = response;

      const params = {
        'type': 'artist',
        'limit': 10,
        'offset': (page * limit),
        'q': debounceValue
      };

      return api.get('https://api.spotify.com/v1/search', { params })
        .then(({ data: { artists: { items: data } } }) => setResponse(({ data: current }) => ({ data: [...current, ...data], loading: false })))
        .catch((error) => setResponse({ loading: false, error }));
    }

    getMoreResults();

  }, [response.page]);

  function onSuggestionSearch(value) {
    setValue(value);
    setDebounceValue(value);

    //! No ned to perform extra debounce
    return cancelDebounce();
  }

  function onPaginate() {
    const { loading, refreshing, total, data, page } = response;

    if ((loading || refreshing) && data.length < total) {
      return;
    }

    return setResponse({ page: page + 1 });
  }

  return (
    <Provider
      value={{
        response,
        onPaginate,

        search: value,
        onChangeSearch,
        onSuggestionSearch
      }}
      {...props}
    />
  );
});

export default ArtistsContext;
