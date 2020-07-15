import React, {Component} from 'react'
import {
    Platform,
    View,
} from 'react-native'
import styles from './styles'
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'

export default class CarouselIndicators extends Component {
    
    render() {
        const {numPages, currentPage} = this.props
        const dots = []

        for (let i = 0; i < numPages; i++) {
            dots.push(
                <MaterialCommunityIcons name={i === currentPage - 1 ? 'circle' : 'circle-outline'} size={10} />
            )
        }

        return(
            <View style={styles.iconContainer}>
                {dots}
            </View>
        )
    }
}