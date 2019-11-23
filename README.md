<p align="center">
  <img alt="Repository Last Commit Date" src="https://img.shields.io/github/last-commit/psatler/react-native-github-app?color=blue">

  <a href="https://www.linkedin.com/in/pablosatler/">
    <img alt="Made by Pablo Satler" src="https://img.shields.io/badge/made%20by-Pablo%20Satler-blue">
  </a>

  <img alt="License" src="https://img.shields.io/github/license/psatler/react-native-github-app?color=blue">

</p>

> Listing Github's profile starred repos

The application consumes the REST Github API and display some pieces of information
about the repositories inserted by the user.

On the profile page it is displayed the repositories the user has starred on Github.
The documentation for the github stars can be found [here](https://developer.github.com/v3/activity/starring/#list-repositories-being-starred).

## Some dependecies used

- ESLint, Prettier, EditorConfig
- Styled Components
- React Navigation
- React Native Vector Icons (MaterialIcons)
- Prop-types
- Axios
- Async Storage to save and load saved list of repositories

## Features

- Infinite scroll on the details page listing the user's favorite repositories (starred ones)
- Pull to refresh
- Open the favorite repo in a webview to get more details of it

## License

This project is licensed under the terms of the [MIT License](https://opensource.org/licenses/MIT) © Pablo Satler 2019
