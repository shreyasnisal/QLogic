import React, {Component, useCallback} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    findNodeHandle,
} from 'react-native'
import commonStyles from 'common/styles'
import styles from './styles'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import Colors from 'common/Colors'


export default class Gate extends Component {

    render() {
        const {disabled, onPress, name, style, onLayoutCallback, parentScrollView} = this.props
        let gateNameStyle = null
        let gateBtnContent = null

        if (name === '-') {
            gateNameStyle = styles.noGate
        }
        else if (name[name.length - 1] === 'c') {
            gateNameStyle = styles.controlGate
            gateBtnContent = <MaterialIcons name='add-circle' color={Colors.lockBlue} size={40} />
        }
        else if (name[name.length - 1] === 't') {
            gateBtnContent = <Text style={styles.gateName}>{name[1]}</Text>
        }
        else {
            gateBtnContent = <Text style={styles.gateName}>{name}</Text>
        }

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
                <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.gateBtn, style, gateNameStyle]}>
                    {name !== '-' && gateBtnContent}
                </TouchableOpacity>
            </View>
        )
    }
}