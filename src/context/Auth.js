import React, { useContext } from 'react';

/* packages */
import axios from 'axios';

/* lib */
import api from '../lib/api';
import { useSafeSetState } from '../lib/hooks';

const authorizationConfig = {
  'method': 'POST',
  'url': 'https://accounts.spotify.com/api/token',
  'headers': {
    'Authorization': 'Basic OGNmNTM4MGY1ODhjNGVhMTg4NDk2ZTI1NGVkNjM3NjA6MjZjZjkxMTg2ZDdlNDBhMWI1ZmVlY2Y0NDlmNzk4MWI=',
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  'data': 'grant_type=client_credentials'
};

let AuthContext;

const { Provider } = AuthContext = React.createContext();

export const useAuthenticate = () => {
  const { authenticate, auth } = useContext(AuthContext);

  return [authenticate, auth];
}

const AuthProvider = React.memo((props) => {
  const [auth, setAuthState] = useSafeSetState({
    token: null,
    isLoading: true
  });

  const getToken = () => (
    axios(authorizationConfig)
      .then(({ data: { access_token } }) => access_token)
      .catch((error) => {


        return null;
      })
  );

  async function authenticate() {
    const token = await getToken();

    if (!token) {
      return setAuthState({ isLoading: false, token: null });
    }

    //! Add token to API instance
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    return setAuthState({ isLoading: false, token });
  }

  return (
    <Provider
      value={{
        auth,

        authenticate,
      }}
      {...props}
    />
  );
});

export default AuthContext;
export {
  AuthProvider
};
