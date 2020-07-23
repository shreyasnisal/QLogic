import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
} from 'react-native'
import commonStyles from 'common/styles'
import styles from './styles'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import Colors from 'common/Colors'

export default class LevelCompletePopup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            popupScale: new Animated.Value(0),
            star1Scale: new Animated.Value(0),
            star2Scale: new Animated.Value(0),
            star3Scale: new Animated.Value(0),
        }
    }

    render() {
        const {stars, visible, onPressMenu, onPressReplay, onPressNext} = this.props
        const {popupScale, star1Scale, star2Scale, star3Scale} = this.state

        if (!visible) return null;

        Animated.spring(popupScale, {
            toValue: 1,
            useNativeDriver: true,
        }).start()

        Animated.spring(star1Scale, {
            toValue: 1,
            friction: 2,
            delay: 200,
            useNativeDriver: true,
        }).start()

        Animated.spring(star2Scale, {
            toValue: 1,
            friction: 2,
            delay: 500,
            useNativeDriver: true,
        }).start()

        Animated.spring(star3Scale, {
            toValue: 1,
            friction: 2,
            delay: 800,
            useNativeDriver: true,
        }).start()


        return(
            <View style={[commonStyles.fullScreen, styles.container]}>
                <View style={[commonStyles.fullScreen, styles.container, commonStyles.popupBackground]} />
                <Animated.View style={[styles.popupContainer, {transform: [{scale: popupScale}]}]}>
                    <View style={styles.popupHeaderContainer}>
                        <Text style={styles.title}>Level Complete</Text>
                    </View>
                    <View style={styles.starsRow}>
                        <Animated.View style={{transform: [{scale: star1Scale}]}}>
                            <MaterialIcons name='star' size={50} color={Colors.lockBlue} />
                        </Animated.View>
                        {stars >= 2 && <Animated.View style={{transform: [{scale: star2Scale}]}}>
                            <MaterialIcons name='star' size={50} color={Colors.lockBlue} />
                        </Animated.View>}
                        {stars == 3 && <Animated.View style={{transform: [{scale: star3Scale}]}}>
                            <MaterialIcons name='star' size={50} color={Colors.lockBlue} />
                        </Animated.View>}
                    </View>
                    <View style={styles.buttonsRow}>
                        <TouchableOpacity style={styles.btn} onPress={onPressMenu}>
                            <MaterialIcons name='menu' size={50} color={Colors.buttonText} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} onPress={onPressReplay}>
                            <MaterialIcons name='replay' size={50} color={Colors.buttonText} />
                        </TouchableOpacity>
                        {onPressNext && <TouchableOpacity style={styles.btn} onPress={onPressNext}>
                            <MaterialIcons name='chevron-right' size={50} color={Colors.buttonText} />
                        </TouchableOpacity>}
                    </View>
                </Animated.View>
            </View>
        )
    }
}