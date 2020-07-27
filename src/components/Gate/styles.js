import {StyleSheet, Dimensions} from 'react-native'
import Colors from 'common/Colors'

export default StyleSheet.create({
    gateBtn: {
        backgroundColor: Colors.backgroundColor,
        borderRadius: 4,
        borderWidth: 3,
        borderColor: Colors.lockBlue,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
    },
    gateName: {
        color: Colors.lockBlue,
        fontSize: 24,
    },
    noGate: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderWidth: 0,
    },
    controlGate: {
        backgroundColor: Colors.backgroundColor,
        borderWidth: 0,
        paddingLeft: 2,
    }
})