import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Reactotron from 'reactotron-react-native';
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
} from './styles';

// Reactotron.log(navigation.getParam('user'));
export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
  };

  async componentDidMount() {
    const { navigation } = this.props;
    const user = navigation.getParam('user');
    const response = await api.get(`/users/${user.login}/starred`);

    this.setState({
      stars: response.data,
    });
  }
  // Stars is a FlatList
  // TODO. onEndReached, fetch more starred repos from API
  // TODO add a loading status
  // when clicking on a link to repo, open a webview

  render() {
    const { stars } = this.state;
    const { navigation } = this.props;
    const user = navigation.getParam('user');
    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name} </Name>
          <Bio> {user.bio} </Bio>
        </Header>

        <Stars
          data={stars}
          keyExtractor={star => String(star.id)}
          renderItem={({ item }) => (
            <Starred>
              <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
              <Info>
                <Title>{item.name} </Title>
                <Author>{item.owner.login} </Author>
              </Info>
            </Starred>
          )}
        />
      </Container>
    );
  }
}
