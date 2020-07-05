import React, {Component} from 'react'
import {
    Platform,
    Text,
    View,
    TouchableOpacity,
} from 'react-native'
import commonStyles from 'common/styles'
import styles from './styles'

export default class SecondaryButton extends Component {

    render() {
        return(
            <TouchableOpacity onPress={this.props.onPress} style={[this.props.style, styles.btnStyle]}>
                <Text style={[this.props.titleStyle, styles.title]}>{this.props.title}</Text>
            </TouchableOpacity>
        )
    }
}