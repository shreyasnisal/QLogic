import React, {Component} from 'react'
import {
    Platform,
    View,
    Text,
    Animated,
    Image,
    Linking,
} from 'react-native'
import PrimaryButton from 'components/PrimaryButton/PrimaryButton'
import SecondaryButton from 'components/SecondaryButton/SecondaryButton'
import commonStyles from 'common/styles'
import styles from './styles'
import Colors from 'common/Colors'
import AsyncStorage from '@react-native-community/async-storage'

export default class TimeAttackCompletePopup extends Component {

    constructor(props) {
        super(props)

        this.state = {
            popupScale: new Animated.Value(0),
            scoreText: 0,
            coinsText: 0,
            highscore: 0,
            headingText: 'Well Done!',
            subHeadingText: '',
            isHighScore: false,
        }
    }

    getHighscore = async () => {
        const {numQubits, score} = this.props
        let highscore = JSON.parse(await AsyncStorage.getItem(`timeAttack_highscore_${numQubits}qubits`))
        if (!highscore) highscore = 0
        let headingText = ''
        let subHeadingText = ''

        if (score > highscore) {
            headingText = 'New Personal Best!'
            highscore = score
            this.setHighscore()
            this.setState({isHighScore: true})
        }
        else if (score === 0) {
            headingText = 'Try Again'
            subHeadingText = 'Oh no! Try again to get a better score'
        }
        else {
            headingText = 'Well Done!'
        }

        this.setState({
            highscore: highscore,
            headingText: headingText,
            subHeadingText: subHeadingText,
        })
    }

    setHighscore = () => {
        const {numQubits, score} = this.props

        AsyncStorage.setItem(`timeAttack_highscore_${numQubits}qubits`, JSON.stringify(score))
        
    }

    startAnimations = () => {
        this.startScoreAnimation()
    }

    startScoreAnimation = () => {
        const {highscoreTextScale} = this.state

        if (this.props.score !== 0) {
            const timer = setInterval(() => {
                this.setState({
                    scoreText: this.state.scoreText + 1,
                }, () => {
                    if (this.state.scoreText === this.props.score) {
                        clearInterval(timer)
                        this.startCoinsAnimation()
                    }
                })
            }, Math.ceil(10 / this.props.score))
        }
    }

    startCoinsAnimation = () => {

        if (this.state.score !== 0) {
            const timer = setInterval(() => {
                this.setState({
                    coinsText: this.state.coinsText + 1,
                }, () => {
                    if (this.state.coinsText === this.props.score) {
                        clearInterval(timer)
                    }
                })
            }, Math.ceil(10 / this.props.score))
        }
    }

    addCoins = async () => {
        let playerCoins = JSON.parse(await AsyncStorage.getItem('coins'))
        if (!playerCoins) playerCoins = 0

        const coins = this.props.score

        AsyncStorage.setItem('coins', JSON.stringify(playerCoins + coins))
    }

    onPressWhatsApp = () => {
        const text = `OMG! I just score ${this.props.score} in 2-Qubit Time Attack in QLogic! I challenge you to beat my score!\n\nhttps://play.google.com/store/apps/details?id=com.paltangames.qlogic`
        Linking.openURL('whatsapp://send?text=' + text)
    }

    onPressTwitter = () => {
        const text = `OMG! I just score ${this.props.score} in 2-Qubit Time Attack in QLogic! I challenge you to beat my score!\n\nhttps://play.google.com/store/apps/details?id=com.paltangames.qlogic`
        Linking.openURL('https://twitter.com/intent/tweet?text=' + text)
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.visible && this.props.visible) {
            this.getHighscore()
            setTimeout(() => this.startScoreAnimation(), 500)
            this.addCoins()
        }
        else if (prevProps.visible && !this.props.visible) {
            this.resetPopupState()
        }
    }

    resetPopupState = () => {
        this.setState({
            popupScale: new Animated.Value(0),
            scoreText: 0,
            coinsText: 0,
            highscore: 0,
            headingText: 'Well Done!',
            subHeadingText: '',
            isHighScore: false,
        })
    }

    render() {
        const {visible, score, numQubits, onPressHome, onPressRestart, moves} = this.props
        const {popupScale, scoreText, highscore, headingText, subHeadingText, coinsText, scoreTextScale, highscoreTextScale} = this.state

        if (!visible) return null

        Animated.spring(popupScale, {
            toValue: 1,
            friction: 7,
            useNativeDriver: true,
        }).start()

        return(
            <View style={[commonStyles.fullScreen, styles.container]}>
                <View style={[commonStyles.fullScreen, styles.container, commonStyles.popupBackground]} />
                <Animated.View style={[styles.popupContainer, {transform: [{scale: popupScale}]}]}>
                    <View style={styles.topRow}>
                        <Text style={styles.title}>{headingText} </Text>
                        <View style={styles.coinContainer}>
                            <Text style={styles.coinText}>{coinsText}</Text>
                            <Image source={require('../../assets/images/qcoin.png')} style={styles.coinImage} />
                        </View>
                    </View>
                    <Text style={styles.subHeadingText}>
                        {subHeadingText}
                    </Text>
                    <Text style={styles.scoreText}>{scoreText}</Text>
                    <View style={[styles.row]}>
                        <View style={styles.dataRow}>
                            <Text style={styles.label}>Personal Best: </Text>
                            <Text style={styles.label}>{highscore}</Text>
                        </View>
                        <View style={styles.dataRow}>
                            <Text style={styles.label}>Moves: </Text>
                            <Text style={styles.label}>{moves}</Text>
                        </View>
                    </View>
                    <View style={styles.btnRow}>
                        <SecondaryButton onPress={onPressHome} prefixIcon='home' style={styles.btn} />
                        <SecondaryButton onPress={this.onPressWhatsApp} prefixIcon='whatsapp' isCommunityIcon={true} style={styles.btn} />
                        <SecondaryButton onPress={this.onPressTwitter} prefixIcon='twitter' isCommunityIcon={true} style={styles.btn} />
                        <PrimaryButton onPress={onPressRestart} title={'Play Again'} prefixIcon='refresh' style={styles.bigBtn} />
                    </View>
                </Animated.View>
            </View>
        )
    }
}