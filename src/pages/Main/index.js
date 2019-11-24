import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Keyboard, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';
import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
  RemoveButton,
  ErrorMessage,
  UpperInnerContainer,
} from './styles';

class Main extends Component {
  static navigationOptions = {
    title: 'Github Profiles',
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    newUser: '',
    users: [],
    loading: false,
    error: false,
  };

  async componentDidMount() {
    const users = await AsyncStorage.getItem('users');

    if (users) {
      this.setState({
        users: JSON.parse(users),
      });
    }
  }

  async componentDidUpdate(_, prevState) {
    const { users } = this.state;

    if (prevState.users !== users) {
      await AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }

  handleAddUser = async () => {
    const { users, newUser } = this.state;
    this.setState({
      loading: true,
    });

    try {
      const response = await api.get(`/users/${newUser}`);
      const data = {
        name: response.data.name,
        login: response.data.login,
        bio: response.data.bio,
        avatar: response.data.avatar_url,
      };

      this.setState({
        users: [...users, data],
        newUser: '',
        loading: false,
        error: false,
      });
    } catch (err) {
      // console.tron.log('error', err);

      this.setState({
        newUser: '',
        loading: false,
        error: true,
      });
    } finally {
      Keyboard.dismiss(); // making the keyboard disappear after clicking the plus button
    }
  };

  handleNavigate = user => {
    const { navigation } = this.props;

    // pass the screen name you want to navigate to
    navigation.navigate('User', { user });
  };

  handleDeleteUser = userToDelete => {
    // console.tron.log(userToDelete);

    Alert.alert(
      `Delete ${userToDelete.name}`,
      'Are you sure you want to delete this profile?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => this.deleteUser(userToDelete),
        },
      ],
      {
        // cancelable: false,
      }
    );
  };

  deleteUser = userToDelete => {
    const { users } = this.state;
    const filteredUsers = users.filter(user => user.name !== userToDelete.name);

    this.setState({
      users: filteredUsers,
    });
  }

  render() {
    const { newUser, users, loading, error } = this.state;
    return (
      <Container>
        <UpperInnerContainer>
          <Form>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Add profile"
              value={newUser}
              onChangeText={text => this.setState({ newUser: text })}
              returnKeyType="send"
              onSubmitEditing={this.handleAddUser}
              error={error}
              onFocus={() => this.setState({ error: false })}
            />
            <SubmitButton loading={loading} onPress={this.handleAddUser}>
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Icon name="add" size={20} color="#FFF" />
              )}
            </SubmitButton>
          </Form>

          {error && <ErrorMessage>User was not found</ErrorMessage>}
        </UpperInnerContainer>

        <List
          data={users}
          keyExtractor={user => user.login}
          renderItem={({ item }) => (
            <User>
              <RemoveButton onPress={() => this.handleDeleteUser(item)}>
                <Icon name="delete" size={20} color="#7159c1" />
              </RemoveButton>
              <Avatar source={{ uri: item.avatar }} />
              <Name>{item.name} </Name>
              <Bio> {item.bio} </Bio>
              <ProfileButton onPress={() => this.handleNavigate(item)}>
                <ProfileButtonText>See profile</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />
      </Container>
    );
  }
}

export default Main;
