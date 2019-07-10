import React from 'react';
import { View, Text } from 'react-native';

import { Container } from './styles';

const Main = () => {
  return (
    <Container>
      <Text>Main</Text>
    </Container>
  );
};

Main.navigationOptions = {
  title: 'Users',
};

export default Main;
