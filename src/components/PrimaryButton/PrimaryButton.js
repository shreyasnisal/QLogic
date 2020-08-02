import React, {Component} from 'react'
import {
    Platform,
    View,
    TouchableOpacity,
    Text,
} from 'react-native'
import commonStyles from 'common/styles'
import styles from './styles'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import Colors from 'common/Colors'

export default class PrimaryButton extends Component {

    render() {

        const {style, onPress, titleStyle, title, prefixIcon} = this.props

        return(
            <TouchableOpacity onPress={onPress} style={[style, styles.btnStyle]}>
                {prefixIcon && <MaterialIcons name={prefixIcon} size={25} color={Colors.backgroundColor} style={[styles.prefixIcon, prefixIcon === 'chevron-right' ? styles.reduceMargin : null]} />}
                <Text style={[titleStyle, styles.title]}>{title}</Text>
            </TouchableOpacity>
        )
    }
}