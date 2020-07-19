import React, {Component} from 'react'
import {
    Platform,
    Text,
    View,
    ActivityIndicator,
    ScrollView,
} from 'react-native'
import commonStyles from 'common/styles'
import styles from './styles'
import Levels from 'common/Levels'
import Colors from 'common/Colors'
import * as GateOperations from 'common/GateOperations'
import { getMultiQubitGate } from '../../common/GateOperations'
import BackButton from 'components/BackButton/BackButton'
import Popup from 'components/Popup/Popup'
import Gate from 'components/Gate/Gate'

export default class Game extends Component {

    constructor(props) {
        super(props)

        // recieve level id from the level select screen
        const {levelId} = this.props.route.params

        // set gateHistory array to contain arrays according to number of qubits
        const gateHistory = []
        for (let i = 0; i < Levels[levelId].numQubits; i++) {
            gateHistory[i] = []
        }

        // add required variables to component's state
        this.state = {
            levelId: levelId,
            currentState: Levels[levelId].initialState,
            targetState: Levels[levelId].targetState,
            numQubits: Levels[levelId].numQubits,
            usableGates: Levels[levelId].gates,
            gateHistory: gateHistory,
            exitPopupVisible: false,
        }
    }

    showExitPopup = () => {
        this.setState({
            exitPopupVisible: true
        })
    }

    hideExitPopup = () => {
        this.setState({
            exitPopupVisible: false
        })
    }

    exitToMenu = () => {
        this.props.navigation.navigate('LevelSelect')
    }


    renderQubitGates(qubitGates, qubitIndex) {

        return(
            <View key={qubitIndex} style={styles.qubitGateHistoryContainer}>
                <View style={styles.initialQubitContainer}>
                    <Text style={styles.initialQubitText}>{`qubit-${qubitIndex}`}</Text>
                </View>
                {
                    qubitGates.map((value, index) => {
                        {this.renderGate(value, index)}
                    })
                }
            </View>
        )
    }

    render() {

        const {gateHistory, exitPopupVisible, usableGates} = this.state

        return(
            <View style={commonStyles.container}>
                <BackButton onPress={this.showExitPopup} />
                <View style={styles.gatesContainer}>
                    {
                        // render usable gate buttons
                        usableGates.map((value, index) => {
                            return (
                                <Gate
                                    key={index}
                                    name={value}
                                    style={styles.gateBtn}
                                    disabled={false}
                                    onPress={() => {}}
                                />
                            )
                        })
                    }
                </View>
                {
                    //render qubits
                    gateHistory.map((value, index) => {
                        return this.renderQubitGates(value, index)
                    })
                }
                <Popup
                    visible={exitPopupVisible}
                    title={'Exit'}
                    info={'Are you sure you want to return to the menu? All your progress in this level will be lost.'}
                    primaryBtnTitle={'Yes'}
                    primaryBtnAction={this.exitToMenu}
                    secondaryBtnTitle={'No'}
                    secondaryBtnAction={this.hideExitPopup}
                    cancelable={true}
                    onCancel={this.hideExitPopup}
                />
            </View>
        )
    }
}