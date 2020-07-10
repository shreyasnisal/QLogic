/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native'
import Navigator from 'navigation/Navigator'
import { StatusBar } from 'react-native';

export default class App extends Component {

  render() {
    return(
      <NavigationContainer>
        <StatusBar hidden={true} />
        <Navigator />
      </NavigationContainer>
    )
  }
}
