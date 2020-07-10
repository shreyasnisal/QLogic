import React, {Component} from 'react'
import {
    Platform,
    View,
    Text,
    TouchableOpacity,
} from 'react-native'
import commonStyles from 'common/styles'
import styles from './styles'
import PrimaryButton from 'components/PrimaryButton/PrimaryButton'
import SecondaryButton from 'components/SecondaryButton/SecondaryButton'

export default class Popup extends Component {

    render() {
        const {visible, title, info, primaryBtnTitle, secondaryBtnTitle, primaryBtnAction, secondaryBtnAction, cancelable, onCancel} = this.props

        if (visible) {
            return(
                <TouchableOpacity style={[commonStyles.fullScreen, styles.container]} disabled={!cancelable} onPress={onCancel}>
                    <View style={[commonStyles.fullScreen, styles.container, styles.background]} />
                    <View style={styles.popupContainer}>
                        <View style={styles.popupHeaderContainer}>
                            <Text style={styles.title}>{title}</Text>
                        </View>
                        <View style={styles.popupInfoContainer}>
                            <Text style={styles.infoText}>{info}</Text>
                        </View>
                        <View style={styles.btnContainer}>
                            <PrimaryButton style={styles.btn} title={primaryBtnTitle} titleStyle={styles.btnText} onPress={primaryBtnAction} />
                            {secondaryBtnTitle && <SecondaryButton style={styles.btn} title={secondaryBtnTitle} titleStyle={styles.btnText} onPress={secondaryBtnAction} />}
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }

        else {
            return null;
        }
    }
}