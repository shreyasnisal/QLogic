import React, {Component} from 'react'
import {
    Platform,
    View,
    Text,
    TouchableOpacity,
    Animated,
} from 'react-native'
import commonStyles from 'common/styles'
import styles from './styles'
import PrimaryButton from 'components/PrimaryButton/PrimaryButton'
import SecondaryButton from 'components/SecondaryButton/SecondaryButton'

export default class Popup extends Component {

    constructor(props) {
        super(props)

        this.state = {
            popupScale: new Animated.Value(0),
        }
    }

    render() {
        const {visible, title, info, primaryBtnTitle, secondaryBtnTitle, primaryBtnAction, secondaryBtnAction, cancelable, onCancel} = this.props
        const {popupScale} = this.state

        if (!visible) return null

        Animated.spring(popupScale, {
            toValue: 1,
            friction: 5,
            useNativeDriver: true,
        }).start()

        return(
            <TouchableOpacity style={[commonStyles.fullScreen, styles.container]} disabled={cancelable ? !cancelable : true} onPress={onCancel ? onCancel : () => {}}>
                <View style={[commonStyles.fullScreen, styles.container, commonStyles.popupBackground]} />
                <Animated.View style={[styles.popupContainer, {transform: [{scale: popupScale}]}]}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.infoText}>{info}</Text>
                    <View style={styles.btnContainer}>
                        {secondaryBtnTitle && <SecondaryButton style={styles.btn} title={secondaryBtnTitle} titleStyle={styles.btnText} onPress={secondaryBtnAction} />}
                        <PrimaryButton style={styles.btn} title={primaryBtnTitle} titleStyle={styles.btnText} onPress={primaryBtnAction} />
                    </View>
                </Animated.View>
            </TouchableOpacity>
        )

    }
}