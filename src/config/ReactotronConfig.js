import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  Reactotron.configure({ host: 'localhost' }) // controls connection & communication settings
    .useReactNative() // add all built-in react native plugins
    .connect(); // let's connect!

  console.tron = Reactotron;
  // Reactotron.clear();
  // console.tron = tron;
  // tron.clear();
}
