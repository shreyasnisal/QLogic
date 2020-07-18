import React, {Component} from 'react'
import {
    Platform,
    View,
    Text,
    TouchableOpacity,
} from 'react-native'
import styles from './styles'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'

export default class LevelButton extends Component {
    
    render() {
        const {stars, isLocked, levelNumber, onPress, style} = this.props

        return(
            <View style={[styles.btnContainer, style]}>
                <TouchableOpacity onPress={onPress} style={[styles.btn, isLocked ? styles.lockedBtn : styles.activeBtn]}>
                    <Text style={[styles.text]}>{levelNumber}</Text>
                </TouchableOpacity>
                {stars && <View style={styles.starRow}>
                    <MaterialIcons name={'star'} size={20} />
                    <MaterialIcons name={stars >= 2 ? 'star' : 'star-border'} size={20} />
                    <MaterialIcons name={stars === 3 ? 'star' : 'star-border'} size={20} />
                </View>}
                {isLocked && <View style={styles.lockRow}>
                    <MaterialIcons name='lock' size={18} />
                </View>}
            </View>
        )
    }
}