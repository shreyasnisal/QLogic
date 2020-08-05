import {StyleSheet, Dimensions} from 'react-native'
import Colors from 'common/Colors'

export default StyleSheet.create({
    qubitGateHistoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: Dimensions.get('screen').height * 0.1,
        marginLeft: Dimensions.get('screen').width * 0.03,
        marginBottom: Dimensions.get('screen').height * 0.05,
    },
    initialQubitContainer: {
        width: Dimensions.get('screen').width * 0.12,
        height: Dimensions.get('screen').width * 0.036,
        borderRadius: Dimensions.get('screen').width * 0.1,
        backgroundColor: Colors.buttonColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    initialQubitText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    appliedGate: {
        marginLeft: Dimensions.get('screen').width * 0.05,
    },
    gatePlaceBtn: {
        borderStyle: 'dashed',
        borderRadius: 2,
        borderWidth: 1,
        borderColor: Colors.headerTextColor,
        width: Dimensions.get('screen').height * 0.1,
        height: Dimensions.get('screen').height * 0.1,
        backgroundColor: Colors.backgroundColor,
        marginLeft: Dimensions.get('screen').width * 0.05,
    },
    bottomRow: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingBottom: 10,
        flexDirection: 'row',
    },
    gatesContainer: {
        flexDirection: 'row',
    },
    movesContainer: {
        backgroundColor: Colors.headerTextColor,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    timeContainer: {
        backgroundColor: Colors.headerTextColor,
        paddingVertical: 10,
        flexDirection: 'row',
        paddingHorizontal: 20,
        borderRadius: 5,
        justifyContent: 'center',
        width: '12%',
    },
    movesLabel: {
        fontSize: 18,
        color: Colors.backgroundColor,
        fontWeight: 'bold',
    },
    gateBtn: {
        height: Dimensions.get('screen').height * 0.15,
        width: Dimensions.get('screen').height * 0.15,
        marginRight: 10,
    },
    gameScrollView: {
        paddingTop: 15,
        flexDirection: 'column',
    },
    line: {
        borderColor: Colors.backgroundGreyColor,
        borderBottomWidth: 2,
        width: '100%',
    },
    statesRow: {
        flexDirection: 'row',
        width: '100%',
    },
    stateContainer: {
        flex: 2,
        height: '100%',
        borderWidth: 1,
        borderColor: Colors.headerTextColor,
        padding: 5,
        paddingLeft: 10,
    },
    stateStaticLabel: {
        color: Colors.headerTextColor,
        fontSize: 16,
    },
    scoreContainer: {
        flex: 1,
        height: '100%',
        borderWidth: 1,
        borderColor: Colors.headerTextColor,
        padding: 5,
        paddingLeft: 10,
    },
    stateLabel: {
        fontSize: 20,
        color: Colors.headerTextColor,
        fontWeight: 'bold',
    },
    scoreText: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addScore: {
        color: Colors.buttonColor,
        marginLeft: 10,
        fontWeight: 'bold',
    },
    selectedGate: {
        backgroundColor: Colors.headerColor,
    },
    toastContainer: {
        width: '100%',
        alignItems: 'center',
    },
    toast: {
        position: 'absolute',
        bottom: 80,
    }
})