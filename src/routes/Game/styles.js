import {StyleSheet, Dimensions} from 'react-native'
import Colors from 'common/Colors'

export default StyleSheet.create({
    qubitGateHistoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    initialQubitContainer: {
        width: Dimensions.get('screen').width * 0.1,
        height: Dimensions.get('screen').width * 0.03,
        borderRadius: Dimensions.get('screen').width * 0.1,
        backgroundColor: Colors.buttonColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    connectingLine: {
        borderColor: Colors.buttonColor,
        borderBottomWidth: 2,
        width: Dimensions.get('screen').width * 0.1,
    },
    blankLine: {
        borderColor: Colors.buttonColor,
        borderBottomWidth: 2,
        width: Dimensions.get('screen').width * 0.11,
    },
    appliedGate: {
    },
    gatePlaceContainer: {
    },
    gatesContainer: {
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
    },
    gateBtn: {
        height: Dimensions.get('screen').height * 0.15,
        width: Dimensions.get('screen').height * 0.15,
    },
    gameScrollView: {
        width: Dimensions.get('screen').width * 100,
        height: Dimensions.get('screen').height,
        flexDirection: 'column',
    },
})