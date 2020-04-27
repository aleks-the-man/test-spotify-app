import React, { Fragment, useEffect } from 'react';
import {
  StatusBar
} from 'react-native';

import RNBootSplash from 'react-native-bootsplash';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider, useAuthenticate } from './context/Auth';
import { SuggestionsProvider } from './context/Suggestions';

import { colors } from './config/const';

import * as Page from './page';

const Stack = createStackNavigator();

const Navigator = React.memo(() => {
  const [authenticate, { token, isLoading }] = useAuthenticate();

  useEffect(() => { authenticate(); }, []);

  if (isLoading) {
    return (
      <Page.Loading />
    );
  }

  return (
    <Stack.Navigator mode="modal">
      {
        !token
          ? (
            <Stack.Screen
              name="Login"
              component={Page.Login}
            />
          )
          : (
            <Fragment>
              <Stack.Screen
                name="Home"
                options={{
                  headerShown: false
                }}
                component={Page.Home}
              />
              <Stack.Screen
                name="Artist"
                component={Page.Artist}
                options={({ route: { params: { artist: { name } } } }) => ({
                  headerShown: true,
                  headerTransparent: false,
                  headerTitle: name,
                  headerTintColor: "#fff",
                  headerStyle: {
                    backgroundColor: colors.primary
                  }
                })}
              />
            </Fragment>
          )
      }
    </Stack.Navigator>
  );
});

const Root = React.memo(() => {
  useEffect(() => {
    RNBootSplash.hide({ duration: 250 });
  }, []);

  return (
    <Fragment>
      <StatusBar
        translucent={false}
        backgroundColor={colors.primaryLighten}
      />
      <NavigationContainer>
        <AuthProvider>
          <SuggestionsProvider>
            <Navigator />
          </SuggestionsProvider>
        </AuthProvider>
      </NavigationContainer>
    </Fragment>
  )
});

export default Root;
