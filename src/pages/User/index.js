import React from 'react';
import { View, Text } from 'react-native';

import Reactotron from 'reactotron-react-native';

const User = ({ navigation }) => {
  Reactotron.log(navigation.getParam('user'));

  return (
    <View>
      <Text>User</Text>
    </View>
  );
};

export default User;
