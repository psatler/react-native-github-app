import React, { Fragment } from 'react';
import { StyleSheet, StatusBar } from 'react-native';

import './config/ReactotronConfig';
import Reactotron from 'reactotron-react-native';

import Routes from './routes';

const App = () => {
  return (
    <Fragment>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <Routes />
    </Fragment>
  );
};

const styles = StyleSheet.create({});

export default App;
