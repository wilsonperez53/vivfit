/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Navigation from './src/navigation/index';
import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator, AmplifyTheme } from 'aws-amplify-react-native'
import config from './src/aws-exports';
import { Provider } from 'react-redux';
import store from './src/store/store';

Amplify.configure(config);

//const store = configureStore();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  //Auth.signOut();
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.root}>
      <Navigation/>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  root:{
    flex:1,
    backgroundColor: 'F9FbFC'
  }
});
/*
const signUpConfig = {
  header: "My Customized Sign Up",
  hideAllDefaults: true,
  signUpFields: [
    {
      label: "Full name",
      key: "name",
      required: true,
      displayOrder: 1,
      type: "string",
    },
    {
      label: "Email",
      key: "email",
      required: true,
      displayOrder: 2,
      type: "string",
    },
    {
      label: "Username",
      key: "preferred_username",
      required: true,
      displayOrder: 3,
      type: "string",
    },
    {
      label: "Password",
      key: "password",
      required: true,
      displayOrder: 4,
      type: "password",
    },
  ],
};
*/
const customTheme = {
  ...AmplifyTheme,
  button: {
    ...AmplifyTheme.button,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
};

export default App;//withAuthenticator(App, {signUpConfig, theme: customTheme });
