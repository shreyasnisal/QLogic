import React, {Component} from 'react'
import {
    Platform,
    View,
} from 'react-native'
import styles from './styles'
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'

export default class CarouselIndicators extends Component {
    
    render() {
        const {numPages, currentPage, style} = this.props
        const dots = []

        for (let i = 0; i < numPages; i++) {
            dots.push(
                <MaterialCommunityIcons key={i} name={i === currentPage ? 'circle' : 'circle-outline'} size={10} color={'#000'} />
            )
        }

        return(
            <View style={[styles.iconContainer, style]}>
                {dots}
            </View>
        )
    }
}