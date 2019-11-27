import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { WebView } from 'react-native-webview';

import { Container, Loading } from './styles';

export default function RepositoryPage({ navigation }) {
  const [loading, setLoading] = useState(true);
  // console.tron.log(navigation);
  // const repoName = navigation.getParam('repoInfo').name;
  const repoUrl = navigation.getParam('repoInfo').html_url;

  function hideSpinner() {
    setLoading(false);
  }

  return (
    <Container>
      {loading && <Loading />}
      <WebView
        // renderLoading={hideSpinner}
        // startInLoadingState
        source={{ uri: repoUrl }}
        style={{ flex: 1 }}
        onLoadEnd={() => hideSpinner()}
      />
    </Container>
  );
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
