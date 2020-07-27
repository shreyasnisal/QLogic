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
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome'
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
        const {levelNumber, stars, visible, onPressMenu, onPressReplay, onPressNext} = this.props
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
                    <Text style={styles.title}>Level Complete!</Text>
                    <Text style={styles.infoText}>Congratulations on completing Level {levelNumber}!</Text>
                    <View style={styles.starsRow}>
                        <Animated.View style={{transform: [{scale: star1Scale}]}}>
                            <FontAwesome style={styles.icon} name='star' size={60} color={Colors.buttonColor} />
                        </Animated.View>
                        {<Animated.View style={{transform: [{scale: star2Scale}]}}>
                            <FontAwesome style={styles.icon} name={stars >= 2 ? 'star' : 'star-o'} size={60} color={stars >= 2 ? Colors.buttonColor : Colors.headerTextColor} />
                        </Animated.View>}
                        {<Animated.View style={{transform: [{scale: star3Scale}]}}>
                            <FontAwesome style={styles.icon} name={stars == 3 ? 'star' : 'star-o'} size={60} color={stars == 3 ? Colors.buttonColor : Colors.headerTextColor} />
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