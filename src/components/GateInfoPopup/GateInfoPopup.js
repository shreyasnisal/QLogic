import React, {Component} from 'react'
import {
    View,
    Text,
    Dimensions,
    Animated,
} from 'react-native'
import PrimaryButton from 'components/PrimaryButton/PrimaryButton'
import commonStyles from 'common/styles'
import styles from './styles'
import Gate from 'components/Gate/Gate'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import Colors from 'common/Colors'
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'

export default class GateInfoPopup extends Component {

    constructor(props) {
        super(props)

        this.state = {
            popupScale: new Animated.Value(0)
        }
    }
    
    render() {
        const {visible, onPressDone} = this.props
        const {popupScale} = this.state

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
                    <Text style={styles.title}>Gates </Text>
                    {/* <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginBottom: 20}}> */}
                    <View style={styles.gateInfoContainer}>
                        <Text style={styles.gateHeading}>X-Gate </Text>
                        <View style={styles.row}>
                            <Gate name='X' disabled='true' style={styles.gateImg} />
                            <Text style={styles.text}>Converts a 0 to a 1 and a 1 to a 0.</Text>
                        </View>
                    </View>
                    <View style={styles.gateInfoContainer}>
                        <Text style={styles.gateHeading}>Z-Gate </Text>
                        <View style={styles.row}>
                            <Gate name='Z' disabled='true' style={styles.gateImg} />
                            <Text style={styles.text}>Converts a 1 to a -1 but has no effect on a 0.</Text>
                        </View>
                    </View>
                    <View style={styles.gateInfoContainer}>
                        <Text style={styles.gateHeading}>H-Gate </Text>
                        <View style={styles.row}>
                            <Gate name='H' disabled='true' style={styles.gateImg} />
                            <Text style={styles.text}>Converts a 0 to 0+1 and vice versa. Converts a 1 to 0-1 and vice versa.</Text>
                        </View>
                    </View>
                    {/* </View> */}
                    <View style={styles.singleBtnContainer}>
                        <PrimaryButton style={styles.btn} title={'Done'} titleStyle={styles.btnText} onPress={onPressDone} />
                    </View>
                </Animated.View>
            </View>
        )
    }
}