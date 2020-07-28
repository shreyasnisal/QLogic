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
    },
    popupContainer: {
        backgroundColor: Colors.backgroundColor,
        padding: 20,
        width: '45%',
        borderRadius: 10,
        flexDirection: 'column',
        marginLeft: -Dimensions.get('screen').width * 0.04,
        zIndex: 3,
        elevation: 3,
    },
    largePopupContainer: {
        width: '75%',
        maxHeight: '95%',
        backgroundColor: Colors.backgroundColor,
        elevation: 3,
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
        textAlign: 'justify',
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    singleBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    btn: {
        width: '45%',
    },
    image: {
        height: '40%',
        resizeMode: 'contain',
    },
    smallBtn: {
        // width: '20%',
        paddingHorizontal: 10,
    }
})