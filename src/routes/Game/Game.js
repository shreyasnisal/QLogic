import React, {Component} from 'react'
import {
    Platform,
    Text,
    View,
    ActivityIndicator,
    ScrollView,
    TouchableOpacity,
} from 'react-native'
import commonStyles from 'common/styles'
import styles from './styles'
import Levels from 'common/Levels'
import Colors from 'common/Colors'
import * as GateOperations from 'common/GateOperations'
import Gates from 'common/Gates'
import { getMultiQubitGate } from '../../common/GateOperations'
import Popup from 'components/Popup/Popup'
import Gate from 'components/Gate/Gate'
import Header from 'components/Header/Header'
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import LevelCompletePopup from 'components/LevelCompletePopup/LevelCompletePopup'
import AsyncStorage from '@react-native-community/async-storage'

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
            selectedGate: null,
            loading: false,
            levelCompleted: false,
            replayPopupVisible: false,
            moves: 0,
            stars: 1,
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

    resetLevel = () => {
        const {levelId} = this.state
        const gateHistory = []
        for (let i = 0; i < Levels[levelId].numQubits; i++) {
            gateHistory[i] = []
        }

        this.setState({
            currentState: Levels[levelId].initialState,
            gateHistory: gateHistory,
            levelCompleted: false,
            resetPopupVisible: false,
        })
    }

    nextLevel = () => {
        const {levelId} = this.state

        this.props.navigation.goBack()
        this.props.navigation.navigate('Game', {levelId: levelId + 1})
    }
    
    checkCompletion = (currentState, targetState) => {
        if (currentState.length !== targetState.length)
            return false
        
        for (let i = 0; i < currentState.length; i++) {
            for (let j = 0; j < currentState[i].length; j++) {
                if (currentState[i][j] !== targetState[i][j])
                    return false
            }
        }

        return true
    }

    levelComplete = async () => {
        let levelsData = JSON.parse(await AsyncStorage.getItem('levelsData'))
        if (!levelsData) levelsData = []
        const {moves, levelId} = this.state
        let stars = 1

        if (moves <= Levels[levelId].minMoves) {
            stars = 3
        }
        else if (moves <= Levels[levelId].maxMoves_2star) {
            stars = 2
        }

        levelsData[levelId] = stars
        AsyncStorage.setItem('levelsData', JSON.stringify(levelsData))

        this.setState({
            stars: stars,
            levelCompleted: true,
        })
    }

    selectGate = (gateName) => {
        this.setState({
            selectedGate: gateName
        })
    }

    placeGate = (qubitIndex) => {

        this.setState({
            loading: true
        })

        const {gateHistory, selectedGate, numQubits, currentState, moves, targetState} = this.state
        gateHistory[qubitIndex].push(selectedGate)

        const gateMatrix = GateOperations.getMultiQubitGate(selectedGate, qubitIndex, numQubits)
        const newState = GateOperations.operateGate(gateMatrix, currentState)
        if (this.checkCompletion(newState, targetState)) {
            this.levelComplete()
        }

        for (let i = 0; i < numQubits; i++) {
            if (i !== qubitIndex)
                gateHistory[i].push('-')
        }

        this.setState({
            loading: false,
            moves: moves + 1,
        })
    }


    renderQubitGates(qubitGates, qubitIndex) {

        return(
            <View key={qubitIndex} style={styles.qubitGateHistoryContainer}>
                <View style={styles.initialQubitContainer}>
                    <Text style={styles.initialQubitText}>{`qubit-${qubitIndex}`}</Text>
                </View>
                {
                    qubitGates.map((value, index) => {
                        if (value !== '-') {
                            return (
                                <>
                                    <View style={styles.connectingLine} />
                                    <Gate
                                        name={value}
                                        style={styles.appliedGate}
                                        disabled={true}
                                    />
                                </>
                            )
                        }
                        else {
                            return (
                                <View style={styles.blankLine} />
                            )
                        }
                    })
                }
                <View style={styles.connectingLine} />
                <TouchableOpacity style={styles.gatePlaceContainer} onPress={() => this.placeGate(qubitIndex)}>
                    <MaterialCommunityIcons name='circle-outline' size={40} color={Colors.headerTextColor} />
                </TouchableOpacity>
            </View>
        )
    }

    render() {

        const {gateHistory, exitPopupVisible, usableGates, levelCompleted, stars} = this.state

        return(
            <View style={commonStyles.container}>
                <Header onPressBack={this.showExitPopup} />
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
                                    onPress={() => {this.selectGate(value)}}
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
                <LevelCompletePopup
                    visible={levelCompleted}
                    stars={stars}
                    onPressMenu={this.exitToMenu}
                    onPressReplay={this.resetLevel}
                    onPressNext={this.nextLevel}
                />
            </View>
        )
    }
}