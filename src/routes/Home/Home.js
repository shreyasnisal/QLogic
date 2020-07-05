import React, {Component} from 'react'
import {
    View,
    Text,
    Platform,
} from 'react-native'
import commonStyles from 'common/styles'
import styles from './styles'
import PrimaryButton from 'components/PrimaryButton/PrimaryButton'
import SecondaryButton from 'components/SecondaryButton/SecondaryButton'

export default class Home extends Component {

    _playButton = async () => {
        this.props.navigation.navigate('Game', {levelId: 0})
    }

    render() {
        return(
            <View style={commonStyles.screenCenter}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{'  <Q|Logic>  '}</Text>
                </View>
                <PrimaryButton style={styles.btn} onPress={this._playButton} title='Play' />
                <SecondaryButton style={styles.btn} title='Playground' />
                <SecondaryButton style={styles.btn} title='Settings' />
                <SecondaryButton style={styles.btn} title='How to Play' />
                <SecondaryButton style={styles.btn} title='Exit' />
            </View>
        )
    }
}