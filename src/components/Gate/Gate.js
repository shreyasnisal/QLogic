import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'
import commonStyles from 'common/styles'
import styles from './styles'

export default class Gate extends Component {

    render() {
        const {disabled, onPress, name, style} = this.props

        return(
            <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.gateBtn, style]}>
                <Text style={styles.gateName}>{name}</Text>
            </TouchableOpacity>
        )
    }
}