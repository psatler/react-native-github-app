import React, { Fragment } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Reactotron from 'reactotron-react-native';

import './config/ReactotronConfig';

Reactotron.warn('hello rendering world');

const App = () => {
  return (
    <View>
      <Text>Hfdsff wLRD!</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default App;
