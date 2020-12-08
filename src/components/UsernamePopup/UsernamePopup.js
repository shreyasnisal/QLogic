import React, {Component} from 'react'
import {
    Platform,
    View,
    Text,
    TextInput,
    Animated,
} from 'react-native'
import commonStyles from 'common/styles'
import styles from './styles'
import Colors from 'common/Colors'
import PrimaryButton from 'components/PrimaryButton/PrimaryButton'
import SecondaryButton from 'components/SecondaryButton/SecondaryButton'

export default class UsernamePopup extends Component {

    constructor(props) {
        super(props)

        this.state = {
            popupScale: new Animated.Value(0),
        }
    }

    verifyAvailabilityBtn = async () => {

    }

    render() {
        const {visible, onPressVerify, onPressSubmit, verified} = this.props
        const {popupScale} = this.state

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
                    <Text style={styles.title}>Enter Display Name </Text>
                    <Text style={styles.infoText}>We have new features in the game for which we need a display name!</Text>
                    <Text style={styles.textInputLabel}>Display Name</Text>
                    <TextInput
                        style={styles.textInput}
                        autoCapitalize='none'
                    />
                    <View style={styles.singleBtnContainer}>
                        {!verified && <SecondaryButton style={styles.btn} title={'Verify Availability'} titleStyle={styles.btnText} onPress={onPressVerify} />}
                        {verified && <PrimaryButton style={styles.btn} title={'Save'} titleStyle={styles.btnText} onPress={onPressSubmit} />}
                    </View>
                </Animated.View>
            </View>
        )
    }


}