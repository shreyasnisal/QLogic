import React, {Component} from 'react'
import {
    View,
    Text,
    Animated,
    Dimensions,
    Image,
} from 'react-native'
import Background from 'components/Background/Background'
import commonStyles from 'common/styles'
import styles from './styles'
import Toast from 'components/Toast/Toast'
import LoadingTips from 'common/LoadingTips'

export default class Loading extends Component {
    constructor(props) {
        super(props)

        //get a random loading tip
        const tipIndex = Math.floor(Math.random() * LoadingTips.length)

        this.state = {
            toastOpacity: new Animated.Value(1),
            tipText: LoadingTips[tipIndex],
        }

        this.fadeOutAnimation()

        setTimeout(() => this.props.navigation.navigate('Home'), 6000)
    }

    fadeInAnimation = () => {
        Animated.timing(this.state.toastOpacity, {
            toValue: 1,
            useNativeDriver: true,
        }).start(() => this.fadeOutAnimation())
    }

    fadeOutAnimation = () => {
        Animated.timing(this.state.toastOpacity, {
            toValue: 0.5,
            useNativeDriver: true,
        }).start(() => this.fadeInAnimation())
    }

    render() {
        return(
            <View style={commonStyles.container}>
                <Background style={{top: 0, height: Dimensions.get('screen').height}} />
                <View style={styles.screenCenter}>
                    <Image source={require('../../assets/images/splash_icon.png')} style={styles.image} />
                </View>
                <Animated.View style={[styles.toastContainer, {opacity: this.state.toastOpacity}]}>
                    <Toast visible text='Loading...' style={[styles.toast]} />
                </Animated.View>
                <View style={styles.tipTextContainer}>
                    <Text style={styles.tipText}>{this.state.tipText}</Text>
                </View>
            </View>
        )
    }
}