import React, {Component} from 'react'
import {
    View,
    Text,
    Platform,
    BackHandler,
} from 'react-native'
import commonStyles from 'common/styles'
import styles from './styles'
import PrimaryButton from 'components/PrimaryButton/PrimaryButton'
import SecondaryButton from 'components/SecondaryButton/SecondaryButton'
import Popup from 'components/Popup/Popup'

export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            exitPopupVisible: false,
        }
    }

    playButton = () => {
        this.props.navigation.navigate('Game', {levelId: 0})
    }

    exitButton = () => {
        this.setState({exitPopupVisible: true})
    }

    exitGame = () => {
        BackHandler.exitApp()
    }

    hideExitPopup = () => {
        this.setState({exitPopupVisible: false})
    }

    render() {
        const {exitPopupVisible} = this.state

        return(
            <View style={commonStyles.screenCenter}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{'  <Q|Logic>  '}</Text>
                </View>
                <PrimaryButton style={styles.btn} onPress={this.playButton} title='Play' />
                <SecondaryButton style={styles.btn} title='Playground' />
                <SecondaryButton style={styles.btn} title='Settings' />
                <SecondaryButton style={styles.btn} title='How to Play' />
                <SecondaryButton style={styles.btn} onPress={this.exitButton} title='Exit' />

                <Popup
                    visible={exitPopupVisible}
                    title={'Exit'}
                    info={'Are you sure you want to exit the game?'}
                    primaryBtnTitle={'Yes'}
                    primaryBtnAction={this.exitGame}
                    secondaryBtnTitle={'No'}
                    secondaryBtnAction={this.hideExitPopup}
                />

            </View>
        )
    }
}