import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native'
import commonStyles from 'common/styles'
import styles from './styles'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import Colors from 'common/Colors'

export default class Header extends Component {

    render() {

        const {title, onPressBack, onPressHelp, onPressSettings} = this.props

        return(
            <View style={styles.container}>
                <Text style={styles.titleText}>{title}</Text>
                {onPressBack && <TouchableOpacity style={styles.headerIconBtn} onPress={onPressBack}>
                    <MaterialIcons name='chevron-left' color={Colors.headerTextColor} size={40} />
                </TouchableOpacity>}
                {(onPressHelp || onPressSettings) && <View style={styles.headerRightIcons}>
                    {onPressHelp && <TouchableOpacity style={styles.headerIconBtn} onPress={onPressBack}>
                        <MaterialIcons name='help' color={Colors.headerTextColor} size={30} />
                    </TouchableOpacity>}
                    {onPressSettings && <TouchableOpacity style={styles.headerIconBtn} onPress={onPressBack}>
                        <MaterialIcons name='settings' color={Colors.headerTextColor} size={30} />
                    </TouchableOpacity>}
                </View>}
            </View>
        )
    }
}