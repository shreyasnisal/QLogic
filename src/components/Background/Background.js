import React, {Component} from 'react'
import {
    View,
} from 'react-native'
import styles from './styles'

export default class Background extends Component {

    render() {
        const {style} = this.props


        return(
            <View style={[styles.container, style]}>
                <View style={styles.qubitLineContainer}>
                    <View style={styles.chip} />
                    <View style={styles.line} />
                    <View style={[styles.line, styles.dash]} />
                    <View style={[styles.line, styles.dash]} />
                </View>
                <View style={[styles.qubitLineContainer, styles.indeneted]}>
                    <View style={styles.chip} />
                    <View style={[styles.line, styles.long]} />
                    <View style={[styles.line, styles.dash]} />
                </View>
                <View style={styles.qubitLineContainer}>
                    <View style={styles.chip} />
                    <View style={styles.line} />
                    <View style={[styles.line, styles.dash]} />
                    <View style={[styles.line, styles.dash]} />
                </View>
                <View style={[styles.qubitLineContainer, styles.indeneted]}>
                    <View style={styles.chip} />
                    <View style={[styles.line, styles.long]} />
                    <View style={[styles.line, styles.dash]} />
                </View>
                <View style={styles.qubitLineContainer}>
                    <View style={styles.chip} />
                    <View style={styles.line} />
                    <View style={[styles.line, styles.dash]} />
                    <View style={[styles.line, styles.dash]} />
                </View>
            </View>
        )
    }
}