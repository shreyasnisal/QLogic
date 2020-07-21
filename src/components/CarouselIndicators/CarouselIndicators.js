import React, {Component} from 'react'
import {
    Platform,
    View,
} from 'react-native'
import styles from './styles'
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import Colors from 'common/Colors'

export default class CarouselIndicators extends Component {
    
    render() {
        const {numPages, currentPage, style} = this.props
        const dots = []

        for (let i = 0; i < numPages; i++) {
            dots.push(
                <MaterialCommunityIcons key={i} name={i === currentPage ? 'circle' : 'circle-outline'} size={15} color={Colors.headerTextColor} style={styles.icon} />
            )
        }

        return(
            <View style={[styles.iconContainer, style]}>
                {dots}
            </View>
        )
    }
}