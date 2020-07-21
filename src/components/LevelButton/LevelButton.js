import React, {Component} from 'react'
import {
    Platform,
    View,
    Text,
    TouchableOpacity,
} from 'react-native'
import styles from './styles'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import Colors from 'common/Colors'

export default class LevelButton extends Component {
    
    render() {
        const {stars, isLocked, levelNumber, onPress, style} = this.props

        return(
            <View style={[styles.btnContainer, style]}>
                <TouchableOpacity disabled={isLocked} onPress={onPress} style={[styles.btn, isLocked ? styles.lockedBtn : styles.activeBtn]}>
                    <Text style={[styles.text, isLocked ? styles.lockedText : styles.unlockedText]}>{levelNumber}</Text>
                </TouchableOpacity>
                {stars && <View style={styles.starRow}>
                    <MaterialIcons name={'star'} size={30} color={Colors.headerColor} style={styles.star1} />
                    {stars >= 2 && <MaterialIcons name={'star'} size={30} color={Colors.headerColor} style={styles.star2} />}
                    {stars >= 3 && <MaterialIcons name={'star'} size={30} color={Colors.headerColor} style={styles.star3} />}
                </View>}
                {isLocked && <View style={styles.lock}>
                    <MaterialIcons name='lock' size={25} color={Colors.lockBlue} />
                </View>}
            </View>
        )
    }
}