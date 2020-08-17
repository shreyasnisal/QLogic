import React, {Component} from 'react'
import {
    View,
    Text, 
    TouchableOpacity,
    BackHandler,
    Dimensions,
    Image,
} from 'react-native'
import commonStyles from 'common/styles'
import styles from './styles'
import CarouselIndicators from 'components/CarouselIndicators/CarouselIndicators'
import Header from 'components/Header/Header'
import Background from 'components/Background/Background'
import { ScrollView } from 'react-native-gesture-handler'
import Gate from 'components/Gate/Gate'

export default class HowToPlay extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            currentPage: 0,
        }

        BackHandler.addEventListener('hardwareBackPress', this.backButton)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backButton)
    }

    backButton = () => {
        this.props.navigation.navigate('Home')

        return true
    }

    handleScroll = (event) => {
        const pageNumber = Math.round(event.nativeEvent.contentOffset.x / Dimensions.get('screen').width)
        this.setState({
            currentPage: pageNumber
        })
    }
    
    render() {

        const {currentPage} = this.state

        return(
            <View style={commonStyles.container}>
                <Header title='How to Play' onPressBack={this.backButton} />
                {/* <Background /> */}
                <ScrollView
                    ref={this.mScrollView}
                    horizontal
                    scrollEventThrottle={200}
                    decelerationRate="fast"
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={Dimensions.get('screen').width}
                    onMomentumScrollEnd={this.handleScroll}
                    pinchGestureEnabled={false}
                >
                    <View style={styles.page}>
                        <Text style={styles.text}>
                        QLogic is a quantum physics based puzzle game. 
                        A bit is like a switch, which can be on or off, true or false, 0 or 1. 
                        A qubit (quantum-bit) can have similar states, but it can also be in something called a mixture of states, which means that it is 0 and 1 at the same time! 
                        </Text>
                        <Text style={[styles.text, styles.section]}>
                        In quantum computation, a qubit which is 0 and 1 at the same time is said to be in a superposition of the two,
                        and is represented as 0 + 1.
                        </Text>
                    </View>
                    <View style={styles.page}>
                        <Text style={styles.text}>
                        Your aim is to take qubits from an initial to a target state. 
                        To do so, you can use any of the gates available in a level. 
                        To use a gate, select it and tap on any of the available locations to place it. 
                        Remember that you cannot undo a move once done.
                        </Text>
                        <Image source={require('../../assets/images/intro.gif')} style={[styles.image, styles.section]} />
                    </View>
                    <View style={styles.page}>
                        <View style={styles.gateInfoContainer}>
                            <Text style={styles.gateHeading}>X-Gate (Bit Flip)  </Text>
                            <View style={styles.row}>
                                <Text style={styles.text}>
                                The bit flip gate converts a 0 state to a 1, and a 1 to a 0. 
                                When dealing with a superposition such as 0 - 1, it will convert the first 0 to a 1 and the 1 to a 0, 
                                giving the final state as 1 - 0.
                                </Text>
                                <Gate name='X' disabled='true' style={styles.gateImg} />
                            </View>
                        </View>
                        <View style={[styles.gateInfoContainer, styles.section]}>
                            <Text style={styles.gateHeading}>Z-Gate </Text>
                            <View style={styles.row}>
                                <Text style={styles.text}>
                                This gate does not affect the state 0 and flips the sign of the state 1. 
                                So a state 1 gets converted to state -1, and a -1 gets converted to a 1.
                                </Text>
                                <Gate name='Z' disabled='true' style={styles.gateImg} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.page}>
                        <View style={styles.gateInfoContainer}>
                            <Text style={styles.gateHeading}>H-Gate </Text>
                            <View style={styles.row}>
                                <Text style={styles.text}>
                                The Hadamard gate (H-Gate) is used to create and destroy superpositions.
                                It converts a 0 to 0 + 1 and vice versa. It also converts a 1 to 0 - 1 and vice versa.
                                </Text>
                                <Gate name='H' disabled='true' style={styles.gateImg} />
                            </View>
                        </View>
                        <View style={[styles.gateInfoContainer, styles.section]}>
                            <Text style={styles.gateHeading}>Control Gates (CX, CZ, CH) </Text>
                            <View style={styles.row}>
                                <Text style={styles.text}>
                                Control Gates act on 2 qubits- one is the control qubit, the other is the target. 
                                If the control qubit is in state 1, the operation (X, Z or H) is performed on the target. 
                                If the control qubit is in state 0, no operation is performed on any qubit. 
                                </Text>
                                <Gate name='CX' disabled='true' style={styles.gateImg} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.page}>
                        <Text style={styles.text}>
                        When dealing with multiple qubits, we write the state of the qubits together. 
                        For example, if the first qubit is in state 0 and the second is in state 1, we write the current state of both together as 01. 
                        If the first is in state 0 + 1, and the second is 0, the combined state would be 00 + 10.
                        </Text>
                        <Text style={[styles.text, styles.section]}>
                        Using the H-Gate on the first qubit of the state 00 would give 00 + 10. 
                        Using a CX gate on 00 + 10 with the first qubit as control would give 00 + 11, because any gate is operated individually on each term separately. 
                        So for 00, the control qubit is 0 and nothing happens. For 10, the control qubit is 1 and the target is flipped.
                        </Text>
                    </View>
                </ScrollView>
                <CarouselIndicators numPages={5} currentPage={currentPage} style={styles.carouselIndicators} />
            </View>
        )
    }
}