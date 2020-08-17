import {StyleSheet, Dimensions} from 'react-native'
import Colors from 'common/Colors'
import DetectNavbar from 'react-native-detect-navbar-android'

const hasSoftNavigation = () => {
    if (Platform.OS !== 'android') return false

    DetectNavbar.hasSoftKeys().then(bool => {
        return bool
    })
}

export default StyleSheet.create({
    container: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        zIndex: 2,
    },
    popupContainer: {
        backgroundColor: Colors.backgroundColor,
        padding: 20,
        width: '45%',
        borderRadius: 10,
        flexDirection: 'column',
        marginLeft: hasSoftNavigation() ? -Dimensions.get('screen').width * 0.04 : 0,
        zIndex: 5,
        elevation: 5,
    },
    title: {
        fontSize: 26,
        color: Colors.buttonColor,
    },
    subHeadingText: {
        fontSize: 18,
        color: Colors.headerTextColor,
    },
    qubitButtonsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    qubitBtn: {
        paddingHorizontal: 20,
        borderColor: Colors.headerTextColor,
    },
    qubitSwitchBtn: {
        borderWidth: 1,
        borderColor: Colors.buttonColor,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    qubitSwitchBtn_left: {
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        width: '33%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    qubitSwitchBtn_center: {
        width: '33%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    qubitSwitchBtn_right: {
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        width: '33%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    qubitSwitchBtn_left_selected: {
        borderRightWidth: 0,
        backgroundColor: Colors.buttonColor,
    },
    qubitSwitchBtn_center_selected: {
        // borderRightWidth: 0,
        borderLeftWidth: 0,
        backgroundColor: Colors.buttonColor,
    },
    qubitSwitchBtn_right_selected: {
        borderLeftWidth: 0,
        backgroundColor: Colors.buttonColor,
    },
    qubitBtnTitle: {
        color: Colors.buttonColor,
        fontSize: 18,
    },
    selectedBtnTitle: {
        color: Colors.backgroundColor,
    },
    highscoreRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    highscoreLabel: {
        color: Colors.headerTextColor,
        fontSize: 20,
    },
    highscoreText: {
        color: Colors.headerTextColor,
        fontSize: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    btn: {
        width: '45%',
    },
})