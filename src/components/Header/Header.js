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
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'

export default class Header extends Component {

    render() {

        const {title, onPressBack, onPressHelp, onPressSettings, onPressRestart, onPressInfo, onPressNext} = this.props

        return(
            <View style={styles.container}>
                <Text style={styles.titleText}>{title}</Text>
                {onPressBack && <TouchableOpacity style={styles.headerIconBtn} onPress={onPressBack}>
                    <MaterialIcons name='keyboard-arrow-left' color={Colors.headerTextColor} size={40} />
                </TouchableOpacity>}
                {(onPressHelp || onPressSettings || onPressRestart || onPressInfo || onPressNext) && <View style={styles.headerRightIcons}>
                    {onPressHelp && <TouchableOpacity style={styles.headerIconBtn} onPress={onPressHelp}>
                        <MaterialIcons name='help' color={Colors.headerTextColor} size={30} />
                    </TouchableOpacity>}
                    {onPressInfo && <TouchableOpacity style={styles.headerIconBtn} onPress={onPressInfo}>
                        <MaterialIcons name='info-outline' color={Colors.headerTextColor} size={30} />
                    </TouchableOpacity>}
                    {onPressSettings && <TouchableOpacity style={styles.headerIconBtn} onPress={onPressSettings}>
                        <MaterialIcons name='settings' color={Colors.headerTextColor} size={30} />
                    </TouchableOpacity>}
                    {onPressRestart && <TouchableOpacity style={styles.headerIconBtn} onPress={onPressRestart}>
                        <MaterialIcons name='refresh' color={Colors.headerTextColor} size={30} />
                    </TouchableOpacity>}
                    {onPressNext && <TouchableOpacity style={[styles.headerIconBtn, styles.reduceBottomMargin]} onPress={onPressNext}>
                        <MaterialIcons name='keyboard-arrow-right' color={Colors.headerTextColor} size={40} />
                    </TouchableOpacity>}
                </View>}
            </View>
        )
    }
}