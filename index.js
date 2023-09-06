/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

AppRegistry.registerComponent(appName, () => App);
