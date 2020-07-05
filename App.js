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

export default class App extends Component {

  render() {
    return(
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    )
  }
}
