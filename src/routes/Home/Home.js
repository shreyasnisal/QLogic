import React, {Component} from 'react'
import {
    View,
    Text,
    Platform,
    BackHandler,
    Linking,
    Settings,
} from 'react-native'
import commonStyles from 'common/styles'
import styles from './styles'
import PrimaryButton from 'components/PrimaryButton/PrimaryButton'
import SecondaryButton from 'components/SecondaryButton/SecondaryButton'
import Popup from 'components/Popup/Popup'
import Header from 'components/Header/Header'
import Background from '../../components/Background/Background'
import AsyncStorage from '@react-native-community/async-storage'
import SettingsPopup from 'components/SettingsPopup/SettingsPopup'

export default class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            exitPopupVisible: false,
            rateUsPopupVisible: false,
            settingsPopupVisible: false,
        }

        this.props.navigation.addListener('focus', this.getLevelsData)
    }

    componentWillUnmount() {
        this.props.navigation.removeListener('focus', this.getLevelsData)
    }

    playButton = () => {
        this.props.navigation.navigate('LevelSelect')
    }

    exitButton = () => {
        this.setState({exitPopupVisible: true})
    }

    exitGame = () => {
        BackHandler.exitApp()
    }

    hideExitPopup = () => {
        this.setState({exitPopupVisible: false})
    }

    openStore = () => {
        if (Platform.OS === 'android')
            Linking.openURL('https://play.google.com/store/apps/details?id=com.onetyme.talk')
    }

    helpButton = () => {
        this.props.navigation.navigate('HowToPlay')
    }

    settingsButton = () => {
        this.setState({
            settingsPopupVisible: true,
        })
    }

    hideSettingsPopup = () => {
        this.setState({
            settingsPopupVisible: false
        })
    }

    hideRateUsPopup = () => {
        this.setState({rateUsPopupVisible: false})
    }

    getLevelsData = async () => {
        const levelsData = JSON.parse(await AsyncStorage.getItem('levelsData'))
        let shownRateUsPopup = JSON.parse(await AsyncStorage.getItem('rateUsPopup'))
        if (!shownRateUsPopup) shownRateUsPopup = []
        
        if (levelsData && levelsData.length >= 15) {
            if (!shownRateUsPopup || shownRateUsPopup.length < levelsData.length / 15) {
                this.setState({
                    rateUsPopupVisible: true
                })

                shownRateUsPopup.push(1)
                AsyncStorage.setItem('rateUsPopup', JSON.stringify(shownRateUsPopup))
            }
        }
    }

    render() {
        const {exitPopupVisible, rateUsPopupVisible, settingsPopupVisible} = this.state

        return(
            <View style={commonStyles.container}>
                <Background />
                <Header title='<Q | Logic>' onPressHelp={this.helpButton} />
                <View style={styles.buttonsContainer}>
                    <PrimaryButton style={styles.btn} onPress={this.playButton} title='Play' />
                    <PrimaryButton style={styles.btn} onPress={() => {}} title='Playground' />
                    <SecondaryButton style={styles.btn} onPress={this.exitButton} title='Exit' />
                </View>
                <Popup
                    visible={exitPopupVisible}
                    title={'Exit'}
                    info={'Are you sure you want to exit the game?'}
                    primaryBtnTitle={'Yes'}
                    primaryBtnAction={this.exitGame}
                    secondaryBtnTitle={'No'}
                    secondaryBtnAction={this.hideExitPopup}
                    cancelable={true}
                    onCancel={this.hideExitPopup}
                />
                <Popup
                    visible={rateUsPopupVisible}
                    title={'Enjoying QLogic?'}
                    info={'Rate us on the store!'}
                    primaryBtnTitle={'Yes'}
                    primaryBtnAction={this.openStore}
                    secondaryBtnTitle={'Not Now'}
                    secondaryBtnAction={this.hideRateUsPopup}
                    cancelable={true}
                    onCancel={this.hideRateUsPopup}
                />
                <SettingsPopup
                    visible={settingsPopupVisible}
                    onCancel={this.hideSettingsPopup}
                />
            </View>
        )
    }
}