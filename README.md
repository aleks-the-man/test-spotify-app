# Spotify Test

## 📋 Introduction

Sample app build on top of [Spotify API](https://developer.spotify.com/documentation/web-api/) to search for artists, and their songs and albums.

- `app name`: SpotifyTest
- `package name`: com.spotifytest
- `rn version`: 0.62.2
- `node`: 12.16.1

## 🚀 Setting up the environment

If you are new to react-native development, please follow along on how to properly setup you development environment on [the official documentation](https://reactnative.dev/docs/environment-setup)

After than you can proceeded with running the project for the first time.

```
//Clone the project
https://github.com/aleks-the-man/test-spotify-app

// Open project directory
cd spotify-test

// If your using NVM please proper node version, otherwise make sure you have proper node version installed
nvm use 12.16.1

npm i
```

If your running it on iOS don't forget to do a pod install

```
cd ios && pod install
```

Run the project

```
npm run android
npm run ios
```

## 🎮 Demo - <a href="https://raw.githubusercontent.com/Future-Forward/spotify-test/master/assets/app-release.apk" download>Download the demo app</a>



<img src="https://raw.githubusercontent.com/Future-Forward/spotify-test/master/assets/demo_min.gif" width="180" height=360>

## 🔥 Known issues

#### Specific

- You can play multiple songs at once.

#### Android

 - Audio does not work on huawei devices - [#197](https://github.com/react-native-community/react-native-audio-toolkit/issues/197)

#### iOS

- All the development was done on android so there might be issues with trying to run iOS application

