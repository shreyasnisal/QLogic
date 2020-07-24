import React, {Component} from 'react'
import {
    Platform,
    Text,
    View,
    ActivityIndicator,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    findNodeHandle,
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
import Line from 'components/Line/Line'

export default class Game extends Component {

    liney1 = null

    constructor(props) {
        super(props)

        // recieve level id from the level select screen
        const {levelId} = this.props.route.params

        // set gateHistory array to contain arrays according to number of qubits
        const gateHistory = []
        for (let i = 0; i < Levels[levelId].numQubits; i++) {
            gateHistory[i] = []
        }

        if (levelId === 0) {
            this.showIntro()
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
            controlQubit: null,
            lines: [],
            tipPopupVisible: true,
            introPopupVisible: false,
        }
    }

    showIntro = async () => {
        const shownIntro = JSON.parse(await AsyncStorage.getItem('shownIntro'))

        if (!shownIntro) {
            this.setState({
                introPopupVisible: true,
                tipPopupVisible: false,
            })
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

    hideTipPopup = () => {
        this.setState({
            tipPopupVisible: false,
        })
    }

    hideIntroPopup = () => {
        AsyncStorage.setItem('shownIntro', JSON.stringify(true))

        this.setState({
            introPopupVisible: false,
            tipPopupVisible: true,
        })
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

    addLine = (xPos, y2, qubitIndex) => {
        const y1 = this.liney1
        const {lines} = this.state
        lines.push(<Line xPosition={xPos} bottom={y2} top={y1} />)
        this.setState({lines: lines})

        this.liney1 = null
    }

    selectGate = (gateName) => {

        if (gateName[0] === 'C') {
            this.setState({
                selectedGate: gateName + '_c',
            })
        }
        else {
            this.setState({
                selectedGate: gateName
            })
        }
    }

    placeGate = (qubitIndex) => {

        const {gateHistory, selectedGate, numQubits, currentState, moves, targetState, controlQubit} = this.state
        let gateMatrix = null
        let newState = null

        this.setState({
            loading: true
        })

        if (!selectedGate) {
            this.setState({
                loading: false,
            })
            return
        }

        if (controlQubit === qubitIndex) {
            this.setState({
                loading: false,
            })
            return
        }

        gateHistory[qubitIndex].push(selectedGate)

        if (selectedGate[selectedGate.length - 1] === 'c') {
            const newGate = selectedGate[0] + selectedGate[1] + selectedGate[2] + 't'
            
            this.setState({
                controlQubit: qubitIndex,
                selectedGate: newGate
            })
        }
        else {
            if (selectedGate[selectedGate.length - 1] === 't') {
                gateMatrix = GateOperations.getControlGate(selectedGate[1], numQubits, controlQubit, qubitIndex)
            }
            else {
                gateMatrix = GateOperations.getMultiQubitGate(selectedGate, qubitIndex, numQubits)
            }
            newState = GateOperations.operateGate(gateMatrix, currentState)
            
            if (this.checkCompletion(newState, targetState)) {
                this.levelComplete()
            }
    
            for (let i = 0; i < numQubits; i++) {
                if ((i !== qubitIndex) && i !== controlQubit)
                    gateHistory[i].push('-')
            }

            this.setState({
                controlQubit: null,
                moves: moves + 1,
                selectedGate: null,
            })
        }

        this.setState({
            loading: false,
        })
    }


    renderQubitGates(qubitGates, qubitIndex) {
        
        const {selectedGate, controlQubit} = this.state

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
                                        parentScrollView={this.gameScrollView}
                                        onLayoutCallback={(x, y, width, height, pageX, pageY) => {
                                            if (value[value.length - 1] === 'c') {
                                                this.liney1 = y + height/2
                                            }
                                            else if (value[value.length - 1] === 't') {
                                                this.addLine(x + width/2, y + height/2)
                                            }
                                        }}
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
                {
                    <>
                        <View style={styles.connectingLine} />
                        <TouchableOpacity style={styles.gatePlaceContainer} onPress={() => this.placeGate(qubitIndex)}>
                            <MaterialCommunityIcons name='circle-outline' size={40} color={Colors.headerTextColor} />
                        </TouchableOpacity>
                    </>
                }
            </View>
        )
    }

    render() {

        const {gateHistory, exitPopupVisible, usableGates, levelCompleted, stars, lines, tipPopupVisible, levelId, introPopupVisible} = this.state

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
                <ScrollView
                    horizontal
                    contentContainerStyle={styles.gameScrollView}
                    ref={ref => {this.gameScrollView = ref}}
                >
                    {lines.map((value, index) => {
                        return value
                    })}
                    {
                        //render qubits
                        gateHistory.map((value, index) => {
                            return this.renderQubitGates(value, index)
                        })
                    }
                </ScrollView>
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
                {Levels[levelId].tipText && <Popup
                    visible={tipPopupVisible}
                    title={Levels[levelId].tipHeading}
                    info={Levels[levelId].tipText}
                    primaryBtnTitle={'Okay'}
                    primaryBtnAction={this.hideTipPopup}
                />}
                {levelId === 0 && <Popup
                    visible={introPopupVisible}
                    title={'Welcome to QLogic!'}
                    info={'Your aim is to use quantum gates and take quantum bits (qubits) to the final state given in each level. Happy quantum-puzzling!'}
                    primaryBtnTitle={'Let\'s Play!'}
                    primaryBtnAction={this.hideIntroPopup}
                />}
            </View>
        )
    }
}