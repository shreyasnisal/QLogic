import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    Switch,
} from 'react-native'
import commonStyles from 'common/styles'
import styles from './styles'
import Colors from 'common/Colors'
import AsyncStorage from '@react-native-community/async-storage'

export default class SettingsPopup extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            popupScale: new Animated.Value(0),
            musicSwitch: true,
            soundsSwitch: true,
        }
    }

    componentDidMount() {
        this.getPrefs()
    }

    getPrefs = async () => {
        let music = JSON.parse(await AsyncStorage.getItem('music'))
        let sounds = JSON.parse(await AsyncStorage.getItem('sounds'))

        if (music === undefined || music === null) music = true
        if (sounds === undefined || sounds === null) sounds = true

        this.setState({
            musicSwitch: music,
            soundsSwitch: sounds,
        })

    }

    toggleMusic = () => {

        const {musicSwitch} = this.state

        AsyncStorage.setItem('music', JSON.stringify(!musicSwitch))

        this.setState({
            musicSwitch: !musicSwitch
        })
    }

    toggleSounds = () => {

        const {soundsSwitch} = this.state

        AsyncStorage.setItem('sounds', JSON.stringify(!soundsSwitch))

        this.setState({
            soundsSwitch: !soundsSwitch,
        })
    }

    render() {

        const {visible, onCancel} = this.props
        const {popupScale, musicSwitch, soundsSwitch} = this.state

        if (!visible) return null

        Animated.spring(popupScale, {
            toValue: 1,
            friction: 5,
            useNativeDriver: true,
        }).start()

        return(
            <TouchableOpacity style={[commonStyles.fullScreen, styles.container]} onPress={onCancel ? onCancel : () => {}}>
                <View style={[commonStyles.fullScreen, styles.container, commonStyles.popupBackground]} />
                <Animated.View style={[styles.popupContainer, {transform: [{scale: popupScale}]}]}>
                    <View style={styles.popupHeaderContainer}>
                        <Text style={styles.title}>Settings</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Music</Text>
                        <Switch
                            trackColor={{ false: Colors.backgroundColor, true: Colors.backgroundColor }}
                            thumbColor={musicSwitch ? Colors.buttonColor : Colors.headerColor}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={this.toggleMusic}
                            value={musicSwitch}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Sounds</Text>
                        <Switch
                            trackColor={{ false: Colors.backgroundColor, true: Colors.backgroundColor }}
                            thumbColor={soundsSwitch ? Colors.buttonColor : Colors.headerColor}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={this.toggleSounds}
                            value={soundsSwitch}
                        />
                    </View>
                </Animated.View>
            </TouchableOpacity>
        )
    }
}