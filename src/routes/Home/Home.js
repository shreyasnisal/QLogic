import React, {Component} from 'react'
import {
    View,
    Text,
    Platform,
    BackHandler,
    Linking,
    Settings,
    Image,
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
            coins: 0,
        }

        this.props.navigation.addListener('focus', this.getData)
        BackHandler.addEventListener('hardwareBackPress', this.hardwareBackPress)
    }

    componentWillUnmount() {
        this.props.navigation.removeListener('focus', this.getLevelsData)
        BackHandler.removeEventListener('hardwareBackPress', this.hardwareBackPress)
    }

    hardwareBackPress = () => {
        const {exitPopupVisible, rateUsPopupVisible} = this.state

        if (exitPopupVisible) {
            this.hideExitPopup()
        }
        else if (rateUsPopupVisible) {
            this.hideRateUsPopup()
        }
        else {
            this.exitButton()
        }

        return true

    }

    playButton = () => {
        this.props.navigation.navigate('LevelSelect')
    }

    timeAttackButton = () => {
        this.props.navigation.navigate('TimeAttack')
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

        AsyncStorage.setItem('rated', JSON.stringify(true))

        if (Platform.OS === 'android')
            Linking.openURL('https://play.google.com/store/apps/details?id=com.paltangames.qlogic')
    
        this.hideRateUsPopup()
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

    getData = async => {
        this.getLevelsData()
        this.getCoinsData()
    }

    getLevelsData = async () => {
        const levelsData = JSON.parse(await AsyncStorage.getItem('levelsData'))
        const rated = JSON.parse(await AsyncStorage.getItem('rated'))
        let shownRateUsPopup = JSON.parse(await AsyncStorage.getItem('rateUsPopup'))
        if (!shownRateUsPopup) shownRateUsPopup = []
        
        if (levelsData && !rated && levelsData.length >= 15) {
            if (!shownRateUsPopup || shownRateUsPopup.length < levelsData.length / 15) {
                this.setState({
                    rateUsPopupVisible: true
                })

                shownRateUsPopup.push(1)
                AsyncStorage.setItem('rateUsPopup', JSON.stringify(shownRateUsPopup))
            }
        }
    }

    getCoinsData = async () => {
        const coins = JSON.parse(await AsyncStorage.getItem('coins'))
        this.setState({
            coins: coins ? coins : 0,
        })
    }

    render() {
        const {exitPopupVisible, rateUsPopupVisible, settingsPopupVisible, coins} = this.state

        return(
            <View style={commonStyles.container}>
                <Background />
                <Header title='<Q | Logic>' />
                <View style={styles.buttonsContainer}>
                    <PrimaryButton style={styles.btn} onPress={this.playButton} title='Play' />
                    <PrimaryButton style={styles.btn} onPress={this.timeAttackButton} title='Time Attack' />
                    <SecondaryButton style={styles.btn} onPress={this.helpButton} title='How to Play' />
                    <SecondaryButton style={styles.btn} onPress={this.exitButton} title='Exit' />
                </View>
                <View style={styles.coinContainer}>
                    <Text style={styles.coinText}>{coins}</Text>
                    <Image source={require('../../assets/images/qcoin.png')} style={styles.coinImage} />
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
                    info={'If you are enjoying our game, please take a moment to rate us on the Play Store.'}
                    primaryBtnTitle={'Yes'}
                    primaryBtnAction={this.openStore}
                    secondaryBtnTitle={'Not Now'}
                    secondaryBtnAction={this.hideRateUsPopup}
                />
                <SettingsPopup
                    visible={settingsPopupVisible}
                    onCancel={this.hideSettingsPopup}
                />
            </View>
        )
    }
}