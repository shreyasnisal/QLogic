import React, {Component, useCallback} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    findNodeHandle,
} from 'react-native'
import commonStyles from 'common/styles'
import styles from './styles'


export default class Gate extends Component {

    render() {
        const {disabled, onPress, name, style, onLayoutCallback, parentScrollView} = this.props

        return(
            <View
                ref={(ref) => { this.marker = ref }}
                onLayout={({nativeEvent}) => {
                    if (this.marker && parentScrollView) {
                        this.marker.measureLayout(findNodeHandle(parentScrollView), (x, y, width, height, pageX, pageY) => {
                            
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