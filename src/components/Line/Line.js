import React, {Component} from 'react'
import {View, Dimensions} from 'react-native'
import Colors from 'common/Colors'

export default class Line extends Component {

    render() {

        const {top, bottom, xPosition} = this.props

        return(
            <View style={[{position: 'absolute', top: Math.min(top, bottom), height: Math.abs(top - bottom), width: 2, left: xPosition + Dimensions.get('screen').width * 0.05, backgroundColor: Colors.buttonColor,}]} />
        )
    }
}