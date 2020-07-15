import React, {Component} from 'react'
import {createStackNavigator} from '@react-navigation/stack'

//screens
import Home from 'routes/Home/Home'
import Game from 'routes/Game/Game'
import LevelSelect from 'routes/LevelSelect/LevelSelect'

const Stack = createStackNavigator()

export default class Navigator extends Component {
    render() {
        return(
            <Stack.Navigator>
                <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
                <Stack.Screen name='LevelSelect' component={LevelSelect} options={{ headerShown: false}} />
                <Stack.Screen name='Game' component={Game} options={{ headerShown: false}} />
            </Stack.Navigator>
        )
    }
}