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

export default class Game extends Component {

    constructor(props) {
        super(props)
        this.state = {
            levelId: 0,
            currentState: [1],
            targetState: [],
            numQubits: 0,
            usableGates: [],
            gateHistory: [[]],
        }
    }

    componentDidMount() {
        const {levelId} = this.props.route.params
        const gateHistory = []

        this.setState({
            levelId: levelId,
            currentState: Levels[levelId].initialState,
            targetState: Levels[levelId].targetState,
            numQubits: Levels[levelId].numQubits,
            usableGates: Levels[levelId].gates,
        })

        for (let i = 0; i < Levels[levelId].numQubits; i++) {
            gateHistory[i] = []
        }

        this.setState({
            gateHistory: gateHistory,
        })

    }

    renderGate(gate, key) {
        
    }


    renderQubitGates(qubitGates, key) {

        return(
            <View key={key} style={styles.qubitGateHistoryContainer}>
                <View style={styles.initialQubitContainer}>
                    <Text style={styles.initialQubitText}>0</Text>
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

        const {gateHistory} = this.state

        return(
            <View style={commonStyles.screenCenter}>
                {
                    gateHistory.map((value, index) => {
                        return this.renderQubitGates(value, index)
                    })
                }
                <View style={styles.gatesContainer}>
                </View>
            </View>
        )
    }
}