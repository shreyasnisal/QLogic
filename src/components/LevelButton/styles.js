import {StyleSheet} from 'react-native'
import Colors from 'common/Colors'

export default StyleSheet.create({
    btnContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    btn: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#333',
        borderColor: Colors.headerTextColor,
        borderWidth: 1,
    },
    lockedBtn: {
        backgroundColor: Colors.backgroundColor,
    },
    activeBtn: {
        backgroundColor: Colors.buttonColor,
        borderWidth: 0,
    },
    text: {
        fontSize: 24,
    },
    lockedText: {
        color: Colors.headerTextColor,
    },
    unlockedText: {
        color: Colors.buttonTextColor
    },
    starRow: {
        width: '100%',
        flexDirection: 'row',
    },
    star1: {
        position: "absolute",
        left: -15,
        bottom: -15,
    },
    star2: {
        position: "absolute",
        left: 17.5,
        bottom: -15,
    },
    star3: {
        position: "absolute",
        right: -15,
        bottom: -15,
    },
    lock: {
        position: "absolute",
        right: -12,
        bottom: -12,
    }
})