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
import AsyncStorage from '@react-native-community/async-storage'
import Line from 'components/Line/Line'
import Toast from '../../components/Toast/Toast'
import GateInfoPopup from 'components/GateInfoPopup/GateInfoPopup'
import PlaygroundSettingsPopup from 'components/PlaygroundSettingsPopup/PlaygroundSettingsPopup'

export default class Playground extends Component {

    liney1 = null
    qubitContainer = []
    timer = null
    alertTimer = null

    constructor(props) {
        super(props)

        // set gateHistory array to contain arrays according to number of qubits
        const gateHistory = []
        for (let i = 0; i < 1; i++) {
            gateHistory[i] = []
        }

        // add required variables to component's state
        this.state = {
            currentState: [[1], [0]],
            numQubits: 1,
            usableGates: ['X', 'Z', 'H'],
            gateHistory: gateHistory,
            exitPopupVisible: false,
            selectedGate: null,
            loading: false,
            restartPopupVisible: false,
            controlQubit: null,
            lines: [],
            introPopupVisible: false,
            gameScrollViewWidth: Dimensions.get('screen').width,
            qubitLines: [],
            gateInfoPopupVisible: false,
            settingsPopupVisible: true,
            stateStack: [[[1], [0]]],
        }

        this.showIntro()
        BackHandler.addEventListener('hardwareBackPress', this.hardwareBackPress)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.hardwareBackPress)
    }

    hardwareBackPress = () => {
        const {exitPopupVisible} = this.state

        if (exitPopupVisible) {
            this.hideExitPopup()
        }
        else {
            this.showExitPopup()
        }

        return true
    }

    showIntro = async () => {
        const shownIntro = JSON.parse(await AsyncStorage.getItem('shownPlaygroundIntro'))

        if (!shownIntro) {
            this.setState({
                settingsPopupVisible: false,
                introPopupVisible: true,
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

    showSettingsPopup = () => {
        this.setState({
            settingsPopupVisible: true
        })
    }

    hideSettingsPopup = () => {
        this.setState({
            settingsPopupVisible: false
        })
    }

    exitToHome = () => {
        this.props.navigation.navigate('Home')
    }

    hideIntroPopup = () => {
        AsyncStorage.setItem('shownPlaygroundIntro', JSON.stringify(true))

        this.setState({
            settingsPopupVisible: true,
            introPopupVisible: false,
        })
    }
    
    restartButton = () => {
        this.setState({
            restartPopupVisible: true,
        })
    }

    hideRestartPopup = () => {
        this.setState({
            restartPopupVisible: false
        })
    }

    showGateInfoPopup = () => {
        this.setState({
            gateInfoPopupVisible: true,
        })
    }

    hideGateInfoPopup = () => {
        this.setState({
            gateInfoPopupVisible: false,
        })
    }

    resetLevel = () => {
        const {numQubits} = this.state
        const currentState = [[1]]
        const gateHistory = []
        for (let i = 0; i < numQubits; i++) {
            gateHistory[i] = []
        }
        for (let i = 1; i < 2**numQubits; i++) {
            currentState[i] = [0]
        }
        
        const stateStack = []
        stateState.push(currentState)

        this.gameScrollView.scrollTo({x: 0})

        this.setState({
            currentState: currentState,
            gateHistory: gateHistory,
            restartPopupVisible: false,
            lines: [],
            gameScrollViewWidth: Dimensions.get('screen').width,
            selectedGate: null,
            controlQubit: null,
            stateStack: stateStack,
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

        const {gateHistory, selectedGate, numQubits, currentState, controlQubit, stateStack} = this.state
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
            stateStack.push(newState)
    
            for (let i = 0; i < numQubits; i++) {
                if ((i !== qubitIndex) && i !== controlQubit)
                    gateHistory[i].push('-')
            }

            this.setState({
                controlQubit: null,
                selectedGate: null,
                currentState: newState,
                stateStack: stateStack,
            })
        }

        this.setState({
            loading: false,
        })
    }

    onChangeQubits = (numQubits) => {
        const gateHistory = []
        const currentState = [[1]]
        let usableGates = ['X', 'Z', 'H', 'CX', 'CZ', 'CH']
        const {qubitLines} = this.state
        for (let i = 0; i < numQubits; i++) {
            gateHistory[i] = []
        }
        for (let i = 1; i < 2**numQubits; i++) {
            currentState[i] = [0]
        }
        if (numQubits === 1) {
            usableGates = ['X', 'Z', 'H']
        }
        while (numQubits < qubitLines.length) {
            qubitLines.pop()
        }

        const stateStack = []
        stateStack.push(currentState)

        this.setState({
            numQubits: numQubits,
            currentState: currentState,
            gateHistory: gateHistory,
            usableGates: usableGates,
            qubitLines: qubitLines,
            lines: [],
            stateStack: stateStack,
        })

        // this.resetLevel()
    }

    undoButton = () => {
        const {stateStack, currentState, gateHistory, numQubits, lines} = this.state

        if (stateStack.length <= 1) {
            return;
        }

        stateStack.pop()

        for (let i = 0; i < numQubits; i++) {
            const lastGate = gateHistory[i].pop()
            if (lastGate[lastGate.length - 1] === 'c')
                lines.pop()
        }

        this.setState({
            currentState: stateStack[stateStack.length - 1],
            stateStack: stateStack,
            gateHistory: gateHistory,
            lines: lines,
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
            lines,
            introPopupVisible,
            qubitLines,
            restartPopupVisible,
            currentState,
            selectedGate,
            gateInfoPopupVisible,
            numQubits,
            settingsPopupVisible,
        } = this.state

        return(
            <View style={commonStyles.container}>
                <Header
                    title={`Playground`}
                    onPressBack={this.showExitPopup}
                    onPressInfo={this.showGateInfoPopup}
                    onPressRestart={this.restartButton}
                    onPressSettings={this.showSettingsPopup}
                    onPressUndo={this.undoButton}
                />
                <View style={styles.statesRow}>
                    <View style={styles.stateContainer}>
                        <Text style={styles.stateStaticLabel}>Current State</Text>
                        <Text style={styles.stateLabel}>{this.getStateText(currentState)}</Text>
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
                </View>
                <Popup
                    visible={exitPopupVisible}
                    title={'Exit'}
                    info={'Are you sure you want to exit? All your qubits will reset to the 0 state.'}
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
                    info={'Are you sure you want to reset all qubits to the 0?'}
                    primaryBtnTitle={'Yes'}
                    primaryBtnAction={this.resetLevel}
                    secondaryBtnTitle={'No'}
                    secondaryBtnAction={this.hideRestartPopup}
                    cancelable={true}
                    onCancel={this.hideRestartPopup}
                />
                <Popup
                    visible={introPopupVisible}
                    title={'Welcome to the Playground!'}
                    info={'This is your safe space. You can try out the gates as you like, on any number of qubits. No move counter, no time limit. Enjoy!'}
                    primaryBtnTitle={'Let\'s Go!'}
                    primaryBtnAction={this.hideIntroPopup}
                />
                <GateInfoPopup
                    visible={gateInfoPopupVisible}
                    onPressDone={this.hideGateInfoPopup}
                />
                <PlaygroundSettingsPopup
                    visible={settingsPopupVisible}
                    onChangeQubits={this.onChangeQubits}
                    selectedQubits={numQubits}
                    onPressHome={this.exitToHome}
                    onPressDone={this.hideSettingsPopup}
                />
                <View style={styles.toastContainer}>
                    <Toast visible={selectedGate && (selectedGate[selectedGate.length - 1] === 'c')} text='Select control qubit' style={styles.toast} />
                    <Toast visible={selectedGate && (selectedGate[selectedGate.length - 1] === 't')} text='Select target qubit' style={styles.toast} />
                </View>
            </View>
        )
    }
}