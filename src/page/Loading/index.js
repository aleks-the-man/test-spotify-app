import React from 'react';
import {
  View,
  Text,
  Image
} from 'react-native';

const logo = require('../../../assets/bootsplash_logo.png');

const LoadingPage = React.memo(() => {
  return (
    <View style={{ backgroundColor: '#fff', flex: 1, alignItems: 'center', justifyContent: 'center' }} >
      <Image
        source={logo}
      />
    </View>
  )
});

export default LoadingPage;
