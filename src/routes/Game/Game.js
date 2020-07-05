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
import * as MatrixOperations from 'common/MatrixOperations'

export default class Game extends Component {

    constructor(props) {
        super(props)
        this.state = {
            levelId: 0,
            currentState: [1],
            targetState: [],
            numQubits: 0,
            gateHistory: [],
        }
    }

    componentDidMount() {
        const {levelId} = this.props.route.params
        const currentState = [1]
        const gateHistory = []

        this.setState({
            levelId: levelId,
            targetState: Levels[levelId].targetState,
            numQubits: Levels[levelId].numQubits,
        })

        for (let i = 0; i < Levels[levelId].numQubits; i++) {
            gateHistory[i] = []
        }
        for (let i = 1; i < 2 ** Levels[levelId].numQubits; i++) {
            currentState.push(0)
        }

        this.setState({
            gateHistory: gateHistory,
            currentState: currentState,
        })


        // Test tensor product function
        const a = [[1, 2], [3, 4]]
        const b = [[1, 3], [2, 4]]
        console.log(directProduct(a, b))

    }

    render() {

        return(
            <View style={commonStyles.screenCenter}>
            </View>
        )
    }
}