import React from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import { colors } from '../../config/const';

const LoginPage = React.memo(() => {
  return (
    <View style={{ backgroundColor: colors.primary, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity >
        <Text>
          Authenticate
        </Text>
      </TouchableOpacity>
    </View>
  )
});

export default LoginPage;
