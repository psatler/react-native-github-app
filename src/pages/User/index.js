import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';
import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  Loading,
} from './styles';

// Reactotron.log(navigation.getParam('user'));
export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
    loading: true,
    page: 1,
    refreshing: false, // used by the pull to refresh feature
  };

  async componentDidMount() {
    this.loadFavoriteRepos();
  }

  loadFavoriteRepos = async (page = 1) => {
    const { navigation } = this.props;
    const { stars } = this.state;
    const user = navigation.getParam('user');
    const response = await api.get(`/users/${user.login}/starred`, {
      params: {
        page,
      },
    });

    this.setState({
      stars: page > 1 ? [...stars, ...response.data] : response.data,
      loading: false,
      page,
      refreshing: false,
    });
  };

  loadMore = () => {
    // console.tron.log('Loading more...');
    const { page } = this.state; // getting the current page
    const nextPage = page + 1;

    this.loadFavoriteRepos(nextPage);
  };

  pullToRefresh = () => {
    this.setState(
      {
        refreshing: true,
        stars: [], // clearing it out so the list blinks on screen giving a sensation of update
      },
      this.loadFavoriteRepos
    );
  };

  openRepoPage = repoInfo => {
    console.tron.log('repo', repoInfo);
    const { navigation } = this.props;

    // pass the screen name you want to navigate to
    navigation.navigate('RepositoryPage', { repoInfo });
  };

  render() {
    const { stars, loading, refreshing } = this.state;
    const { navigation } = this.props;
    const user = navigation.getParam('user');
    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name} </Name>
          <Bio> {user.bio} </Bio>
        </Header>

        {loading ? (
          <Loading />
        ) : (
          <Stars
            onRefresh={this.pullToRefresh}
            refreshing={refreshing}
            onEndReachedThreshold={0.2} // trigger the method in the onEndReached prop when it gets at 20% of the end of list
            onEndReached={this.loadMore}
            data={stars}
            keyExtractor={star => String(star.id)}
            renderItem={({ item }) => (
              <Starred onPress={() => this.openRepoPage(item)}>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name} </Title>
                  <Author>{item.owner.login} </Author>
                </Info>
              </Starred>
            )}
          />
        )}
      </Container>
    );
  }
}
