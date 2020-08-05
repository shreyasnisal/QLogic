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
    BackHandler,
} from 'react-native'
import commonStyles from 'common/styles'
import styles from './styles'
import Colors from 'common/Colors'
import * as GateOperations from 'common/GateOperations'
import Gates from 'common/Gates'
import { getMultiQubitGate } from '../../common/GateOperations'
import Popup from 'components/Popup/Popup'
import Gate from 'components/Gate/Gate'
import Header from 'components/Header/Header'
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import LevelCompletePopup from 'components/LevelCompletePopup/LevelCompletePopup'
import AsyncStorage from '@react-native-community/async-storage'
import Line from 'components/Line/Line'
import Toast from '../../components/Toast/Toast'

export default class TimeAttack extends Component {

    liney1 = null
    qubitContainer = []
    timer = null
    alertTimer = null

    constructor(props) {
        super(props)

        // set gateHistory array to contain arrays according to number of qubits
        const gateHistory = []
        for (let i = 0; i < 2; i++) {
            gateHistory[i] = []
        }

        // add required variables to component's state
        this.state = {
            currentState: [[1], [0], [0], [0]],
            numQubits: 2,
            gateHistory: gateHistory,
            exitPopupVisible: false,
            selectedGate: null,
            loading: false,
            isTimeUp: false,
            restartPopupVisible: false,
            moves: 0,
            score: 0,
            controlQubit: null,
            usableGates: ['X', 'Z', 'H', 'CX', 'CZ', 'CH'],
            lines: [],
            introPopupVisible: false,
            gameScrollViewWidth: Dimensions.get('screen').width,
            qubitLines: [],
            timeLeft: 15,
            timerColor: Colors.headerTextColor,
            achievedStates: [],
        }

        this.timer = setInterval(this.timerFunction, 1000)

        BackHandler.addEventListener('hardwareBackPress', this.hardwareBackPress)
    }

    timerFunction = () => {
        this.setState({timeLeft: this.state.timeLeft - 1}, () => {
            if (this.state.timeLeft === 10) {
                // start the alert timer
                this.alertTimer = setInterval(this.alertTimerFunction, 1000)
            }

            if (this.state.timeLeft === 0) {
                this.timeUpFunction()
                clearInterval(this.timer)
                clearInterval(this.alertTimer)
            }

        })
    }

