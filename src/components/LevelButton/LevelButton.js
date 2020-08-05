import React, {Component} from 'react'
import {
    Platform,
    View,
    Text,
    TouchableOpacity,
} from 'react-native'
import styles from './styles'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome'
import Colors from 'common/Colors'
import Toast from 'components/Toast/Toast'

export default class LevelButton extends Component {
    
    render() {
        const {stars, isLocked, levelNumber, onPress, style} = this.props

        return(
            <View style={[styles.btnContainer, style]}>
                <TouchableOpacity onPress={onPress} style={[styles.btn, isLocked ? styles.lockedBtn : styles.activeBtn]}>
                    <Text style={[styles.text, isLocked ? styles.lockedText : styles.unlockedText]}>{levelNumber}</Text>
                </TouchableOpacity>
                {stars && <View style={styles.starRow}>
                    <FontAwesome name={'star'} size={30} color={Colors.buttonColor} />
                    {<FontAwesome name={stars >= 2 ? 'star' : 'star-o'} size={30} color={Colors.buttonColor} />}
                    {<FontAwesome name={stars >= 3 ? 'star' : 'star-o'} size={30} color={Colors.buttonColor} />}
                </View>}
                {isLocked && <View style={styles.lock}>
                    <MaterialIcons name='lock' size={35} color={Colors.lockBlue} />
                </View>}
            </View>
        )
    }
}