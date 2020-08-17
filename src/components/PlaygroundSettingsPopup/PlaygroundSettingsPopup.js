import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
} from 'react-native'
import commonStyles from 'common/styles'
import styles from './styles'
import PrimaryButton from 'components/PrimaryButton/PrimaryButton'
import SecondaryButton from 'components/SecondaryButton/SecondaryButton'
import AsyncStorage from '@react-native-community/async-storage'
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome'
import Colors from 'common/Colors'

export default class PlaygroundSettingsPopup extends Component {

    constructor(props){
        super(props)
        this.state = {
            popupScale: new Animated.Value(0),
        }
    }

    onChangeQubits = async (numQubits) => {
        this.props.onChangeQubits(numQubits)
    }


    render() {
        const {visible, onChangeQubits, onPressDone, onPressHome, selectedQubits} = this.props
        const {popupScale} = this.state

        if (!visible)
            return null

        Animated.spring(popupScale, {
            toValue: 1,
            friction: 7,
            useNativeDriver: true,
        }).start()

        return(
            <View style={[commonStyles.fullScreen, styles.container]}>
                <View style={[commonStyles.fullScreen, styles.container, commonStyles.popupBackground]} />
                <Animated.View style={[styles.popupContainer, {transform: [{scale: popupScale}]}]}>
                    <Text style={styles.title}>Playground </Text>
                    <View style={styles.qubitSelectionContainer}>
                        <Text style={styles.subHeadingText}>
                            Choose how many qubits you want to work with:
                        </Text>
                        <View style={styles.qubitButtonsRow}>
                            <TouchableOpacity style={[styles.qubitSwitchBtn, styles.qubitSwitchBtn_left, selectedQubits === 1 ? styles.qubitSwitchBtn_left_selected : null]} onPress={() => this.onChangeQubits(1)}>
                                <Text style={[styles.qubitBtnTitle, selectedQubits === 1 ? styles.selectedBtnTitle : null]}>1 Qubit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.qubitSwitchBtn, styles.qubitSwitchBtn_center, selectedQubits === 2 ? styles.qubitSwitchBtn_center_selected : null]} onPress={() => this.onChangeQubits(2)}>
                                <Text style={[styles.qubitBtnTitle, selectedQubits === 2 ? styles.selectedBtnTitle : null]}>2 Qubits</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.qubitSwitchBtn, styles.qubitSwitchBtn_right, selectedQubits === 3 ? styles.qubitSwitchBtn_right_selected : null]} onPress={() => this.onChangeQubits(3)}>
                                <Text style={[styles.qubitBtnTitle, selectedQubits === 3 ? styles.selectedBtnTitle : null]}>3 Qubits</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <SecondaryButton prefixIcon={'home'} title={'Home'} style={styles.btn} onPress={onPressHome} />
                        <PrimaryButton prefixIcon={'check'} title={'Done'} style={styles.btn} onPress={onPressDone} />
                    </View>
                </Animated.View>
            </View>
        )
    }
}