    alertTimerFunction = () => {
        this.setState({
            timerColor: this.state.timerColor === Colors.headerTextColor ? Colors.alertRedColor : Colors.headerTextColor,
        })
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.hardwareBackPress)
    }

    hardwareBackPress = () => {
        const {introPopupVisible} = this.state

        if (introPopupVisible) {
            this.props.navigation.navigate('Home')
        }
        else {
            this.showExitPopup()
        }

        return true
    }

    showIntro = async () => {
        const shownIntro = JSON.parse(await AsyncStorage.getItem('shownTimeAttackIntro'))

        if (!shownIntro) {
            this.setState({
                introPopupVisible: true,
            })
        }
    }

    showExitPopup = () => {
        clearInterval(this.timer)
        this.setState({
            exitPopupVisible: true
        })
    }

    hideExitPopup = () => {
        setInterval(this.timerFunction, 1000)
        this.setState({
            exitPopupVisible: false
        })
    }

    exitToHome = () => {
        this.props.navigation.navigate('Home')
    }

    hideIntroPopup = () => {
        AsyncStorage.setItem('shownIntro', JSON.stringify(true))

        this.setState({
            introPopupVisible: false,
        })
    }
    
    restartButton = () => {
        clearInterval(this.timer)
        this.setState({
            restartPopupVisible: true,
        })
    }

    hideRestartPopup = () => {
        setInterval(this.timerFunction, 1000)
        this.setState({
            restartPopupVisible: false
        })
    }

    resetLevel = () => {
        const gateHistory = []
        for (let i = 0; i < this.state.numQubits; i++) {
            gateHistory[i] = []
        }

        this.gameScrollView.scrollTo({x: 0})

        this.setState({
            currentState: [[1], [0], [0], [0]],
            gateHistory: gateHistory,
            isTimeUp: false,
            restartPopupVisible: false,
            lines: [],
            moves: 0,
            gameScrollViewWidth: Dimensions.get('screen').width,
            selectedGate: null,
            controlQubit: null,
            timeLeft: 90,
        })

        clearInterval(this.timer)
        this.timer = setInterval(this.timerFunction, 1000)
    }

    timeUpFunction = () => {

    }

    addLine = (xPos, y2, qubitIndex) => {
        const y1 = this.liney1
        const {lines} = this.state
        lines.push(<Line key={xPos} xPosition={xPos} bottom={y2} top={y1} style={{}} />)
        this.setState({lines: lines})

        this.liney1 = null
    }

    addQubitLine = (xPos, yPos) => {
        const {qubitLines} = this.state

        qubitLines.push(
            <View key={yPos} style={{position: 'absolute', left: xPos, top: yPos, width: '100%', flexDirection: 'row',}}>
                <View style={styles.line} />
            </View>
        )
        this.setState({qubitLines: qubitLines})
    }

    selectGate = (gateName) => {

        const {selectedGate} = this.state

        if (selectedGate && selectedGate[selectedGate.length - 1] === 't')
            return

        if (gateName[0] === 'C') {
            if (selectedGate && gateName[0] === selectedGate[0] && gateName[1] === selectedGate[1]) {
                this.setState({
                    selectedGate: null
                })
            }
            else {
                this.setState({
                    selectedGate: gateName + '_c',
                })
            }
        }
        else if (gateName === selectedGate) {
            this.setState({
                selectedGate: null,
            })
        }
        else {
            this.setState({
                selectedGate: gateName
            })
        }

        this.gameScrollView.scrollToEnd()
    }

    placeGate = (qubitIndex) => {

        const {gateHistory, selectedGate, numQubits, currentState, moves, controlQubit} = this.state
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
            
            this.addNewState(newState)
    
            for (let i = 0; i < numQubits; i++) {
                if ((i !== qubitIndex) && i !== controlQubit)
                    gateHistory[i].push('-')
            }

            this.setState({
                controlQubit: null,
                moves: moves + 1,
                selectedGate: null,
                currentState: newState,
            })
        }

        this.setState({
            loading: false,
        })
    }

    addNewState = (newState) => {
        const achievedStates = this.state.achievedStates

        if (!achievedStates.includes(this.getStateText(newState))) {
            achievedStates.push(this.getStateText(newState))
            this.incrementScore(this.getStateText(newState))
        }

        this.setState({
            achievedStates: achievedStates,
        })
    }

    incrementScore = (stateText) => {
        stateScore = 0
        for (let i = 0; i < stateText.length; i++) {
            if (stateText[i] === '+' || stateText[i] === '-') {
                stateScore++
            }
        }

        if (stateScore === 0)
            stateScore++

        this.setState({
            score: this.state.score + stateScore,
        })
    }

    getStateText = (stateMatrix) => {
        let stateText = ''
        const numQubits = Math.log2(stateMatrix.length)

        for (let i = 0; i < stateMatrix.length; i++) {
            if (stateMatrix[i][0] === 1 || stateMatrix[i][0] === -1) {
                let tempStr = this.dec2bin(i)
                while (tempStr.length < numQubits) {
                    tempStr = '0' + tempStr
                }

                if (stateMatrix[i][0] === -1) {
                    stateText += ' - ' + tempStr
                }
                else if (stateText === '') {
                    stateText += tempStr
                }
                else if (stateMatrix[i][0] === 1) {
                    stateText += ' + ' + tempStr
                }
                
            }
        }

        return stateText
    }

    dec2bin(dec) {
        return (dec >>> 0).toString(2);
    }

    isSelectedGate = (gateName) => {
        const {selectedGate} = this.state

        if (!selectedGate) return false

        if (gateName === selectedGate) {
            return true
        }
        else if (selectedGate[selectedGate.length - 1] === 'c' || selectedGate[selectedGate.length - 1] === 't') {
            return gateName[1] === selectedGate[1]
        }

        return false
    }

    renderQubitGates(qubitGates, qubitIndex) {
        
        const {selectedGate, controlQubit} = this.state

        return(
            <View key={qubitIndex} style={[styles.qubitGateHistoryContainer]}>
                <View
                    ref={ref => {this.qubitContainer[qubitIndex] = ref}}
                    style={styles.initialQubitContainer}
                    onLayout={({nativeEvent}) => {
                        if (this.qubitContainer[qubitIndex]) {
                            this.qubitContainer[qubitIndex].measureLayout(findNodeHandle(this.gameScrollView), (x, y, width, height, pageX, pageY) => {
                                this.addQubitLine(x + width, y + height/2)
                            })
                        }
                    }}
                >
                    <Text style={styles.initialQubitText}>{`Qubit ${qubitIndex + 1}  `}</Text>
                </View>
                {
                    qubitGates.map((value, index) => {
                        return(
                            <Gate
                                key={index}
                                name={value}
                                style={[styles.appliedGate]}
                                disabled={true}
                                parentScrollView={this.gameScrollView}
                                onLayoutCallback={(x, y, width, height, pageX, pageY) => {
                                    if (value[value.length - 1] === 'c') {
                                        this.liney1 = y + height/2
                                    }
                                    else if (value[value.length - 1] === 't') {
                                        this.addLine(x + width/2 + Dimensions.get('screen').width * 0.025, y + height/2)
                                    }

                                    if (Math.abs(this.state.gameScrollViewWidth - x - width) < Dimensions.get('screen').width * 0.2) {
                                        this.setState({
                                            gameScrollViewWidth: this.state.gameScrollViewWidth + Dimensions.get('screen').width * 0.2,
                                        })
                                    }
                                }}
                            />
                        )
                    })
                }
                {selectedGate && qubitIndex !== controlQubit && <TouchableOpacity style={[styles.gatePlaceBtn]} onPress={() => this.placeGate(qubitIndex)} />}
            </View>
        )
    }

    render() {

        const {gateHistory,
            exitPopupVisible,
            usableGates,
            score,
            lines,
            introPopupVisible,
            qubitLines,
            restartPopupVisible,
            moves,
            currentState,
            selectedGate,
            timeLeft,
            timerColor,
            isTimeUp,
        } = this.state

        return(
            <View style={commonStyles.container}>
                <Header title={`Time Attack`} onPressBack={this.showExitPopup} onPressRestart={this.restartButton} />
                <View style={styles.statesRow}>
                    <View style={styles.stateContainer}>
                        <Text style={styles.stateStaticLabel}>Current State</Text>
                        <Text style={styles.stateLabel}>{this.getStateText(currentState)}</Text>
                    </View>
                    <View style={styles.stateContainer}>
                        <Text style={styles.stateStaticLabel}>Score</Text>
                        <Text style={styles.stateLabel}>{score}</Text>
                    </View>
                </View>
                <ScrollView
                    horizontal
                    contentContainerStyle={[styles.gameScrollView, {width: this.state.gameScrollViewWidth}]}
                    ref={ref => {this.gameScrollView = ref}}
                    showsHorizontalScrollIndicator={false}
                >
                    {qubitLines.map((value, index) => {
                        return value
                    })}
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
                <View style={styles.bottomRow}>
                    <View style={styles.gatesContainer}>
                    {
                        // render usable gate buttons
                        usableGates.map((value, index) => {
                            return (
                                <Gate
                                    key={index}
                                    name={value}
                                    style={[styles.gateBtn, this.isSelectedGate(value) ? styles.selectedGate : null]}
                                    disabled={false}
                                    onPress={() => {this.selectGate(value)}}
                                />
                            )
                        })
                    }
                    </View>
                    <View style={[styles.timeContainer, {backgroundColor: timerColor}]}><MaterialIcons name='timer' size={25} style={styles.clockIcon} />
                        <Text style={[styles.movesLabel]}>{`  ${timeLeft}s `}</Text>
                    </View>
                </View>
                <Popup
                    visible={exitPopupVisible}
                    title={'Exit Level'}
                    info={'Are you sure you want to return to the menu? Your score for this game will not be considered.'}
                    primaryBtnTitle={'Yes'}
                    primaryBtnAction={this.exitToHome}
                    secondaryBtnTitle={'No'}
                    secondaryBtnAction={this.hideExitPopup}
                    cancelable={true}
                    onCancel={this.hideExitPopup}
                />
                <Popup
                    visible={restartPopupVisible}
                    title={'Restart Level'}
                    info={'Are you sure you want to restart this level? All progress in this game will be lost.'}
                    primaryBtnTitle={'Yes'}
                    primaryBtnAction={this.resetLevel}
                    secondaryBtnTitle={'No'}
                    secondaryBtnAction={this.hideRestartPopup}
                    cancelable={true}
                    onCancel={this.hideRestartPopup}
                />
                <View style={styles.toastContainer}>
                    <Toast visible={selectedGate && (selectedGate[selectedGate.length - 1] === 'c')} text='Select control qubit' style={styles.toast} />
                    <Toast visible={selectedGate && (selectedGate[selectedGate.length - 1] === 't')} text='Select target qubit' style={styles.toast} />
                </View>
            </View>
        )
    }
}