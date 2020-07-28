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
    background: {
        backgroundColor: '#000',
        opacity: 0.5,
    },
    popupContainer: {
        backgroundColor: Colors.backgroundColor,
        width: '60%',
        padding: 20,
        marginLeft: -Dimensions.get('screen').width * 0.04,
        borderRadius: 10,
        // alignItems: 'center',
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
        justifyContent: 'space-evenly',
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
        width: '30%',
    }
})