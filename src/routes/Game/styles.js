import {StyleSheet, Dimensions} from 'react-native'
import Colors from 'common/Colors'

export default StyleSheet.create({
    qubitGateHistoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: Dimensions.get('screen').height * 0.1,
    },
    initialQubitContainer: {
        width: Dimensions.get('screen').width * 0.1,
        height: Dimensions.get('screen').width * 0.03,
        borderRadius: Dimensions.get('screen').width * 0.1,
        backgroundColor: Colors.buttonColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    appliedGate: {
        marginLeft: Dimensions.get('screen').width * 0.1,
    },
    gatePlaceBtn: {
        borderStyle: 'dashed',
        borderRadius: 1,
        borderWidth: 1,
        borderColor: Colors.backgroundGreyColor,
        width: Dimensions.get('screen').height * 0.1,
        height: Dimensions.get('screen').height * 0.1,
        backgroundColor: Colors.backgroundColor,
        marginLeft: Dimensions.get('screen').width * 0.1,
    },
    gatesContainer: {
        backgroundColor: '#fff',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
        flexDirection: 'row',
    },
    gateBtn: {
        height: Dimensions.get('screen').height * 0.15,
        width: Dimensions.get('screen').height * 0.15,
    },
    gameScrollView: {
        justifyContent: 'space-evenly',
        flexDirection: 'column',
    },
    line: {
        borderColor: Colors.backgroundGreyColor,
        borderBottomWidth: 2,
        width: '70%',
    },
    dash: {
        marginLeft: '1%',
        width: '7%',
    }
})