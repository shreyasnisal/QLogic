import React, {Component, useCallback} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    UIManager,
    findNodeHandle,
} from 'react-native'
import commonStyles from 'common/styles'
import styles from './styles'


export default class Gate extends Component {

    render() {
        const {disabled, onPress, name, style, onLayoutCallback} = this.props

        return(
            <View
                ref={(ref) => { this.marker = ref }}
                onLayout={({nativeEvent}) => {
                    if (this.marker) {
                        this.marker.measure((x, y, width, height, pageX, pageY) => {
                            if (onLayoutCallback)
                                return onLayoutCallback(x, y, width, height, pageX, pageY)
                        })
                    }
                }}
            >
                <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.gateBtn, style]}>
                    <Text style={styles.gateName}>{name}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}