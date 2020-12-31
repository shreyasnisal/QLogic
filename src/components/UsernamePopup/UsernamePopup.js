import React, {Component} from 'react'
import {
    Platform,
    View,
    Text,
    TextInput,
    Animated,
    ActivityIndicator,
} from 'react-native'
import axios from 'axios'
import commonStyles from 'common/styles'
import styles from './styles'
import Colors from 'common/Colors'
import PrimaryButton from 'components/PrimaryButton/PrimaryButton'
import SecondaryButton from 'components/SecondaryButton/SecondaryButton'
import {BASE_URL} from 'common/constants'

export default class UsernamePopup extends Component {

    constructor(props) {
        super(props)

        this.state = {
            popupScale: new Animated.Value(0),
            username: '',
            loading: false,
            verified: false,
            unavailable: false,
        }
    }

    verifyUsername = () => {

        this.setState({loading: true})

        const {username} = this.state

        axios.get(BASE_URL + '/verifyUsername?username=' + username).then(response => {
            console.log(response.data)
            if (response.data === 'success') {
                this.setState({
                    loading: false,
                    verified: true,
                })
            }
            else {
                this.setState({
                    loading: false,
                    unavailable: true
                })
            }
        }).catch(err => {
            alert('Could not process request. Please check your network and try again')
            this.setState({loading: false})
        })
    }

    saveUsername = () => {
        this.setState({loading: true})

        const {username} = this.state

        axios.get(BASE_URL + '/createNewUser?username=' + username).then(response => {
            console.log(response.data)
            if (response.data === 'success') {
                this.setState({
                    loading: false,
                })

                this.props.onUserCreated(username)
            }
            else {
                this.setState({
                    loading: false
                })

                alert('Could not create user')
            }
        }).catch(err => {
            alert('Could not process request. Please check your network and try again')
            this.setState({loading: false})
        })
    }

    render() {
        const {visible} = this.props
        const {popupScale, loading, username, verified, unavailable, onUserCreated} = this.state

        if (!visible) return null

        Animated.spring(popupScale, {
            toValue: 1,
            friction: 7,
            useNativeDriver: true,
        }).start()

        return(
            <View style={[commonStyles.fullScreen, styles.container]}>
                <View style={[commonStyles.fullScreen, styles.container, commonStyles.popupBackground]} />
                <Animated.View style={[styles.popupContainer, {transform: [{scale: popupScale}]}]}>
                    <Text style={styles.title}>Enter Display Name </Text>
                    <Text style={styles.infoText}>We have new features in the game for which we need a display name!</Text>
                    <Text style={styles.textInputLabel}>Display Name</Text>
                    <TextInput
                        style={styles.textInput}
                        autoCapitalize='none'
                        onChangeText={(value) => this.setState({username: value, verified: false})}
                        editable={!loading}
                    />
                    <View style={styles.singleBtnContainer}>
                        {loading && <ActivityIndicator size={'small'} color={Colors.btnColor} />}
                        {!verified && !loading && <SecondaryButton style={styles.btn} title={'Verify Availability'} titleStyle={styles.btnText} onPress={this.verifyUsername} />}
                        {verified && !loading && <PrimaryButton style={styles.btn} title={'Save'} titleStyle={styles.btnText} onPress={this.saveUsername} />}
                    </View>
                </Animated.View>
            </View>
        )
    }


}