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
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import Colors from 'common/Colors'

export default class PrimaryButton extends Component {

    render() {

        const {style, onPress, titleStyle, title, prefixIcon, isFAIcon, isCommunityIcon} = this.props

        return(
            <TouchableOpacity onPress={onPress} style={[style, styles.btnStyle]}>
                {prefixIcon && !isCommunityIcon && <MaterialIcons name={prefixIcon} size={25} color={Colors.backgroundColor} style={[title ? styles.prefixIcon : null, prefixIcon === 'chevron-right' ? styles.reduceMargin : null]} />}
                {prefixIcon && isCommunityIcon && <MaterialCommunityIcons name={prefixIcon} size={25} color={Colors.backgroundColor} style={[title ? styles.prefixIcon : null, prefixIcon === 'chevron-right' ? styles.reduceMargin : null]} />}
                {title && <Text style={[titleStyle, styles.title]}>{title}</Text>}
            </TouchableOpacity>
        )
    }
}