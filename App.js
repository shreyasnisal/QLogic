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
import PushNotification from 'react-native-push-notification'

PushNotification.configure({

  onNotification: function (notification) {
    // process the notification
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
});

export default class App extends Component {

  constructor(props) {
    super(props)

    PushNotification.cancelAllLocalNotifications()
  }

  componentDidMount() {
    Immersive.setImmersive(true)
    Immersive.addImmersiveListener(this.restoreImmersive)
  }

  componentWillUnmount() {
    Immersive.removeImmersiveListener(this.restoreImmersive)

    PushNotification.localNotificationSchedule({
      message: "It's been a while since you played QLogic. Come solve some puzzles!",
      date: new Date(Date.now() + 86400 * 7 * 1000),
    });
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
