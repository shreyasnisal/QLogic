import React, {Component} from 'react'
import {createStackNavigator} from '@react-navigation/stack'

//screens
import Home from 'routes/Home/Home'
import Game from 'routes/Game/Game'

const Stack = createStackNavigator()

export default class Navigator extends Component {
    render() {
        return(
            <Stack.Navigator>
                <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
                <Stack.Screen name='Game' component={Game} options={{ headerShown: false}} />
            </Stack.Navigator>
        )
    }
}