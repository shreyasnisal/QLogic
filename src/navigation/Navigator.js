import React, {Component} from 'react'
import {Animated, Easing} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import Colors from 'common/Colors'

//screens
import Loading from 'routes/Loading/Loading'
import Home from 'routes/Home/Home'
import Game from 'routes/Game/Game'
import LevelSelect from 'routes/LevelSelect/LevelSelect'
import Playground from 'routes/Playground/Playground'
import HowToPlay from 'routes/HowToPlay/HowToPlay'
import TimeAttack from 'routes/TimeAttack/TimeAttack'


const Stack = createStackNavigator()

const config = {
  animation: 'timing',
  config: {
        duration: 50,
        useNativeDriver: true,
  },
};

const slowFadeConfig = {
    animation: 'timing',
    config: {
        duration: 500,
        useNativeDriver: true,
    }
}

const forFade = ({ current, closing }) => ({
    cardStyle: {
        opacity: current.progress,
    },
  });

export default class Navigator extends Component {
    render() {
        return(
            <Stack.Navigator screenOptions={{ headerShown: false, transitionSpec: {open: config, close: config}, cardStyleInterpolator: forFade, cardStyle: {backgroundColor: Colors.backgroundColor} }}>
                <Stack.Screen name='Loading' component={Loading} options={{transitionSpec: {open: config, close: slowFadeConfig, cardStyleInterpolator: forFade, cardStyle: {backgroundColor: Colors.backgroundColor}}}} />
                <Stack.Screen name='Home' component={Home} options={{transitionSpec: {open: slowFadeConfig}}} />
                <Stack.Screen name='TimeAttack' component={TimeAttack} />
                <Stack.Screen name='Playground' component={Playground} />
                <Stack.Screen name='LevelSelect' component={LevelSelect} />
                <Stack.Screen name='Game' component={Game} />
                <Stack.Screen name='HowToPlay' component={HowToPlay} />
            </Stack.Navigator>
        )
    }
}