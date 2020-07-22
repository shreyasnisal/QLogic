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
import { StatusBar, Platform } from 'react-native'
import {Immersive} from 'react-native-immersive'

export default class App extends Component {

  componentDidMount() {
    if (Platform.OS !== 'ios') {
      Immersive.setImmersive(true)
      Immersive.addImmersiveListener(this.restoreImmersive)
    }
  }

  componentWillUnmount() {
    Immersive.removeImmersiveListener(this.restoreImmersive)
  }

  restoreImmersive = () => {
    Immersive.on()
  }

  render() {
    return(
      <NavigationContainer>
        <StatusBar hidden={true} />
        <Navigator />
      </NavigationContainer>
    )
  }
}
