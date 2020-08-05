import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    Image,
    Linking,
} from 'react-native'
import commonStyles from 'common/styles'
import styles from './styles'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome'
import Colors from 'common/Colors'
import SecondaryButton from '../SecondaryButton/SecondaryButton'
import PrimaryButton from '../PrimaryButton/PrimaryButton'
import Toast from '../Toast/Toast'

export default class LevelCompletePopup extends Component {

    coinIncrementTimer = null

    constructor(props) {
        super(props)
        this.state = {
            popupScale: new Animated.Value(0),
            star1Scale: new Animated.Value(0),
            star2Scale: new Animated.Value(0),
            star3Scale: new Animated.Value(0),
            showLevel: false,
            coinsEarned: 0,
        }
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.visible && this.props.visible) {

            setTimeout(() => this.coinIncrementFunction(this.props.stars), 1500)
        }
        else if (prevProps.visible && !this.props.visible) {
            this.setState({
                coinsEarned: 0,
            })
        }
    }
    
    coinIncrementFunction = async (stars) => {

        const {prevStars} = this.props

        const totalCoins = stars * 5 + (stars === 3 ? 5 : 0) - ((prevStars) ? prevStars * 5 + (prevStars === 3 ? 5 : 0) : 0)

        if (totalCoins !== 0) {
            this.coinIncrementTimer = setInterval(() => {
                this.setState({
                    coinsEarned: this.state.coinsEarned + 1,
                }, () => {
                    if (this.state.coinsEarned === totalCoins)
                        clearInterval(this.coinIncrementTimer)
                })
            }, 50)
        }
    }

    onPressWhatsApp = () => {
        const text = `OMG! I just completed Level ${this.props.levelNumber} on QLogic!\n\nhttps://play.google.com/store/apps/details?id=com.paltangames.qlogic`
        Linking.openURL('whatsapp://send?text=' + text)
    }

    onPressTwitter = () => {
        const text = `OMG! I just completed Level ${this.props.levelNumber} on QLogic!\n\nhttps://play.google.com/store/apps/details?id=com.paltangames.qlogic`
        Linking.openURL('https://twitter.com/intent/tweet?text=' + text)
    }

    render() {
        const {levelNumber, stars, visible, onPressMenu, onPressReplay, onPressNext, onCancel, status, onPressWhatsApp, onPressTwitter, coins} = this.props
        const {popupScale, star1Scale, star2Scale, star3Scale, coinsEarned} = this.state

        if (!visible) return null;

        if (this.state.showLevel) {
            return(
                <View style={styles.toastContainer}>
                    <Toast visible={true} text={'Level Completed'} style={styles.toast} />
                </View>
            )
        }

        Animated.spring(popupScale, {
            toValue: 1,
            friction: 7,
            useNativeDriver: true,
        }).start()

        Animated.spring(star1Scale, {
            toValue: 1,
            friction: 2,
            delay: 200,
            useNativeDriver: true,
        }).start()

        Animated.spring(star2Scale, {
            toValue: 1,
            friction: 2,
            delay: 500,
            useNativeDriver: true,
        }).start()

        Animated.spring(star3Scale, {
            toValue: 1,
            friction: 2,
            delay: 800,
            useNativeDriver: true,
        }).start()

        if (status === 'FAIL') {
            return(
                <View style={[commonStyles.fullScreen, styles.container]}>
                    <View style={[commonStyles.fullScreen, styles.container, commonStyles.popupBackground]} />
                    <Animated.View style={[styles.popupContainer, {transform: [{scale: popupScale}]}]}>
                        <Text style={styles.title}>Level Failed!</Text>
                        <Text style={styles.infoText}>Looks like you're out of time.</Text>
                        <View style={styles.starsRow}>
                            <Animated.View style={{transform: [{scale: star1Scale}]}}>
                                <FontAwesome style={styles.icon} name='star-o' size={60} color={Colors.headerTextColor} />
                            </Animated.View>
                            {<Animated.View style={{transform: [{scale: star2Scale}]}}>
                                <FontAwesome style={styles.icon} name={'star-o'} size={60} color={stars >= 2 ? Colors.buttonColor : Colors.headerTextColor} />
                            </Animated.View>}
                            {<Animated.View style={{transform: [{scale: star3Scale}]}}>
                                <FontAwesome style={styles.icon} name={'star-o'} size={60} color={stars == 3 ? Colors.buttonColor : Colors.headerTextColor} />
                            </Animated.View>}
                        </View>
                        <View style={styles.buttonsRow}>
                            <SecondaryButton onPress={onPressMenu} title='Menu' prefixIcon='menu' style={styles.nextBtn} />
                            <PrimaryButton onPress={onPressReplay} title='Restart' prefixIcon='refresh' style={styles.nextBtn} />
                        </View>
                    </Animated.View>
                </View>
            )
        }


        return(
            <View style={[commonStyles.fullScreen, styles.container]}>
                <TouchableOpacity style={[commonStyles.fullScreen, styles.container, commonStyles.popupBackground]} onPress={() => this.setState({showLevel: true})} />
                <Animated.View style={[styles.popupContainer, {transform: [{scale: popupScale}]}]}>
                    <View style={styles.topRow}>
                        <Text style={styles.title}>Level Completed!</Text>
                        <View style={styles.coinContainer}>
                            <Text style={styles.coinText}>{coinsEarned} </Text>
                            <Image source={require('../../assets/images/qcoin.png')} style={styles.coinImage} />
                        </View>
                    </View>
                    <Text style={styles.infoText}>Congratulations on completing Level {levelNumber}!</Text>
                    <View style={styles.starsRow}>
                        <Animated.View style={{transform: [{scale: star1Scale}]}}>
                            <FontAwesome style={styles.icon} name='star' size={60} color={Colors.buttonColor} />
                        </Animated.View>
                        {<Animated.View style={{transform: [{scale: star2Scale}]}}>
                            <FontAwesome style={styles.icon} name={stars >= 2 ? 'star' : 'star-o'} size={60} color={stars >= 2 ? Colors.buttonColor : Colors.headerTextColor} />
                        </Animated.View>}
                        {<Animated.View style={{transform: [{scale: star3Scale}]}}>
                            <FontAwesome style={styles.icon} name={stars == 3 ? 'star' : 'star-o'} size={60} color={stars == 3 ? Colors.buttonColor : Colors.headerTextColor} />
                        </Animated.View>}
                    </View>
                    <View style={styles.buttonsRow}>
                        <SecondaryButton onPress={onPressMenu} prefixIcon='menu' style={styles.btn} />
                        <SecondaryButton onPress={onPressReplay} prefixIcon='refresh' style={styles.btn} />
                        <SecondaryButton onPress={this.onPressWhatsApp} prefixIcon='whatsapp' isCommunityIcon={true} style={styles.btn} />
                        <SecondaryButton onPress={this.onPressTwitter} prefixIcon='twitter' isCommunityIcon={true} style={styles.btn} />
                        {onPressNext && <PrimaryButton onPress={onPressNext} title='Next' prefixIcon='chevron-right' style={styles.nextBtn} />}
                    </View>
                </Animated.View>
            </View>
        )
    }
}