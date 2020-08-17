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
    background: {
        backgroundColor: '#000',
        opacity: 0.5,
    },
    popupContainer: {
        backgroundColor: Colors.backgroundColor,
        width: '60%',
        padding: 20,
        marginLeft: hasSoftNavigation() ? -Dimensions.get('screen').width * 0.04 : 0,
        borderRadius: 10,
        elevation: 3,
        zIndex: 3,
    },
    starsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    buttonsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        color: Colors.buttonColor,
        fontSize: 24,
        // fontWeight: 'bold',
    },
    infoText: {
        color: Colors.headerTextColor,
        fontSize: 18,
        marginTop: 5,
    },
    icon: {
        marginHorizontal: 5,
    },
    btn: {
        width: '10%',
        height: '100%',
    },
    bigBtn: {
        width: '45%',
        height: '100%',
    },
    nextBtn: {
        width: '30%',
        height: '100%',
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
        marginLeft: 5,
    },
    coinText: {
        color: Colors.headerTextColor,
        fontSize: 24,
        // fontWeight: 'bold',
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