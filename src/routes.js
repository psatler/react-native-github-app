import { createAppContainer, createStackNavigator } from 'react-navigation';

import Main from './pages/Main';
import User from './pages/User';
import RepositoryPage from './pages/RepositoryPage';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      User,
      RepositoryPage,
    },
    // below are default settings for all pages
    {
      headerLayoutPreset: 'center',
      headerBackTitleVisible: false,
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#7159c1',
        },
        headerTintColor: '#FFF',
      },
    }
  )
);

export default Routes;
