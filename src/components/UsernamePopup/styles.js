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
        marginLeft: hasSoftNavigation ? -Dimensions.get('screen').width * 0.04 : 0,
        zIndex: 5,
        elevation: 5,
    },
    title: {
        color: Colors.buttonColor,
        fontSize: 24,
        fontWeight: 'bold',
    },
    infoText: {
        color: Colors.headerTextColor,
        fontSize: 18,
        marginTop: 10,
        marginBottom: 20,
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    singleBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 'auto',
    },
    btn: {
        width: '60%',
    },
    image: {
        flex: 1,
        aspectRatio: 2.88,
        resizeMode: 'contain',
    },
    smallBtn: {
        width: '27%',
    },
    textInputLabel: {
        color: Colors.buttonColor,
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.buttonColor,
        marginBottom: 20,
        color: Colors.buttonColor,
        paddingLeft: 10,
        fontSize: 18,
        // fontWeight: 'bold',
    },
})