import {StyleSheet, Dimensions, Platform} from 'react-native'
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
        width: '60%',
        borderRadius: 10,
        flexDirection: 'column',
        marginLeft: hasSoftNavigation() ? -Dimensions.get('screen').width * 0.04 : 0,
        zIndex: 5,
        elevation: 5,
    },
    title: {
        color: Colors.buttonColor,
        fontSize: 24,
        fontWeight: 'bold',
    },
    gateInfoContainer: {
        marginTop: 5,
        marginBottom: 5,
    },
    gateHeading: {
        color: Colors.headerTextColor,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 3,
    },
    text: {
        color: Colors.headerTextColor,
        fontSize: 18,
        width: '90%',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    gateImg: {
        // marginLeft: '20%',
        marginRight: '3%',
        width: 35,
        height: 35,
    },
    singleBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 'auto',
    },
    btn: {
        width: '45%',
    },
})