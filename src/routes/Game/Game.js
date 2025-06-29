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
import Levels from 'common/Levels'
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
import GateInfoPopup from 'components/GateInfoPopup/GateInfoPopup'

export default class Game extends Component {

    liney1 = null
    qubitContainer = []
    timer = null
    alertTimer = null

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
            levelFailed: false,
            restartPopupVisible: false,
            moves: 0,
            stars: 1,
            controlQubit: null,
            lines: [],
            tipPopupVisible: true,
            introPopupVisible: false,
            gameScrollViewWidth: Dimensions.get('screen').width,
            qubitLines: [],
            timeLeft: Levels[levelId].time,
            timerColor: Colors.headerTextColor,
            extraCoins: 0,
            gateInfoPopupVisible: false,
        }

        //if the level is timed, start the countdown
        // if (Levels[levelId].time && !Levels[levelId].tipHeading) {
        //     this.timer = setInterval(this.timerFunction, 1000)
        // }

        this.props.navigation.addListener('focus', this.focusListener)
        BackHandler.addEventListener('hardwareBackPress', this.hardwareBackPress)
    }

    blurListener = () => {
        clearInterval(this.timer)
        clearInterval(this.alertTimer)
    }

    focusListener = () => {
        this.getData()
        if (this.state.timeLeft) {
            this.timer = setInterval(this.timerFunction, 1000)

            if (this.state.timeLeft <= 10) {
                this.alertTimer = setInterval(this.alertTimerFunction, 1000)
            }
        }
    }

    getData = () => {
        this.getLevelsData()
    }

    getLevelsData = async () => {
        let levelsData = JSON.parse(await AsyncStorage.getItem('levelsData'))
        if (!levelsData) levelsData = []
        this.setState({
            levelPrevStars: levelsData[this.state.levelId] ? levelsData[this.state.levelId] : 0
        })
    }

    timerFunction = () => {
        this.setState({timeLeft: this.state.timeLeft - 1}, () => {
            if (this.state.timeLeft === 10) {
                // start the alert timer
                this.alertTimer = setInterval(this.alertTimerFunction, 1000)
            }

            if (this.state.timeLeft === 0) {
                this.levelFailed()
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
        this.props.navigation.removeListener('focus', this.getData)
        BackHandler.removeEventListener('hardwareBackPress', this.hardwareBackPress)
    }

    hardwareBackPress = () => {
        const {exitPopupVisible, tipPopupVisible} = this.state

        if (exitPopupVisible) {
            this.hideExitPopup()
        }
        else if (tipPopupVisible) {
            this.exitToMenu()
        }
        else {
            this.showExitPopup()
        }

        return true
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
        clearInterval(this.timer)
        clearInterval(this.alertTimer)

        this.setState({
            exitPopupVisible: true
        })
    }

    hideExitPopup = () => {

        if (this.state.timeLeft) {
            this.timer = setInterval(this.timerFunction, 1000)

            if (this.state.timeLeft <= 10) {
                this.alertTimer = setInterval(this.alertTimerFunction, 1000)
            }
        }

        this.setState({
            exitPopupVisible: false
        })
    }

    exitToMenu = () => {
        this.props.navigation.navigate('LevelSelect')
    }

    hideTipPopup = () => {

        if (this.state.timeLeft) {
            this.timer = setInterval(this.timerFunction, 1000)

            if (this.state.timeLeft <= 10) {
                this.alertTimer = setInterval(this.alertTimerFunction, 1000)
            }
        }

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
    
    restartButton = () => {

        clearInterval(this.timer)
        clearInterval(this.alertTimer)

        this.setState({
            restartPopupVisible: true,
        })
    }

    hideRestartPopup = () => {

        if (this.state.timeLeft) {
            this.timer = setInterval(this.timerFunction, 1000)

            if (this.state.timeLeft <= 10) {
                this.alertTimer = setInterval(this.alertTimerFunction, 1000)
            }
        }

        this.setState({
            restartPopupVisible: false
        })
    }

    showGateInfoPopup = () => {
        const {timeLeft} = this.state
        if (timeLeft) {
            clearInterval(this.timer)
            clearInterval(this.alertTimer)
        }

        this.setState({
            gateInfoPopupVisible: true,
        })
    }

    hideGateInfoPopup = () => {

        if (this.state.timeLeft) {
            this.timer = setInterval(this.timerFunction, 1000)

            if (this.state.timeLeft <= 10) {
                this.alertTimer = setInterval(this.alertTimerFunction, 1000)
            }
        }

        this.setState({
            gateInfoPopupVisible: false,
        })
    }

    resetLevel = () => {
        const {levelId} = this.state
        const gateHistory = []
        for (let i = 0; i < Levels[levelId].numQubits; i++) {
            gateHistory[i] = []
        }

        this.gameScrollView.scrollTo({x: 0})

        this.setState({
            currentState: Levels[levelId].initialState,
            gateHistory: gateHistory,
            levelCompleted: false,
            levelFailed: false,
            restartPopupVisible: false,
            lines: [],
            moves: 0,
            gameScrollViewWidth: Dimensions.get('screen').width,
            selectedGate: null,
            controlQubit: null,
            timeLeft: Levels[levelId].time,
        })

        if (Levels[levelId].time) {
            clearInterval(this.timer)
            clearInterval(this.alertTimer)
            this.timer = setInterval(this.timerFunction, 1000)
        }

        this.getLevelsData()
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
        let playerCoins = JSON.parse(await AsyncStorage.getItem('coins'))
        if (!levelsData) levelsData = []
        if (!playerCoins) playerCoins = 0
        const {moves, levelId, timeLeft} = this.state
        let stars = 1
        let extraCoins = 0

        if (timeLeft) {
            if (timeLeft > (Levels[levelId].time - Levels[levelId].minTime)) {
                stars = 3
            }
            else if (timeLeft > (Levels[levelId].time - Levels[levelId].maxTime_2star)) {
                stars = 2
            }

            clearInterval(this.timer)
            clearInterval(this.alertTimer)
        }
        else {
            if (moves <= Levels[levelId].minMoves) {
                stars = 3
            }
            else if (moves <= Levels[levelId].maxMoves_2star) {
                stars = 2
            }
        }

        if (!levelsData[levelId] || levelsData[levelId] < stars) {

            let prevCoins = 0
            if (levelsData[levelId]) {
                prevCoins = levelsData[levelId] * 5 + (levelsData[levelId] === 3 ? 5 : 0)
            }
            const coins = stars * 5 + (stars === 3 ? 5 : 0)
            extraCoins = coins - prevCoins

            playerCoins += extraCoins

            AsyncStorage.setItem('coins', JSON.stringify(playerCoins))

            levelsData[levelId] = stars
            AsyncStorage.setItem('levelsData', JSON.stringify(levelsData))
        }

        this.setState({
            stars: stars,
            extraCoins: extraCoins,
            levelCompleted: true,
        })
    }

    levelFailed = () => {
        this.setState({
            levelFailed: true,
        })
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
                currentState: newState,
            })
        }

        this.setState({
            loading: false,
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
            levelCompleted,
            stars,
            lines,
            tipPopupVisible,
            levelId,
            introPopupVisible,
            qubitLines,
            restartPopupVisible,
            moves,
            currentState,
            targetState,
            selectedGate,
            timeLeft,
            timerColor,
            levelFailed,
            extraCoins,
            levelPrevStars,
            gateInfoPopupVisible,
            numQubits,
        } = this.state

        return(
            <View style={commonStyles.container}>
                <Header title={`Level ${levelId + 1}`} onPressBack={levelCompleted ? this.exitToMenu : this.showExitPopup} onPressInfo={this.showGateInfoPopup} onPressRestart={levelCompleted ? this.resetLevel : this.restartButton} onPressNext={levelCompleted ? this.nextLevel : null} />
                <View style={styles.statesRow}>
                    <View style={styles.stateContainer}>
                        <Text style={styles.stateStaticLabel}>Current State</Text>
                        <Text style={[styles.stateLabel, numQubits === 3 ? styles.stateLabel_reducedFont : null]}>{this.getStateText(currentState)}</Text>
                    </View>
                    <View style={styles.stateContainer}>
                        <Text style={styles.stateStaticLabel}>Target State</Text>
                        <Text style={[styles.stateLabel, numQubits === 3 ? styles.stateLabel_reducedFont : null]}>{this.getStateText(targetState)}</Text>
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
                                    disabled={levelCompleted ? true : false}
                                    onPress={() => {this.selectGate(value)}}
                                />
                            )
                        })
                    }
                    </View>
                    {timeLeft || timeLeft === 0
                        ? <View style={[styles.timeContainer, {backgroundColor: timerColor}]}><MaterialIcons name='timer' size={25} style={styles.clockIcon} />
                            <Text style={[styles.movesLabel]}>{`  ${timeLeft}s `}</Text>
                        </View>
                        : <View style={styles.movesContainer}>
                            <Text style={styles.movesLabel}>{`${moves} Moves `}</Text>
                        </View>
                    }
                </View>
                <Popup
                    visible={exitPopupVisible}
                    title={'Exit Level'}
                    info={'Are you sure you want to return to the menu? All your progress in this level will be lost.'}
                    primaryBtnTitle={'Yes'}
                    primaryBtnAction={this.exitToMenu}
                    secondaryBtnTitle={'No'}
                    secondaryBtnAction={this.hideExitPopup}
                    cancelable={true}
                    onCancel={this.hideExitPopup}
                />
                <Popup
                    visible={restartPopupVisible}
                    title={'Restart Level'}
                    info={'Are you sure you want to restart this level? All progress in this level will be lost.'}
                    primaryBtnTitle={'Yes'}
                    primaryBtnAction={this.resetLevel}
                    secondaryBtnTitle={'No'}
                    secondaryBtnAction={this.hideRestartPopup}
                    cancelable={true}
                    onCancel={this.hideRestartPopup}
                />
                <LevelCompletePopup
                    visible={levelCompleted}
                    levelNumber={levelId + 1}
                    stars={stars}
                    prevStars={levelPrevStars}
                    onPressMenu={this.exitToMenu}
                    onPressReplay={this.resetLevel}
                    onPressNext={Levels[levelId + 1] ? this.nextLevel : null}
                />
                <LevelCompletePopup
                    visible={levelFailed}
                    status={'FAIL'}
                    onPressMenu={this.exitToMenu}
                    onPressReplay={this.resetLevel}
                />
                {Levels[levelId].tipText && <Popup
                    visible={tipPopupVisible}
                    size={Levels[levelId].image ? 'large' : null}
                    title={Levels[levelId].tipHeading}
                    info={Levels[levelId].tipText}
                    image={Levels[levelId].image ? Levels[levelId].image : null}
                    primaryBtnTitle={'Okay'}
                    primaryBtnAction={this.hideTipPopup}
                />}
                {levelId === 0 && <Popup
                    visible={introPopupVisible}
                    size='large'
                    title={'Welcome to QLogic!'}
                    info={'Your aim is to use quantum gates and take quantum bits (qubits) to the final state given in each level. Happy quantum-puzzling!'}
                    primaryBtnTitle={'Let\'s Play!'}
                    image={require('../../assets/images/intro.gif')}
                    primaryBtnAction={this.hideIntroPopup}
                />}
                <GateInfoPopup
                    visible={gateInfoPopupVisible}
                    onPressDone={this.hideGateInfoPopup}
                />
                <View style={styles.toastContainer}>
                    <Toast visible={selectedGate && (selectedGate[selectedGate.length - 1] === 'c')} text='Select control qubit' style={styles.toast} />
                    <Toast visible={selectedGate && (selectedGate[selectedGate.length - 1] === 't')} text='Select target qubit' style={styles.toast} />
                </View>
            </View>
        )
    }
}