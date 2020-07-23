import React, {Component} from 'react'
import {
    View,
    Text, 
    TouchableOpacity,
} from 'react-native'
import commonStyles from 'common/styles'
import styles from './styles'
import CarouselIndicators from 'components/CarouselIndicators/CarouselIndicators'
import Header from 'components/Header/Header'

export default class HowToPlay extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            currentPage: 0,
        }
    }

    backButton = () => {
        this.props.navigation.navigate('Home')
    }
    
    render() {
        return(
            <View style={commonStyles.container}>
                <Header title='How to Play' onPressBack={this.backButton} />
            </View>
        )
    }
}