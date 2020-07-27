import React, {Component} from 'react'
import {
    View,
    Text,
    Animated,
} from 'react-native'
import styles from './styles'

export default class Toast extends Component {

    constructor(props) {
        super(props)
        this.state = {
            toastOpacity: new Animated.Value(0)
        }
    }

    render() {
        const {visible, text, style} = this.props
        const {toastOpacity} = this.state

        if (!visible) return null

        Animated.timing(toastOpacity, {
            toValue: 1,
            useNativeDriver: true,
        }).start()

        return(
            <Animated.View style={[styles.container, style, {opacity: toastOpacity}]}>
                <Text style={styles.toastText}>{text}</Text>
            </Animated.View>
        )
    }
}