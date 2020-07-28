import React, {Component} from 'react'
import {
    Platform,
    Text,
    View,
    TouchableOpacity,
} from 'react-native'
import commonStyles from 'common/styles'
import styles from './styles'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import Colors from 'common/Colors'

export default class SecondaryButton extends Component {

    render() {

        const {onPress, style, title, titleStyle, prefixIcon} = this.props

        return(
            <TouchableOpacity onPress={this.props.onPress} style={[this.props.style, styles.btnStyle]}>
                {prefixIcon && <MaterialIcons name={prefixIcon} size={20} color={Colors.buttonColor} style={styles.prefixIcon} />}
                <Text style={[this.props.titleStyle, styles.title]}>{this.props.title}</Text>
            </TouchableOpacity>
        )
    }
}