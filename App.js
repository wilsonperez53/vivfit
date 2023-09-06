import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {PersistGate} from 'redux-persist/es/integration/react';
import {Provider} from 'react-redux';
import {store, persistor} from './src/store';

import {Platform, StatusBar} from 'react-native';

import {SafeAreaProvider} from 'react-native-safe-area-context';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Routine from './src/screens/RoutineList';
import Exercise from './src/screens/Exercise';
import Home from './src/screens/Home';
import Settings from './src/screens/Settings';
import RoutinePlaylist from './src/screens/RoutinePlaylist';
import CompleteExercise from './src/screens/CompleteExercise';

import screenNames from './src/constants/navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from './src/constants/colors';
import Splash from './src/screens/Splash';

import UserContainer from './src/screens/UserContainer';
import ListExercise from './src/screens/ExerciseLibrary';
import { Amplify, Auth, Hub } from 'aws-amplify';
import awsconfig from './src/aws-exports';
Amplify.configure(awsconfig);

import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ConfirmEmailScreen from './src/screens/ConfirmEmailScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import NewPasswordScreen from './src/screens/NewPasswordScreen';
import HomeScreen from './src/screens/HomeScreen/Index';
import ExerciseDetailScreen from './src/screens/ExerciseDetailScreen/ExerciseDetailScreen';


import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const iconSize = 30;


const App = () => {
 
  return (
    <>
      {Platform.OS === 'android' ? (
        <StatusBar
          backgroundColor={colors.solidWhite}
          barStyle="dark-content"
        />
      ) : null}
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider style={{flex: 1}}>
            <NavigationContainer>
              <HomeStack />
            </NavigationContainer>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </>
  );
};

const HomeStack = () => {
   
const [user, setUser] = useState(undefined);

const checkUser = async () => {
  try {
    const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
    setUser(authUser);
  } catch (e) {
    setUser(null);
  }
};

useEffect(() => {
  checkUser();
}, []);
useEffect(() => {
  const listener = data => {
    if (data.payload.event === 'signIn' || data.payload.event === 'signOut') {
      checkUser();
    }
  };

  Hub.listen('auth', listener);
  return () => Hub.remove('auth', listener);
}, []);


  if (user === undefined) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={screenNames.SPLASH_SCREEN}>
      {user ? (
      <>
        <Stack.Screen name={screenNames.SPLASH_SCREEN} component={Splash} />
        <Stack.Screen
          name={screenNames.USER_CONTAINER}
          component={UserContainer}
        />
        <Stack.Screen
          name={screenNames.HOME}
          component={TabNav}
          options={Platform.OS === 'ios' ? {gestureEnabled: false} : {}}
        />
        <Stack.Screen name={screenNames.ROUTINE} component={Routine} />
        <Stack.Screen name={screenNames.EXERCISE} component={Exercise} />
        <Stack.Screen
          name={screenNames.EXERCISE_COMPLETED}
          component={CompleteExercise}
        />
        <Stack.Screen
          name={screenNames.ROUTINEPLAYLIST}
          component={RoutinePlaylist}
        />  
      </>
      ) : (
        <> 
        <Stack.Screen name={screenNames.SIGN_IN} component={SignInScreen} />
        <Stack.Screen name={screenNames.SIGN_UP} component={SignUpScreen} />
        <Stack.Screen name={screenNames.CONFIRM_EMAIL} component={ConfirmEmailScreen} />
        <Stack.Screen
          name={screenNames.FORGOT_PASSWORD}
          component={ForgotPasswordScreen}
        />
        <Stack.Screen name={screenNames.NEW_PASSWORD} component={NewPasswordScreen} />
      </>
    )}
    </Stack.Navigator>
  );
};

const TabNav = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          height: Platform.OS === 'android' ? hp('7%') : hp('8.2%'),
          backgroundColor: colors.secondary_container,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      }}>
     
      <Tab.Screen
        name={screenNames.HOME}
        component={Home}
        options={{
          tabBarLabel: '',
          tabBarOptions: {
            activeTintColor: colors.app_Tint,
          },
          tabBarIcon: (tabInfo) => {
            return (
              <Icon
                name="home"
                size={iconSize}
                color={
                  tabInfo.focused ? colors.app_Tint : colors.app_color_secondary
                }
                style={{top: 10}}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={screenNames.LIST_EXERCISE}
        component={ListExercise}
        options={{
          tabBarLabel: '',
          tabBarOptions: {
            activeTintColor: colors.app_Tint,
          },
          tabBarIcon: (tabInfo) => {
            return (
              <Icon
                name="list"
                size={iconSize}
                color={
                  tabInfo.focused ? colors.app_Tint : colors.app_color_secondary
                }
                style={{top: 10}}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={screenNames.SETTINGS}
        component={Settings}
        options={{
          tabBarLabel: '',
          tabBarOptions: {
            activeTintColor: colors.app_Tint,
          },
          tabBarIcon: (tabInfo) => {
            return (
              <Icon
                name="user-circle"
                size={iconSize}
                color={
                  tabInfo.focused ? colors.app_Tint : colors.app_color_secondary
                }
                style={{top: 10}}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default App;
