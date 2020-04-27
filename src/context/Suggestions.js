import React, { useContext, useEffect } from 'react';

/* packages */
import { unionBy } from 'lodash';

import AsyncStorage from '@react-native-community/async-storage';

/* lib */
import { useSafeState } from '../lib/hooks';

const MAX_SUGGESTIONS = 5;
const PREVIOUS_SEARCH_KEY = '@spotify-previous-search';

let SuggestionsContext;

const { Provider } = SuggestionsContext = React.createContext();

/**
 * Load cached previous searches
 */

const getCachedSuggestions = () => {
  return AsyncStorage.getItem(PREVIOUS_SEARCH_KEY)
    .then(value => {
      if (!value) {
        return [];
      }

      return JSON.parse(value);
    })
    .catch(() => [])
}

/**
 * Update cached previous searches
 * 
 * @param {string} value 
 */

function updateCachedSuggestions(value) {
  return AsyncStorage.getItem(PREVIOUS_SEARCH_KEY)
    .then((response) => {
      if (!response) {
        throw new Error('Nothing cached');
      }

      var nextCache = unionBy([...JSON.parse(response), value]);

      nextCache = nextCache.slice(Math.max(nextCache.length - MAX_SUGGESTIONS, 0));

      return AsyncStorage.setItem(PREVIOUS_SEARCH_KEY, JSON.stringify(nextCache));
    })
    .catch(() => AsyncStorage.setItem(PREVIOUS_SEARCH_KEY, JSON.stringify([value])));
};

/**
 * 
 */
export const useSuggestions = () => {
  const { suggestions, saveSuggestion } = useContext(SuggestionsContext);

  return [suggestions, saveSuggestion];
}

const SuggestionsProvider = React.memo((props) => {
  // * Holds suggestions once received from cache
  const [suggestions, setSuggestions] = useSafeState([]);

  useEffect(() => {
    async function getSuggestions() {
      const initialSuggestions = await getCachedSuggestions();

      return setSuggestions([...initialSuggestions]);
    }

    getSuggestions();
  }, []);

  const saveSuggestion = (value) => updateCachedSuggestions(value);

  return (
    <Provider
      value={{
        suggestions,
        saveSuggestion
      }}
      {...props}
    />
  );
});

export default SuggestionsContext;
export {
  SuggestionsProvider
};
