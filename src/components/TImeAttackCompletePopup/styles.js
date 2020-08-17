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
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    coinContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    coinImage: {
        width: 35,
        height: 35,
        resizeMode: 'contain',
        marginLeft: 4,
    },
    coinText: {
        color: Colors.headerTextColor,
        fontSize: 24,
        // fontWeight: 'bold',
    },
    title: {
        color: Colors.buttonColor,
        fontSize: 24,
    },
    scoreText: {
        width: '100%',
        fontSize: 60,
        color: Colors.headerTextColor,
        // fontWeight: 'bold',
        textAlign: 'center',
    },
    dataRow: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    label: {
        fontSize: 20,
        color: Colors.headerTextColor,
    },
    subHeadingText: {
        fontSize: 18,
        color: Colors.headerTextColor,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    },
    btn: {
        width: '15%',
        height: '100%',
    },
    bigBtn: {
        width: '45%',
        justifyContent: 'space-evenly',
    },
})