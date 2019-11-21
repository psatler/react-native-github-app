import React, { Fragment } from 'react';
import { StyleSheet, StatusBar } from 'react-native';

import './config/ReactotronConfig';

import Routes from './routes';

const App = () => {
  // console.tron.log('Here!');
  return (
    <Fragment>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <Routes />
    </Fragment>
  );
};

const styles = StyleSheet.create({});

export default App;
