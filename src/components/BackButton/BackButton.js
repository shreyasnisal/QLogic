import React, {Component} from 'react'
import {
    Platform,
    Text,
    View,
    TouchableOpacity,
} from 'react-native'
import styles from './styles'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'

export default class BackButton extends Component {

    render() {
        const {onPress} = this.props

        return(
            <TouchableOpacity onPress={onPress} style={styles.btn}>
                <MaterialIcons name='arrow-back' size={30} />
            </TouchableOpacity>
        )
    }
}