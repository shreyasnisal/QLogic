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
    },
    popupContainer: {
        backgroundColor: Colors.backgroundColor,
        padding: 20,
        width: '45%',
        borderRadius: 10,
        flexDirection: 'column',
        marginLeft: -Dimensions.get('screen').width * 0.04,
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
    btn: {
        width: '45%',
    }
})