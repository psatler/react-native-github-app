import React from 'react';
import PropTypes from 'prop-types';

import { WebView } from 'react-native-webview';

// import { Container } from './styles';

export default function RepositoryPage({ navigation }) {
  console.tron.log(navigation);
  // const repoName = navigation.getParam('repoInfo').name;
  const repoUrl = navigation.getParam('repoInfo').html_url;

  return <WebView source={{ uri: repoUrl }} style={{ flex: 1 }} />;
}

RepositoryPage.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('repoInfo').name,
});

RepositoryPage.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
    // navigate: PropTypes.func,
  }).isRequired,
};
