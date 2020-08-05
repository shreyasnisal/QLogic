import {StyleSheet, Dimensions} from 'react-native'
import Colors from 'common/Colors'

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
        marginLeft: -Dimensions.get('screen').width * 0.04,
        zIndex: 5,
        elevation: 5,
    },
    largePopupContainer: {
        width: '75%',
        height: '95%',
        backgroundColor: Colors.backgroundColor,
        elevation: 3,
        zIndex: 3,
        padding: 20,
        borderRadius: 10,
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
        width: '45%',
    },
    image: {
        flex: 1,
        aspectRatio: 2.88,
        resizeMode: 'contain',
    },
    smallBtn: {
        width: '27%',
    }
})